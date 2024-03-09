import { redisClient } from "@src/server";

const jwt = require("jsonwebtoken");

export const generateAuthToken = (
  payload: { [key: string]: any },
  isRefreshToken?: boolean
) => {
  payload.timestamp = Date.now();

  return jwt.sign(
    payload,
    isRefreshToken
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET,
    isRefreshToken
      ? null
      : {
          expiresIn: "1h",
        }
  );
};

export const invalidateAuthTokens = async (
  userId: string,
  tokenBlacklist: Set<string>
) => {
  for (const token of tokenBlacklist) {
    const decodedToken = jwt.decode(token);

    if (decodedToken && decodedToken.id === userId) {
      tokenBlacklist.delete(token);
    }
  }
  await redisClient?.set("tokenBlacklist", JSON.stringify([...tokenBlacklist]));
};

export const addTokensToBlacklist = async (
  tokenBlacklist: Set<string>,
  accessToken: string,
  refreshToken: string
) => {
  tokenBlacklist.add(accessToken);
  tokenBlacklist.add(refreshToken);

  await redisClient?.set("tokenBlacklist", JSON.stringify([...tokenBlacklist]));
};

export const populateBlackList = async (tokenBlacklist: Set<string>) => {
  const data = await redisClient?.get("tokenBlacklist");

  if (data) {
    JSON.parse(data).forEach((item: any) => tokenBlacklist.add(item));
  }

  return tokenBlacklist;
};
