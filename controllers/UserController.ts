import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/s3";
import { JWT_SECRET, BCRYPT_COST } from "../utils/config";
import type { IJWTRefresh } from "../types/IJwtRefresh";
/**
 * Checks if the refresh token is valid, if valid, responds with a signed auth JWT token valid for 15m. Otherwise responds with the appropriate HTTP status code.
 * @param req The Request Object
 * @param res The Response Object
 */
export const Login = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.sendStatus(400);
      return;
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    //Type Gymnastics
    const match: boolean = user
      ? await Bun.password.verify(req.body.password, user.password)
      : false;

    if (!match) {
      res.sendStatus(401);
      return;
    }

    const token = jwt.sign(
      { username: user?.username, type: "auth" },
      JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/**
 * Checks credentials of the user, if valid, responds with a signed refresh JWT token. Otherwise responds with the appropriate HTTP status code.
 * @param req The Request Object
 * @param res The Response Object
 */

export const Refresh = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    const cookie = req.headers.cookie;
    if (!cookie) {
      res.sendStatus(401);
      return;
    }

    const authToken = cookie.split("=")[1];
    let decodedToken: IJWTRefresh;
    try {
      decodedToken = jwt.verify(
        authToken as string,
        process.env.JWT_SECRET as string,
      ) as IJWTRefresh;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).send("Token Expired");
        return;
      }
      res.status(401).send("Invalid Token");
      return;
    }
    if (decodedToken.type != "auth") {
      res.sendStatus(401);
      return;
    }

    const token = jwt.sign(
      { username: user?.username, type: "refresh" },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.send({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/**
 * Creates a new user with the provided credentials, data and uploaded initial vault+iv. Responds with the appropriate HTTP status code.
 * @param req The Request Object
 * @param res The Response Object
 */

export const Signup = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.iv || !req.file) {
      res.sendStatus(400);
      return;
    }
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    // Password Hashing
    const hashed_password = await Bun.password.hash(req.body.password, {
      algorithm: "bcrypt",
      cost: parseInt(BCRYPT_COST),
    });

    // File Hashing
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(req.file.buffer.buffer);
    hasher.update(req.body.username);
    const hashed_checksum = hasher.digest("hex");

    const putCommand = new PutObjectCommand({
      Bucket: "stashkey",
      Key: hashed_checksum,
      Body: req.file.buffer,
    });

    s3.send(putCommand);

    const newUser = new User({
      username: req.body.username,
      password: hashed_password,
      initialization_vector: req.body.iv,
      current_checksum: hashed_checksum,
      db_lock: false,
      account_created: Date.now(),
      last_login: Date.now(),
      shamir_enabled: false,
      total_split: 0,
      threshold_value: 0,
    });

    await newUser.save();
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
