import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

export default (app: Application) => {
  // Middleware to parse JSON bodies
  app.use(bodyParser.json());

  // Error handling middleware
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);

    // Check if the error is a Mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    next(err);

    // Send a generic error response
    res.status(500).json({ error: "Something went wrong!" });
  });
};
