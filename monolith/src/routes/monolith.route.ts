import express, { Request, Response } from "express";
import { MonolithController } from "../controllers/monolith.controller";

const monolithRoute = express.Router();
const monolithController = new MonolithController();

monolithRoute.get("/", (req: Request, res: Response) => {
  res.json({ message: 'Ok' });
});

export default monolithRoute;
