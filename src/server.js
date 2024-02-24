const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.LOCALHOST_SERVER_PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost: ${port}`);
  console.log(`[process]: ${process}`);
  console.log(`[process]: ${process}`);
});
