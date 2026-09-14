import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_name: { 
        type: String, 
        required: [true, "Category name is required"], 
        unique: true,
        trim: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    image: { 
        type: String, 
        default: "" 
    }
}, {
    timestamps: true
});

export const Category = mongoose.model("Category", categorySchema);
