import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
