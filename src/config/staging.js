import dotenv from "dotenv";
dotenv.config();

export const staging = {
  mongodb_connection_url: process.env.STAGING_MONGODB_CONNECTION_URL,
  bcrypt_salt_round: +process.env.STAGING_BCRYPT_SALT_ROUND,
  jwt_key: process.env.STAGING_JWT_KEY,
  port: +process.env.PORT
};
