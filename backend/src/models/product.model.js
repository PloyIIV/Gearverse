import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // username: { type: String, required: true, unique: true },
    // password: { type: String, required: true, select: false },
    // email: { type: String, unique: true, lowercase: true }
}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema)