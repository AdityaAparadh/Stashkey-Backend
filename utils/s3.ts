import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.ACCESS_KEY_ID) {
  throw new Error("ACCESS_KEY_ID not set as environment variable");
}
if (!process.env.SECRET_ACCESS_KEY) {
  throw new Error("SECRET_ACCESS_KEY not set as environment variable");
}
if (!process.env.BUCKET_REGION) {
  throw new Error("BUCKET_REGION not set as environment variable");
}

const ACCESS_KEY_ID: string = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY: string = process.env.SECRET_ACCESS_KEY;
const BUCKET_REGION: string = process.env.BUCKET_REGION;

export const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION,
});
