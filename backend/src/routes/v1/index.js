import { Router } from "express";
import { userRouter } from "./users.routes";
import { productRouter } from "./products.routes";

export const router = Router();

router.use('/users', userRouter)
router.use('/products', productRouter)