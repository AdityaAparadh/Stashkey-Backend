import mongoose from "mongoose";
import type { ITrustee } from "../types/ITrustee";
import User from "./User";

const TrusteeSchema = new mongoose.Schema<ITrustee>({
  user: { type: User, required: true },
  username: { type: String, required: true },
  access_secret: { type: String, required: true },
});

const Trustee = new mongoose.Model("Trustee", TrusteeSchema);
export default Trustee;
