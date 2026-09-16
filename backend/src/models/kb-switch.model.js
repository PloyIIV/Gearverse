// นำเข้า mongoose และ Schema จากไลบรารี mongoose เพื่อใช้สร้างฐานข้อมูล MongoDB
import mongoose, { Schema } from "mongoose";

// สร้าง Schema เพื่อกำหนดโครงสร้างข้อมูลของ Keyboard Switch (สวิตช์คีย์บอร์ด)
const switchSchema = new mongoose.Schema({
    // ชื่อรุ่นของ Switch
    // ตัวอย่างที่นิยม:
    // - Cherry MX Red, Cherry MX Blue, Cherry MX Brown
    // - Gateron Yellow Pro, Gateron Milky Yellow
    // - Akko V3 Cream Yellow, Akko Lavender Purple
    // - Outemu Red, Outemu Blue
    // - Holy Panda, KTT Strawberry
    name: {
        type: String,
        required: true
    },

    // ประเภทสัมผัส/การทำงานของ Switch (Switch Type)
    // ประเภทหลักๆ ที่นิยมใช้:
    // 1. "Linear"        - กดจังหวะเดียว นุ่ม ลื่น เงียบ ไม่มีแรงต้านหรือเสียงคลิก (เช่น Red, Yellow, Black)
    // 2. "Tactile"       - กดสองจังหวะ มี bump ตอบสนองนิ้วเล็กน้อย ไม่ส่งเสียงดังคลิก (เช่น Brown, Holy Panda)
    // 3. "Clicky"        - กดสองจังหวะ มีเสียงคลิกและสัมผัสชัดเจน (เช่น Blue, Green)
    // 4. "Silent"        - สวิตช์เก็บเสียง มีแผ่นยางซับเสียง (เช่น Silent Red, Silent Brown)
    // 5. "Magnetic"      - สวิตช์แม่เหล็ก / Hall Effect ปรับระยะสั่งการได้ (Rapid Trigger)
    // 6. "Optical"       - สวิตช์เซนเซอร์แสง ตอบสนองรวดเร็ว
    switch_type: {
        type: String,
        required: true
    },

    // รหัสสินค้า (Product ID) เพื่อระบุว่า Switch นี้เป็นตัวเลือกหรือเป็นของสินค้าตัวไหน
    product_id: { type: Schema.ObjectId, ref: "Product" },
}, {
    timestamps: true, // บันทึกเวลา createdAt และ updatedAt อัตโนมัติ
});

export const kbSwitch = mongoose.model("kbSwitch", switchSchema);