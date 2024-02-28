import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(
      `mongodb://localhost:${process.env.LOCALHOST_DB_PORT}/scheduler-app-database`
    );
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
