import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

import dns from "node:dns";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Product.countDocuments();
        const products = await Product.find({}, { name: 1, inStock: 1 });
        console.log(`Total Products in DB: ${count}`);
        console.log("Products found:", products);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkDB();
