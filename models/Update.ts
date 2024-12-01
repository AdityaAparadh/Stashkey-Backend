import mongoose from "mongoose";
import type { IUpdate } from "../types/IUpdate";
import User from "./User";

const UpdateSchema = new mongoose.Schema<IUpdate>({
  user: {
    type: User,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  checksum: {
    type: String,
    required: true,
  },
});

const Update = mongoose.model<IUpdate>("Update", UpdateSchema);
export default Update;
