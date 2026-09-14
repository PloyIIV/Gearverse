import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { router as apiRoutes } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  return res.json({
    message: "GearVerse API is running 🚀",
  });
});

// API Routes
app.use("/api", apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
});

// Start server after DB connection
async function start() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port: ${port} 🏃‍♀️`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

start();
