import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined");

    if (mongoose.connection.readyState >= 1) {
      console.log("Using existing MongoDB connection");
      return;
    }

    console.log("Attempting to connect to MongoDB...");

    // Only set DNS if not on Vercel
    if (!process.env.VERCEL) {
      try {
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
      } catch (e) {
        console.log("DNS setServers failed (ignoring):", e.message);
      }
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB connected..");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};