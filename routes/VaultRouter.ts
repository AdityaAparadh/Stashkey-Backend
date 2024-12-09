import { Router } from "express";
import { getVault } from "../controllers/VaultController";
import Auth from "../middleware/auth";

const VaultRouter = Router();

VaultRouter.post("/core", Auth, getVault);

export default VaultRouter;
