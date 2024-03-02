import express, { Application } from "express";
import dotenv from "dotenv";

import connectDB from "@src/db";
import applyMiddleware from "@src/middleware";
import MailSender from "@src/mail-sender";

import { router as userRouter } from "@src/routes/user-routes";

dotenv.config();

const app: Application = express();
const port = parseInt(process.env.LOCALHOST_SERVER_PORT || "3000");

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost: ${port}`);
});

connectDB();
applyMiddleware(app);

app.use("/user", userRouter);

export const mailSender = MailSender(
  `${process.env.EMAIL_APP_ACCOUNT}`,
  `${process.env.EMAIL_APP_PASSWORD}`
);
