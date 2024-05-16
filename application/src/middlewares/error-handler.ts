import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../utils/consts/status-code";
import BaseCustomError from "@application/errors/base-custom-error";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof BaseCustomError) {
    return res.status(err.getStatusCode()).json(err.serializeErrorOutput());
  }

  return res
    .status(StatusCode.InternalServerError)
    .json({ errors: [{ message: err.message }] });
};

export { errorHandler };
