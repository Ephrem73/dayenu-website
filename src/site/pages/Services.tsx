import { useEffect, useState } from 'react'
import { faqs, img, services } from '../data'
import { Icon, type IconName } from '../Icon'
import { Container, ContactCta, Kicker, PageHero, Reveal, h2Class } from '../ui'

const setup: [IconName, string, string][] = [
  [
    'detail',
    'Confirmed scope',
    'Service scope, route or site map, frequency schedule, manpower plan, equipment list, reporting format and agreed performance standard.',
  ],
  [
    'shield',
    'Equipment & safety',
    'Sweepers, pressure washers, collection trucks, skip bins, grass cutters and watering systems, with PPE, cones, barriers, signs and first-aid kits.',
  ],
  [
    'calendar',
    'Supervision & reporting',
    'Site supervisors and team leaders inspect daily. Attendance, checklists, incident logs and photo evidence feed weekly and monthly reports.',
  ],
]

export default function Services({ focus }: { focus?: string }) {
  const [openFaq, setOpenFaq] = useState(0)
  const [current, setCurrent] = useState(services[0].id)

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)), {
      rootMargin: '-45% 0px -50% 0px',
    })
    services.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!focus) return
    const t = window.setTimeout(() => document.getElementById(focus)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    return () => clearTimeout(t)
  }, [focus])

  return (
    <>
      <PageHero
        kicker="Services"
        title={
          <>
            Six services, one <span className="text-lime">accountable team.</span>
          </>
        }
        image={img.sweeperTruck}
      >
        Road, environmental, facility and greenery services for public and institutional clients. Each service is delivered to a confirmed scope, schedule
        and performance standard.
      </PageHero>

      <nav aria-label="Jump to service" className="sticky top-16 z-30 border-b border-navy/10 bg-white/95 backdrop-blur">
        <Container className="flex gap-1.5 overflow-x-auto py-2.5">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#/services/${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              aria-current={current === s.id ? 'true' : undefined}
              className={`flex h-8 items-center gap-1.5 rounded-full px-3 font-display text-[0.8125rem] font-semibold whitespace-nowrap transition-colors duration-300 ${
                current === s.id ? 'bg-navy text-white' : 'text-navy/60 hover:bg-navy/5 hover:text-navy'
              }`}
            >
              <Icon name={s.icon} size={14} />
              {s.name}
            </a>
          ))}
        </Container>
      </nav>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-28 py-14 md:py-24 ${i % 2 ? 'bg-paper' : 'bg-white'}`}>
          <Container className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <Reveal>
              <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-navy/10">
                <img src={s.image} alt={s.alt} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="absolute bottom-4 left-4 font-display text-4xl font-extrabold leading-none text-white/90 [text-shadow:0_4px_24px_rgba(10,19,50,.5)]">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Kicker>
                0{i + 1} · {s.for}
              </Kicker>
              <h2 className="mt-4 text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] md:text-[2.125rem]">{s.name}</h2>
              <p className="mt-3 leading-relaxed text-navy/70 md:text-lg">{s.detail}</p>
              <ul className="mt-6 divide-y divide-navy/10 border-y border-navy/10 text-[0.9375rem]">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2.5 py-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime">
                      <Icon name="check" size={11} />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
              <a
                href={`#/contact?service=${s.id}`}
                className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-navy px-5 font-display text-sm font-semibold text-white transition hover:bg-navy-deep"
              >
                Ask about {s.name.toLowerCase()} <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="bg-navy py-16 text-white md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Kicker light>How every assignment is set up</Kicker>
            </div>
            <p className="max-w-3xl text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.2] font-semibold tracking-[-0.025em] lg:col-span-8">
              Nothing starts on assumptions. Scope, schedule, resources and reporting are agreed first{' '}
              <span className="text-white/40">and any out-of-scope work needs authorisation.</span>
            </p>
          </div>
          <div className="mt-12 grid gap-x-8 md:grid-cols-3">
            {setup.map(([icon, title, items]) => (
              <div key={title} className="border-t border-white/15 py-7">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-navy">
                  <Icon name={icon} size={17} />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{items}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-lime-soft/60 py-14 md:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-navy text-lime">
            <Icon name="clock" size={22} />
          </span>
          <div>
            <Kicker>Emergency response · 24/7</Kicker>
            <p className="mt-3 max-w-3xl text-navy/75 md:text-lg">
              Clearing flood and storm debris, urgent sanitation, incident-area cleaning and rapid mobilization, subject to agreed scope and site safety.
            </p>
          </div>
          <a
            href="#/contact"
            className="group inline-flex h-11 shrink-0 items-center gap-2 justify-self-start rounded-full bg-navy px-5 font-display text-sm font-semibold text-white transition hover:bg-navy-deep"
          >
            Request urgent support <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
          <div>
            <Kicker>Questions</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>Good to know.</h2>
          </div>
          <div className="border-t border-navy/15">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-navy/15">
                <button
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between py-4 text-left font-display text-[1.0625rem] font-bold"
                >
                  {q}
                  <span
                    className={`ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg transition-all duration-300 ${
                      openFaq === i ? 'rotate-45 bg-lime' : 'border border-navy/20'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden pr-10 text-[0.9375rem] text-navy/70">
                    <span className="block pb-4">{a}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  )
}
