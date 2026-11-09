import { company, img } from '../data'
import { Icon } from '../Icon'
import { Container, ContactCta, Kicker, PageHero, Reveal, h2Class } from '../ui'

const facts = [
  ['Company', company.legalName],
  ['Legal form', 'Private Limited Company'],
  ['Established', company.established],
  ['Head office', company.office],
]

const principles = [
  'Deliver services to the agreed scope, schedule, quality standard and reporting format.',
  'Deploy trained personnel with suitable PPE and supervision.',
  'Apply responsible waste, water and environmental practices.',
  'Create dignified employment and skills development, with attention to women and youth.',
  'Build long-term institutional relationships on integrity, transparency, accountability and continuous improvement.',
]

const values = [
  ['Integrity', 'Honest work, honest reporting and transparent dealings.'],
  ['Professionalism', 'Trained teams, documented methods and dependable conduct.'],
  ['Safety', 'Protecting workers, the public and property on every shift.'],
  ['Quality', 'Clear standards, inspected and measured.'],
  ['Customer Focus', 'Services shaped around each client’s scope and priorities.'],
  ['Teamwork', 'Field teams, supervisors and administration working as one.'],
  ['Environmental Responsibility', 'Care for drains, soil, plants and the wider ecosystem.'],
  ['Continuous Improvement', 'Reviewing results and correcting course quickly.'],
]

const responsibility = [
  'Dignified work and skills development, with attention to women and youth',
  'Community cleanup and environmental awareness campaigns',
  'Waste reduction, segregation, recycling and responsible disposal',
  'Tree planting, plant care and protection of public green spaces',
  'Working with local workers, suppliers and service partners',
]

