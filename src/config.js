// --- GAME CONFIG ---
export const CELL_SIZE = 72
export const DELAY_MS = 600

// Levels structure:
// - start: { x, y, dir } — starting position and direction (0=East, 90=North, 180=West, 270=South)
// - apples: [{ x, y }, ...] — apple positions (must collect ALL to win)
// - gridSize: number — grid dimensions
// - walls: [{ x, y }, ...] — wall positions
// - keys: [{ x, y, id }, ...] — key positions with color id (1=gold, 2=silver, 3=bronze)
// - doors: [{ x, y, keyId }, ...] — door positions that require matching key
// - portals: [{ x1, y1, x2, y2, color }, ...] — portal pairs (blue, purple, orange)
// - hint: string — level hint text

export const LEVELS = [
  // Level 1: พื้นฐาน — เดินตรง
  {
    id: 1,
    start: { x: 0, y: 2, dir: 0 },
    apples: [{ x: 4, y: 2 }],
    gridSize: 6,
    walls: [],
    keys: [],
    doors: [],
    portals: [],
    hint: 'เดินตรงไปเก็บแอปเปิ้ลเลย! ใช้ เดินหน้า(n)',
    defaultCode: '',
  },
  // Level 2: พื้นฐาน — เลี้ยว 1 ครั้ง
  {
    id: 2,
    start: { x: 0, y: 4, dir: 0 },
    apples: [{ x: 3, y: 1 }],
    gridSize: 6,
    walls: [],
    keys: [],
    doors: [],
    portals: [],
    hint: 'ต้องเลี้ยวด้วยนะ! ใช้ เลี้ยวซ้าย() หรือ เลี้ยวขวา()',
    defaultCode: '',
  },
  // Level 3: กำแพงง่าย
  {
    id: 3,
    start: { x: 0, y: 4, dir: 0 },
    apples: [{ x: 6, y: 2 }],
    gridSize: 8,
    walls: [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }],
    keys: [],
    doors: [],
    portals: [],
    hint: 'มีกำแพงขวาง ต้องอ้อมไปนะ!',
    defaultCode: '',
  },
  // Level 4: กำแพงรูป L
  {
    id: 4,
    start: { x: 0, y: 0, dir: 0 },
    apples: [{ x: 6, y: 6 }],
    gridSize: 8,
    walls: [
      { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 },
      { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
    ],
    keys: [],
    doors: [],
    portals: [],
    hint: 'กำแพงรูปตัว L! ต้องวางแผนเส้นทางดีๆ',
    defaultCode: '',
  },
  // Level 5: แอปเปิ้ล 2 ลูก
  {
    id: 5,
    start: { x: 0, y: 3, dir: 0 },
    apples: [{ x: 3, y: 1 }, { x: 5, y: 5 }],
    gridSize: 8,
    walls: [],
    keys: [],
    doors: [],
    portals: [],
    hint: 'ต้องเก็บแอปเปิ้ลให้ครบ 2 ลูกนะ!',
    defaultCode: '',
  },
  // Level 6: แอปเปิ้ล 3 ลูก + กำแพง
  {
    id: 6,
    start: { x: 0, y: 5, dir: 0 },
    apples: [{ x: 2, y: 2 }, { x: 7, y: 2 }, { x: 5, y: 8 }],
    gridSize: 10,
    walls: [
      { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 },
      { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 }, { x: 4, y: 9 },
    ],
    keys: [],
    doors: [],
    portals: [],
    hint: 'เก็บแอปเปิ้ล 3 ลูก! ต้องวางแผนลำดับการเก็บ',
    defaultCode: '',
  },
  // Level 7: กุญแจ + ประตู
  {
    id: 7,
    start: { x: 0, y: 3, dir: 0 },
    apples: [{ x: 7, y: 3 }],
    gridSize: 8,
    walls: [
      { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 },
      { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 },
    ],
    keys: [{ x: 2, y: 6, id: 1 }],
    doors: [{ x: 4, y: 3, keyId: 1 }],
    portals: [],
    hint: 'ประตูล็อคอยู่! ต้องไปเก็บกุญแจทองก่อนนะ',
    defaultCode: '',
  },
  // Level 8: 2 กุญแจ + 2 ประตู
  {
    id: 8,
    start: { x: 0, y: 5, dir: 0 },
    apples: [{ x: 9, y: 5 }],
    gridSize: 10,
    walls: [
      { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
      { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 },
      { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 },
      { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 },
    ],
    keys: [{ x: 1, y: 1, id: 1 }, { x: 4, y: 8, id: 2 }],
    doors: [{ x: 3, y: 5, keyId: 1 }, { x: 6, y: 5, keyId: 2 }],
    portals: [],
    hint: 'มี 2 ประตู! ต้องหากุญแจให้ถูกสีนะ (ทอง/เงิน)',
    defaultCode: '',
  },
  // Level 9: เทเลพอร์ต
  {
    id: 9,
    start: { x: 0, y: 0, dir: 0 },
    apples: [{ x: 9, y: 9 }],
    gridSize: 10,
    walls: [
      { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
      { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 }, { x: 4, y: 9 },
    ],
    keys: [],
    doors: [],
    portals: [{ x1: 2, y1: 5, x2: 7, y2: 5, color: 'blue' }],
    hint: 'ประตูเทเลพอร์ต! เข้าวงสีน้ำเงินจะออกอีกฝั่ง',
    defaultCode: '',
  },
  // Level 10: รวมทุกลูกเล่น
  {
    id: 10,
    start: { x: 0, y: 0, dir: 0 },
    apples: [{ x: 5, y: 2 }, { x: 10, y: 10 }],
    gridSize: 12,
    walls: [
      // กำแพงกั้นซ้าย-กลาง
      { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 },
      { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
      // กำแพงกั้นกลาง-ขวา
      { x: 8, y: 0 }, { x: 8, y: 1 }, { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 },
      { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }, { x: 8, y: 11 },
    ],
    keys: [{ x: 1, y: 10, id: 1 }],
    doors: [{ x: 3, y: 4, keyId: 1 }],
    portals: [{ x1: 6, y1: 8, x2: 10, y2: 2, color: 'purple' }],
    hint: 'ด่านสุดท้าย! รวมทุกอย่าง: แอปเปิ้ล กุญแจ ประตู และเทเลพอร์ต',
    defaultCode: '',
  },
]
