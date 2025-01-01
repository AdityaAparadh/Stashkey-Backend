import { Router } from "express";
import { Refresh, Login, Signup, SignOut } from "../controllers/UserController";
import upload from "../utils/multer";
import rateLimit from "express-rate-limit";
import {
  LOGIN_REQ_PER_WINDOW,
  SIGNUP_REQ_PER_WINDOW,
  WINDOW_SIZE_MINUTES,
} from "../utils/config";

const loginRateLimit = rateLimit({
  windowMs: parseInt(WINDOW_SIZE_MINUTES) * 60 * 1000,
  limit: parseInt(LOGIN_REQ_PER_WINDOW),
});

const signUpRateLimit = rateLimit({
  windowMs: parseInt(WINDOW_SIZE_MINUTES) * 60 * 1000,
  limit: parseInt(SIGNUP_REQ_PER_WINDOW),
});

const AuthRouter = Router();
AuthRouter.post("/refresh", Refresh);
AuthRouter.post("/login", loginRateLimit, Login);
AuthRouter.post("/logout", loginRateLimit, SignOut);

AuthRouter.post("/signup", signUpRateLimit, upload.single("vault"), Signup);
export default AuthRouter;
