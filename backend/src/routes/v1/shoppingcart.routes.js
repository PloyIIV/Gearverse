import { Router } from "express";
import { ShoppingCart } from "../../models/cart.model.js";

export const shoppingCartRouter = Router();

// GET /api/v1/shoppingcart/:userId - Get active cart for a user
shoppingCartRouter.get("/:userId", async (req, res, next) => {
  try {
    const cart = await ShoppingCart.findOne({
      user_id: req.params.userId,
      status: "active",
    });
    if (!cart) {
      return res.json({ success: true, data: null });
    }
    return res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/shoppingcart/:userId - Upsert entire cart (sync from frontend)
shoppingCartRouter.put("/:userId", async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "items array is required!" });
    }

    const cart = await ShoppingCart.findOneAndUpdate(
      { user_id: req.params.userId, status: "active" },
      { user_id: req.params.userId, items },
      { new: true, upsert: true, runValidators: true },
    );

    return res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/shoppingcart/:userId/items - Add an item to cart
shoppingCartRouter.post("/:userId/items", async (req, res, next) => {
  try {
    const { product_id, product_name, tag, unit_price, quantity, delivery, image } = req.body;
    if (!product_name || unit_price == null || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "product_name, unit_price and quantity are required!",
      });
    }

    let cart = await ShoppingCart.findOne({ user_id: req.params.userId, status: "active" });

    if (!cart) {
      cart = await ShoppingCart.create({
        user_id: req.params.userId,
        items: [{ product_id, product_name, tag, unit_price, quantity, delivery, image }],
      });
    } else {
      const existingIndex = cart.items.findIndex(
        (item) => item.product_id?.toString() === product_id
      );

      if (existingIndex >= 0) {
        cart.items[existingIndex].quantity += quantity;
      } else {
        cart.items.push({ product_id, product_name, tag, unit_price, quantity, delivery, image });
      }

      await cart.save();
    }

    return res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/shoppingcart/:userId/items/:itemId - Remove an item from cart
shoppingCartRouter.delete("/:userId/items/:itemId", async (req, res, next) => {
  try {
    const cart = await ShoppingCart.findOne({
      user_id: req.params.userId,
      status: "active",
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: "cart not found!" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
    await cart.save();

    return res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/shoppingcart/:userId - Clear entire cart
shoppingCartRouter.delete("/:userId", async (req, res, next) => {
  try {
    const cart = await ShoppingCart.findOneAndUpdate(
      { user_id: req.params.userId, status: "active" },
      { items: [] },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "cart not found!" });
    }

    return res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
});
