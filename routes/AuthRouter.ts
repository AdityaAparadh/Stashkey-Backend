import { Router } from "express";
import { Refresh, Login, Signup, SignOut } from "../controllers/UserController";
import upload from "../utils/multer";
import rateLimit from "express-rate-limit";
import config from "../utils/config";

const loginRateLimit = rateLimit({
  windowMs: parseInt(config.WINDOW_SIZE_MINUTES) * 60 * 1000,
  limit: parseInt(config.LOGIN_REQ_PER_WINDOW),
});

const signUpRateLimit = rateLimit({
  windowMs: parseInt(config.WINDOW_SIZE_MINUTES) * 60 * 1000,
  limit: parseInt(config.SIGNUP_REQ_PER_WINDOW),
});

const AuthRouter = Router();
AuthRouter.post("/refresh", Refresh);
AuthRouter.post("/login", loginRateLimit, Login);
AuthRouter.post("/logout", loginRateLimit, SignOut);

AuthRouter.post("/signup", signUpRateLimit, upload.single("vault"), Signup);
export default AuthRouter;
