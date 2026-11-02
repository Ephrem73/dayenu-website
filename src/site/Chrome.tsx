import { useEffect, useRef, useState } from 'react'
import { company, services, tel } from './data'
import { Icon } from './Icon'
import { Button, Container } from './ui'

const mark = '/dayenu/mark.png'
const logo = '/dayenu/logo.png'

const links: [string, string][] = [
  ['About', '#/about'],
  ['Journal', '#/blog'],
]

// Header heights: 32px utility bar + 64px main bar.
const BAR = 64
const FULL = 96

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState(0)
  const s = services[active]
  return (
    <div className="grid max-h-[calc(100svh-6.5rem)] grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-5 overflow-y-auto rounded-b-2xl border border-t-0 border-navy/10 bg-white p-5 shadow-[0_24px_60px_rgba(10,19,50,.2)] lg:gap-8 lg:p-7">
      <div className="min-w-0">
        <div className="mb-3 flex items-end justify-between gap-4 border-b border-navy/10 pb-3">
          <div>
            <p className="kicker !text-[0.625rem] text-moss">What we do</p>
            <p className="mt-1 font-display text-lg font-bold tracking-tight text-navy">Services for cleaner spaces<span className="text-moss">.</span></p>
          </div>
          <span className="hidden pb-0.5 text-xs font-medium text-navy/45 lg:block">01 — 06</span>
        </div>
        <ul className="grid gap-1 lg:grid-cols-2 lg:gap-x-2">
          {services.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#/services/${item.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={onNavigate}
                className={`group grid min-h-12 grid-cols-[36px_minmax(0,1fr)_16px] items-center gap-3 rounded-xl px-2.5 py-2 text-[0.8125rem] font-semibold leading-snug text-navy transition-colors duration-200 lg:min-h-[4.25rem] ${
                  i === active ? 'bg-lime-soft' : 'hover:bg-paper'
                }`}
              >
                <span className={`grid h-9 w-9 place-items-center rounded-lg transition-colors ${i === active ? 'bg-lime' : 'bg-paper group-hover:bg-white'}`}>
                  <Icon name={item.icon} size={17} />
                </span>
                {item.name}
                <Icon name="arrow" size={14} className={`transition-all ${i === active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-30 group-hover:translate-x-0 group-hover:opacity-100'}`} />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#/services"
          onClick={onNavigate}
          className="group mt-3 inline-flex items-center gap-2 text-sm font-bold text-moss transition-colors hover:text-navy"
        >
          Explore all services <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
      <div key={s.id} className="fade-in relative isolate flex min-h-[290px] min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-navy p-5 text-white lg:p-6">
        <img src={s.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,19,50,.3)_0%,rgba(10,19,50,.65)_40%,rgba(10,19,50,.97)_100%)]" />
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/30 bg-navy/30 px-3 py-1.5 text-[0.625rem] font-bold tracking-[0.12em] uppercase backdrop-blur-sm">Service spotlight</span>
          <span className="text-xs font-semibold text-white/75">0{active + 1} / 06</span>
        </div>
        <div className="pt-12">
          <span className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-lime text-navy"><Icon name={s.icon} size={17} /></span>
          <h3 className="text-xl font-bold leading-tight lg:text-2xl">{s.name}</h3>
          <p className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-white/80">{s.blurb}</p>
          <a href={`#/services/${s.id}`} onClick={onNavigate} className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-lime">
            Discover service <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Header({ route }: { route: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [route])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMegaOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const open = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const close = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140)
  }

  const solid = scrolled || mobileOpen || megaOpen || route.startsWith('/blog/')
  const navLink = (active: boolean) =>
    `relative font-display text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-lime after:transition-all after:duration-300 ${
      active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    } ${solid ? 'text-navy' : 'text-white'}`
  const top = scrolled ? BAR : FULL

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${solid ? 'bg-white shadow-[0_1px_0_rgba(16,29,73,0.08)]' : 'bg-transparent'}`}
    >
      <div
        className={`hidden overflow-hidden border-b transition-[height,border-color] duration-500 md:block ${scrolled ? 'h-0' : 'h-8'} ${
          solid ? 'border-navy/10 bg-paper text-navy/65' : 'border-white/15 text-white/75'
        }`}
      >
        <Container className="flex h-8 items-center justify-between text-xs">
          <p className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Addis Ababa, Ethiopia
          </p>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-1.5 xl:flex">
              <Icon name="clock" size={13} /> Available 24/7
            </span>
            <a href={tel(company.phones[0])} className="hidden items-center gap-1.5 hover:opacity-100 lg:flex">
              <Icon name="phone" size={13} /> {company.phones[0]}
            </a>
          </div>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between">
        <a href="#/" aria-label="Dayenu home" className="block">
          <img
            src={mark}
            alt="Dayenu"
            className="h-7 w-auto transition-all duration-500 md:h-8"
            style={solid ? undefined : { filter: 'brightness(0) invert(1)' }}
          />
        </a>
        <nav aria-label="Primary" className="hidden items-center justify-start gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={open}
            onMouseLeave={close}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && close()}
          >
            <div className="flex items-center gap-1">
              <a href="#/services" aria-current={route.startsWith('/services') ? 'page' : undefined} className={navLink(route.startsWith('/services'))}>
                Services
              </a>
              <button
                aria-label={megaOpen ? 'Hide services menu' : 'Show services menu'}
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={() => setMegaOpen(!megaOpen)}
                className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''} ${solid ? 'text-navy' : 'text-white'}`}
              >
                <Icon name="chevron" size={15} />
              </button>
            </div>
            <div
              id="mega-menu"
              style={{ top }}
              className={`fixed left-1/2 z-50 w-[min(1080px,calc(100vw-48px))] -translate-x-1/2 transition-all duration-200 ${
                megaOpen ? 'visible opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0'
              }`}
            >
              <MegaMenu onNavigate={() => setMegaOpen(false)} />
            </div>
          </div>
          {links.map(([label, href]) => {
            const active = route.startsWith(href.slice(1))
            return (
              <a key={href} href={href} aria-current={active ? 'page' : undefined} className={navLink(active)}>
                {label}
              </a>
            )
          })}
          <Button variant={solid ? 'navy' : 'lime'} size="sm" href="#/contact">
            Contact us
          </Button>
        </nav>
        <button
          className={`md:hidden ${solid ? 'text-navy' : 'text-white'} font-display text-sm font-semibold`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </Container>

      {megaOpen && (
        <div
          aria-hidden
          style={{ top }}
          className="fixed inset-0 -z-10 hidden bg-navy-deep/25 backdrop-blur-[2px] md:block"
          onMouseEnter={close}
        />
      )}

      {mobileOpen && (
        <nav id="mobile-nav" className="max-h-[calc(100svh-64px)] overflow-y-auto border-t border-navy/10 bg-white px-5 pt-2 pb-6 md:hidden">
          <div className="border-b border-navy/10">
            <button
              aria-expanded={mobileServices}
              onClick={() => setMobileServices(!mobileServices)}
              className="flex w-full items-center justify-between py-3.5 font-display text-lg font-bold text-navy"
            >
              Services <Icon name="chevron" size={18} className={`transition-transform ${mobileServices ? 'rotate-180' : ''}`} />
            </button>
            {mobileServices && (
              <ul className="mb-3 rounded-xl bg-paper p-1.5">
                {services.map((s) => (
                  <li key={s.id}>
                    <a href={`#/services/${s.id}`} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-semibold text-navy active:bg-lime">
                      <span className="grid h-7 w-7 place-items-center rounded-md bg-white">
                        <Icon name={s.icon} size={15} />
                      </span>
                      {s.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#/services" className="block px-2.5 py-2.5 text-sm font-bold text-moss">
                    View all services →
                  </a>
                </li>
              </ul>
            )}
          </div>
          {links.map(([label, href]) => (
            <a key={href} href={href} className="block border-b border-navy/10 py-3.5 font-display text-lg font-bold text-navy">
              {label}
            </a>
          ))}
          <Button className="mt-5 w-full" variant="navy" href="#/contact">
            Contact us
          </Button>
        </nav>
      )}
    </header>
  )
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="kicker text-lime">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-white/70 transition-colors hover:text-white">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={logo} alt={company.tradingName} className="h-14 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
          <p className="mt-5 max-w-xs text-sm text-white/60">{company.tagline}</p>
          <a href="#/contact" className="mt-4 inline-block font-display text-sm font-semibold text-lime underline-offset-4 hover:underline">
            Contact us →
          </a>
        </div>
        <FooterCol title="Services" items={services.map((s) => [s.name, `#/services/${s.id}`])} />
        <FooterCol
          title="Company"
          items={[
            ['About', '#/about'],
            ['Journal', '#/blog'],
            ['Services', '#/services'],
            ['Contact', '#/contact'],
          ]}
        />
        <div>
          <h4 className="kicker text-lime">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {company.phones.map((p) => (
              <li key={p}>
                <a href={tel(p)} className="transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            <li className="text-white/60">Head office: {company.office}</li>
            <li className="text-white/60">Available 24/7</li>
          </ul>
        </div>
      </Container>
      <Container className="overflow-hidden">
        <p
          aria-hidden
          className="select-none font-display text-[461px] font-extrabold leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.25px_rgba(182,228,140,.35)] transition-colors duration-700 hover:text-lime"
        >
          dayenu
        </p>
      </Container>
      <Container className="flex flex-col justify-between gap-1.5 border-t border-white/10 py-5 text-xs text-white/45 md:flex-row">
        <span>
          © {new Date().getFullYear()} {company.legalName}
        </span>
        <span>Privacy · Terms</span>
      </Container>
    </footer>
  )
}
