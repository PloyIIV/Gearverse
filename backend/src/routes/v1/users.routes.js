import { Router } from "express";
import { User } from "../../models/user.model.js";

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const data = await User.find()
        return res.json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: `ERROR: ${error}`
        })
    }
})