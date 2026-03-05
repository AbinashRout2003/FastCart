import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

import { connectCloudinary } from "./config/cloudinary.js";

const app = express();

// Initialize DB and Cloudinary gracefully
const initializeServices = async () => {
  try {
    await connectCloudinary();
    connectDB();
  } catch (error) {
    console.error("Initialization Failed:", error);
  }
};
initializeServices();
// allow multiple origins

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000"
];
//middlewares
app.use(cors({
  origin: function (origin, callback) {
    const isLocalhost = !origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
    const isVercel = origin && (origin.endsWith('.vercel.app') || origin === process.env.FRONTEND_URL);

    if (isLocalhost || isVercel || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Api endpoints
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running on Vercel");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
