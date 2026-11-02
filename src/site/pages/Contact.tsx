import { useState, type ReactNode } from 'react'
import { company, faqs, img, services, tel } from '../data'
import { Icon, type IconName } from '../Icon'
import { Button, Container, Kicker, PageHero, Reveal, h2Class } from '../ui'

const channels: [IconName, string, string, string, string?][] = [
  ['phone', 'Call us', company.phones[0], `Also ${company.phones[1]}`, tel(company.phones[0])],
  ['pin', 'Head office', company.office, 'Ethiopia'],
  ['clock', 'Availability', 'Available 24/7', 'Planned operations and urgent support'],
  ['briefcase', 'Procurement', 'Tenders, RFQs and pilots', 'Framework and service-level contracts'],
]

const nextSteps = [
  ['We review your request', 'Our team reads every message and follows up on the details we need.'],
  ['We assess the site', 'A site visit or walk-through to confirm the area, frequency and requirements.'],
  ['You receive a proposal', 'Scope, schedule, manpower, equipment and reporting format, before work begins.'],
]

const empty = { topic: '', name: '', organization: '', email: '', phone: '', via: 'Email', message: '' }
// Change this address when Dayenu has its own inbox. The new address must activate the form.
const contactInbox = 'ephrem@jirtuu.io'

const inputClass = (error?: string | false) =>
  `mt-1.5 h-11 w-full rounded-lg border bg-white px-3.5 text-[0.9375rem] outline-none transition placeholder:text-navy/35 focus:border-navy focus:ring-4 focus:ring-lime ${
    error ? 'border-red-500' : 'border-navy/20'
  }`

