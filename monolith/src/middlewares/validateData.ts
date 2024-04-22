import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

// Middleware function for validating user data using Zod schema
export const validateUserData = (ValidatinSchema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      ValidatinSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // If it's a ZodError, handle it properly
        const errorMessages = error.errors.map((err) => err.message); // Extract error messages
        const errorMessage = errorMessages.join(", ");
        next(new Error(errorMessage));
      } else {
        // If it's another type of error, handle it accordingly
        console.error("Unknown Error:", error); // Log the unknown error
        next(error);
      }
    }
  };
};
