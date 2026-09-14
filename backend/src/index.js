import express from "express";
import { router as apiRoutes } from "./routes/index.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/", (req, res) => {
  return res.json({
    message: "HELLO JUBU JUBU",
  });
});

app.use('/api', apiRoutes)

app.use((err, req, res, next) => {
  return res.status(500).json({
    error: `Something went wrong on the server...`,
    message: err.message
  })
})

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    process.exit(1);
  }
};

start();
