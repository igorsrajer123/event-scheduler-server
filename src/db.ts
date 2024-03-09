import mongoose, { Mongoose } from "mongoose";

export const connectDb = () => {
  try {
    const mongoClient = mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("[mongo]: MongoDB connected.");

    return mongoClient;
  } catch (error) {
    console.error("[mongo]: MongoDB connection error:", error);
  }
};

export const disconnectDb = (mongoClient: Mongoose) => {
  try {
    mongoClient.connection.close();
    console.log("[mongo]: Closing MongoDB connection...");
  } catch (error) {
    console.error("[mongo]: Error closing MongoDB connection:", error);
  }
};
