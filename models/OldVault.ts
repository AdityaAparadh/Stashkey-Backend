import mongoose from "mongoose";
import type { IUser } from "../types/IUser";
import User from "./User";

interface IOldVault extends Document {
  user: IUser;
  timestamp: Date;
  vault_hash: string;
}

const OldVaultSchema = new mongoose.Schema<IOldVault>({
  user: { type: User, required: true },
  timestamp: { type: Date, required: true },
  vault_hash: { type: String, required: true },
});

const OldVault = mongoose.model<IOldVault>("OldVault", OldVaultSchema);
export default OldVault;
