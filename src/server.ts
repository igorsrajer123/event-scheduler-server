const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user-routes");

const connectDB = require("./db");

dotenv.config();

const app = express();
const port = process.env.LOCALHOST_SERVER_PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost: ${port}`);
});

connectDB();

app.use("/user", userRoutes);
