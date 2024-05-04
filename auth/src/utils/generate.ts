import APIError from "@api-gateway/Errors/api-error";
import { privateKey } from "@api-gateway/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new APIError("Unable to generate password");
  }
};

export const generateToken = async (id: string, username: string) => {
  // JWT payload containing user information
  const payload = {
    userId: id,
    username: username,
  };

  // JWT options: expiresIn specifies the token's expiration time (e.g., 1 hour)
  const options = {
    expiresIn: "1h",
  };

  // Generate and return the JWT
  const token = jwt.sign(payload, privateKey, options);
  return token;
};
