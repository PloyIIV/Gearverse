import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { productRouter } from "./products.routes.js";
import { reviewRouter } from "./reviews.routes.js";

export const router = Router();

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/reviews', reviewRouter)