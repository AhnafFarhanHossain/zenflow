import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/zenflow";

export const connectDB = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected successfully");
};
