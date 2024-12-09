import type { Request, Response } from "express";
import User from "../models/User";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getVault = async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: user.current_checksum,
  });

  const vault_url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  res.send({ vault_url });
};
