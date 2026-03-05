import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined");

    const maskedUri = uri.replace(/\/\/.*@/, "//<user:password>@");
    console.log("Attempting to connect to MongoDB:", maskedUri.split('@')[1] || maskedUri);

    // Optional: Only set DNS if not on Vercel or if explicitly needed
    try {
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
    } catch (e) {
      console.log("DNS setServers failed (ignoring):", e.message);
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB connected..");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // In serverless, it's often better to throw than to process.exit
    throw error;
  }
};