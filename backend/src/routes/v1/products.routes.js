import { Router } from "express";
import { Product } from "../../models/product.model.js";

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    return res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `ERROR: ${error.message}`,
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const data = await Product.create(req.body);
    return res.status(201).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `ERROR: ${error.message}`,
    });
  }
});
