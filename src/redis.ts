import Redis from "ioredis";

export const connectRedis = () => {
  try {
    const redisClient = new Redis();
    console.log(`[redis]: Redis is running...`);

    return redisClient;
  } catch (error) {
    console.error("[redis] Redis connection error:", error);
  }
};

export const disconnectRedis = (redisClient: Redis) => {
  try {
    redisClient.disconnect();
    console.log("[redis]: Closing Redis connection...");
  } catch (error) {
    console.error("[redis] Error closing Redis connection:", error);
  }
};
