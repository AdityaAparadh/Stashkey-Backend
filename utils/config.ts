let BACKEND_PORT: string;
let JWT_SECRET: string;
let BCRYPT_COST: string;

let MONGO_URI: string;

let BUCKET_NAME: string;
let BUCKET_REGION: string;
let ACCESS_KEY_ID: string;
let SECRET_ACCESS_KEY: string;

let WINDOW_SIZE_MINUTES: string;
let SIGNUP_REQ_PER_WINDOW: string;
let LOGIN_REQ_PER_WINDOW: string;
let FETCH_REQ_PER_WINDOW: string;
let UPDATE_REQ_PER_WINDOW: string;

export const config = () => {
  if (process.env.JWT_SECRET) {
    JWT_SECRET = process.env.JWT_SECRET;
  } else {
    throw new Error("JWT_SECRET not set as environment variable");
  }
  if (process.env.BCRYPT_COST) {
    BCRYPT_COST = process.env.BCRYPT_COST;
  } else {
    throw new Error("BCRYPT_COST not set as environment variable");
  }

  if (process.env.BACKEND_PORT) {
    BACKEND_PORT = process.env.BACKEND_PORT;
  } else {
    throw new Error("BACKEND_PORT not set as environment variable");
  }
  if (process.env.MONGO_URI) {
    MONGO_URI = process.env.MONGO_URI;
  } else {
    throw new Error("MONGO_URI not set as environment variable");
  }

  if (process.env.BUCKET_NAME) {
    BUCKET_NAME = process.env.BUCKET_NAME;
  } else {
    throw new Error("BUCKET_NAME not set as environment variable");
  }

  if (process.env.BUCKET_REGION) {
    BUCKET_REGION = process.env.BUCKET_REGION;
  } else {
    throw new Error("BUCKET_REGION not set as environment variable");
  }

  if (process.env.ACCESS_KEY_ID) {
    ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
  } else {
    throw new Error("ACCESS_KEY_ID not set as environment variable");
  }

  if (process.env.SECRET_ACCESS_KEY) {
    SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
  } else {
    throw new Error("SECRET_ACCESS_KEY not set as environment variable");
  }

  if (process.env.WINDOW_SIZE_MINUTES) {
    WINDOW_SIZE_MINUTES = process.env.WINDOW_SIZE_MINUTES;
  } else {
    throw new Error("WINDOW_SIZE_MINUTES not set as environment variable");
  }

  if (process.env.SIGNUP_REQ_PER_WINDOW) {
    SIGNUP_REQ_PER_WINDOW = process.env.SIGNUP_REQ_PER_WINDOW;
  } else {
    throw new Error("SIGNUP_REQ_PER_WINDOW not set as environment variable");
  }

  if (process.env.LOGIN_REQ_PER_WINDOW) {
    LOGIN_REQ_PER_WINDOW = process.env.LOGIN_REQ_PER_WINDOW;
  } else {
    throw new Error("LOGIN_REQ_PER_WINDOW not set as environment variable");
  }

  if (process.env.FETCH_REQ_PER_WINDOW) {
    FETCH_REQ_PER_WINDOW = process.env.FETCH_REQ_PER_WINDOW;
  } else {
    throw new Error("FETCH_REQ_PER_WINDOW not set as environment variable");
  }
  if (process.env.UPDATE_REQ_PER_WINDOW) {
    UPDATE_REQ_PER_WINDOW = process.env.UPDATE_REQ_PER_WINDOW;
  } else {
    throw new Error("UPDATE_REQ_PER_WINDOW not set as environment variable");
  }
};

export {
  JWT_SECRET,
  BCRYPT_COST,
  BACKEND_PORT,
  MONGO_URI,
  BUCKET_NAME,
  BUCKET_REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  WINDOW_SIZE_MINUTES,
  SIGNUP_REQ_PER_WINDOW,
  LOGIN_REQ_PER_WINDOW,
  FETCH_REQ_PER_WINDOW,
  UPDATE_REQ_PER_WINDOW,
};
