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
    return res.json({
      message: `ERROR: ${error}`,
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const data = await Product.create(req.body)
    return res.status(200).json({
      success: true,
      message: "Created Product successfully."
    })
  } catch (error) {
    console.log(error);
    return res.json({
      message: `ERROR: ${error}`,
    });
  }
});
