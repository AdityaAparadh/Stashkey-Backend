import type { Request, Response, NextFunction } from "express";

export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Middleware Test");
  next();
};
