import { Router } from "express";
import { Product } from "../../models/product.model";

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    return res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: `ERROR: ${error}`,
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const data = await Product.create(req.body)
  } catch (error) {
    console.log(error);
    return res.json({
      message: `ERROR: ${error}`,
    });
  }
});
