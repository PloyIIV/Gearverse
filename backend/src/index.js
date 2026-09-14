import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { router } from "./routes/v1/index.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    return res.json({
        message: 'GearVerse API is running 🚀',
        version: 'v1',
        endpoints: {
            products: '/api/v1/products',
            categories: '/api/v1/categories',
            orders: '/api/v1/orders',
            users: '/api/v1/users'
        }
    });
});

// API Routes
app.use('/api/v1', router);

// 404 Handler
app.use((req, res) => {
    return res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
});

// Start server after DB connection
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port} ⚡`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB ❌:", err.message);
        process.exit(1);
    });
