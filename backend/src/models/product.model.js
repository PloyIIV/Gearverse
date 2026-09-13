import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema();

export const Product = mongoose.model("Product", productSchema);

// subcategory_id: { type: Schema.ObjectId },
// manufacturer_id: { type: Schema.ObjectId },
