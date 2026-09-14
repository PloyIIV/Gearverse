import { Router } from "express";
import { Color } from "../../models/color.model.js";

export const colorRouter = Router();

colorRouter.get("/", async (req, res, next) => {
  try {
    const { productId } = req.query;

    const filter = {};
    if (productId) filter.product_id = productId;

    const data = await Color.find(filter).sort({ createdAt: -1 });

    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
});

colorRouter.get("/:id", async (req, res, next) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ success: false, message: "color not found!" });
    }
    return res.json({ success: true, data: color });
  } catch (error) {
    next(error);
  }
});

colorRouter.post("/", async (req, res, next) => {
  try {
    const { name, hex_code, product_id } = req.body;
    if (!name || !hex_code) {
      return res.status(400).json({
        success: false,
        message: "name and hex_code are required!",
      });
    }
    const color = await Color.create({ name, hex_code, product_id });
    return res.status(201).json({ success: true, data: color });
  } catch (error) {
    next(error);
  }
});

colorRouter.put("/:id", async (req, res, next) => {
  try {
    const { name, hex_code, product_id } = req.body;
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      { name, hex_code, product_id },
      { new: true, runValidators: true },
    );
    if (!color) {
      return res.status(404).json({ success: false, message: "color not found!" });
    }
    return res.json({ success: true, data: color });
  } catch (error) {
    next(error);
  }
});

colorRouter.delete("/:id", async (req, res, next) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ success: false, message: "color not found!" });
    }
    return res.json({ success: true, message: "deleted color" });
  } catch (error) {
    next(error);
  }
});