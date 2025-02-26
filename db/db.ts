import mongoose from "mongoose";
import config from "../utils/config";

/**
 * Function to establish Database connection
 * @returns {Promise<boolean>} - Returns boolean value indicating the success of the connection
 */
const db = async (): Promise<boolean> => {
  try {
    // if (!process.env.MONGO_URI) {
    //   throw new Error("Mongo URI not set as an environment variable");
    // }

    await mongoose.connect(config.MONGO_URI);
    console.log("DB Connected Successfully");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default db;
