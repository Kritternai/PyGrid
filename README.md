# PyGrid

**Thai / ภาษาไทย:** เกมเต่าเดิน Grid เพื่อฝึกทักษะการคิดเชิงอัลกอริทึม

**English:** A grid-based turtle movement game for learning algorithmic thinking.

<p align="center">
  <img src="docs/demo.gif" alt="PyGrid Demo" width="700">
</p>

---

## About / เกี่ยวกับโปรเจกต์

**Thai:**
เว็บเกมสำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 1 สอดคล้องกับตัวชี้วัด ว 4.2 ม.1/1 (ออกแบบอัลกอริทึมด้วยแนวคิดเชิงนามธรรม) ผู้เล่นเขียนคำสั่งภาษาไทยเพื่อควบคุมเต่าให้เดินเก็บแอปเปิ้ลบน Grid

**English:**
A web-based educational game for Grade 7 students aligned with Thai curriculum standard (Wo 4.2 Mo.1/1 - Algorithm design with abstract thinking). Players write Thai-language commands to control a turtle collecting apples on a grid.

---

## Features / คุณสมบัติ

**Thai:**
- ควบคุมเต่าด้วยคำสั่งภาษาไทย: เดินหน้า(n), เลี้ยวซ้าย(), เลี้ยวขวา()
- 12 ด่านที่มีความยากเพิ่มขึ้นตามลำดับ
- ระบบกำแพง กุญแจ/ประตู และประตูเทเลพอร์ต
- บันทึกความคืบหน้าอัตโนมัติในเบราว์เซอร์
- รองรับการแสดงผลทุกขนาดหน้าจอ

**English:**
- Control turtle with Thai commands: forward(n), turnLeft(), turnRight()
- 12 progressive levels with increasing difficulty
- Game mechanics: walls, keys/doors, teleportation portals
- Auto-save progress using browser localStorage
- Responsive design for all screen sizes

---

## Tech Stack / เทคโนโลยีที่ใช้

- React 18
- Vite
- Tailwind CSS

---

## Live Demo / ทดลองเล่น

https://kritternai.github.io/PyGrid/

---

## Installation / การติดตั้ง

### Prerequisites / สิ่งที่ต้องมี

- Node.js (v18 or higher recommended)
- npm

### Local Development / รันบนเครื่อง

```bash
npm install
npm run dev
```

Open browser at `http://localhost:5173`

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

### Build / สร้างไฟล์สำหรับ Production

```bash
npm run build
```

Output will be in the `dist/` folder.

ผลลัพธ์จะอยู่ในโฟลเดอร์ `dist/`

---

## Deployment / การ Deploy

### Deploy to GitHub Pages

1. Create a repository on GitHub (e.g., `PyGrid`)

   สร้าง repo บน GitHub (เช่น `PyGrid`)

2. Update `package.json`:

   แก้ไข `package.json`:

   ```json
   "homepage": "https://<username>.github.io/PyGrid/"
   ```

3. Update `vite.config.js`:

   แก้ไข `vite.config.js`:

   ```js
   base: '/PyGrid/'
   ```

4. Push code to GitHub

   Push โค้ดขึ้น GitHub

5. Run deploy command:

   รันคำสั่ง deploy:

   ```bash
   npm run deploy
   ```

6. In GitHub, go to Settings > Pages > Source, select branch `gh-pages` and folder `/ (root)`

   ใน GitHub ไปที่ Settings > Pages > Source เลือก branch `gh-pages` โฟลเดอร์ `/ (root)`

7. Access your site at `https://<username>.github.io/PyGrid/`

   เข้าใช้งานที่ `https://<username>.github.io/PyGrid/`

---

## License / สัญญาอนุญาต

MIT License - See [LICENSE](LICENSE) file for details.

MIT License - ดูรายละเอียดในไฟล์ [LICENSE](LICENSE)
