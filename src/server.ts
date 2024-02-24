import { Request, Response } from "express";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.LOCALHOST_SERVER_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Goca madjija voli bureka a voli i pojesti slatko!!!!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost: ${port}`);
  console.log(process.env);
});