function Field({ label, optional, error, children }: { label: string; optional?: boolean; error?: string | false; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.8125rem] font-semibold">
        {label} {optional && <span className="font-normal text-navy/50">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}

export default function Contact({ service }: { service?: string | null }) {
  const [form, setForm] = useState({ ...empty, topic: services.find((s) => s.id === service)?.name ?? '' })
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }))
  const errors = {
    name: !form.name.trim() && 'Please add your name',
    email: !/\S+@\S+\.\S+/.test(form.email) && 'Please add a valid email',
    message: form.message.trim().length < 10 && 'A sentence or two helps us reply properly',
  }
  const valid = !errors.name && !errors.email && !errors.message

  return (
    <>
      <PageHero
        kicker="Contact us"
        title={
          <>
            Let’s talk about <span className="text-lime">your site.</span>
          </>
        }
        image={img.walkway}
      >
        Roads, public spaces, facilities or a construction handover. Tell us what you need covered and our team will confirm the scope, schedule and
        resources with you.
      </PageHero>

      <section className="bg-paper py-14 md:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <Kicker>Reach us directly</Kicker>
              <h2 className={`mt-4 ${h2Class}`}>Prefer to talk? We are easy to reach.</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {channels.map(([icon, label, value, note, href]) => (
                <li key={label} className="group rounded-2xl bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_45px_-28px_rgba(16,29,73,.35)]">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-lime-soft text-navy transition-colors group-hover:bg-lime">
                    <Icon name={icon} size={16} />
                  </span>
                  <p className="kicker mt-4 !text-[0.625rem] text-navy/55">{label}</p>
                  <p className="mt-1 font-display text-[0.9375rem] font-semibold">
                    {href ? (
                      <a href={href} className="underline decoration-lime decoration-2 underline-offset-4 hover:decoration-navy">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-navy/55">{note}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="kicker text-lime">What happens next</p>
              <ol className="mt-5 space-y-4">
                {nextSteps.map(([title, text], i) => (
                  <li key={title} className="grid grid-cols-[1.75rem_1fr] gap-2.5">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-lime font-display text-[0.6875rem] font-bold text-lime">{i + 1}</span>
                    <div>
                      <p className="font-display text-[0.9375rem] font-semibold">{title}</p>
                      <p className="mt-0.5 text-[0.8125rem] text-white/65">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <Reveal>
            <div className="rounded-3xl bg-white p-6 shadow-[0_30px_70px_-45px_rgba(16,29,73,.45)] md:p-9">
              {sent ? (
                <div className="py-8" aria-live="polite">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-navy">
                    <Icon name="check" size={22} />
                  </span>
                  <h2 className={`mt-6 ${h2Class}`}>Thank you, {form.name.trim().split(' ')[0]}.</h2>
                  <p className="mt-3 max-w-md text-navy/70">
                    Your message was submitted. Our team will follow up using your preferred contact method.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    <Button variant="navy" href="#/services">
                      Browse services
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSent(false)
                        setTried(false)
                        setForm(empty)
                      }}
                    >
                      Send another message
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setTried(true)
                    if (!valid || sending) return
                    setSending(true)
                    setSubmitError('')
                    try {
                      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactInbox)}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({ ...form, _subject: 'New Dayenu website enquiry', _replyto: form.email }),
                      })
                      const result = await response.json()
                      if (!response.ok || String(result.success) !== 'true') throw new Error('Submission failed')
                      setSent(true)
                    } catch {
                      setSubmitError('We could not send your message. Please try again or call us using the number shown.')
                    } finally {
                      setSending(false)
                    }
                  }}
                >
                  <Kicker>Send a message</Kicker>
                  <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.025em] md:text-[1.875rem]">How can we help?</h2>
                  <fieldset className="mt-7">
                    <legend className="text-[0.8125rem] font-semibold">
                      What is it about? <span className="font-normal text-navy/50">(optional)</span>
                    </legend>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {[...services.map((s) => s.name), 'Emergency response', 'Tender or RFQ', 'Something else'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={form.topic === t}
                          onClick={() => set('topic', form.topic === t ? '' : t)}
                          className={`h-8 rounded-full border px-3 text-[0.8125rem] font-medium transition-colors ${
                            form.topic === t ? 'border-navy bg-navy text-white' : 'border-navy/20 hover:border-navy'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" error={tried && errors.name}>
                      <input value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" className={inputClass(tried && errors.name)} />
                    </Field>
                    <Field label="Organization" optional>
                      <input
                        value={form.organization}
                        onChange={(e) => set('organization', e.target.value)}
                        autoComplete="organization"
                        className={inputClass()}
                      />
                    </Field>
                    <Field label="Email" error={tried && errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        autoComplete="email"
                        className={inputClass(tried && errors.email)}
                      />
                    </Field>
                    <Field label="Phone" optional>
                      <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" className={inputClass()} />
                    </Field>
                    <fieldset className="sm:col-span-2">
                      <legend className="text-[0.8125rem] font-semibold">Best way to reply</legend>
                      <div className="mt-1.5 grid h-11 grid-cols-2 rounded-lg bg-paper p-1">
                        {['Email', 'Phone'].map((v) => (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={form.via === v}
                            onClick={() => set('via', v)}
                            className={`rounded-md text-[0.8125rem] font-semibold transition-colors ${
                              form.via === v ? 'bg-white text-navy shadow-sm' : 'text-navy/55 hover:text-navy'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div className="sm:col-span-2">
                      <Field label="Message" error={tried && errors.message}>
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => set('message', e.target.value)}
                          placeholder="Tell us about the site or area, the services and frequency you need, and any timing or safety requirements."
                          className={`${inputClass(tried && errors.message)} h-auto resize-y py-3`}
                        />
                      </Field>
                    </div>
                  </div>
                  <div className="mt-7 flex flex-col-reverse items-start justify-between gap-4 border-t border-navy/10 pt-6 sm:flex-row sm:items-center">
                    <div><p className="max-w-xs text-xs text-navy/50">We only use your details to reply to this message.</p>{submitError && <p role="alert" className="mt-2 text-sm text-red-700">{submitError}</p>}</div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 font-display text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      {sending ? 'Sending…' : 'Send message'}
                      <Icon name="send" size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <Kicker>Quick answers</Kicker>
            <h2 className={`mt-4 ${h2Class}`}>Before you write.</h2>
          </div>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {faqs.slice(0, 4).map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-[1.0625rem] font-semibold">
                  {q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/20 transition-transform group-open:rotate-180">
                    <Icon name="chevron" size={15} />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[0.9375rem] text-navy/70">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
