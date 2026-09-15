// นำเข้า mongoose และ Schema จากไลบรารี mongoose เพื่อใช้สร้างฐานข้อมูล MongoDB
import mongoose, { Schema } from "mongoose";

// สร้าง Schema เพื่อกำหนดโครงสร้างข้อมูลของ Keycap (ปุ่มคีย์บอร์ด)
const keycapSchema = new mongoose.Schema({
    // ชื่อของ Keycap เช่น OEM White-Blue, Cherry Profile Black
    name: {
        type: String,                               // กำหนดชนิดข้อมูลเป็นข้อความ (String)
        required: [true, "Keycap name is required"], // บังคับว่าต้องระบุชื่อ ถ้าไม่ระบุจะแจ้งเตือน
        trim: true                                  // ตัดช่องว่างหน้าและหลังข้อความออกอัตโนมัติ
    },
    // วัสดุที่ใช้ผลิต Keycap เช่น PBT, ABS
    material: {
        type: String,                               // กำหนดชนิดข้อมูลเป็นข้อความ (String)
        default: ""                                 // หากไม่ได้ระบุ ให้เป็นค่าว่างเริ่มต้น
    },
    // ทรง/โปรไฟล์ของ Keycap เช่น Cherry, OEM, XDA, SA
    profile: {
        type: String,                               // กำหนดชนิดข้อมูลเป็นข้อความ (String)
        default: ""                                 // หากไม่ได้ระบุ ให้เป็นค่าว่างเริ่มต้น
    },
    // รหัสสินค้า (Product ID) เพื่อเชื่อมโยงว่า Keycap นี้เป็นตัวเลือกของสินค้าตัวไหน
    product_id: { 
        type: Schema.ObjectId,                      // ใช้ ObjectId ของ MongoDB
        ref: "Product",                             // อ้างอิงไปยังคอลเลกชัน "Product"
        default: null                               // หากไม่ได้ผูกกับสินค้า ให้ค่าเริ่มต้นเป็น null
    }
}, {
    timestamps: true                                // สร้างฟิลด์ createdAt และ updatedAt ให้อัตโนมัติเมื่อมีการสร้างหรือแก้ไข
});

// สร้างโมเดลชื่อ "Keycap" จาก schema ที่กำหนด และ export ออกไปให้ไฟล์อื่นเรียกใช้งาน
export const Keycap = mongoose.model("Keycap", keycapSchema);
