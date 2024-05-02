import { UserController } from "@api-gateway/controllers/auth.controller";
import { StatusCode } from "@api-gateway/utils/consts";
import express, { Request, Response, NextFunction } from "express";
import { ROUTE_PATHS } from "./route-defs";
import { validateInput } from "@api-gateway/middlewares/validate-input";
import { UserSignUpSchema } from "@api-gateway/schema/user.schema";

const AuthRoute = express.Router();

AuthRoute.post(
  ROUTE_PATHS.AUTH.SIGN_UP,
  validateInput(UserSignUpSchema),
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const controller = new UserController();
      const user = await controller.SignUpWithEmail(req.body);
      res.status(StatusCode.Created).json(user);
    } catch (error: unknown) {
      _next(error);
    }
  }
);

export default AuthRoute;
