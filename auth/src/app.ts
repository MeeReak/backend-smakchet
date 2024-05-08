import express, {  NextFunction, Request, Response } from "express";
import getConfig from "./utils/createConfig";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { RegisterRoutes } from "./routes/v1/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../public/swagger.json";

// Create express app
const app = express();

const config = getConfig();

// ===================
// Security Middleware
// ===================
app.set("trust proxy", 1);
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: config.apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// =======================
// Standard Middleware
// =======================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(express.static("public"));
app.use((_req: Request, _res: Response, _next: NextFunction) => {
  console.log(_req.path, _req.method);
  _next();
});

app.use(express.static("public"));
RegisterRoutes(app);

// serve your swagger.json file
app.get("/docs/swagger.json", (_req: Request, res: Response) => {
  res.sendFile("swagger.json", { root: "." });
});

//routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// Global Error Handler
// ========================
app.use(errorHandler);

export default app;
