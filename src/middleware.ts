import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

export default (app: Application) => {
  // Middleware to parse JSON bodies
  app.use(bodyParser.json());
};
