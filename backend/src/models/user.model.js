import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: { type: String, required: true, select: false },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      default: function () {
        // ดึงค่า email ปัจจุบันมาตัดเอาเฉพาะข้อความก่อนหน้า @
        if (this.email && this.email.includes("@")) {
          return this.email.split("@")[0];
        }
        return "";
      },
    },
    firstname: { type: String },
    lastname: { type: String },
    phoneNumber: { type: Number },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    address: [String],
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
