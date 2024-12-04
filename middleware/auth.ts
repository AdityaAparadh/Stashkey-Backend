import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const Auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const ReqUsername: string = req.body.username;
    const token: string | undefined = req
      .header("Authorization")
      ?.split(" ")[1];

    const decodedUsername: string | object = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    );

    if (decodedUsername === ReqUsername) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
};

export default Auth;
