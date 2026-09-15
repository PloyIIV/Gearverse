import mongoose, { Schema } from "mongoose";
const switchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    switch_type: {
        type: String,
        required: true
    },
    product_id: { type: Schema.ObjectId, ref: "Product" },
}, {
    timestamps: true,
});

export const kbSwitch = mongoose.model("kbSwitch", switchSchema);