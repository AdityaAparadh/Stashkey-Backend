import { Router } from "express";
import { Login } from "../controllers/UserController";

const AuthRouter = Router();

AuthRouter.post("/login", Login);

export default AuthRouter;
