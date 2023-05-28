import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export function genToken(user) {
  const payload = {
    email: user.email,
  };
  const token = jwt.sign(payload, config.jwt_key, { expiresIn: 60 * 60 * 24 });
  return token;
}

export function authToken(token) {
  return jwt, auth(token, config.jwt_key);
}

export async function verified(token) {
 const user = await jwt.verify(token, config.jwt_key);
 return user;
}
