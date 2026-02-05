import React, { useState, useCallback, useRef, useEffect } from 'react'
import { CELL_SIZE as CELL_SIZE_DEFAULT, DELAY_MS, LEVELS } from './config'

const MIN_CELL = 32
const MAX_CELL = 96

// --- KID-FRIENDLY ICONS (cute cartoon style) ---
const TurtleIcon = ({ dir, className = 'w-10 h-10' }) => (
  <div
    className={`flex items-center justify-center transition-transform duration-500 ${className}`}
    style={{ transform: `rotate(${-dir}deg)` }}
    title={`หันไปทิศ ${dir === 0 ? 'ขวา' : dir === 90 ? 'บน' : dir === 180 ? 'ซ้าย' : 'ล่าง'}`}
  >
    <svg viewBox="0 0 64 64" fill="none" className="drop-shadow-lg w-full h-full">
      {/* กระดอง */}
      <ellipse cx="28" cy="34" rx="18" ry="16" fill="#66BB6A" stroke="#388E3C" strokeWidth="2" />
      <ellipse cx="28" cy="34" rx="12" ry="10" fill="#81C784" stroke="#4CAF50" strokeWidth="1" />
      {/* ลายบนกระดอง */}
      <path d="M28 24 L28 44" stroke="#4CAF50" strokeWidth="1.5" />
      <path d="M18 34 L38 34" stroke="#4CAF50" strokeWidth="1.5" />
      {/* ขา */}
      <ellipse cx="14" cy="26" rx="5" ry="4" fill="#A5D6A7" stroke="#66BB6A" strokeWidth="1.5" />
      <ellipse cx="14" cy="42" rx="5" ry="4" fill="#A5D6A7" stroke="#66BB6A" strokeWidth="1.5" />
      <ellipse cx="42" cy="42" rx="4" ry="3" fill="#A5D6A7" stroke="#66BB6A" strokeWidth="1.5" />
      {/* หาง */}
      <ellipse cx="10" cy="34" rx="3" ry="2" fill="#A5D6A7" stroke="#66BB6A" strokeWidth="1" />
      {/* หัว — ชี้ไปทางขวา */}
      <ellipse cx="50" cy="34" rx="10" ry="9" fill="#A5D6A7" stroke="#66BB6A" strokeWidth="2" />
      {/* ตา */}
      <circle cx="54" cy="31" r="3" fill="white" stroke="#388E3C" strokeWidth="1" />
      <circle cx="55" cy="31" r="1.5" fill="#1B5E20" />
      {/* ปากยิ้ม */}
      <path d="M52 37 Q55 40 58 37" stroke="#388E3C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* แก้มแดง */}
      <circle cx="57" cy="35" r="2" fill="#FFAB91" opacity="0.6" />
    </svg>
  </div>
)

const AppleIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 64 64" fill="none" className="drop-shadow-lg w-full h-full animate-[bounce_2s_ease-in-out_infinite]">
      {/* ตัวแอปเปิ้ล */}
      <path d="M32 18 C16 18 10 32 10 42 C10 54 20 58 32 58 C44 58 54 54 54 42 C54 32 48 18 32 18 Z" fill="#F44336" stroke="#C62828" strokeWidth="2" />
      {/* ไฮไลต์ */}
      <ellipse cx="22" cy="34" rx="6" ry="8" fill="#EF5350" opacity="0.5" />
      <ellipse cx="20" cy="30" rx="3" ry="4" fill="#FFCDD2" opacity="0.8" />
      {/* ก้าน */}
      <path d="M32 18 Q34 12 32 6" stroke="#795548" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* ใบ */}
      <path d="M33 10 Q42 6 46 12 Q42 14 33 10 Z" fill="#66BB6A" stroke="#43A047" strokeWidth="1" />
      <path d="M35 11 Q40 10 42 12" stroke="#81C784" strokeWidth="1" fill="none" />
    </svg>
  </div>
)

const StarIcon = () => (
  <svg className="w-8 h-8 flex-shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const CheckIcon = () => (
  <svg className="w-7 h-7 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
)
const AlertIcon = () => (
  <svg className="w-7 h-7 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)
const PlayIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)
const ResetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)
const PresentationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
  </svg>
)
const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

// Key colors by ID
const KEY_COLORS = {
  1: { fill: '#FFD700', stroke: '#B8860B', name: 'ทอง' },
  2: { fill: '#C0C0C0', stroke: '#808080', name: 'เงิน' },
  3: { fill: '#CD7F32', stroke: '#8B4513', name: 'ทองแดง' },
}

