import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },
    product_name: { 
        type: String, 
        default: "" 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: [1, "Quantity must be at least 1"], 
        default: 1 
    },
    unit_price: { 
        type: Number, 
        required: true, 
        default: 0 
    }
}, { _id: true });

const orderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: [true, "User ID is required"] 
    },
    order_number: { 
        type: String, 
        default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}` 
    },
    items: [orderItemSchema],
    total_price: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    total_quantity: { 
        type: Number, 
        default: 0 
    },
    status: { 
        type: String, 
        enum: ["pending", "paid", "shipped", "completed", "cancelled"], 
        default: "pending" 
    },
    shipping_address: { 
        type: String, 
        default: "" 
    },
    payment_method: { 
        type: String, 
        default: "" 
    }
}, {
    timestamps: true
});

export const Order = mongoose.model("Order", orderSchema);