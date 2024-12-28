import { Router } from "express";
import { getVault, setVault } from "../controllers/VaultController";
import Auth from "../middleware/auth";
import upload from "../utils/multer";
const VaultRouter = Router();

VaultRouter.post("/fetch", Auth, getVault);
VaultRouter.post("/update", upload.single("vault"), Auth, setVault);

export default VaultRouter;
