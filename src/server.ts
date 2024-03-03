import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDB from "@src/db";

import { router as userRouter } from "@src/routes/user-routes";
import { router as mailRouter } from "@src/routes/mail-routes";

dotenv.config();

const app: Application = express();
const port = parseInt(process.env.LOCALHOST_SERVER_PORT || "3000");

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost: ${port}`);
});

connectDB();

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/mail", mailRouter);
