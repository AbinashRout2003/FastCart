import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

// Hardcoded images mapped to Cloudinary URLs or local paths since actual file imports won't work in a raw node script
const imageMap = {
    potato_image_1: "potato_image_1.png",
    tomato_image: "tomato_image.png",
    carrot_image: "carrot_image.png",
    spinach_image_1: "spinach_image_1.png",
    onion_image_1: "onion_image_1.png",
    apple_image: "apple_image.png",
    orange_image: "orange_image.png",
    banana_image_1: "banana_image_1.png",
    mango_image_1: "mango_image_1.png",
    grapes_image_1: "grapes_image_1.png",
    amul_milk_image: "amul_milk_image.png",
    paneer_image: "paneer_image.png",
    eggs_image: "eggs_image.png",
    paneer_image_2: "paneer_image_2.png",
    cheese_image: "cheese_image.png",
    coca_cola_image: "coca_cola_image.png",
    pepsi_image: "pepsi_image.png",
    sprite_image_1: "sprite_image_1.png",
    fanta_image_1: "fanta_image_1.png",
    seven_up_image_1: "seven_up_image_1.png",
    basmati_rice_image: "basmati_rice_image.png",
    wheat_flour_image: "wheat_flour_image.png",
    quinoa_image: "quinoa_image.png",
    brown_rice_image: "brown_rice_image.png",
    barley_image: "barley_image.png",
    brown_bread_image: "brown_bread_image.png",
    butter_croissant_image: "butter_croissant_image.png",
    chocolate_cake_image: "chocolate_cake_image.png",
    whole_wheat_bread_image: "whole_wheat_bread_image.png",
    vanilla_muffins_image: "vanilla_muffins_image.png",
    maggi_image: "maggi_image.png",
    top_ramen_image: "top_ramen_image.png",
    knorr_soup_image: "knorr_soup_image.png",
    yippee_image: "yippee_image.png",
    maggi_oats_image: "maggi_oats_image.png"
};

