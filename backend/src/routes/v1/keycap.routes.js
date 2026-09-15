// นำเข้า Router จาก Express เพื่อใช้จัดการเส้นทาง (API Endpoints)
import { Router } from "express";
// นำเข้าโมเดล Keycap จากโฟลเดอร์ models เพื่อใช้ติดต่อกับฐานข้อมูล MongoDB
import { Keycap } from "../../models/keycap.model.js";

// สร้างอินสแตนซ์ของ Router สำหรับ keycap
export const keycapRouter = Router();

// ==========================================
// 1. GET / - ดึงรายการ Keycap ทั้งหมด หรือกรองตาม productId
// ==========================================
keycapRouter.get("/", async (req, res, next) => {
  try {
    // รับค่า productId จาก query parameter (เช่น /api/v1/keycaps?productId=123)
    const { productId } = req.query;

    // สร้างอ็อบเจกต์ filter สำหรับเงื่อนไขการค้นหา
    const filter = {};
    // ถ้ามีการส่ง productId เข้ามา ให้เพิ่มเงื่อนไขค้นหาตาม product_id
    if (productId) filter.product_id = productId;

    // ค้นหาข้อมูลในฐานข้อมูลตามเงื่อนไข filter และเรียงลำดับจากวันที่สร้างใหม่สุดไปเก่าสุด
    const data = await Keycap.find(filter).sort({ createdAt: -1 });

    // ส่งผลลัพธ์กลับไปยังฝั่ง Frontend ในรูปแบบ JSON
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    // หากเกิดข้อผิดพลาด ส่งต่อไปยัง Error Handling Middleware ของ Express
    next(error);
  }
});

// ==========================================
// 2. GET /:id - ดึงข้อมูล Keycap รายการเดียวตาม ID
// ==========================================
keycapRouter.get("/:id", async (req, res, next) => {
  try {
    // ค้นหา keycap ในฐานข้อมูลโดยใช้ ID ที่ส่งมาใน URL params
    const keycap = await Keycap.findById(req.params.id);
    // ถ้าหาไม่พบ ให้ส่ง HTTP status 404 พร้อมข้อความแจ้งเตือน
    if (!keycap) {
      return res.status(404).json({ success: false, message: "keycap not found!" });
    }
    // ถ้าพบข้อมูล ให้ส่งข้อมูล keycap กลับไป
    return res.json({ success: true, data: keycap });
  } catch (error) {
    // ส่งต่อ error ไปยัง middleware ถัดไป
    next(error);
  }
});

// ==========================================
// 3. POST / - เพิ่มข้อมูล Keycap ตัวใหม่เข้าสู่ระบบ
// ==========================================
keycapRouter.post("/", async (req, res, next) => {
  try {
    // ดึงค่า name, material, profile, product_id จาก request body ที่ client ส่งมา
    const { name, material, profile, product_id } = req.body;
    
    // ตรวจสอบความถูกต้องเบื้องต้นว่ามีชื่อ keycap หรือไม่
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required!",
      });
    }

    // บันทึกข้อมูล keycap ตัวใหม่ลงในฐานข้อมูล MongoDB
    const keycap = await Keycap.create({ name, material, profile, product_id });
    
    // ส่งสถานะ 201 (Created) พร้อมข้อมูลที่ถูกสร้างใหม่กลับไป
    return res.status(201).json({ success: true, data: keycap });
  } catch (error) {
    // ส่งต่อ error ไปยัง middleware ถัดไป
    next(error);
  }
});

// ==========================================
// 4. PUT /:id - แก้ไข/อัปเดตข้อมูล Keycap ตาม ID
// ==========================================
keycapRouter.put("/:id", async (req, res, next) => {
  try {
    // ดึงค่าข้อมูลใหม่ที่ต้องการแก้ไขจาก request body
    const { name, material, profile, product_id } = req.body;

    // ค้นหาตาม ID แล้วอัปเดตข้อมูลใหม่ (new: true คือคืนค่าข้อมูลที่อัปเดตแล้ว, runValidators: ตรวจสอบ schema)
    const keycap = await Keycap.findByIdAndUpdate(
      req.params.id,
      { name, material, profile, product_id },
      { new: true, runValidators: true },
    );

    // ถ้าไม่พบข้อมูลตาม ID ที่ต้องการอัปเดต
    if (!keycap) {
      return res.status(404).json({ success: false, message: "keycap not found!" });
    }

    // ส่งข้อมูลที่อัปเดตเสร็จเรียบร้อยกลับไป
    return res.json({ success: true, data: keycap });
  } catch (error) {
    // ส่งต่อ error ไปยัง middleware ถัดไป
    next(error);
  }
});

// ==========================================
// 5. DELETE /:id - ลบข้อมูล Keycap ออกจากระบบตาม ID
// ==========================================
keycapRouter.delete("/:id", async (req, res, next) => {
  try {
    // ค้นหาตาม ID และทำการลบข้อมูลออกจากฐานข้อมูล
    const keycap = await Keycap.findByIdAndDelete(req.params.id);

    // ถ้าไม่พบข้อมูลที่จะลบ
    if (!keycap) {
      return res.status(404).json({ success: false, message: "keycap not found!" });
    }

    // ส่งข้อความแจ้งว่าลบข้อมูลสำเร็จแล้ว
    return res.json({ success: true, message: "deleted keycap" });
  } catch (error) {
    // ส่งต่อ error ไปยัง middleware ถัดไป
    next(error);
  }
});
