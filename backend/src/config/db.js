import mongoose from 'mongoose'

export async function connectDB() {
    const url = process.env.MONGO_URL;
    if(!url) {
        throw new Error("Missing MONGO_URL")
    }
    await mongoose.connect(uri, {
        dbName: 'gearverse'
    })

    console.log("MongoDB connected 🤞")
}