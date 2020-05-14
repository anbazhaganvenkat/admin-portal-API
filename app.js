import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import multiparty from "connect-multiparty";

dotenv.config();

// routes
import rootRoute from "./routes";
import user from "./routes/user";
import admin from "./routes/admin";


// initialize app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// middleware for handling multipart/form-data
app.use(multiparty());

// cors support
app.use(cors());

// add compression
app.use(compression());

// logs
app.use(logger("dev"));

// cookie support
app.use(cookieParser());

// apply routes
app.use("/", rootRoute);

// user Route
app.use(`/v1/user`, user);
app.use(`/v1/admin`, admin);


// Healthz Route
app.get("/healthz", (req, res) => {
    res.send("ok");
});

export default app;
