import { Router } from "express";
import { Login, Signup } from "../controllers/UserController";
import upload from "../utils/multer";

const AuthRouter = Router();
AuthRouter.post("/login", Login);

AuthRouter.post("/signup", upload.single("vault"), Signup);

export default AuthRouter;
