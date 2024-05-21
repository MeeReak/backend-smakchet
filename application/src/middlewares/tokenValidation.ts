import { privateKey } from "@application/server";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, _res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    const decodedToken = jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as {
      userId: string;
    };



    req.userId = decodedToken.userId; // Attach userId to the request object

    next(); // If token is valid, continue to the next middleware or route handler
  } catch (error: any) {
    throw new Error(error.message); // Throw error for invalid token
  }
};
