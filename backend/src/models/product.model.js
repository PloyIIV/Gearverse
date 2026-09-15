import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    product_name: { 
        type: String, 
        required: [true, "Product name is required"], 
        trim: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    price: { 
        type: Number, 
        required: [true, "Price is required"], 
        min: [0, "Price cannot be negative"] 
    },
    stock: { 
        type: Number, 
        default: 0, 
        min: [0, "Stock cannot be negative"] 
    },
    category_id: { 
        type: Schema.ObjectId, 
        ref: "Category",
        default: null
    },
    subcategory_id: { 
        type: Schema.ObjectId,
        ref: "SubCategory",
        default: null
    },
    manufacturer_id: { 
        type: Schema.ObjectId,
        default: null 
    },
    category: { 
        type: String, 
        default: "" 
    },
    tags: [{ type: String }],
    date: {
        type: Date,
        default: null
    },
    connectivity_type: { 
        type: String, 
        default: "" 
    },
    weight: { 
        type: Number, 
        default: 0 
    },
    image: { 
        type: mongoose.Schema.Types.Mixed, 
        default: "" 
    },
    is_active: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true
});

export const Product = mongoose.model("Product", productSchema);