const dummyProducts = [
    // Vegetables
    {
        name: "Potato 500g",
        category: "Vegetables",
        price: 25,
        offerPrice: 20,
        image: [imageMap.potato_image_1],
        description: [
            "Fresh and organic",
            "Rich in carbohydrates",
            "Ideal for curries and fries",
        ],
        inStock: true,
    },
    {
        name: "Tomato 1 kg",
        category: "Vegetables",
        price: 40,
        offerPrice: 35,
        image: [imageMap.tomato_image],
        description: [
            "Juicy and ripe",
            "Rich in Vitamin C",
            "Perfect for salads and sauces",
            "Farm fresh quality",
        ],
        inStock: true,
    },
    {
        name: "Carrot 500g",
        category: "Vegetables",
        price: 30,
        offerPrice: 28,
        image: [imageMap.carrot_image],
        description: [
            "Sweet and crunchy",
            "Good for eyesight",
            "Ideal for juices and salads",
        ],
        inStock: true,
    },
    {
        name: "Spinach 500g",
        category: "Vegetables",
        price: 18,
        offerPrice: 15,
        image: [imageMap.spinach_image_1],
        description: [
            "Rich in iron",
            "High in vitamins",
            "Perfect for soups and salads",
        ],
        inStock: true,
    },
    {
        name: "Onion 500g",
        category: "Vegetables",
        price: 22,
        offerPrice: 19,
        image: [imageMap.onion_image_1],
        description: [
            "Fresh and pungent",
            "Perfect for cooking",
            "A kitchen staple",
        ],
        inStock: true,
    },

    // Fruits
    {
        name: "Apple 1 kg",
        category: "Fruits",
        price: 120,
        offerPrice: 110,
        image: [imageMap.apple_image],
        description: [
            "Crisp and juicy",
            "Rich in fiber",
            "Boosts immunity",
            "Perfect for snacking and desserts",
            "Organic and farm fresh",
        ],
        inStock: true,
    },
    {
        name: "Orange 1 kg",
        category: "Fruits",
        price: 80,
        offerPrice: 75,
        image: [imageMap.orange_image],
        description: [
            "Juicy and sweet",
            "Rich in Vitamin C",
            "Perfect for juices and salads",
        ],
        inStock: true,
    },
    {
        name: "Banana 1 kg",
        category: "Fruits",
        price: 50,
        offerPrice: 45,
        image: [imageMap.banana_image_1],
        description: [
            "Sweet and ripe",
            "High in potassium",
            "Great for smoothies and snacking",
        ],
        inStock: true,
    },
    {
        name: "Mango 1 kg",
        category: "Fruits",
        price: 150,
        offerPrice: 140,
        image: [imageMap.mango_image_1],
        description: [
            "Sweet and flavorful",
            "Perfect for smoothies and desserts",
            "Rich in Vitamin A",
        ],
        inStock: true,
    },
    {
        name: "Grapes 500g",
        category: "Fruits",
        price: 70,
        offerPrice: 65,
        image: [imageMap.grapes_image_1],
        description: [
            "Fresh and juicy",
            "Rich in antioxidants",
            "Perfect for snacking and fruit salads",
        ],
        inStock: true,
    },

    // Dairy
    {
        name: "Amul Milk 1L",
        category: "Dairy",
        price: 60,
        offerPrice: 55,
        image: [imageMap.amul_milk_image],
        description: [
            "Pure and fresh",
            "Rich in calcium",
            "Ideal for tea, coffee, and desserts",
            "Trusted brand quality",
        ],
        inStock: true,
    },
    {
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: [imageMap.paneer_image],
        description: [
            "Soft and fresh",
            "Rich in protein",
            "Ideal for curries and snacks",
        ],
        inStock: true,
    },
    {
        name: "Eggs 12 pcs",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: [imageMap.eggs_image],
        description: [
            "Farm fresh",
            "Rich in protein",
            "Ideal for breakfast and baking",
        ],
        inStock: true,
    },
    {
        name: "Cheese 200g",
        category: "Dairy",
        price: 140,
        offerPrice: 130,
        image: [imageMap.cheese_image],
        description: [
            "Creamy and delicious",
            "Perfect for pizzas and sandwiches",
            "Rich in calcium",
        ],
        inStock: true,
    },

    // Drinks
    {
        name: "Coca-Cola 1.5L",
        category: "Drinks",
        price: 80,
        offerPrice: 75,
        image: [imageMap.coca_cola_image],
        description: [
            "Refreshing and fizzy",
            "Perfect for parties and gatherings",
            "Best served chilled",
        ],
        inStock: true,
    },
    {
        name: "Pepsi 1.5L",
        category: "Drinks",
        price: 78,
        offerPrice: 73,
        image: [imageMap.pepsi_image],
        description: [
            "Chilled and refreshing",
            "Perfect for celebrations",
            "Best served cold",
        ],
        inStock: true,
    },
    {
        name: "Sprite 1.5L",
        category: "Drinks",
        price: 79,
        offerPrice: 74,
        image: [imageMap.sprite_image_1],
        description: [
            "Refreshing citrus taste",
            "Perfect for hot days",
            "Best served chilled",
        ],
        inStock: true,
    },
    {
        name: "Fanta 1.5L",
        category: "Drinks",
        price: 77,
        offerPrice: 72,
        image: [imageMap.fanta_image_1],
        description: [
            "Sweet and fizzy",
            "Great for parties and gatherings",
            "Best served cold",
        ],
        inStock: true,
    },
    {
        name: "7 Up 1.5L",
        category: "Drinks",
        price: 76,
        offerPrice: 71,
        image: [imageMap.seven_up_image_1],
        description: [
            "Refreshing lemon-lime flavor",
            "Perfect for refreshing",
            "Best served chilled",
        ],
        inStock: true,
    },

    // Grains
    {
        name: "Basmati Rice 5kg",
        category: "Grains",
        price: 550,
        offerPrice: 520,
        image: [imageMap.basmati_rice_image],
        description: [
            "Long grain and aromatic",
            "Perfect for biryani and pulao",
            "Premium quality",
        ],
        inStock: true,
    },
    {
        name: "Wheat Flour 5kg",
        category: "Grains",
        price: 250,
        offerPrice: 230,
        image: [imageMap.wheat_flour_image],
        description: [
            "High-quality whole wheat",
            "Soft and fluffy rotis",
            "Rich in nutrients",
        ],
        inStock: true,
    },
    {
        name: "Organic Quinoa 500g",
        category: "Grains",
        price: 450,
        offerPrice: 420,
        image: [imageMap.quinoa_image],
        description: [
            "High in protein and fiber",
            "Gluten-free",
            "Rich in vitamins and minerals",
        ],
        inStock: true,
    },
    {
        name: "Brown Rice 1kg",
        category: "Grains",
        price: 120,
        offerPrice: 110,
        image: [imageMap.brown_rice_image],
        description: [
            "Whole grain and nutritious",
            "Helps in weight management",
            "Good source of magnesium",
        ],
        inStock: true,
    },
    {
        name: "Barley 1kg",
        category: "Grains",
        price: 150,
        offerPrice: 140,
        image: [imageMap.barley_image],
        description: [
            "Rich in fiber",
            "Helps improve digestion",
            "Low in fat and cholesterol",
        ],
        inStock: true,
    },

    // Bakery
    {
        name: "Brown Bread 400g",
        category: "Bakery",
        price: 40,
        offerPrice: 35,
        image: [imageMap.brown_bread_image],
        description: [
            "Soft and healthy",
            "Made from whole wheat",
            "Ideal for breakfast and sandwiches",
        ],
        inStock: true,
    },
    {
        name: "Butter Croissant 100g",
        category: "Bakery",
        price: 50,
        offerPrice: 45,
        image: [imageMap.butter_croissant_image],
        description: [
            "Flaky and buttery",
            "Freshly baked",
            "Perfect for breakfast or snacks",
        ],
        inStock: true,
    },
    {
        name: "Chocolate Cake 500g",
        category: "Bakery",
        price: 350,
        offerPrice: 325,
        image: [imageMap.chocolate_cake_image],
        description: [
            "Rich and moist",
            "Made with premium cocoa",
            "Ideal for celebrations and parties",
        ],
        inStock: true,
    },
    {
        name: "Whole Bread 400g",
        category: "Bakery",
        price: 45,
        offerPrice: 40,
        image: [imageMap.whole_wheat_bread_image],
        description: [
            "Healthy and nutritious",
            "Made with whole wheat flour",
            "Ideal for sandwiches and toast",
        ],
        inStock: true,
    },
    {
        name: "Vanilla Muffins 6 pcs",
        category: "Bakery",
        price: 100,
        offerPrice: 90,
        image: [imageMap.vanilla_muffins_image],
        description: [
            "Soft and fluffy",
            "Perfect for a quick snack",
            "Made with real vanilla",
        ],
        inStock: true,
    },

    // Instant
    {
        name: "Maggi Noodles 280g",
        category: "Instant",
        price: 55,
        offerPrice: 50,
        image: [imageMap.maggi_image],
        description: [
            "Instant and easy to cook",
            "Delicious taste",
            "Popular among kids and adults",
        ],
        inStock: true,
    },
    {
        name: "Top Ramen 270g",
        category: "Instant",
        price: 45,
        offerPrice: 40,
        image: [imageMap.top_ramen_image],
        description: [
            "Quick and easy to prepare",
            "Spicy and flavorful",
            "Loved by college students and families",
        ],
        inStock: true,
    },
    {
        name: "Knorr Cup Soup 70g",
        category: "Instant",
        price: 35,
        offerPrice: 30,
        image: [imageMap.knorr_soup_image],
        description: [
            "Convenient for on-the-go",
            "Healthy and nutritious",
            "Variety of flavors",
        ],
        inStock: true,
    },
    {
        name: "Yippee Noodles 260g",
        category: "Instant",
        price: 50,
        offerPrice: 45,
        image: [imageMap.yippee_image],
        description: [
            "Non-fried noodles for healthier choice",
            "Tasty and filling",
            "Convenient for busy schedules",
        ],
        inStock: true,
    },
    {
        name: "Oats Noodles 72g",
        category: "Instant",
        price: 40,
        offerPrice: 35,
        image: [imageMap.maggi_oats_image],
        description: [
            "Healthy alternative with oats",
            "Good for digestion",
            "Perfect for breakfast or snacks",
        ],
        inStock: true,
    }
];

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        // Remove existing products
        await Product.deleteMany({});
        console.log("Cleared existing products from database.");

        // Insert dummy products
        await Product.insertMany(dummyProducts);
        console.log(`Successfully seeded ${dummyProducts.length} dummy products!`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
