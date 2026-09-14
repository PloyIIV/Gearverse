import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { router as apiRoutes } from "./routes/index.js";

const corsOptions = {
  origin: "http://localhost:5173/", // URL ของ Frontend ที่ต้องการอนุญาต
  credentials: true,
};

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", apiRoutes);

//Centralize error handling middleware
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: "Something went wrong on the server!",
    message: err.message,
  });
});

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