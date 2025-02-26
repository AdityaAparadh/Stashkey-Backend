import { S3Client } from "@aws-sdk/client-s3";
import config from "./config";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: config.ACCESS_KEY_ID,
    secretAccessKey: config.SECRET_ACCESS_KEY,
  },
  region: config.BUCKET_REGION,
  endpoint: config.AWS_ENDPOINT_URL,
  forcePathStyle: true,
});
