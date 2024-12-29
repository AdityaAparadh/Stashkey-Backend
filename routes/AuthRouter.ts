import { Router } from "express";
import { Refresh, Login, Signup, SignOut } from "../controllers/UserController";
import upload from "../utils/multer";

const AuthRouter = Router();
AuthRouter.post("/refresh", Refresh);
AuthRouter.post("/login", Login);
AuthRouter.post("/logout", SignOut);

AuthRouter.post("/signup", upload.single("vault"), Signup);
export default AuthRouter;
