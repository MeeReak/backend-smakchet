import express , { Express }from "express";
import monolithRoute from "./routes/monolith.route";
import * as swaggerDocument from '../public/swagger.json'
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/monolith-health",monolithRoute)

export default app;