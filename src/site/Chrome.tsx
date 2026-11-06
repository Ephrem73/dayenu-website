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
    <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-3 rounded-b-2xl border border-t-0 border-navy/10 bg-white p-3 shadow-[0_24px_50px_rgba(16,29,73,.14)]">
      <div className="rounded-xl bg-paper p-2">
        <p className="kicker mx-2 mt-1 mb-2 !text-[0.625rem] text-navy/55">Our services</p>
        <ul>
          {services.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#/services/${item.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={onNavigate}
                className={`grid h-10 grid-cols-[28px_1fr_16px] items-center gap-2.5 rounded-lg px-2 text-[0.8125rem] font-semibold text-navy transition-colors duration-150 ${
                  i === active ? 'bg-lime' : 'hover:bg-lime/50'
                }`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-white">
                  <Icon name={item.icon} size={15} />
                </span>
                {item.name}
                <Icon name="arrow" size={14} />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#/services"
          onClick={onNavigate}
          className="mx-2 mt-2 flex items-center gap-1.5 border-t border-navy/10 pt-2.5 pb-1 text-xs font-bold text-moss hover:text-navy"
        >
          View all services <Icon name="arrow" size={13} />
        </a>
      </div>
      <div key={s.id} className="fade-in grid min-w-0 overflow-hidden rounded-xl border border-navy/10 lg:grid-cols-[1fr_1fr]">
        <img src={s.image} alt={s.alt} className="hidden h-full max-h-[320px] min-h-[280px] w-full object-cover lg:block" />
        <div className="flex items-start gap-3.5 p-6">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-navy">
            <Icon name={s.icon} size={16} />
          </span>
          <div>
            <h3 className="text-xl font-bold leading-tight text-navy">{s.name}</h3>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-navy/65">{s.blurb}</p>
            <ul className="mt-4 space-y-1.5">
              {s.includes.slice(0, 3).map((inc) => (
                <li key={inc} className="flex items-center gap-2 text-xs text-navy/75">
                  <Icon name="check" size={13} className="text-moss" />
                  {inc}
                </li>
              ))}
            </ul>
            <a href={`#/services/${s.id}`} onClick={onNavigate} className="group mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-navy">
              Explore {s.name} <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
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
            Road & Environment Cleaning Service
            <span className="hidden opacity-50 lg:inline">·</span>
            <span className="hidden lg:inline">Roads, public spaces and institutions</span>
          </p>
          <div className="flex items-center gap-4 lg:gap-5">
            <span className="hidden items-center gap-1.5 xl:flex">
              <Icon name="clock" size={13} /> Available 24/7
            </span>
            <a href={tel(company.phones[0])} className="hidden items-center gap-1.5 hover:opacity-100 lg:flex">
              <Icon name="phone" size={13} /> {company.phones[0]}
            </a>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden items-center gap-1 text-[0.75rem] font-semibold text-emerald-600 transition hover:opacity-100 lg:inline-flex"
            >
              <Icon name="whatsapp" size={13} /> WhatsApp
            </a>
            <a
              href={company.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="hidden items-center gap-1 text-[0.75rem] font-semibold text-sky-600 transition hover:opacity-100 lg:inline-flex"
            >
              <Icon name="telegram" size={13} /> Telegram
            </a>
            <a href="#/about" className="hover:opacity-100">
              About
            </a>
            <a href="#/blog" className="hover:opacity-100">
              Journal
            </a>
            <a
              href="#/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 font-display text-xs font-bold !text-navy shadow-sm transition hover:bg-lime/90 active:scale-95"
            >
              <Icon name="mail" size={12} /> Get in touch
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
            onFocus={open}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && close()}
          >
            <div className="flex items-center gap-1">
              <a href="#/services" aria-current={route.startsWith('/services') ? 'page' : undefined} className={navLink(route.startsWith('/services'))}>
                Services
              </a>
              <button
                aria-label="Show services menu"
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
            Request a site assessment
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
            Request a site assessment
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
            Request a site assessment →
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
          <h4 className="kicker text-lime">Contact & Dispatch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {company.phones.map((p) => (
              <li key={p}>
                <a href={tel(p)} className="transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 transition-colors hover:text-white">
                <Icon name="whatsapp" size={14} /> WhatsApp: {company.whatsapp}
              </a>
            </li>
            <li>
              <a href={company.telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-300 transition-colors hover:text-white">
                <Icon name="telegram" size={14} /> Telegram: {company.telegram}
              </a>
            </li>
            <li className="text-white/60">Head office: {company.office}</li>
            <li className="text-white/60">Available 24/7</li>
            <li className="pt-2">
              <a
                href={company.capabilityPdf}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-lime/40 bg-lime/10 px-3 py-1.5 text-xs font-bold text-lime transition hover:bg-lime hover:text-navy"
              >
                <Icon name="download" size={13} /> Capability Statement (PDF)
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="overflow-hidden">
        <p
          aria-hidden
          className="select-none font-display text-[461px] font-extrabold leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.25px_rgba(182,228,140,.35)] transition-colors duration-700 hover:text-lime"
        >
          Dayenu
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
