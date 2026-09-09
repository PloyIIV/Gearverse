import { Router } from "express";
import { User } from "../../models/user.model.js";
import bcrypt from 'bcrypt'

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        console.log('test')
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

userRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        console.log(newPassword)
    } catch (error) {
        console.log(error)
    }
})