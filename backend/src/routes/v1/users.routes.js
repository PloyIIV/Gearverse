import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const { name, email, address, sort, order } = req.query;

        const filter = {};
        if (name) {
            filter.$or = [
                { firstname: { $regex: name, $options: "i" } },
                { lastname: { $regex: name, $options: "i" } },
                { username: { $regex: name, $options: "i" } },
            ];
        }
        if (email) filter.email = { $regex: email, $options: "i" };
        if (address) filter.address = { $regex: address, $options: "i" };

        const sortField = sort || "createdAt";
        const sortOrder = order === "desc" ? -1 : 1;

        const data = await User.find(filter).sort({ [sortField]: sortOrder });

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

userRouter.post('/', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, phoneNumber, address } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are required!"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hash,
            role: role || "user",
            phoneNumber,
            address
        });

        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error("POST /users error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, phoneNumber, address } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "firstname, lastname, email and password are required!"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hash,
            role: role || "user",
            phoneNumber,
            address
        });

        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error("POST /users/register error:", error);
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

userRouter.put('/:id', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, phoneNumber, address } = req.body;

        const updates = {};
        if (firstname !== undefined) updates.firstname = firstname;
        if (lastname !== undefined) updates.lastname = lastname;
        if (username !== undefined) updates.username = username;
        if (email !== undefined) updates.email = email;
        if (role !== undefined) updates.role = role;
        if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
        if (address !== undefined) updates.address = address;
        if (password) updates.password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("PUT /users/:id error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("DELETE /users/:id error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});