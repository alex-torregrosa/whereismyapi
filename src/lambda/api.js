import express from "express";
import serverless from "serverless-http";
import mountRoutes from "./routes";
const app = express();

app.use(express.json()); // for parsing application/json
mountRoutes(app);

export const handler = serverless(app);
