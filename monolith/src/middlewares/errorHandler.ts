import { Request, Response, NextFunction } from "express";

// Global error handler middleware
function errorHandler(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Default to 500 if no status code is set
  const statusCode = err.statusCode || 500;
  // Send error response to client
  res.status(statusCode).json({
    statusCode,
    message: err.message,
  });
}

export default errorHandler;
