import { Request, Response, NextFunction } from "express";
import { tokensBlacklist } from "@src/server";

const jwt = require("jsonwebtoken");

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is required." });
    }

    if (!tokensBlacklist.has(accessToken!)) {
      return res.status(401).json({ message: "Access token is revoked." });
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, decoded: { [key: string]: any }) => {
        if (err) {
          return res.status(403).json({ message: "Invalid access token." });
        }
        res.locals.decoded = decoded;
        next();
      }
    );
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { authenticateToken };
