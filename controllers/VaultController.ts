import type { Request, Response } from "express";
import User from "../models/User";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import OldVault from "../models/OldVault";

/**
 * Returns a signed URL to the user's vault file.
 * @param req The Request Object
 * @param res The Response Object
 */
export const getVault = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.sendStatus(404);
      return;
    }
    const iv = user.initialization_vector;
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: user.current_checksum,
    });

    const vault_url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.send({ vault_url, iv });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/**
 * Allows updating the user's vault file.
 * @param req The Request Object
 * @param res The Response Object
 */
export const setVault = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.iv || !req.file) {
      console.log(req.body);
      console.log(req.file);
      res.sendStatus(400);
      return;
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send("Not Found");
      return;
    }
    if (user.db_lock) {
      res.status(503).send("Locked Vault");
      return;
    }

    // Lock the vault
    await User.findOneAndUpdate(
      { username: req.body.username },
      { db_lock: true },
    );

    // File Hashing
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(req.file.buffer.buffer);
    hasher.update(req.body.username);
    hasher.update(req.body.iv);
    const hashed_checksum = hasher.digest("hex");

    const putCommand = new PutObjectCommand({
      Bucket: "stashkey",
      Key: hashed_checksum,
      Body: req.file.buffer,
    });

    /**
     * @todo Fix oldVault3
     */

    // const oldVault = new OldVault({
    //   user: user,
    //   timestamp: Date.now(),
    //   vault_hash: user.current_checksum,
    // });
    // await oldVault.save();
    await s3.send(putCommand);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { initialization_vector: req.body.iv, current_checksum: hashed_checksum },
    );
    res.sendStatus(200);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { db_lock: false },
    );
  } catch (err) {
    console.error(err);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { db_lock: false },
    );
    res.sendStatus(500);
  }
};