const KeyIcon = ({ keyId = 1, className = 'w-10 h-10' }) => {
  const colors = KEY_COLORS[keyId] || KEY_COLORS[1]
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="drop-shadow-lg w-full h-full animate-[pulse_2s_ease-in-out_infinite]">
        {/* หัวกุญแจ */}
        <circle cx="20" cy="20" r="14" fill={colors.fill} stroke={colors.stroke} strokeWidth="3" />
        <circle cx="20" cy="20" r="6" fill="white" stroke={colors.stroke} strokeWidth="2" />
        {/* ก้านกุญแจ */}
        <rect x="30" y="16" width="28" height="8" rx="2" fill={colors.fill} stroke={colors.stroke} strokeWidth="2" />
        {/* ฟันกุญแจ */}
        <rect x="48" y="24" width="6" height="10" rx="1" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" />
        <rect x="38" y="24" width="6" height="8" rx="1" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" />
        {/* ประกาย */}
        <circle cx="14" cy="14" r="2" fill="white" opacity="0.8" />
      </svg>
    </div>
  )
}

const DoorIcon = ({ keyId = 1, isOpen = false, className = 'w-10 h-10' }) => {
  const colors = KEY_COLORS[keyId] || KEY_COLORS[1]
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="drop-shadow-lg w-full h-full">
        {/* กรอบประตู */}
        <rect x="8" y="4" width="48" height="56" rx="4" fill={isOpen ? '#e8f5e9' : colors.fill} stroke={colors.stroke} strokeWidth="3" />
        {/* แผงประตู */}
        <rect x="14" y="10" width="36" height="44" rx="2" fill={isOpen ? '#c8e6c9' : colors.stroke} opacity="0.3" />
        {/* ลูกบิด */}
        <circle cx="44" cy="34" r="5" fill={colors.stroke} stroke={colors.fill} strokeWidth="2" />
        {/* รูกุญแจ */}
        {!isOpen && (
          <>
            <ellipse cx="44" cy="34" rx="2" ry="3" fill="#1a1a1a" />
            <rect x="43" y="36" width="2" height="4" fill="#1a1a1a" />
          </>
        )}
        {/* เครื่องหมายถูกเมื่อเปิด */}
        {isOpen && (
          <path d="M24 32 L30 38 L40 26" stroke="#2e7d32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        )}
      </svg>
    </div>
  )
}

// Portal colors
const PORTAL_COLORS = {
  blue: { inner: '#2196F3', outer: '#0D47A1', glow: '#64B5F6' },
  purple: { inner: '#9C27B0', outer: '#4A148C', glow: '#CE93D8' },
  orange: { inner: '#FF9800', outer: '#E65100', glow: '#FFB74D' },
}

const PortalIcon = ({ color = 'blue', className = 'w-10 h-10' }) => {
  const colors = PORTAL_COLORS[color] || PORTAL_COLORS.blue
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="drop-shadow-lg w-full h-full animate-spin" style={{ animationDuration: '3s' }}>
        {/* วงนอก */}
        <circle cx="32" cy="32" r="28" fill="none" stroke={colors.outer} strokeWidth="6" strokeDasharray="20 10" />
        {/* วงกลาง */}
        <circle cx="32" cy="32" r="20" fill="none" stroke={colors.inner} strokeWidth="5" strokeDasharray="15 8" />
        {/* วงใน */}
        <circle cx="32" cy="32" r="12" fill={colors.glow} opacity="0.6" />
        <circle cx="32" cy="32" r="6" fill="white" opacity="0.8" />
      </svg>
    </div>
  )
}

