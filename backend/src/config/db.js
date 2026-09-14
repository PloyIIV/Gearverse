import mongoose from 'mongoose'

export async function connectDB() {
    const url = process.env.MONGO_URL || process.env.MONGO_URI;
    if(!url) {
        throw new Error("Missing MONGO_URL environment variable")
    }
    try {
        await mongoose.connect(url, {
            dbName: 'gearverse'
        })
        console.log("MongoDB connected 🤞")
    } catch (error) {
        console.error("MongoDB connection error ❌:", error.message)
        throw error;
    }
}