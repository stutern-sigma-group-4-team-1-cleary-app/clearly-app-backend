import dotenv from "dotenv";
dotenv.config();

export const production = {
  mongodb_connection_url: process.env.PRODUCTION_MONGODB_CONNECTION_URL,
  bcrypt_salt_round: +process.env.PRODUCTION_BCRYPT_SALT_ROUND,
  jwt_key: process.env.PRODUCTION_JWT_KEY,
  port: +process.env.PORT
};
