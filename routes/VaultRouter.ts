import { Router } from "express";
import { getVault, setVault } from "../controllers/VaultController";
import Auth from "../middleware/auth";
import upload from "../utils/multer";
import rateLimit from "express-rate-limit";
// import {
//   FETCH_REQ_PER_WINDOW,
//   UPDATE_REQ_PER_WINDOW,
//   WINDOW_SIZE_MINUTES,
// } from "../utils/config";
import config from "../utils/config";

const VaultRouter = Router();

const fetchRateLimit = rateLimit({
  windowMs: parseInt(config.WINDOW_SIZE_MINUTES) * 60 * 1000,
  limit: parseInt(config.FETCH_REQ_PER_WINDOW),
});

const updateRateLimit = rateLimit({
  windowMs: parseInt(config.WINDOW_SIZE_MINUTES) * 60 * 1000,
  limit: parseInt(config.UPDATE_REQ_PER_WINDOW),
});

VaultRouter.post("/fetch", fetchRateLimit, Auth, getVault);

VaultRouter.post(
  "/update",
  updateRateLimit,
  upload.single("vault"),
  Auth,
  setVault,
);

export default VaultRouter;
