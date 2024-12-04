import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

let JWT_SECRET: string;
if (process.env.JWT_SECRET) {
  JWT_SECRET = process.env.JWT_SECRET;
} else {
  throw new Error("JWT_SECRET not set as environment variable");
}
/**
 * Checks credentials of the user, if valid, responds with a signed JWT token. Otherwise responsds with the appropriate HTTP status code.
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

    const token = jwt.sign({ username: user?.username }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.send({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const Signup = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(400);
  }
};
