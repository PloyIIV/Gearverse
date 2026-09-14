import { Router } from "express";
import { User } from "../../models/user.model.js";

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const data = await User.find();
        return res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        console.error("GET /users error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("GET /users/:id error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});