import jwt, { Secret } from "jsonwebtoken";

require("dotenv").config();

interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

export const generateToken = (userId: string) => {
  // Generate the token with the payload
  const token = jwt.sign({ userId }, process.env.SECRET_KEY as Secret, {
    expiresIn: "1h",
  });

  return token;
};
