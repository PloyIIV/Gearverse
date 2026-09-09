import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    product_name: { type: String },
    description: { type: String },
    category_id: { type: Schema.ObjectId },
    subcategory_id: { type: Schema.ObjectId },
    manufacturer_id: { type: Schema.ObjectId },
    price: { type: Number },
    stock: { type: Number }
}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema)