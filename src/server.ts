import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Mongoose } from "mongoose";
import Redis from "ioredis";

import seedDatabase from "@src/seeder/seeder";
import { connectDb, disconnectDb } from "@src/db";
import { connectRedis, disconnectRedis } from "@src/redis";

import { router as userRouter } from "@src/routes/user-routes";
import { router as mailRouter } from "@src/routes/mail-routes";
import { router as authRouter } from "@src/routes/auth-routes";
import { populateBlackList } from "./utils/auth-utils";

dotenv.config();

const app: Application = express();
const port = parseInt(process.env.LOCALHOST_SERVER_PORT || "3000");

let mongoClient: Mongoose | undefined;
export let redisClient: Redis | undefined;
export let tokensBlacklist = new Set<string>();

const server = app.listen(port, async () => {
  console.log(`[express]: Server is running at http://localhost: ${port}`);

  mongoClient = await connectDb();
  redisClient = connectRedis();

  seedDatabase();

  await populateBlackList(tokensBlacklist);

  app.use(bodyParser.json());
  app.use("/user", userRouter);
  app.use("/mail", mailRouter);
  app.use("/auth", authRouter);
});

//Graceful shut-down server
process.on("SIGINT", () => {
  console.log("[express] Server is shutting down...");

  if (mongoClient) {
    disconnectDb(mongoClient);
  }

  if (redisClient) {
    disconnectRedis(redisClient);
  }

  server.close(() => {
    console.log("[express] Server has been shut down.");
    process.exit(0);
  });
});
