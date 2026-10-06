const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./Product");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("MongoDB URI loaded:", !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
})
.then(() => {
    console.log("✅ MongoDB connected successfully!");
})
.catch((error) => {
    console.log("❌ MongoDB connection failed:");
    console.log(error.message);
});

app.get("/", (req, res) => {
    res.send("🔥 My Business Server is Running!");
});


// 👇 PUT THE PRODUCT CODE HERE

app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Error adding product",
            error: error.message
        });
    }
});


app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error getting products",
            error: error.message
        });
    }
});
app.delete("/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            product: deletedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
});


// 👇 app.listen MUST come after the routes

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});