import dotenv from "dotenv";
dotenv.config();

export const development = {
  mongodb_connection_url: process.env.DEV_MONGODB_CONNECTION_URL,
  bcrypt_salt_round: +process.env.DEV_BCRYPT_SALT_ROUND,
  jwt_key: process.env.DEV_JWT_KEY,
  sentence_img_key: process.env.DEV_SENTENCE_IMG_KEY,
  port: +process.env.PORT
};
