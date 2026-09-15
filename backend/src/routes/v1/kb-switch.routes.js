import { Router } from "express";
import { kbSwitch } from "../../models/kb-switch.model.js";

export const kbswitchRouter = Router();

kbswitchRouter.get("/", async (req, res, next) => {
  try {
    const { productId } = req.query;

    const filter = {};
    if (productId) filter.product_id = productId;

    const data = await kbSwitch.find(filter).sort({ createdAt: -1 });

    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
});

kbswitchRouter.get("/:id", async (req, res, next) => {
  try {
    const kbswitch = await kbSwitch.findById(req.params.id);
    if (!kbswitch) {
      return res.status(404).json({ success: false, message: "kbswitch not found!" });
    }
    return res.json({ success: true, data: kbswitch });
  } catch (error) {
    next(error);
  }
});

kbswitchRouter.post("/", async (req, res, next) => {
  try {
    const { name, switch_type, product_id } = req.body;
    if (!name || !switch_type) {
      return res.status(400).json({
        success: false,
        message: "name and switch_type are required!",
      });
    }
    const kbswitch = await kbSwitch.create({ name, switch_type, product_id });
    return res.status(201).json({ success: true, data: kbswitch });
  } catch (error) {
    next(error);
  }
});

kbswitchRouter.put("/:id", async (req, res, next) => {
  try {
    const { name, switch_type, product_id } = req.body;
    const kbswitch = await kbSwitch.findByIdAndUpdate(
      req.params.id,
      { name, switch_type, product_id },
      { new: true, runValidators: true },
    );
    if (!kbswitch) {
      return res.status(404).json({ success: false, message: "kbswitch not found!" });
    }
    return res.json({ success: true, data: kbswitch });
  } catch (error) {
    next(error);
  }
});

kbswitchRouter.delete("/:id", async (req, res, next) => {
  try {
    const kbswitch = await kbSwitch.findByIdAndDelete(req.params.id);
    if (!kbswitch) {
      return res.status(404).json({ success: false, message: "kbswitch not found!" });
    }
    return res.json({ success: true, message: "deleted kbswitch" });
  } catch (error) {
    next(error);
  }
});