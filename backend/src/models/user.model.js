import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" }
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);