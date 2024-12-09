import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { IJWTPayload } from "../types/IJwtPayload";

const Auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const ReqUsername: string = req.body.username;
    const token: string | undefined = req
      .header("Authorization")
      ?.split(" ")[1];

    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }
    let decodedToken: IJWTPayload;
    try {
      decodedToken = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      ) as IJWTPayload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).send("Token Expired");
        return;
      }
      res.status(401).send("Invalid Token");
      return;
    }

    //Very Important :-)
    if (decodedToken && decodedToken.username === ReqUsername) {
      next();
    } else {
      console.log("Token Mismatch");
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
};

export default Auth;
