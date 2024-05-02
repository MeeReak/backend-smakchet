import express from "express";
import getConfig from "./utils/createConfig";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import AuthRoute from "./routes/v1/user.routes";
import { errorHandler } from "./middlewares/error-handler";

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

//routes
app.use("/v1/auth", AuthRoute);

// ========================
// Global Error Handler
// ========================
app.use(errorHandler);

export default app;
