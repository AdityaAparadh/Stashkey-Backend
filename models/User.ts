import mongoose from "mongoose";
import type { IUser } from "../types/IUser";

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  initialization_vector: { type: String, required: true },
  current_checksum: { type: String, required: true },
  db_lock: { type: Boolean, required: true },
  account_created: { type: Date, required: true },
  last_login: { type: Date, required: true },
  shamir_enabled: { type: Boolean, required: true },
  total_split: { type: Number, required: true },
  threshold_value: { type: Number, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
