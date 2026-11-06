import { useEffect, useState } from 'react'
import { getBlogPosts, getStrapiMediaUrl, calculateReadingTime, formatPostDate, FALLBACK_IMAGE } from '../../api/strapi'
import type { BlogPost } from '../../api/strapi.types'
import { BeforeAfter } from '../BeforeAfter'
import { company, img, posts, services } from '../data'
import { Icon, type IconName } from '../Icon'
import { Button, Container, ContactCta, Kicker, Reveal, ScrollText, SectionHead, Star, h2Class } from '../ui'

const SLIDE_MS = 7000

const slides = [
  { label: 'Roads & corridors', href: '#/services/road', image: img.crew },
  { label: 'Institutions & facilities', href: '#/services/facilities', image: img.facility },
  { label: 'Parks & greenery', href: '#/services/landscaping', image: img.greenery },
]

function Hero() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const current = slides[active]

  return (
    <section
      aria-label="Introduction"
      className="homepage-hero relative isolate flex min-h-[600px] flex-col overflow-hidden bg-navy-deep text-white md:min-h-[100svh] md:h-auto lg:min-h-[100svh] lg:h-auto"
    >
      <div className="hero-reveal absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <div
            key={s.label}
            aria-hidden
            className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out ${i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`}
          >
            <img
              src={s.image}
              alt=""
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className={`h-full w-full object-cover ${i === active && playing ? 'kenburns' : ''}`}
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,19,50,.52)_0%,rgba(10,19,50,.34)_38%,rgba(10,19,50,.65)_72%,rgba(10,19,50,.95)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_55%,rgba(10,19,50,.7),transparent_60%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_88%_78%,rgba(182,228,140,.2),transparent_45%)]" />
      <Container className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <div className="grid h-full grid-cols-4 border-x border-lime/[.12]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={i ? 'border-l border-lime/[.12]' : ''} />
          ))}
        </div>
      </Container>

      <Container className="hero-content flex flex-1 flex-col pt-16 md:pt-20 lg:pt-22">
        <div className="flex items-start justify-between gap-6" style={{ animation: 'fade .8s 1.1s ease both' }}>
          <Kicker light>Dayenu · Road & Environment Cleaning Service PLC</Kicker>
          <p aria-live="polite" className="hidden text-right font-display text-xs text-white/70 md:block">
            <span className="text-lime">N° 0{active + 1}</span> <span className="opacity-50">/ 03</span>
            <span key={current.label} className="fade-in mt-0.5 block text-white">
              {current.label}
            </span>
          </p>
        </div>

        <div className="hero-main mt-4 flex flex-1 flex-col justify-end pb-4 md:mt-5 md:pb-5">
          <h1 className="hero-heading text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="rise block" style={{ animationDelay: '.8s' }}>
                Cleaner streets<span className="text-lime">.</span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="rise block" style={{ animationDelay: '.95s' }}>
                Safer{' '}
                <span className="relative inline-block text-lime">
                  cities.
                  <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="absolute -bottom-[0.06em] left-0 h-[0.14em] w-full overflow-visible" aria-hidden>
                    <path className="draw" d="M4 20 C 90 6, 220 4, 396 14" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </span>
          </h1>

          <div className="hero-details mt-4 grid items-end gap-5 md:grid-cols-12" style={{ animation: 'fade .9s 1.3s ease both' }}>
            <div className="md:col-span-7 lg:col-span-6">
              <p className="hero-description max-w-[36rem] leading-relaxed text-white/80 md:text-xl">
                Professional cleaning and maintenance for Addis Ababa’s roads, facilities and public spaces.
              </p>
              <ul className="hero-highlights mt-3 mb-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/90">
                {['Available 24/7', 'Supervised every shift', 'Measurable reporting'].map((t) => (
                  <li key={t} className="flex items-center gap-2 font-medium">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-lime text-navy">
                      <Icon name="check" size={10} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="hero-actions flex flex-wrap items-center gap-2.5">
                <Button href="#/contact">Request a site assessment</Button>
                <Button variant="ghost-light" href="#/contact?topic=Pilot">
                  Start a pilot area
                </Button>
              </div>
            </div>
            <div className="hidden justify-end md:col-span-5 md:flex lg:col-span-6">
              <Seal />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] border-t border-lime/30" style={{ animation: 'fade .9s 1.5s ease both' }}>
          <div role="group" aria-label="Choose a featured service" className="grid grid-cols-3">
            {slides.map((s, i) => (
              <button
                key={s.label}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`hero-tab group relative flex min-h-16 flex-col items-start justify-center py-4 pr-3 text-left transition-colors hover:bg-white/10 md:py-5 md:pr-8 ${i ? 'pl-3 md:pl-6' : ''} ${
                  i === active ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {i === active && (
                  <span
                    key={`${active}-${playing}`}
                    onAnimationEnd={() => setActive((active + 1) % slides.length)}
                    className="tab-progress absolute inset-x-0 -top-px h-0.5 bg-lime"
                    style={playing ? { animationDuration: `${SLIDE_MS}ms` } : { animation: 'none', transform: 'scaleX(1)' }}
                  />
                )}
                <span className="font-display text-[0.625rem] text-lime/80">0{i + 1}</span>
                <span className={`mt-1 block font-display text-[0.8125rem] font-semibold md:text-[0.9375rem] ${i === active ? 'text-lime' : ''}`}>{s.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pl-3 md:pl-6">
            <a
              href={current.href}
              className="hidden h-10 w-10 place-items-center rounded-full bg-lime text-navy transition hover:bg-white md:grid"
              aria-label={`Explore ${current.label}`}
            >
              <Icon name="arrow" size={16} />
            </a>
            <button
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? 'Pause hero animation' : 'Play hero animation'}
              className="grid h-10 w-10 place-items-center rounded-full border border-lime/50 text-lime transition hover:bg-lime hover:text-navy"
            >
              <Icon name={playing ? 'pause' : 'play'} size={13} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

const stats = [
  ['24/7', 'Availability', 'For planned operations and urgent cleaning support.'],
  ['6', 'Service areas', 'From road sweeping to urban greenery.'],
  ['5', 'Delivery phases', 'Assessment to full operations, then review.'],
  ['Daily', 'Supervision', 'Inspection, issue logging and end-of-day closeout.'],
]

function AtAGlance() {
  return (
    <section aria-label="At a glance" className="bg-white py-16 md:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>At a glance</Kicker>
          </div>
          <p className="max-w-3xl text-[clamp(1.5rem,2.8vw,2.625rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-navy lg:col-span-9">
            An Ethiopian company keeping roads, public spaces and institutions clean, with one accountable team{' '}
            <span className="text-navy/35">from planning to performance reporting.</span>
          </p>
        </div>
        <dl className="mt-12 grid grid-cols-2 border-t border-navy/15 lg:grid-cols-4">
          {stats.map(([value, label, note], i) => (
            <Reveal
              key={label}
              delay={i * 90}
              className={`border-navy/15 pt-6 pr-4 pb-1 ${i % 2 ? 'border-l pl-4' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${
                i === 2 ? 'lg:border-l lg:pl-4' : ''
              } ${i ? 'lg:pl-6' : ''}`}
            >
              <dt className="kicker text-navy/55">{label}</dt>
              <dd className="mt-3 font-display text-[clamp(2.5rem,4.6vw,4.25rem)] font-extrabold leading-none tracking-[-0.04em]">{value}</dd>
              <dd className="mt-2.5 max-w-[15rem] text-sm text-navy/60">{note}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}

const sectors = [
  ['City administrations & public facilities', img.square, '#/services/sidewalk', 'Streets, sidewalks, markets, terminals, parks and public buildings kept clean to an agreed standard.'],
  ['Corridor development programs', img.corridor, '#/services/road', 'Route sweeping, median and road-edge cleaning, greenery care and post-construction handover for corridors.'],
  ['Industrial parks, warehouses & plants', img.warehouse, '#/services/facilities', 'Compound and facility cleaning for factories, warehouses and manufacturing plants, subject to site-safety rules.'],
  ['Hospitals, schools & commercial centres', img.campus, '#/services/facilities', 'Scheduled cleaning for clinics, schools, universities, commercial centres and hotels.'],
  ['NGOs & international organizations', img.shovel, '#/contact', 'Compound cleaning, community cleanup and environmental programs with transparent reporting.'],
]

function ClientLogos() {
  const partners = [
    { name: 'Addis Ababa City Administration', type: 'Municipal Services' },
    { name: 'Corridor Development Programs', type: 'Urban Corridors' },
    { name: 'Addis Ababa City Roads Authority', type: 'Infrastructure & Roads' },
    { name: 'Industrial Parks Development Corp.', type: 'Industrial & Logistics' },
    { name: 'Commercial Towers & Districts', type: 'Commercial Facilities' },
    { name: 'Wisdom Business Group Sites', type: 'Corporate Network' },
  ]

  return (
    <section className="border-b border-navy/10 bg-paper py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="kicker !text-[0.6875rem] text-navy/55">Trusted by public & institutional partners</p>
            <h3 className="mt-1 text-lg font-bold text-navy md:text-xl">Built for municipal, corridor & institutional accountability</h3>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-xl border border-navy/10 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-lime hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-lime/30 text-moss">
                  <Icon name="shield" size={13} />
                </span>
                <span className="text-[0.625rem] font-bold uppercase tracking-wider text-navy/45">{p.type}</span>
              </div>
              <p className="mt-3 text-xs font-bold leading-snug text-navy">{p.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Sectors() {
  const [active, setActive] = useState(0)
  return (
    <section aria-label="Who we work for" className="bg-navy-deep pt-16 text-white md:pt-24">
      <Container className="flex flex-col justify-between gap-5 pb-10 md:flex-row md:items-end md:pb-12">
        <SectionHead light kicker="Who we work for" title="Built for public and institutional clients." />
        <p className="max-w-xs text-sm text-white/65">Five client groups, one standard. Choose a sector to see how we work with it.</p>
      </Container>
      <div className="flex flex-col md:h-[min(64vh,540px)] md:min-h-[440px] md:flex-row">
        {sectors.map(([name, image, href, text], i) => {
          const on = i === active
          return (
            <a
              key={name}
              href={href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group relative isolate flex h-[46vh] min-h-[300px] flex-col justify-end overflow-hidden p-5 transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] md:h-auto md:min-h-0 md:p-7 ${
                on ? 'md:flex-[2.4]' : 'md:flex-1'
              } ${i ? 'md:border-l md:border-white/10' : ''}`}
            >
              <img
                src={image}
                alt=""
                className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1400ms] ${on ? 'scale-105' : 'scale-100'}`}
              />
              <div
                className={`absolute inset-0 -z-10 transition-colors duration-700 ${
                  on ? 'bg-[linear-gradient(180deg,transparent_30%,rgba(10,19,50,.92))]' : 'bg-navy-deep/70'
                }`}
              />
              <span className="absolute top-5 left-5 font-display text-xs text-lime md:top-7 md:left-7">0{i + 1}</span>
              <span
                className={`absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full transition-all duration-500 md:top-6 md:right-6 ${
                  on ? 'bg-lime text-navy' : 'border border-white/30 text-white'
                }`}
              >
                <Icon name="arrow" size={15} className={on ? '' : '-rotate-45'} />
              </span>
              <h3
                className={`max-w-md pr-10 font-bold leading-tight tracking-[-0.025em] transition-all duration-500 ${on ? 'text-2xl md:text-[2rem]' : 'text-xl md:text-[1.125rem]'}`}
              >
                {name}
              </h3>
              <p
                className={`max-w-sm overflow-hidden text-sm text-white/75 transition-all duration-700 md:text-[0.9375rem] ${
                  on ? 'mt-2.5 max-h-32 opacity-100' : 'max-h-32 opacity-100 md:mt-0 md:max-h-0 md:opacity-0'
                }`}
              >
                {text}
              </p>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section className="bg-paper py-16 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            kicker="Our services"
            title="Six service areas, one accountable team."
            body="Reliable cleaning and maintenance for the places our communities use every day."
          />
          <a href="#/services" className="group inline-flex shrink-0 items-center gap-3 self-start border-b border-navy pb-2 text-sm font-semibold transition-colors hover:text-moss md:self-auto">
            All services <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#/services/${s.id}`}
              className={`group min-w-0 text-navy ${i === 0 ? 'lg:col-span-7' : i === 1 ? 'lg:col-span-5' : 'lg:col-span-3'}`}
            >
              <div className={`overflow-hidden bg-navy/10 ${i < 2 ? 'h-64 sm:h-72 lg:h-[22rem]' : 'h-56 sm:h-64 lg:h-52'}`}>
                <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="flex items-start gap-3 border-b border-navy/20 py-4 transition-colors group-hover:border-moss">
                <span className="pt-1 font-display text-xs text-moss">0{i + 1}</span>
                <h3 className={`min-w-0 flex-1 font-bold leading-snug tracking-[-0.02em] transition-colors group-hover:text-moss ${i < 2 ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
                  {s.name}
                </h3>
                <Icon name="arrow" size={18} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

const reasons = [
  ['One accountable provider', 'Recruitment, induction, attendance, supervision, tools, PPE, logistics and reporting, managed under one contract.'],
  ['Safety-first operations', 'Trained crews, PPE, risk assessment and protection for pedestrians and road users.'],
  ['Scalable mobilization', 'Start with a pilot area, then expand by route, facility, sub-city or project.'],
  ['Transparent improvement', 'Measurable inspections, documented corrective action and regular performance reviews.'],
]

function WhyDayenu() {
  return (
    <section className="bg-navy py-16 text-white md:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[5/6]">
            <img src={img.safety} alt="Dayenu managed field team in Addis Ababa" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-4 -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-lime p-4 text-navy shadow-xl sm:right-auto sm:max-w-[17rem]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-lime">
              <Icon name="shield" size={17} />
            </span>
            <div>
              <p className="text-sm font-bold">Supervised every shift</p>
              <p className="text-[0.8125rem] text-navy/70">Briefing, inspection and closeout, every day.</p>
            </div>
          </div>
        </Reveal>
        <div>
          <Kicker light>Why Dayenu</Kicker>
          <h2 className={`mt-4 ${h2Class}`}>Managed, not just staffed.</h2>
          <p className="mt-4 max-w-md text-white/70 md:text-lg">
            Our name stands for work that is complete. We do the job properly, then a little more. That means managing the people, equipment and records,
            not only supplying labour.
          </p>
          <ul className="mt-8">
            {reasons.map(([title, text], i) => (
              <li key={title} className="group grid grid-cols-[2rem_1fr] gap-3 border-t border-white/15 py-4 transition-colors duration-300 hover:border-lime">
                <span className="pt-0.5 font-display text-xs text-lime">0{i + 1}</span>
                <div className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <h3 className="text-[1.0625rem] font-bold md:text-lg">{title}</h3>
                  <p className="mt-1 max-w-md text-sm text-white/65">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#/contact?topic=Pilot">
              Start a pilot area
            </Button>
            <Button variant="ghost-light" href="#/contact">
              Request a site assessment
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Results() {
  return (
    <section className="bg-white py-16 md:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHead kicker="Accountable by design" title="Every shift, on the record." />
          <p className="mt-4 text-navy/70 md:text-lg">
            Clean results should be visible on site and in our reports. Daily records feed into weekly and monthly reviews with you.
          </p>
          <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
            {[
              'Attendance and deployment records',
              'Route and site checklists',
              'Incident, near-miss and PPE registers',
              'Photo evidence where required',
              'Weekly and monthly performance reports',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-navy/80">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-lime">
                  <Icon name="check" size={11} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-navy/45">Illustrative comparison. Replace with before-and-after photos from Dayenu sites.</p>
        </div>
        <Reveal>
          <BeforeAfter src={img.sweeperTruck} alt="City street shown before and after mechanical street cleaning" />
        </Reveal>
      </Container>
    </section>
  )
}

const steps: [IconName, string, string][] = [
  ['detail', 'Assessment & planning', 'Site visit, scope, route or site map, frequency schedule and manpower plan.'],
  ['briefcase', 'Mobilization', 'Recruitment, induction, PPE, tools, equipment and logistics put in place.'],
  ['pin', 'Pilot deployment', 'Initial deployment in a defined area to confirm standards and indicators.'],
  ['clock', 'Full operations', 'Daily briefings, supervised field work, inspections and closeout.'],
  ['check', 'Review & improvement', 'Weekly and monthly reviews, corrective action and continuous improvement.'],
]

function HowItWorks() {
  return (
    <section className="bg-lime py-16 md:py-28">
      <Container>
        <SectionHead center kicker="How we deliver" title="From assessment to full operations." />
        <Reveal className="relative mt-12">
          <div className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-navy/15 lg:block">
            <div className="wipe-in h-full bg-navy" style={{ animationDelay: '.5s', animationDuration: '1.8s' }} />
          </div>
          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(([icon, title, text], i) => (
              <li key={title} className="group flex flex-col text-center">
                <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-navy bg-lime text-navy transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                  <Icon name={icon} size={19} />
                  <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-navy font-display text-[0.625rem] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <div className="mt-5 flex-1 rounded-2xl bg-white p-5 transition-shadow duration-300 group-hover:shadow-[0_20px_45px_-28px_rgba(16,29,73,.35)]">
                  <h3 className="text-[1.0625rem] font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm text-navy/65">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center">
          <Button variant="navy" href="#/contact">
            Request a site assessment
          </Button>
        </div>
      </Container>
    </section>
  )
}

function AboutTeaser() {
  return (
    <section className="bg-lime py-16 md:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="aspect-[5/4] overflow-hidden rounded-2xl">
            <img src={img.addis} alt="Busy street in Addis Ababa" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div>
          <div className="flex items-center gap-3">
            <Kicker>About Dayenu</Kicker>
            <Star size={16} className="text-lime" />
          </div>
          <ScrollText
            className="mt-5 text-2xl font-semibold leading-[1.3] tracking-[-2px] md:text-[1.875rem]"
            parts={[
              ['Cleaner, safer and more sustainable communities start with work that is'],
              ['planned, supervised and reported.', true],
              ['That is the standard we bring to every road, compound and green space.'],
            ]}
          />
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {['Established 2026', 'Addis Ababa', 'Available 24/7'].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="check" size={15} className="text-moss" />
                {t}
              </li>
            ))}
          </ul>
          <Button variant="ghost" href="#/about" className="mt-8">
            Our story
          </Button>
        </div>
      </Container>
    </section>
  )
}

function Journal() {
  const [livePosts, setLivePosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getBlogPosts()
      .then((data) => {
        if (data && data.length > 0) setLivePosts(data.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  const displayItems =
    livePosts.length > 0
      ? livePosts.map((p, i) => ({
          slug: p.slug,
          title: p.Title || p.title || 'Untitled Article',
          excerpt: p.excerpt,
          tag: p.tag || 'Insights',
          read: calculateReadingTime(p.content),
          date: formatPostDate(p.publishedDate || p.publishedAt) || (posts[i]?.date ?? 'October 2026'),
          author: {
            name: p.authorName || posts[i]?.author?.name || 'Ephrem Tadesse',
            role: p.authorRole || posts[i]?.author?.role || 'Operations Manager',
          },
          image: getStrapiMediaUrl(p.coverImage, 'medium'),
        }))
      : posts.slice(0, 3)
  return (
    <section className="bg-white py-16 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHead kicker="Insights" title="Practical reading." />
          <a href="#/blog" className="text-sm font-semibold underline decoration-lime decoration-2 underline-offset-[6px]">
            All articles →
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {displayItems.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <a href={`#/blog/${p.slug}`} className="group block">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-navy/10">
                  <img
                    src={p.image}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-navy/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  <span className="font-bold text-navy/85">{p.tag}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-moss transition-colors">{p.title}</h3>
                <p className="mt-1.5 text-sm text-navy/60 line-clamp-2">{p.excerpt}</p>
                {p.author && (
                  <div className="mt-4 flex items-center gap-2.5 border-t border-navy/10 pt-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime/40 text-xs font-bold text-navy">
                      {p.author.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-navy leading-none">{p.author.name}</p>
                      <p className="mt-0.5 text-[0.6875rem] text-navy/55 truncate">{p.author.role}</p>
                    </div>
                  </div>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AtAGlance />
      <Sectors />
      <ServicesGrid />
      <WhyDayenu />
      <Results />
      <HowItWorks />
      <AboutTeaser />
      <Journal />
      <ContactCta />
    </>
  )
}
