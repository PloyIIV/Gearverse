import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    orderitem_id: { type: Schema.ObjectId, ref: "OrderItem" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

export const Review = mongoose.model("Review", reviewSchema);