export default function About() {
  return (
    <>
      <PageHero
        kicker="About us"
        title={
          <>
            Cleaning that earns <span className="text-lime">“enough.”</span>
          </>
        }
        image={img.addis}
      >
        Dayenu is an Ethiopian road and environment cleaning service built on one standard: the job is finished properly, so there is nothing left for you to
        chase. {company.hours}
      </PageHero>

      <section className="bg-white py-16 md:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <Kicker>Who we are</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>Established to create cleaner, safer and more sustainable communities.</h2>
            <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-navy/70 md:text-lg">
              <p>
                {company.legalName} is an Ethiopian private limited company providing road cleaning, environmental sanitation, waste-management support,
                facility cleaning, landscaping and public-space maintenance.
              </p>
              <p>
                We support government institutions, municipalities, construction projects, industrial facilities, commercial organizations, and healthcare and
                educational institutions. Our work combines field teams, supervision, administration, quality assurance and responsible work practices.
              </p>
              <p>Dayenu is affiliated with Wisdom Business Group.</p>
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 border-t border-navy/15">
              {facts.map(([label, value]) => (
                <div key={label} className="border-b border-navy/15 py-4">
                  <dt className="kicker !text-[0.625rem] text-navy/55">{label}</dt>
                  <dd className="mt-1 font-display text-[0.9375rem] font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-navy/10 lg:aspect-[5/6]">
              <img src={img.crew} alt="Sanitation crew in uniform working on a city street" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="ceo-message-title" className="bg-paper py-16 md:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <Kicker>Leadership</Kicker>
            <h2 id="ceo-message-title" className={`mt-4 ${h2Class}`}>Message from the CEO<span className="text-moss">.</span></h2>
            <div className="mt-7 max-w-md overflow-hidden rounded-2xl bg-navy text-white">
              <div className="h-52 overflow-hidden bg-navy/20 sm:h-64 lg:h-[clamp(10rem,25vh,17rem)]">
                <img
                  src="/dayenu/mintesnot-firdawek.jpg"
                  alt="Mintesnot Firdawek, CEO of Dayenu"
                  className="h-full w-full -translate-x-[4.5%] origin-[50%_28%] scale-[1.3] object-cover object-[center_48%]"
                  loading="lazy"
                />
              </div>
              <div className="border-t-4 border-lime px-6 py-5">
                <p className="font-display text-xl font-bold">Mintesnot Firdawek</p>
                <p className="mt-1 text-sm font-semibold text-lime">Chief Executive Officer</p>
                <p className="mt-2 text-sm text-white/65">Dayenu Road &amp; Environment Cleaning Services PLC</p>
              </div>
            </div>
          </div>
          <Reveal delay={120}>
            <div className="max-w-3xl space-y-5 leading-relaxed text-navy/75 md:text-lg">
              <p>
                At Dayenu Road &amp; Environment Cleaning Services PLC, our vision is to contribute to a cleaner, healthier, and more sustainable future through
                excellence, innovation, and environmental responsibility.
              </p>
              <p>
                We recognize that environmental cleanliness and sustainable infrastructure are essential pillars of economic development, public health, and
                community well-being. Guided by this understanding, we are committed to delivering comprehensive, reliable, and high-quality solutions in road
                cleaning, environmental sanitation, commercial and industrial cleaning, waste management, and landscaping services.
              </p>
              <p>
                Our approach is built on professionalism, operational excellence, innovation, and a deep commitment to environmental sustainability. We
                continuously strive to adopt effective technologies, strengthen our capabilities, and exceed our clients’ expectations while creating meaningful
                and lasting value for the communities we serve.
              </p>
              <p>
                We believe that building a sustainable future requires more than providing services; it requires leadership, accountability, strategic
                partnerships, and a shared commitment to positive change.
              </p>
              <p>
                As we continue to grow, our ambition remains clear: to become a trusted leader in environmental and cleaning solutions, setting higher standards
                of service excellence and contributing to a cleaner, greener, and more sustainable society.
              </p>
              <p>
                I sincerely appreciate the trust of our clients, the dedication of our employees, and the support of our partners as we pursue this vision together.
              </p>
              <p className="font-semibold text-navy">Together, we are shaping a cleaner environment and a sustainable future.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-deep py-20 text-white md:py-32">
        <img src={img.night} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,19,50,.95)_20%,rgba(10,19,50,.55))]" />
        <Container className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="font-display text-[clamp(5rem,14vw,12rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
              24/7<span className="text-lime">.</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Kicker light>Around the clock</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>Available 24/7 for planned operations and urgent cleaning support.</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70 md:text-lg">
              Roads and public spaces are often cleaned best when traffic is lightest. We plan day, night and weekend shifts around each site, and mobilize
              quickly for urgent cleaning needs, subject to scope and safety.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {['Night and early-morning road shifts', 'Urgent sanitation support', 'Rapid mobilization'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-lime" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-28">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <p aria-hidden className="font-display text-[clamp(4rem,10vw,8rem)] leading-none font-extrabold tracking-[-0.05em] text-navy">
              Dayenu<span className="text-lime">.</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Kicker>The name</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>A name for work that is complete.</h2>
            <p className="mt-4 leading-relaxed text-navy/70 md:text-lg">
              For us, Dayenu means the job is done to the point of “enough”: the scope agreed, the work finished properly, and no gaps left behind. Then we add the small extra thing nobody asked for.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#f2f8eb] py-16 md:py-28">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-lime/70 bg-lime-soft p-8 shadow-[0_8px_30px_rgba(70,117,38,0.06)] md:p-12">
              <div>
                <span className="inline-block rounded-full bg-moss px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Vision
                </span>
                <p className="mt-6 text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.3] font-bold text-navy">
                  To become a trusted Ethiopian provider of road, environmental, sanitation, waste-management and public-space maintenance services, recognized for reliable delivery, safe operations, environmental responsibility and visible public value.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-lime/70 bg-lime-soft p-8 shadow-[0_8px_30px_rgba(70,117,38,0.06)] md:p-12">
              <div>
                <span className="inline-block rounded-full bg-moss px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Mission
                </span>
                <p className="mt-6 text-base leading-relaxed font-bold text-navy md:text-lg">
                  To provide professional, reliable, cost-effective and environmentally responsible cleaning and maintenance services that protect public health, improve the appearance and usability of public spaces, and support sustainable urban development.
                </p>
              </div>
              <ul className="mt-8 divide-y divide-navy/15 border-y border-navy/15 text-[0.9375rem]">
                {principles.map((t) => (
                  <li key={t} className="flex gap-2.5 py-3 font-bold text-navy">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-moss text-white">
                      <Icon name="check" size={11} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy py-16 text-white md:py-28">
        <Container>
          <Kicker light>Our core values</Kicker>
          <div className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([title, text], i) => (
              <div key={title} className="group border-t border-white/15 py-7 transition-colors duration-500 hover:border-lime">
                <span className="font-display text-xs text-lime">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold transition-colors duration-300 group-hover:text-lime">{title}</h3>
                <p className="mt-2 text-sm text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-navy/10">
              <img src={img.planting} alt="Gloved hands planting a young seedling" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Kicker>Social responsibility</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>Cleaner places, built by local people.</h2>
            <ul className="mt-6 divide-y divide-navy/10 border-y border-navy/10 text-[0.9375rem]">
              {responsibility.map((t) => (
                <li key={t} className="flex gap-2.5 py-3">
                  <Icon name="leaf" size={17} className="mt-0.5 shrink-0 text-moss" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-navy/10 lg:order-2">
            <img src={img.corridor} alt="Road through an Ethiopian city" className="h-full w-full object-cover" />
          </div>
          <div>
            <Kicker>Where we work</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>Based in Addis Ababa.</h2>
            <p className="mt-4 text-navy/70 md:text-lg">
              Our head office is in Bole Medhaniyalem (Bole Sheger), Addis Ababa. From there we mobilize crews, supervisors and equipment to roads, corridors, compounds and
              facilities. Tell us where your site is and we will confirm coverage.
            </p>
          </div>
        </Container>
      </section>
      <ContactCta title="Planning a project? Let’s talk." />
    </>
  )
}
