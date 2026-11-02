import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

export function BeforeAfter({ src, alt }: { src: string; alt: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [demo, setDemo] = useState(false)

  // Short guided sweep the first time it scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers: number[] = []
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setDemo(true)
        ;[30, 68, 50].forEach((v, i) => timers.push(window.setTimeout(() => !dragging.current && setPos(v), 400 + i * 700)))
        timers.push(window.setTimeout(() => setDemo(false), 2600))
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const ease = demo ? { transition: 'clip-path .7s cubic-bezier(.65,0,.35,1), left .7s cubic-bezier(.65,0,.35,1)' } : undefined
  const moveTo = (x: number) => {
    const r = ref.current!.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-navy/10 md:aspect-[16/10]"
      onPointerDown={(e) => {
        dragging.current = true
        setDemo(false)
        e.currentTarget.setPointerCapture(e.pointerId)
        moveTo(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, ...ease }}>
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: 'grayscale(0.75) contrast(0.8) brightness(0.55) sepia(0.35)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(40,30,10,.35),transparent_60%)]" />
      </div>
      <span className="kicker absolute top-4 left-4 rounded-full bg-black/60 px-2.5 py-1 text-white">Before</span>
      <span className="kicker absolute top-4 right-4 rounded-full bg-lime px-2.5 py-1 text-navy">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%`, ...ease }}>
        <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-navy shadow-lg">
          <Icon name="swap" size={18} />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}