// LocalStorage key for completed levels
const STORAGE_KEY = 'turtleGame_completedLevels'

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const level = LEVELS[currentLevelIndex]
  const gridSize = level.gridSize
  const initialTurtle = { ...level.start }
  const [code, setCode] = useState(level.defaultCode)
  const [turtle, setTurtle] = useState(initialTurtle)
  const [path, setPath] = useState([{ x: initialTurtle.x, y: initialTurtle.y }])
  const [isPlaying, setIsPlaying] = useState(false)
  const [message, setMessage] = useState(null)
  const [activeLine, setActiveLine] = useState(-1)
  const [demoMode, setDemoMode] = useState(false)
  const [showCoords, setShowCoords] = useState(true)
  const [collectedApples, setCollectedApples] = useState([]) // indices of collected apples
  const [collectedKeys, setCollectedKeys] = useState([]) // keyIds of collected keys
  const [completedLevels, setCompletedLevels] = useState(() => {
    // Load from localStorage on init
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const editorRef = useRef(null)
  const gameAreaRef = useRef(null)
  const [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)

  // Save completed levels to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLevels))
    } catch {
      // Ignore storage errors
    }
  }, [completedLevels])

  // Mark level as completed
  const markLevelComplete = useCallback((levelId) => {
    setCompletedLevels((prev) => {
      if (prev.includes(levelId)) return prev
      return [...prev, levelId]
    })
  }, [])

  useEffect(() => {
    const el = gameAreaRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      const size = Math.min(w, h)
      const cs = Math.floor(size / gridSize)
      setCellSize(Math.min(MAX_CELL, Math.max(MIN_CELL, cs)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [gridSize])

  const resetGame = useCallback(() => {
    const L = LEVELS[currentLevelIndex]
    const start = { ...L.start }
    setTurtle(start)
    setPath([{ x: start.x, y: start.y }])
    setIsPlaying(false)
    setMessage(null)
    setActiveLine(-1)
    setCollectedApples([])
    setCollectedKeys([])
  }, [currentLevelIndex])

  const handleLevelChange = useCallback((index) => {
    if (isPlaying) return
    setCurrentLevelIndex(index)
    const L = LEVELS[index]
    setCode(L.defaultCode)
    const start = { ...L.start }
    setTurtle(start)
    setPath([{ x: start.x, y: start.y }])
    setMessage(null)
    setActiveLine(-1)
    setCollectedApples([])
    setCollectedKeys([])
  }, [isPlaying])

  // Go to next level
  const goToNextLevel = useCallback(() => {
    if (currentLevelIndex < LEVELS.length - 1) {
      handleLevelChange(currentLevelIndex + 1)
      setMessage(null)
    }
  }, [currentLevelIndex, handleLevelChange])

  const parseAndRun = async () => {
    if (isPlaying) return
    resetGame()
    setIsPlaying(true)
    setMessage(null)

    const lines = code.split('\n')
    let current = { ...initialTurtle }
    const steps = []

    // Local state for tracking during execution
    let localCollectedKeys = []
    let localCollectedApples = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line || line.startsWith('#')) continue
      const walkMatch = line.match(/^เดินหน้า\s*\(\s*(\d+)\s*\)/)
      if (walkMatch) {
        const n = parseInt(walkMatch[1], 10)
        for (let k = 0; k < n; k++) steps.push({ type: 'MOVE', lineIndex: i })
      } else if (line.includes('เลี้ยวซ้าย') && /\(\s*\)/.test(line)) {
        steps.push({ type: 'LEFT', lineIndex: i })
      } else if (line.includes('เลี้ยวขวา') && /\(\s*\)/.test(line)) {
        steps.push({ type: 'RIGHT', lineIndex: i })
      } else if ((line.includes('เก็บแอปเปิ้ล') || line.includes('เก็บแอปเปิล')) && /\(\s*\)/.test(line)) {
        steps.push({ type: 'CHECK_WIN', lineIndex: i })
      } else {
        setMessage({ type: 'error', text: `คำสั่งไม่รู้จักนะ ลองตรวจบรรทัดที่ ${i + 1}` })
        setIsPlaying(false)
        return
      }
    }

    for (const step of steps) {
      setActiveLine(step.lineIndex)
      await new Promise((r) => setTimeout(r, DELAY_MS))

      if (step.type === 'MOVE') {
        let newX = current.x
        let newY = current.y
        if (current.dir === 0) newX += 1
        else if (current.dir === 90) newY -= 1
        else if (current.dir === 180) newX -= 1
        else if (current.dir === 270) newY += 1

        // Check boundary
        if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
          setMessage({ type: 'error', text: 'เต่าชนขอบแล้ว ลองใหม่นะ' })
          setIsPlaying(false)
          return
        }

        // Check walls
        const walls = level.walls || []
        const hitWall = walls.some((w) => w.x === newX && w.y === newY)
        if (hitWall) {
          setMessage({ type: 'error', text: 'เต่าชนกำแพงแล้ว ลองใหม่นะ' })
          setIsPlaying(false)
          return
        }

        // Check doors
        const doors = level.doors || []
        const door = doors.find((d) => d.x === newX && d.y === newY)
        if (door) {
          if (!localCollectedKeys.includes(door.keyId)) {
            const keyName = KEY_COLORS[door.keyId]?.name || 'กุญแจ'
            setMessage({ type: 'error', text: `ประตูล็อคอยู่! ต้องหา${keyName}ก่อนนะ` })
            setIsPlaying(false)
            return
          }
          // Has key, can pass through
        }

        // Move to new position
        current = { ...current, x: newX, y: newY }
        setTurtle(current)
        setPath((prev) => [...prev, { x: newX, y: newY }])

        // Check if stepped on a key (auto-collect)
        const keys = level.keys || []
        const key = keys.find((k) => k.x === newX && k.y === newY && !localCollectedKeys.includes(k.id))
        if (key) {
          localCollectedKeys = [...localCollectedKeys, key.id]
          setCollectedKeys([...localCollectedKeys])
        }

        // Check if stepped on a portal (teleport)
        const portals = level.portals || []
        for (const portal of portals) {
          if (portal.x1 === newX && portal.y1 === newY) {
            // Teleport to x2, y2
            await new Promise((r) => setTimeout(r, DELAY_MS / 2))
            current = { ...current, x: portal.x2, y: portal.y2 }
            setTurtle(current)
            setPath((prev) => [...prev, { x: portal.x2, y: portal.y2 }])
            break
          } else if (portal.x2 === newX && portal.y2 === newY) {
            // Teleport to x1, y1
            await new Promise((r) => setTimeout(r, DELAY_MS / 2))
            current = { ...current, x: portal.x1, y: portal.y1 }
            setTurtle(current)
            setPath((prev) => [...prev, { x: portal.x1, y: portal.y1 }])
            break
          }
        }

      } else if (step.type === 'LEFT') {
        current = { ...current, dir: (current.dir + 90) % 360 }
        setTurtle(current)
      } else if (step.type === 'RIGHT') {
        current = { ...current, dir: (current.dir - 90 + 360) % 360 }
        setTurtle(current)
      } else if (step.type === 'CHECK_WIN') {
        // Check if standing on an uncollected apple
        const apples = level.apples || []
        const appleIndex = apples.findIndex(
          (a, idx) => a.x === current.x && a.y === current.y && !localCollectedApples.includes(idx)
        )

        if (appleIndex !== -1) {
          // Collect this apple
          localCollectedApples = [...localCollectedApples, appleIndex]
          setCollectedApples([...localCollectedApples])

          // Check if all apples collected
          if (localCollectedApples.length === apples.length) {
            const isLastLevel = currentLevelIndex === LEVELS.length - 1
            const successText = isLastLevel
              ? 'ยอดเยี่ยม! เก็บแอปเปิ้ลครบแล้ว สิ่งที่เรียนวันนี้ เอาไปใช้ควบคุมการเคลื่อนที่ในเกมได้'
              : 'เก่งมาก! เก็บแอปเปิ้ลครบแล้ว'
            markLevelComplete(level.id)
            setMessage({ type: 'success', text: successText, levelComplete: true })
            setIsPlaying(false)
            return
          } else {
            // More apples to collect, continue
            setMessage({ type: 'success', text: `เก็บได้แล้ว! เหลืออีก ${apples.length - localCollectedApples.length} ลูก` })
            await new Promise((r) => setTimeout(r, DELAY_MS))
            setMessage(null)
          }
        } else {
          // Not standing on an apple
          const remaining = apples.length - localCollectedApples.length
          setMessage({ type: 'error', text: `ยังไม่มีแอปเปิ้ลตรงนี้นะ เหลืออีก ${remaining} ลูก` })
          setIsPlaying(false)
          return
        }
      }
    }
    setIsPlaying(false)
  }

  const gridCells = []
  const wallsSet = new Set((level.walls || []).map((w) => `${w.x},${w.y}`))
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      gridCells.push({ x: col, y: row, isWall: wallsSet.has(`${col},${row}`) })
    }
  }

  const insertAtCursor = (text) => {
    const ta = editorRef.current
    if (ta) {
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const before = code.slice(0, start)
      const after = code.slice(end)
      const newCode = before + text + after
      setCode(newCode)
      setTimeout(() => {
        ta.focus()
        const pos = start + text.length
        ta.setSelectionRange(pos, pos)
      }, 0)
    } else {
      setCode((prev) => (prev ? prev + '\n' + text : text))
    }
  }

  const handleInsertCommand = (cmd) => {
    const text = cmd === 'เดินหน้า(n)' ? 'เดินหน้า(1)' : cmd
    const ta = editorRef.current
    const start = ta ? ta.selectionStart : 0
    const toInsert = start > 0 ? '\n' + text : text
    insertAtCursor(toInsert)
  }

  return (
    <div className={`flex flex-col h-full text-slate-800 ${demoMode ? 'demo-mode' : ''}`} style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #b2dfdb 50%, #e8f5e9 100%)' }}>
      {/* Header — kid orange/sun gradient */}
      <header className="bg-gradient-to-r from-[#ff9800] via-[#ffc107] to-[#ff9800] text-white shadow-lg flex-shrink-0">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight drop-shadow-sm truncate">🐢 เต่าน้อยผจญภัย</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setDemoMode(!demoMode)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all shadow-md ${demoMode ? 'bg-white text-[#e65100]' : 'bg-white/25 hover:bg-white/35 text-white border-2 border-white/50'}`}
              title={demoMode ? 'แสดงช่องพิมพ์โค้ด' : 'โหมดสาธิต'}
            >
              <PresentationIcon />
              <span className="hidden sm:inline">{demoMode ? 'แสดงโค้ด' : 'โหมดสาธิต'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main: Game (left) + Editor (right) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* LEFT: Game — tabs (left) + grid/content (right) */}
        <div className={`flex-1 flex flex-row min-h-0 p-2 sm:p-3 overflow-hidden ${demoMode ? 'md:flex-1' : ''}`} style={{ background: 'linear-gradient(to bottom right, #e0f7fa, #b2dfdb)' }}>
          {/* Vertical tabs — left strip */}
          <aside className="flex flex-col gap-1 sm:gap-2 flex-shrink-0 w-12 sm:w-14 md:w-16 py-1 sm:py-2" aria-label="เลือกด่าน">
            {LEVELS.map((L, idx) => {
              const isCompleted = completedLevels.includes(L.id)
              return (
                <button
                  key={L.id}
                  type="button"
                  onClick={() => handleLevelChange(idx)}
                  disabled={isPlaying}
                  title={`ด่าน ${L.id}${isCompleted ? ' ✓' : ''}`}
                  className={`min-h-[2.5rem] sm:min-h-[3rem] rounded-r-xl sm:rounded-r-2xl text-base sm:text-lg font-bold transition-all shadow-md disabled:opacity-60 flex flex-col items-center justify-center py-1 gap-0 ${currentLevelIndex === idx ? 'bg-[#ff9800] text-white shadow-lg ring-2 ring-amber-300' : isCompleted ? 'bg-green-100 border border-green-300 text-green-700 hover:bg-green-50' : 'bg-white/90 border border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'}`}
                >
                  <span>{L.id}</span>
                  {isCompleted && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )
            })}
          </aside>

          {/* Content: grid + message + hint */}
          <div className="flex-1 flex flex-col items-center min-h-0 min-w-0 overflow-auto pl-2 sm:pl-3">
          {/* Grid wrapper — measures for responsive cell size */}
          <div ref={gameAreaRef} className="flex-1 min-h-0 min-w-0 flex items-center justify-center w-full">
            {/* Grid — cream, rounded, soft border */}
            <div
              className="rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-amber-200 relative overflow-hidden flex-shrink-0"
              style={{
                backgroundColor: '#fffbeb',
                width: gridSize * cellSize,
                height: gridSize * cellSize,
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              }}
            >
              {gridCells.map((cell, idx) => (
                <div
                  key={idx}
                  className={`relative border ${cell.isWall ? 'border-amber-700/60 bg-amber-800/90' : 'border-amber-100 bg-white'}`}
                >
                  {cell.isWall && (
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden title="กำแพง">
                      <svg viewBox="0 0 32 32" className="w-full h-full opacity-80" fill="#92400e" stroke="#78350f" strokeWidth="0.5">
                        <rect x="0" y="0" width="16" height="8" />
                        <rect x="16" y="8" width="16" height="8" />
                        <rect x="0" y="16" width="16" height="8" />
                        <rect x="16" y="24" width="16" height="8" />
                      </svg>
                    </div>
                  )}
                  {!cell.isWall && showCoords && (
                    <span className="absolute bottom-0 right-0.5 text-[8px] sm:text-[10px] text-slate-300 select-none">
                      {cell.x},{cell.y}
                    </span>
                  )}
                </div>
              ))}
              {/* Path dots */}
              {path.map((pos, idx) => (
                <div
                  key={`path-${idx}`}
                  className="absolute rounded-full pointer-events-none border-2 border-[#81c784]/60"
                  style={{
                    backgroundColor: 'rgba(178, 223, 219, 0.8)',
                    width: cellSize / 2.2,
                    height: cellSize / 2.2,
                    left: pos.x * cellSize + cellSize / 4,
                    top: pos.y * cellSize + cellSize / 4,
                  }}
                />
              ))}
              {/* Portals */}
              {(level.portals || []).map((portal, idx) => (
                <React.Fragment key={`portal-${idx}`}>
                  <div
                    className="absolute transition-all duration-300 flex items-center justify-center"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: portal.x1 * cellSize,
                      top: portal.y1 * cellSize,
                    }}
                  >
                    <PortalIcon color={portal.color} className={cellSize <= 40 ? 'w-8 h-8' : 'w-12 h-12'} />
                  </div>
                  <div
                    className="absolute transition-all duration-300 flex items-center justify-center"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: portal.x2 * cellSize,
                      top: portal.y2 * cellSize,
                    }}
                  >
                    <PortalIcon color={portal.color} className={cellSize <= 40 ? 'w-8 h-8' : 'w-12 h-12'} />
                  </div>
                </React.Fragment>
              ))}
              {/* Doors */}
              {(level.doors || []).map((door, idx) => (
                <div
                  key={`door-${idx}`}
                  className="absolute transition-all duration-300 flex items-center justify-center"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    left: door.x * cellSize,
                    top: door.y * cellSize,
                  }}
                >
                  <DoorIcon keyId={door.keyId} isOpen={collectedKeys.includes(door.keyId)} className={cellSize <= 40 ? 'w-8 h-8' : 'w-12 h-12'} />
                </div>
              ))}
              {/* Keys (only show if not collected) */}
              {(level.keys || []).filter(k => !collectedKeys.includes(k.id)).map((key, idx) => (
                <div
                  key={`key-${idx}`}
                  className="absolute transition-all duration-300 flex items-center justify-center"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    left: key.x * cellSize,
                    top: key.y * cellSize,
                  }}
                >
                  <KeyIcon keyId={key.id} className={cellSize <= 40 ? 'w-7 h-7' : 'w-11 h-11'} />
                </div>
              ))}
              {/* Apples (only show if not collected) */}
              {(level.apples || []).map((apple, idx) => (
                !collectedApples.includes(idx) && (
                  <div
                    key={`apple-${idx}`}
                    className="absolute transition-all duration-300 flex items-center justify-center"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: apple.x * cellSize,
                      top: apple.y * cellSize,
                    }}
                  >
                    <AppleIcon className={cellSize <= 40 ? 'w-8 h-8' : 'w-14 h-14'} />
                  </div>
                )
              ))}
              {/* Turtle */}
              <div
                className="absolute transition-all duration-500 ease-out z-10 flex items-center justify-center"
                style={{
                  width: cellSize,
                  height: cellSize,
                  left: turtle.x * cellSize,
                  top: turtle.y * cellSize,
                }}
              >
                <TurtleIcon dir={turtle.dir} className={cellSize <= 40 ? 'w-8 h-8' : 'w-14 h-14'} />
              </div>
            </div>
          </div>

          {/* Toggle coords (demo) */}
          {demoMode && (
            <label className="mt-2 sm:mt-3 flex items-center gap-2 text-sm sm:text-base text-slate-600 flex-shrink-0">
              <input type="checkbox" checked={showCoords} onChange={(e) => setShowCoords(e.target.checked)} className="rounded w-4 h-4" />
              แสดงพิกัด (x,y)
            </label>
          )}

          </div>
        </div>

        {/* RIGHT: Editor (hidden in demo) — kid-friendly */}
        {!demoMode && (
          <div className="w-full md:w-[400px] lg:w-[420px] flex flex-col bg-white border-l-0 md:border-l-2 border-slate-200 shadow-xl flex-shrink-0 min-h-0 min-w-0 overflow-hidden">
            {/* Aside: ภารกิจ + คำใบ้ + กล่องคำสั่ง */}
            <aside className="flex-shrink-0 overflow-auto p-3 sm:p-4 space-y-3 sm:space-y-4 border-b border-slate-200" style={{ background: 'linear-gradient(to bottom right, #ede9fe, #e0e7ff)' }}>
              <section>
                <h3 className="text-base sm:text-lg font-bold text-indigo-900 flex items-center gap-2">
                  <CodeIcon />
                  ภารกิจ: พาเต่าไปกินแอปเปิ้ล
                </h3>
                <p className="text-sm text-indigo-700 mt-1">
                  กดปุ่มด้านล่างเพื่อเพิ่มคำสั่งเข้าโค้ด
                </p>
              </section>
              <p className="text-sm text-slate-700 bg-white/70 rounded-lg px-3 py-2 border border-indigo-100">
                {level.hint}
              </p>
              <section className="rounded-lg border border-indigo-200 bg-white/90 px-2 py-2 shadow-sm">
                <p className="text-[10px] font-semibold text-indigo-700 mb-2 uppercase tracking-wide">คำสั่ง</p>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {[
                    { cmd: 'เดินหน้า(n)', label: 'เดินหน้า(n)' },
                    { cmd: 'เลี้ยวซ้าย()', label: 'เลี้ยวซ้าย' },
                    { cmd: 'เลี้ยวขวา()', label: 'เลี้ยวขวา' },
                    { cmd: 'เก็บแอปเปิ้ล()', label: 'เก็บแอปเปิ้ล' },
                  ].map(({ cmd, label }) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => handleInsertCommand(cmd)}
                      disabled={isPlaying}
                      className="h-8 sm:h-9 flex items-center justify-center bg-white border border-indigo-200 rounded-lg text-[10px] sm:text-xs text-slate-700 font-medium shadow-sm hover:bg-indigo-50 hover:border-indigo-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    >
                      <span className="truncate px-1">{label}</span>
                    </button>
                  ))}
                </div>
              </section>
            </aside>

            <div className="flex-1 flex min-h-0 min-w-0">
              <div className="w-8 sm:w-10 pt-3 sm:pt-4 pb-3 sm:pb-4 bg-slate-100 text-slate-500 text-xs sm:text-sm text-right pr-1.5 sm:pr-2 font-mono border-r-2 border-slate-200 flex-shrink-0">
                {code.split('\n').map((_, i) => (
                  <div
                    key={i}
                    className={`leading-6 sm:leading-7 ${activeLine === i ? 'text-indigo-600 font-bold bg-amber-100' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 min-w-0 p-3 sm:p-4 font-mono text-sm sm:text-base leading-6 sm:leading-7 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-r bg-amber-50/50 text-slate-800"
                spellCheck="false"
                placeholder="# เขียนคำสั่ง..."
                disabled={isPlaying}
              />
            </div>

            <div className="p-3 sm:p-4 border-t-2 border-slate-200 grid grid-cols-2 gap-3 sm:gap-4 bg-slate-50 flex-shrink-0">
              <button
                type="button"
                onClick={parseAndRun}
                disabled={isPlaying}
                className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg transition-all ${isPlaying ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#81c784] hover:bg-[#66bb6a] text-white hover:shadow-xl active:scale-[0.98] border-2 border-[#43a047]'}`}
              >
                {isPlaying ? 'กำลังทำงาน...' : (
                  <>
                    <PlayIcon />
                    รันเลย!
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetGame}
                disabled={isPlaying}
                className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                title="เริ่มใหม่"
              >
                <ResetIcon />
                เริ่มใหม่
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup — success/error message */}
      {message && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setMessage(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-message"
        >
          <div
            id="popup-message"
            className={`relative max-w-md w-full mx-4 px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-2xl border-2 ${message.type === 'success' ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#81c784]' : 'bg-[#ffebee] text-[#c62828] border-[#ef5350]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {message.type === 'success' ? <StarIcon /> : <AlertIcon />}
              <span className="font-semibold text-sm sm:text-base flex-1">{message.text}</span>
              <button
                type="button"
                onClick={() => setMessage(null)}
                className="flex-shrink-0 p-1.5 rounded-lg opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-currentColor"
                aria-label="ปิด"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Next Level Button */}
            {message.type === 'success' && message.levelComplete && currentLevelIndex < LEVELS.length - 1 && (
              <button
                type="button"
                onClick={goToNextLevel}
                className="mt-4 w-full py-3 rounded-xl bg-[#ff9800] hover:bg-[#f57c00] text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>ไปด่านถัดไป</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
