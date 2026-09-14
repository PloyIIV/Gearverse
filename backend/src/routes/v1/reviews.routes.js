import { Router } from "express";
import { Review } from "../../models/review.model.js";

export const reviewRouter = Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const { userId, productId } = req.query;

    const filter = {};
    if (userId) filter.user_id = userId;
    if (productId) filter.product_id = productId;

    const data = await Review.find(filter)
      .populate("product_id", "product_name")
      .sort({ createdAt: -1 });

    return res.json({ data });
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate("product_id", "product_name");
    if (!review) {
      return res.status(404).json({ success: false, message: "review not found!" });
    }
    return res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const { user_id, product_id, orderitem_id, rating, comment } = req.body;
    if (!user_id || !product_id || rating == null) {
      return res.status(400).json({
        success: false,
        message: "user_id, product_id and rating are required!",
      });
    }
    const review = await Review.create({ user_id, product_id, orderitem_id, rating, comment });
    return res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true, runValidators: true },
    );
    if (!review) {
      return res.status(404).json({ success: false, message: "review not found!" });
    }
    return res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: "review not found!" });
    }
    return res.json({ success: true, message: "deleted review successfully!" });
  } catch (error) {
    next(error);
  }
});