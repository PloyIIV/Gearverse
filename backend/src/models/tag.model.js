// นำเข้า mongoose และ Schema จากไลบรารี mongoose เพื่อใช้สร้างฐานข้อมูล MongoDB
import mongoose, { Schema } from "mongoose";

// สร้าง Schema เพื่อกำหนดโครงสร้างข้อมูลของ Tag สินค้า (เช่น ป้ายกำกับ Hot-swap, Wireless, RGB)
const tagSchema = new mongoose.Schema({
    // ชื่อของ Tag เช่น Wireless, RGB, Hot-swappable, Mechanical
    name: {
        type: String,                            // กำหนดชนิดข้อมูลเป็นข้อความ (String)
        required: [true, "Tag name is required"], // บังคับว่าต้องระบุชื่อ tag
        unique: true,                            // กำหนดให้ชื่อ tag ต้องไม่ซ้ำกันในระบบ
        trim: true                               // ตัดช่องว่างหน้าและหลังข้อความออกอัตโนมัติ
    },
    // คำอธิบายเพิ่มเติมเกี่ยวกับ Tag นั้นๆ
    description: {
        type: String,                            // กำหนดชนิดข้อมูลเป็นข้อความ (String)
        default: ""                              // หากไม่ได้ระบุ ให้เป็นค่าว่างเริ่มต้น
    },
    // รหัสสินค้า (Product ID) ในกรณีที่ต้องการผูก tag กับสินค้าเฉพาะตัว
    product_id: {
        type: Schema.ObjectId,                   // ใช้ ObjectId ของ MongoDB
        ref: "Product",                          // อ้างอิงไปยังคอลเลกชัน "Product"
        default: null                            // หากไม่ได้ผูกกับสินค้า ให้ค่าเริ่มต้นเป็น null
    }
}, {
    timestamps: true                             // สร้างฟิลด์ createdAt และ updatedAt ให้อัตโนมัติเมื่อมีการสร้างหรือแก้ไข
});

// สร้างโมเดลชื่อ "Tag" จาก schema ที่กำหนด และ export ออกไปให้ไฟล์อื่นเรียกใช้งาน
export const Tag = mongoose.model("Tag", tagSchema);
