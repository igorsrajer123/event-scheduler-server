import { Request, Response } from "express";

import { tokensBlacklist } from "@src/server";
import { User } from "@src/types/user-types";
import {
  addTokensToBlacklist,
  generateAuthToken,
  invalidateAuthTokens,
} from "@src/utils/auth-utils";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req: Request, res: Response) => {
  try {
    const user: User = res.locals.user;
    const { email, password } = req.body;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const accessToken = generateAuthToken({ id: user.id, email });
    const refreshToken = generateAuthToken({ id: user.id, email }, true);

    invalidateAuthTokens(user.id, tokensBlacklist);
    addTokensToBlacklist(tokensBlacklist, accessToken, refreshToken);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const refreshAccessToken = (req: Request, res: Response) => {
  try {
    const oldRefreshToken = req.body.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({ message: "Refresh token is required." });
    }

    if (!tokensBlacklist.has(oldRefreshToken)) {
      return res.status(401).json({ message: "Access token is revoked." });
    }

    jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: any, decoded: { [key: string]: any }) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token." });
        }

        const accessToken = generateAuthToken(decoded);
        const refreshToken = generateAuthToken(decoded, true);

        invalidateAuthTokens(decoded.id, tokensBlacklist);
        addTokensToBlacklist(tokensBlacklist, accessToken, refreshToken);

        return res.status(200).json({ accessToken, refreshToken });
      }
    );
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const me = (req: Request, res: Response) => {
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

        const { id, email } = decoded;
        return res.status(200).json({ id, email });
      }
    );
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const signOut = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is required" });
    }

    if (!tokensBlacklist.has(accessToken!)) {
      return res.status(401).json({ message: "Access token is revoked" });
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, decoded: { [key: string]: any }) => {
        if (err) {
          return res.status(403).json({ message: "Invalid access token." });
        }

        invalidateAuthTokens(decoded.id, tokensBlacklist);

        return res
          .status(200)
          .json({ message: "User logged out successfully." });
      }
    );
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { signIn, signOut, me, refreshAccessToken };
