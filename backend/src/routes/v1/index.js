import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { productRouter } from "./products.routes.js";
import { promoRouter } from "./promo.routes.js";
import { reviewRouter } from "./reviews.routes.js";
import { shoppingCartRouter } from "./shoppingcart.routes.js";
import { categoryRouter } from "./categories.routes.js";
import { orderRouter } from "./orders.routes.js";
import { colorRouter } from "./colors.routes.js";
import { kbswitchRouter } from "./kb-switch.routes.js";
// นำเข้า Router ของ Keycap และ Tag ที่สร้างขึ้นใหม่
import { keycapRouter } from "./keycap.routes.js";
import { tagRouter } from "./tags.routes.js";
import { wishlistRouter } from "./wishlists.routes.js";

export const router = Router();

// กำหนดเส้นทาง API ของแต่ละโมดูล
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/promo', promoRouter);
router.use('/reviews', reviewRouter);
router.use('/shoppingcart', shoppingCartRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/colors', colorRouter);
router.use('/kbswitch', kbswitchRouter);
// เชื่อมต่อเส้นทาง API สำหรับจัดการ Keycap (/api/v1/keycaps)
router.use('/keycaps', keycapRouter);
// เชื่อมต่อเส้นทาง API สำหรับจัดการ Tag สินค้า (/api/v1/tags)
router.use('/tags', tagRouter);
router.use('/wishlists', wishlistRouter)
