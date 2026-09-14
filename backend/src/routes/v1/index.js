import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { productRouter } from "./products.routes.js";
import { promoRouter } from "./promo.routes.js";
import { reviewRouter } from "./reviews.routes.js";
import { shoppingCartRouter } from "./shoppingcart.routes.js";
import { categoryRouter } from "./categories.routes.js";
import { orderRouter } from "./orders.routes.js";
import { colorRouter } from "./colors.routes.js";

export const router = Router();

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/promo', promoRouter)
router.use('/reviews', reviewRouter)
router.use('/shoppingcart', shoppingCartRouter)
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/categories', categoryRouter)
router.use('/orders', orderRouter)
router.use('/colors', colorRouter)
