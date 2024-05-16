import jwt, { JwtPayload } from "jsonwebtoken";

export const decodedToken = async (token: string) => {
  try {
    const data = await jwt.decode(token)as JwtPayload;
    return data.payload;
  } catch (error: unknown) {
    throw error;
  }
};
