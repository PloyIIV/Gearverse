import mongoose, { Schema } from "mongoose";

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hex_code: {
        type: String,
        required: true
    },
    product_id: { type: Schema.ObjectId, ref: "Product" },
}, {
    timestamps: true,
});

export const Color = mongoose.model("Color", colorSchema);