import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';

import dns from 'dns';
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({}).limit(5);
        console.log('--- Product Samples ---');
        products.forEach(p => {
            console.log(`Name: ${p.name}`);
            console.log(`Images: ${JSON.stringify(p.image)}`);
            console.log('---');
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkProducts();
