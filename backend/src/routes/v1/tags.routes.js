// นำเข้า Router จาก Express เพื่อใช้จัดการเส้นทาง (API Endpoints)
import { Router } from "express";
// นำเข้าโมเดล Tag จากโฟลเดอร์ models เพื่อใช้ติดต่อกับฐานข้อมูล MongoDB
import { Tag } from "../../models/tag.model.js";

// สร้างอินสแตนซ์ของ Router สำหรับ tag
export const tagRouter = Router();

// ==========================================
// 1. GET / - ดึงรายการ Tag ทั้งหมด หรือค้นหาตามชื่อ/productId
// ==========================================
tagRouter.get("/", async (req, res, next) => {
  try {
    // รับค่า query parameter: productId สำหรับกรองตามสินค้า, name สำหรับค้นหาชื่อ tag
    const { productId, name } = req.query;

    // สร้างอ็อบเจกต์ filter สำหรับเงื่อนไขการค้นหา
    const filter = {};
    // ถ้ามีการระบุ productId ให้เพิ่มเงื่อนไข
    if (productId) filter.product_id = productId;
    // ถ้ามีการระบุชื่อ tag ให้ค้นหาแบบข้อความบางส่วน (Regex) และไม่สนตัวพิมพ์เล็ก-ใหญ่ (case-insensitive)
    if (name) filter.name = { $regex: name, $options: "i" };

    // ค้นหาข้อมูลในฐานข้อมูลตามเงื่อนไข filter และเรียงจากสร้างใหม่ไปเก่า
    const data = await Tag.find(filter).sort({ createdAt: -1 });

    // ส่งผลลัพธ์กลับไปยังฝั่ง Frontend ในรูปแบบ JSON
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    // ส่งต่อไปยัง Error Handling Middleware
    next(error);
  }
});

// ==========================================
// 2. GET /:id - ดึงข้อมูล Tag รายการเดียวตาม ID
// ==========================================
tagRouter.get("/:id", async (req, res, next) => {
  try {
    // ค้นหา tag ในฐานข้อมูลโดยใช้ ID ที่ส่งมาใน URL params
    const tag = await Tag.findById(req.params.id);
    // ถ้าไม่พบข้อมูล ส่งสถานะ 404 Not Found
    if (!tag) {
      return res.status(404).json({ success: false, message: "tag not found!" });
    }
    // ส่งข้อมูล tag ที่ค้นพบกลับไป
    return res.json({ success: true, data: tag });
  } catch (error) {
    // ส่งต่อไปยัง Error Handling Middleware
    next(error);
  }
});

// ==========================================
// 3. POST / - เพิ่มข้อมูล Tag ตัวใหม่เข้าสู่ระบบ
// ==========================================
tagRouter.post("/", async (req, res, next) => {
  try {
    // ดึงค่า name, description, product_id จาก request body
    const { name, description, product_id } = req.body;
    
    // ตรวจสอบว่าได้กรอกชื่อ tag มาหรือไม่
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required!",
      });
    }

    // ตรวจสอบว่ามีชื่อ tag นี้ในระบบแล้วหรือไม่ เพื่อป้องกันข้อมูลซ้ำ
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: "tag with this name already exists!",
      });
    }

    // บันทึก tag ตัวใหม่ลงในฐานข้อมูล MongoDB
    const tag = await Tag.create({ name, description, product_id });
    
    // ส่งสถานะ 201 (Created) พร้อมข้อมูล tag ที่สร้างใหม่
    return res.status(201).json({ success: true, data: tag });
  } catch (error) {
    // ส่งต่อไปยัง Error Handling Middleware
    next(error);
  }
});

// ==========================================
// 4. PUT /:id - แก้ไข/อัปเดตข้อมูล Tag ตาม ID
// ==========================================
tagRouter.put("/:id", async (req, res, next) => {
  try {
    // ดึงข้อมูลใหม่ที่ต้องการแก้ไขจาก request body
    const { name, description, product_id } = req.body;

    // ค้นหาตาม ID แล้วอัปเดตข้อมูลใหม่ (new: true คืนค่าที่อัปเดตแล้ว, runValidators ตรวจสอบตาม Schema)
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name, description, product_id },
      { new: true, runValidators: true },
    );

    // ถ้าไม่พบข้อมูลตาม ID ที่ระบุ
    if (!tag) {
      return res.status(404).json({ success: false, message: "tag not found!" });
    }

    // ส่งข้อมูล tag ที่อัปเดตเรียบร้อยแล้วกลับไป
    return res.json({ success: true, data: tag });
  } catch (error) {
    // ส่งต่อไปยัง Error Handling Middleware
    next(error);
  }
});

// ==========================================
// 5. DELETE /:id - ลบข้อมูล Tag ออกจากระบบตาม ID
// ==========================================
tagRouter.delete("/:id", async (req, res, next) => {
  try {
    // ค้นหาตาม ID และทำการลบข้อมูลออกจากฐานข้อมูล
    const tag = await Tag.findByIdAndDelete(req.params.id);

    // ถ้าไม่พบข้อมูลที่จะลบ
    if (!tag) {
      return res.status(404).json({ success: false, message: "tag not found!" });
    }

    // ส่งข้อความแจ้งว่าลบสำเร็จแล้ว
    return res.json({ success: true, message: "deleted tag" });
  } catch (error) {
    // ส่งต่อไปยัง Error Handling Middleware
    next(error);
  }
});
