import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { productRouter } from "./products.routes.js";
import { categoryRouter } from "./categories.routes.js";
import { orderRouter } from "./orders.routes.js";

export const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);