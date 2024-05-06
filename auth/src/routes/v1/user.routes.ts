import { UserController } from "@api-gateway/controllers/auth.controller";
import { StatusCode } from "@api-gateway/utils/consts";
import express, { Request, Response, NextFunction } from "express";
import { UserSignUpSchema } from "@api-gateway/schema/userSchema";
import { ROUTE_PATHS } from "./route-defs";
import { validateInput } from "@api-gateway/middlewares/validate-input";

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

AuthRoute.get(
  ROUTE_PATHS.AUTH.VERIFY,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const controller = new UserController();

      await controller.VerifyEmail(req.query.token as string);
      res.status(StatusCode.Accepted).json({ message: "Succues" });
    } catch (error: unknown) {
      _next(error);
    }
  }
);

AuthRoute.get(
  ROUTE_PATHS.AUTH.LOGIN,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const controller = new UserController();
      await controller.LoginWithEmail(req.body);
      res.status(StatusCode.Created).json({ message: "Succues" });
    } catch (error: unknown) {
      _next(error);
    }
  }
);

AuthRoute.get(
  ROUTE_PATHS.AUTH.GOOGLE,
  async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const controller = new UserController();
      const url = await controller.GoogleAuth();
      res.redirect(url);
    } catch (error: unknown) {
      _next(error);
    }
  }
);

AuthRoute.get(
  ROUTE_PATHS.AUTH.GOOGLE_CALLBACK,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const controller = new UserController();

      await controller.GoogleAuthCallback(req.query.code as string);
      res.status(StatusCode.Accepted).json({ message: "Succues" });
    } catch (error: unknown) {
      _next(error);
    }
  }
);

AuthRoute.get(
  ROUTE_PATHS.AUTH.FACEBOOK,
  async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const controller = new UserController();
      const url = await controller.FacebookAuth();
      res.redirect(url);
    } catch (error: unknown) {
      _next(error);
    }
  }
);

AuthRoute.get("/facebook/callback", async (req: Request, res: Response) => {
  try {
    const controller = new UserController();
    await controller.FacebookAuthCallback(req.query.code as string);
    res.status(StatusCode.Created).json("Success");
  } catch (error: unknown) {
    res.status(StatusCode.InternalServerError).json({ message: "Failed" });
  }
});

export default AuthRoute;
