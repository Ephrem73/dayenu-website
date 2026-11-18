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

const recyclableStreams = [
  {
    tag: 'Plastics & Polymers',
    badge: 'PET · HDPE · LDPE',
    desc: 'Clean clear & amber PET bottles, rigid HDPE jerrycans, plastic crates, and clean industrial shrink wrap/stretch film.',
    handling: 'Segregated into designated blue/green stations, rinsed, flattened, and baled to reduce volume.',
  },
  {
    tag: 'Paper & Fiber',
    badge: 'Cardboard · Kraft · Office',
    desc: 'Corrugated cartons, packaging boxes, kraft wrapping paper, clean discarded office sheets, and archival records.',
    handling: 'Bundled dry and protected from moisture or food grease contamination for clean pulping recovery.',
  },
  {
    tag: 'Metals & Scrap',
    badge: 'Aluminum · Steel · Cans',
    desc: 'Aluminum beverage cans, clean tinplate containers, metal straps, clean fabrication turnings, and discarded wire.',
    handling: 'Magnetic segregation, crushed and consolidated for direct delivery to Ethiopian smelting & foundries.',
  },
  {
    tag: 'Glass & Inorganics',
    badge: 'Beverage Bottles · Cullet',
    desc: 'Intact returnable and non-returnable glass bottles (beverage, food), separated by clear, green, and amber shades.',
    handling: 'Collected in reinforced crates to eliminate hazardous shards, then transferred for industrial bottle re-use.',
  },
]

const recoverySteps = [
  {
    step: '01',
    title: 'Source Segregation & Bin Placement',
    desc: 'We supply and position color-coded waste stations, heavy-duty liners, and bilingual visual sorting guides across your facilities.',
  },
  {
    step: '02',
    title: 'Daily Supervised Sorting & Weighing',
    desc: 'Trained Dayenu environmental stewards audit sorting stations daily, removing contaminants and logging batch weights by material type.',
  },
  {
    step: '03',
    title: 'Covered Transfer & Compaction',
    desc: 'Materials are moved in clean, enclosed vehicles to aggregation hubs where high-pressure baling prepares batches for transport.',
  },
  {
    step: '04',
    title: 'Certified Recycling Offtake & ESG Reporting',
    desc: 'Consignments are handed over to accredited Ethiopian recycling partners, backed by verifiable weight tickets and monthly diversion reports.',
  },
]

const diversionMetrics = [
  { value: '65%+', label: 'Landfill Diversion', note: 'Reduction in mixed compound waste sent to municipal dumpsites.' },
  { value: '100%', label: 'Traceable Transfer', note: 'Every consignment weighed, manifest-logged, and verified.' },
  { value: 'Monthly', label: 'Diversion Reports', note: 'Auditable certificates delivered to your EHS & facility leads.' },
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
            Seven services, one <span className="text-lime">accountable team.</span>
          </>
        }
        image={img.sweeperTruck}
      >
        Road, environmental, facility, greenery and recycling services for public and institutional clients. Each service is delivered to a confirmed scope, schedule
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

          {s.id === 'recycling' && (
            <Container className="mt-16 border-t border-navy/10 pt-14 lg:mt-24 lg:pt-20">
              <Reveal>
                <div className="max-w-3xl">
                  <Kicker>Circular Economy & Waste Diversion</Kicker>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                    Source segregation built for circular recovery in Addis Ababa.
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-navy/70 md:text-lg">
                    Rather than sending mixed waste to municipal landfills, Dayenu equips commercial towers, industrial campuses, and public corridors with managed on-site sorting infrastructure and certified recycling offtake partners.
                  </p>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {recyclableStreams.map((stream, idx) => (
                  <Reveal key={stream.tag} delay={idx * 60}>
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:border-moss hover:shadow-md">
                      <div>
                        <span className="inline-block rounded-full bg-lime-soft px-3 py-1 font-display text-[0.6875rem] font-bold tracking-wider text-moss uppercase">
                          {stream.badge}
                        </span>
                        <h4 className="mt-3 text-lg font-bold text-navy">{stream.tag}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-navy/70">{stream.desc}</p>
                      </div>
                      <div className="mt-5 border-t border-navy/10 pt-4 text-xs font-medium text-navy/60">
                        <span className="font-semibold text-navy">Handling:</span> {stream.handling}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={150}>
                <div className="mt-14 rounded-3xl bg-navy p-8 text-white lg:p-12">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <span className="kicker !text-lime">Recovery Chain</span>
                      <h4 className="mt-2 text-xl font-bold sm:text-2xl lg:text-3xl">
                        Our 4-step closed-loop recovery process
                      </h4>
                    </div>
                    <span className="font-display text-xs font-semibold text-white/50 uppercase tracking-widest">
                      Zero Contamination Protocol
                    </span>
                  </div>
                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {recoverySteps.map((step) => (
                      <div key={step.step} className="border-t border-white/15 pt-5">
                        <span className="font-display text-2xl font-black text-lime">{step.step}</span>
                        <h5 className="mt-2 text-base font-bold text-white">{step.title}</h5>
                        <p className="mt-2 text-xs leading-relaxed text-white/65">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-12 lg:items-center">
                    <div className="grid grid-cols-3 gap-4 lg:col-span-8">
                      {diversionMetrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-display text-2xl font-extrabold text-lime lg:text-3xl">{metric.value}</p>
                          <p className="mt-1 text-xs font-bold text-white">{metric.label}</p>
                          <p className="mt-0.5 hidden text-[0.6875rem] text-white/50 sm:block">{metric.note}</p>
                        </div>
                      ))}
                    </div>
                    <div className="lg:col-span-4 lg:text-right">
                      <a
                        href="#/contact?service=recycling"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-lime px-6 font-display text-sm font-bold text-navy transition hover:bg-white"
                      >
                        Book a waste audit <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          )}
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
