import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected..");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};