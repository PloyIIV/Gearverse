# GearVerse Frontend

Frontend ของโปรเจกต์ **GearVerse** — ร้านค้าออนไลน์ขายอุปกรณ์เกมมิ่งเกียร์ (คีย์บอร์ด / เมาส์ / หูฟัง / อุปกรณ์เสริม) สร้างด้วย **React 19 + Vite 8 + Tailwind CSS 4**

## Tech Stack

- **React 19**, **Vite 8**, **Tailwind CSS 4** (`@tailwindcss/vite`)
- **React Router DOM 7** — จัดการเส้นทาง (routing)
- **shadcn/ui** (`components.json`) — สไตล์ `base-luma` พร้อม registry `@skiper-ui`
- **lucide-react**, **react-icons** — ไอคอน
- **embla-carousel-react** + **embla-carousel-autoplay** — carousel อัตโนมัติ
- **canvas-confetti**, **sonner** (toast), **framer-motion / motion**
- **next-themes**, **@base-ui/react**, **class-variance-authority**, **tailwind-merge**

## คำสั่งใช้งาน

```bash
npm install     # ติดตั้ง dependencies
npm run dev     # เปิด dev server (Vite)
npm run build   # build production
npm run lint    # ตรวจโค้ดด้วย ESLint
npm run preview # 预览 production build
```

## โครงสร้างโฟลเดอร์

```
frontend/
├── index.html               # ไฟล์ HTML หลัก (title: GearVerse, ฟอนต์ Kanit)
├── vite.config.js           # ตั้งค่า plugin + alias "@" -> ./src
├── components.json          # ตั้งค่า shadcn/ui
├── eslint.config.js
├── jsconfig.json            # path alias "@/*"
├── public/                  # ไฟล์ static: favicon, icons, เสียง switch, รูปสินค้า demo
├── dist/                    # output ของ build
├── titankeys-temp/          # เทมเพลตโปรเจกต์ / ไฟล์ชั่วคราวแยกต่างหาก
└── src/
    ├── main.jsx             # entry point (React StrictMode)
    ├── App.jsx              # ตั้งค่า router (ลูกค้า + admin)
    ├── index.css            # Tailwind + custom theme (สี gpurple/gpink/gcyan/gbase/gbg)
    ├── assets/              # รูปสินค้า, รูปแบนเนอร์, วิดีโอ banner
    ├── contexts/            # FluidCursor (WebGL), use-FluidCursor, use-mouse
    ├── components/
    │   ├── Layout.jsx       # wrapper: Navbar + Outlet + Footer + Toaster + fluid cursor
    │   ├── Footer.jsx       # footer มี subscribe newsletter
    │   ├── Navbar/          # Navbar หลัก + NavbarAuthenticate + NavbarUnauthen
    │   ├── Homepage/        # BannerCarousel, CategoryCard, HeaderSection, ProductSecondaryCard
    │   ├── ProductCard/     # การ์ดสินค้า
    │   ├── Admin/           # AdminDashboard, LayoutAdmin, NavbarAdmin
    │   └── ui/              # สไตล์ shadcn: button, card, dialog, carousel, field, ฯลฯ
    ├── pages/
    │   ├── Homepage/        # หน้าแรก
    │   ├── ProductPage/     # หน้ารายละเอียดสินค้า, รายการสินค้า, หน้า Sale
    │   ├── ShoppingCart/    # CartPage
    │   ├── Login/, Register/
    │   ├── Admin/           # AdminHomepage
    │   └── User/            # บัญชีผู้ใช้ (ข้อมูลส่วนตัว, ที่อยู่, การซื้อ, รีวิว, การคืนสินค้า)
    ├── lib/
    │   ├── cart-service.js  # Cart + Promo code เก็บใน localStorage
    │   ├── product.js       # placeholder ข้อมูลสินค้า
    │   └── utils.js         # function cn() รวม clsx + tailwind-merge
    └── utils/
        └── audio.js         # SoundEngine: เล่นเสียง switch (linear/tactile/clicky)
```

## เส้นทาง (Routes)

กำหนดใน `src/App.jsx` ผ่าน `createBrowserRouter`:

| Path | หน้า |
|------|------|
| `/` | Homepage |
| `/register`, `/login` | สมัครสมาชิก / เข้าสู่ระบบ |
| `/edit-profile` | ข้อมูลส่วนตัว |
| `/edit-profile/addresses` | จัดการที่อยู่ |
| `/my-purchases` | รายการสั่งซื้อ |
| `/my-purchases/order-status`, `/my-purchases/:orderId` | สถานะออเดอร์ |
| `/my-reviews` | รีวิวของฉัน |
| `/my-cancellations` | การยกเลิก / คืนสินค้า |
| `/cart` | ตะกร้าสินค้า |
| `/product` | หน้ารายละเอียดสินค้า |
| `/products/:id` | หน้ารายการสินค้าตามหมวด (collection) |
| `/sale` | หน้าโปรโมชัน |

> ยังมี `routerAdmin` (เส้นทาง Admin) อยู่ในโค้ด แต่ถูกปิดไว้ชั่วคราว (เปลี่ยนเงื่อนไขใน `App.jsx` เพื่อเปิดใช้งาน)

## ฟีเจอร์หลัก

- **Fluid Cursor** — เอฟเฟกต์ของเหลว WebGL ตามเมาส์บนหน้าเว็บ (`contexts/use-FluidCursor.jsx`)
- **หน้าแรก** — Banner carousel อัตโนมัติ (วิดีโอ), หมวดหมู่สินค้า, สินค้าเทรนด์
- **หน้า ProductPage** — ตัวอย่างสินค้า LoL x GearVerse: เลือกสวิตช์ (Linear/Tactile/Clicky) พร้อมฟังเสียงกดจริง, เลือกสี, เปลี่ยนจำนวน, เพิ่มตะกร้า (มี confetti + toast)
- **CartPage** — ตะกร้าสินค้าแบบครบวงจร: เพิ่ม/ลดจำนวน, ลบ, ล้าง, reset demo, ใช้ Promo Code, คำนวณราคารวม + ค่าส่ง, Modal ยืนยัน checkout
- **Cart service (`lib/cart-service.js`)** — เก็บตะกร้าใน `localStorage`, มี Promo Code: `GEAR30` (ลด $30) และ `GAME10` (ลด $10)
- **Sound Engine (`utils/audio.js`)** — Web Audio API สังเคราะห์เสียงสวิตช์คีย์บอร์ด 3 แบบ พร้อม fallback เป็นไฟล์ mp3 ใน `public/`
- **หน้าบัญชีผู้ใช้** — ข้อมูลส่วนตัว (อัปโหลดรูป avatar), ที่อยู่, ประวัติการสั่งซื้อ, สถานะออเดอร์ (timeline stepper), รีวิว, การยกเลิก/คืนสินค้า (ข้อมูล mock)
- **Admin Dashboard** — ฟอร์มเพิ่มสินค้า พร้อม validate ฟิลด์ทั้งหมด และแสดงรายการสินค้าที่เพิ่มล่าสุด

## Theme สี (defined ใน `src/index.css`)

- กลุ่มม่วง `gpurple-1..5`, กลุ่มชมพู `gpink-1..3`, กลุ่ม cyan `gcyan-light/dark/neon`
- พื้นหลัง `gbg-1..3` และ base `gbase-1..4`
- ฟอนต์หลัก: **Kanit** (ไทย/อังกฤษ)