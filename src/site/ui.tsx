import { company } from './data'
import { Icon } from './Icon'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { img } from './data'

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/')
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || '#/')
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash.replace(/^#/, '') || '/'
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? 'in' : ''} ${className}`}>
      {children}
    </div>
  )
}

const variants = {
  lime: 'bg-lime text-navy hover:bg-white',
  navy: 'bg-navy text-white hover:bg-navy-deep',
  ghost: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  'ghost-light': 'border border-white/35 text-white hover:bg-white hover:text-navy',
}

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: keyof typeof variants
  size?: 'sm' | 'md'
  className?: string
  type?: 'button' | 'submit'
}

export function Button({ children, onClick, href, variant = 'lime', size = 'md', className = '', type = 'button' }: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-300 ${
    size === 'sm' ? 'h-10 px-5 text-sm' : 'h-12 px-6 text-[0.9375rem]'
  } ${variants[variant]} ${className}`
  const arrow = (
    <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
      →
    </span>
  )
  return href ? (
    <a href={href} className={cls}>
      {children}
      {arrow}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={cls}>
      {children}
      {arrow}
    </button>
  )
}

export function Kicker({ children, light, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`kicker flex items-center gap-2.5 ${light ? 'text-lime' : 'text-navy/70'} ${className}`}>
      <span className={`h-px w-6 ${light ? 'bg-lime' : 'bg-navy/60'}`} />
      {children}
    </p>
  )
}

export function Star({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" fill="currentColor" />
    </svg>
  )
}

/** Page width: 1600px max, generous gutters. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-5 md:px-10 xl:px-16 ${className}`}>{children}</div>
}

/** Shared heading scale: 34px on phones, ~64px on large desktop. */
export const h2Class = 'text-[clamp(2.125rem,4.2vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em]'

export function SectionHead({
  kicker,
  title,
  body,
  center,
  light,
}: {
  kicker: ReactNode
  title: ReactNode
  body?: ReactNode
  center?: boolean
  light?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center [&_.kicker]:justify-center' : 'max-w-3xl'}>
      <Kicker light={light}>{kicker}</Kicker>
      <h2 className={`mt-4 ${h2Class}`}>{title}</h2>
      {body && (
        <p className={`mt-4 leading-relaxed md:text-lg ${light ? 'text-white/70' : 'text-navy/65'} ${center ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
          {body}
        </p>
      )}
    </div>
  )
}

export function PageHero({ kicker, title, children, image }: { kicker: string; title: ReactNode; children?: ReactNode; image?: string }) {
  return (
    <section className="bg-navy-deep px-2 pt-16 pb-2 md:px-3 md:pt-24">
      <div className="relative overflow-hidden rounded-3xl bg-navy text-white">
        {image && (
          <div className="absolute inset-y-0 right-0 hidden w-[44%] overflow-hidden md:block">
            <img src={image} alt="" className="kenburns h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
          </div>
        )}
        <Container className="relative py-16 md:py-28">
          <Kicker light>{kicker}</Kicker>
          <h1 className="fade-in mt-5 max-w-3xl text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-6xl lg:text-[4.75rem]">
            {title}
          </h1>
          <span className="wipe-in mt-6 block h-1 w-16 rounded-full bg-lime" />
          {children && <p className="mt-6 max-w-xl leading-relaxed text-white/75 md:text-lg">{children}</p>}
        </Container>
      </div>
    </section>
  )
}

/** Paragraph whose words light up as it scrolls into view. */
export function ScrollText({ parts, className = '' }: { parts: [string, boolean?][]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setProgress(1)
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const vh = window.innerHeight
        setProgress(Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35))))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(raf)
    }
  }, [])
  const words = parts.flatMap(([text, mark]) =>
    text
      .split(' ')
      .filter(Boolean)
      .map((w) => [w, !!mark] as const),
  )
  return (
    <p ref={ref} className={className}>
      {words.map(([w, mark], i) => {
        const on = i / words.length < progress
        return (
          <span
            key={i}
            className={`transition-[opacity,background-color] duration-300 ${on ? 'opacity-100' : 'opacity-20'} ${mark ? 'bg-navy px-0.5 text-lime' : ''}`}
          >
            {w}{' '}
          </span>
        )
      })}
    </p>
  )
}

export function ContactCta({ title = 'Tell us about your site. We will plan the rest.' }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-lime">
      <Container className="relative grid items-center gap-8 py-14 md:grid-cols-[1fr_auto] md:py-24">
        <div>
          <p className="kicker text-navy/70">Get in touch</p>
          <h2 className={`mt-4 max-w-xl text-navy ${h2Class}`}>{title}</h2>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button variant="navy" href="#/contact">
              Request a site assessment
            </Button>
            <Button variant="ghost" href="#/contact?topic=Pilot" className="border-navy/30 text-navy hover:bg-navy/10">
              Start a pilot area
            </Button>
            <a
              href={company.capabilityPdf}
              download
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy/20 bg-white/70 px-4 py-2.5 text-xs font-bold text-navy shadow-sm transition hover:bg-white active:scale-95"
            >
              <Icon name="download" size={13} /> Capability Statement (PDF)
            </a>
          </div>
        </div>
        <a
          href="#/contact"
          aria-label="Request a site assessment"
          className="group relative hidden h-32 w-32 place-items-center rounded-full bg-navy text-lime transition-transform duration-500 hover:scale-105 md:grid"
        >
          <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="cta-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <text className="fill-current font-display text-[0.9375rem] font-semibold tracking-[0.32em] uppercase">
              <textPath href="#cta-circle">Site Assessment · Available 24/7 ·</textPath>
            </text>
          </svg>
          <span className="font-display text-2xl transition-transform duration-300 group-hover:-rotate-45" aria-hidden>
            →
          </span>
        </a>
      </Container>
    </section>
  )
}
