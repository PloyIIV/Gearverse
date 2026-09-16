import { Router } from "express";
import { Promo } from "../../models/promocode.model.js";

export const promoRouter = Router();

promoRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.query);
    const { name } = req.query;
    if (name) {
      const response = await Promo.find({
        name: { $regex: name, $options: "i" },
      });
      return res.json({
        data: response,
      });
    }
    const response = await Promo.find();
    return res.json({
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

promoRouter.post("/", async (req, res, next) => {
  try {
    
    const {
      name,
      discount_amount,
      discount_type,
      min_order_price,
      max_use,
      promo_start,
      expire_at,
      description,
    } = req.body;
    if (
      !name ||
      !discount_amount ||
      !discount_type ||
      !min_order_price ||
      !max_use ||
      !promo_start ||
      !expire_at
    ) {
      return res.json({
        message: "Data required",
      });
    }
    const response = await Promo.create({
      name,
      discount_amount,
      discount_type,
      min_order_price,
      max_use,
      promo_start,
      expire_at,
      description,
      created_at: new Date(),
      is_active: true
    });
    return res.json({
      message: "Created new promotion successfully.",
      response,
      success: true,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
});

promoRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_active, max_use, promo_start, expire_at, description } =
      req.body;
    const response = await Promo.findByIdAndUpdate(id, {
      is_active,
      max_use,
      promo_start,
      expire_at,
      description,
      updated_at: new Date()
    });
    return res.json({
      message: "Updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

promoRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Promo.findByIdAndDelete(id);
    if (!response) {
      return res.json({
        message: "Error",
      });
    }
    return res.json({
      message: "Deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
});
