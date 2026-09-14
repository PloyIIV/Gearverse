import { Router } from "express";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const userRouter = Router();

const SORTABLE = ["name", "email", "createdAt", "updatedAt"];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

userRouter.get("/", async (req, res, next) => {
  try {
    const { name, email, address, sort = "createdAt", order = "asc" } = req.query;

    const filter = {};

    if (name) {
      const re = new RegExp(escapeRegex(String(name)), "i");
      filter.$or = [
        { username: re },
        { firstname: re },
        { lastname: re },
      ];
    }

    if (email) {
      filter.email = new RegExp(escapeRegex(String(email)), "i");
    }

    if (address) {
      filter.address = new RegExp(escapeRegex(String(address)), "i");
    }

    const sortKey = SORTABLE.includes(sort) ? sort : "createdAt";
    const sortDir = order === "desc" ? -1 : 1;

    const sortQuery =
      sortKey === "name"
        ? { firstname: sortDir, lastname: sortDir, username: sortDir, email: sortDir }
        : { [sortKey]: sortDir };

    const data = await User.find(filter).sort(sortQuery);

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

userRouter.post("/", async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password, phoneNumber, role, address } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      address,
    });
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password, phoneNumber, role, address } = req.body;

    const update = { firstname, lastname, username, email, phoneNumber, role, address };
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);

    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    return res.json({ success: true, message: "deleted user successfully!" });
  } catch (error) {
    next(error);
  }
});