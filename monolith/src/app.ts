import express, { Express } from "express";
import * as swaggerDocument from "../public/swagger.json";
import swaggerUi from "swagger-ui-express";
import authRoute from "./routes/auth.route";
import errorHandler from "./middlewares/errorHandler";
import session from 'express-session'; // Import directly if not using separate config
import sessionConfig from '../src/middlewares/sessionConfig';
import eventRoute from "./routes/event/event.route";


const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(session(sessionConfig));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", authRoute);
app.use("/api/event",eventRoute);

app.use(errorHandler);

export default app;
