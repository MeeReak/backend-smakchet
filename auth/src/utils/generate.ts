import { privateKey } from "@api-gateway/server";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import getConfig from "./createConfig";

export const generateVerifyToken = async () => {
  try {
    return randomBytes(32).toString("hex");
  } catch (error: unknown) {
    throw error;
  }
};

export const generateToken = async (id: string, username: string) => {
  try {
    // JWT payload containing user information
    const payload = {
      userId: id,
      username: username,
    };

    // Generate and return the JWT
    const token = jwt.sign(payload, privateKey, {
      expiresIn: parseInt(getConfig().jwtExpiresIn!),
      algorithm: "RS256",
    });

    return token;
  } catch (error: unknown) {
    throw error;
  }
};
