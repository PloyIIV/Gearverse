import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, require: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, unique: true, lowercase: true },
    firstname: { type: String },
    lastname: { type: String },
    phone_number: { type: Number },
    role: { type: String },
    address: [String],
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
