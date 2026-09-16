import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { protect } from "../../middlewares/protect.js";

export const userRouter = Router();

//read users
userRouter.get("/", async (req, res, next) => {
  try {
    const data = await User.find();
    if (data.length === 0) {
      return res.status(400).json({ message: "User's data is empty!" });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

//register user
userRouter.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Firstname, lastname, email and password are required!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: newPassword,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Can not create user!" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Created user successfully!", user });
  } catch (error) {
    next(error);
  }
});

//update user's data
userRouter.patch("/:id", async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      address,
      phoneNumber,
    } = req.body;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (Array.isArray(address) && address.length > 0) {
      updateFields.$push = { address: { $each: address } };
    }
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update!",
      });
    }

    const notUpdatedUser = await User.findById(req.params.id);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Updated user partially!",
      notUpdatedUser,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

//delete user
userRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Deleted user succesfully!" });
  } catch (error) {
    next(error);
  }
});

//get current user from cookie
userRouter.get("/me", protect, async (req, res, next) => {
  try {
    console.log(req.user)
    const user = await User.findById(req.user.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

//user login
// เหลือ gen token
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required!" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ success: false, message: "Incorrect password!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
});

// userRouter.post("/register", async (req, res) => {
//   try {
//     const {
//       firstname,
//       lastname,
//       username,
//       email,
//       password,
//       role,
//       phoneNumber,
//       address,
//     } = req.body;

//     if (!firstname || !lastname || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "firstname, lastname, email and password are required!",
//       });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       firstname,
//       lastname,
//       username,
//       email,
//       password: hash,
//       role: role || "user",
//       phoneNumber,
//       address,
//     });

//     return res.status(201).json({ success: true, data: user });
//   } catch (error) {
//     console.error("POST /users/register error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

userRouter.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("GET /users/:id error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      role,
      phoneNumber,
      address,
    } = req.body;

    const updates = {};
    if (firstname !== undefined) updates.firstname = firstname;
    if (lastname !== undefined) updates.lastname = lastname;
    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) updates.role = role;
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
    if (address !== undefined) updates.address = address;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("PUT /users/:id error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// userRouter.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "User deleted successfully" });
//   } catch (error) {
//     console.error("DELETE /users/:id error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });
