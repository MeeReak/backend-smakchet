import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { urlencoded } from "body-parser";
import getConfig from "./utils/config";
import loggerMiddleware from "./middlewares/logger-handler";
import { RegisterRoutes } from "./routes/v1/routes";
import * as swaggerDocument from "../public/swagger.json";
import swaggerUi from "swagger-ui-express";

const app = express();

// Get the Configs
const config = getConfig(process.env.NODE_ENV);

// =======================
// Security Middlewares
// =======================
app.set("trust proxy", 1);
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: config.apiGatewayUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// =======================
// Standard Middleware
// =======================
app.use(compression());
app.use(express.json({ limit: "200mb" }));
app.use(urlencoded({ extended: true, limit: "200mb" }));
app.use(express.static("public"));
app.use(loggerMiddleware);

// ========================
// Global API V1
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// user Route
RegisterRoutes(app);

// ========================
// Global Error Handler
// ========================
app.use(errorHandler);

export default app;
