import { Router } from "express";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const data = await User.find();
    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "firstname, lastname, email and password are required!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ firstname, lastname, email, password: newPassword });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "can not create user!" });
    }
    return res
      .status(201)
      .json({ success: true, message: "created user successfully!" });
  } catch (error) {
    next(error);
  }
});
