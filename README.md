# Python Grid Walker — เต่าเดิน Grid กินแอปเปิ้ล

เว็บเกมสำหรับ ม.1 สอดคล้อง **ว ๔.๒ ม.๑/๑** (ออกแบบอัลกอริทึมด้วยแนวคิดเชิงนามธรรม)  
ซ้าย: แสดงผลเกม Grid / ขวา: ช่องพิมพ์โค้ด (เดินหน้า, เลี้ยว, เก็บแอปเปิ้ล)  
มีหลาย Level, โหมดสาธิต และข้อความตัวชี้วัด

## รัน locally

```bash
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

## Build

```bash
npm run build
```

ผลลัพธ์อยู่ในโฟลเดอร์ `dist/`

## Deploy ขึ้น GitHub Pages

1. สร้าง repo บน GitHub (เช่นชื่อ `PythonTurtle`)
2. แก้ `package.json`: ตั้ง `"homepage": "https://<username>.github.io/PythonTurtle/"` ให้ตรงกับ username และชื่อ repo
3. แก้ `vite.config.js`: ตั้ง `base: '/PythonTurtle/'` ให้ตรงกับชื่อ repo (ถ้าชื่อ repo ต่างกัน)
4. Push โค้ดขึ้น GitHub
5. รัน:

```bash
npm run deploy
```

6. ใน GitHub ไปที่ Settings → Pages → Source เลือก branch **gh-pages** โฟลเดอร์ **/ (root)**  
7. เปิด `https://<username>.github.io/PythonTurtle/`
