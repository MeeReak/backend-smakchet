import express, { Express } from "express";
import monolithRoute from "./routes/monolith.route";
import * as swaggerDocument from "../public/swagger.json";
import swaggerUi from "swagger-ui-express";
import { sendVerificationEmail } from "./utils/emailConfig";
import { authController } from "./controllers/auth.controller";
import authRoute from "./routes/auth.route";
import errorHandler from "./middlewares/errorHandler";
import session from 'express-session'; // Import directly if not using separate config
import sessionConfig from '../src/middlewares/sessionConfig';
import googleRoute from "./routes/google.route";


const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(session(sessionConfig));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/monolith-health", monolithRoute);
app.use("/", authRoute);

app.use(errorHandler);


export default app;
