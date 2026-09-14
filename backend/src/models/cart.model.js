import mongoose, { Schema } from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product_id: { type: String },
  product_name: { type: String, required: true },
  tag: { type: String },
  unit_price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  delivery: { type: String },
  image: { type: String },
}, { _id: true });

const shoppingCartSchema = new mongoose.Schema({
  user_id: { type: Schema.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["active", "checked_out"], default: "active" },
  items: [cartItemSchema],
}, {
  timestamps: true,
});

export const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);
