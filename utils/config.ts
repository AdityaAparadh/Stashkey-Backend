interface Config {
  BACKEND_PORT: string;
  JWT_SECRET: string;
  BCRYPT_COST: string;
  MONGO_URI: string;
  BUCKET_NAME: string;
  BUCKET_REGION: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  WINDOW_SIZE_MINUTES: string;
  SIGNUP_REQ_PER_WINDOW: string;
  LOGIN_REQ_PER_WINDOW: string;
  FETCH_REQ_PER_WINDOW: string;
  UPDATE_REQ_PER_WINDOW: string;
  AWS_ENDPOINT_URL: string;
}

/**
 * Helper function to retrieve and validate environment variables.
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is not set.
 */
const getEnvVariable = (key: keyof Config): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};

const config: Config = {
  BACKEND_PORT: getEnvVariable("BACKEND_PORT"),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  BCRYPT_COST: getEnvVariable("BCRYPT_COST"),
  MONGO_URI: getEnvVariable("MONGO_URI"),
  BUCKET_NAME: getEnvVariable("BUCKET_NAME"),
  BUCKET_REGION: getEnvVariable("BUCKET_REGION"),
  ACCESS_KEY_ID: getEnvVariable("ACCESS_KEY_ID"),
  SECRET_ACCESS_KEY: getEnvVariable("SECRET_ACCESS_KEY"),
  WINDOW_SIZE_MINUTES: getEnvVariable("WINDOW_SIZE_MINUTES"),
  SIGNUP_REQ_PER_WINDOW: getEnvVariable("SIGNUP_REQ_PER_WINDOW"),
  LOGIN_REQ_PER_WINDOW: getEnvVariable("LOGIN_REQ_PER_WINDOW"),
  FETCH_REQ_PER_WINDOW: getEnvVariable("FETCH_REQ_PER_WINDOW"),
  UPDATE_REQ_PER_WINDOW: getEnvVariable("UPDATE_REQ_PER_WINDOW"),
  AWS_ENDPOINT_URL: getEnvVariable("AWS_ENDPOINT_URL"),
};

export default config;
