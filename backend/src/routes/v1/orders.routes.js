import { Router } from "express";
import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";

export const orderRouter = Router();

// GET / - Fetch all orders (Admin)
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "username email firstname lastname")
      .populate("items.product_id", "product_name price image");
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("GET /orders error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /user/:user_id - Fetch all orders of a specific user (User)
orderRouter.get("/user/:user_id", async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.user_id })
      .populate("items.product_id", "product_name price image")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("GET /orders/user/:user_id error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /:id - Get single order by ID
orderRouter.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user_id", "username email firstname lastname")
      .populate("items.product_id", "product_name price image");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("GET /orders/:id error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST / - Create a new order (User - Checkout)
orderRouter.post("/", async (req, res) => {
  try {
    const { user_id, items, shipping_address, payment_method } = req.body;

    const productIds = items.map((item) => item.product_id)
    const response = await Product.find({ _id: { $in: productIds }})

    for(let i=0; i < items.length; i++) {
        items[i].unit_price = response[i].price * items[i].quantity
    }

    // Calculate total_price and total_quantity from items
    const total_quantity = await items.reduce((sum, item) => sum + item.quantity, 0);
    const total_price = await items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0,
    );

    const order = await Order.create({
        user_id,
        items,
        total_quantity,
        total_price,
        shipping_address,
        payment_method
    });

    return res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("POST /orders error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /:id - Update order status (Admin / User)
orderRouter.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("PUT /orders/:id error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /:id - Delete/cancel an order
orderRouter.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Order deleted successfully",
        data: order,
      });
  } catch (error) {
    console.error("DELETE /orders/:id error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});
