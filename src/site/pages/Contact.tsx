import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { company, faqs, img, services, tel } from '../data'
import { Icon, type IconName } from '../Icon'
import { Button, Container, Kicker, PageHero, Reveal, h2Class } from '../ui'

const channels: [IconName, string, string, string, string?, boolean?][] = [
  ['phone', 'Call us', company.phones[0], 'Direct phone & dispatch support', tel(company.phones[0])],
  ['mail', 'Email us', company.email, 'Direct email enquiries', `mailto:${company.email}`],
  ['whatsapp', 'WhatsApp', company.whatsapp, 'Instant chat and urgent dispatch', company.whatsappUrl],
  ['telegram', 'Telegram', company.telegram, 'Official channel and operations desk', company.telegramUrl],
  ['pin', 'Head office', company.office, 'Ethiopia'],
  ['clock', 'Availability', 'Available 24/7', 'Planned operations and urgent support'],
]

const nextSteps = [
  ['We review your request', 'Our team reads every message and follows up on the details we need.'],
  ['We assess the site', 'A site visit or walk-through to confirm the area, frequency and requirements.'],
  ['You receive a proposal', 'Scope, schedule, manpower, equipment and reporting format, before work begins.'],
]

const empty = { topic: '', name: '', organization: '', email: '', phone: '', via: 'Email', message: '' }
const contactInbox = company.email

const inputClass = (error?: string | false) =>
  `contact-field mt-1.5 h-11 w-full rounded-lg border bg-white px-3.5 text-[0.9375rem] transition placeholder:text-navy/35 ${
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

const topicOptions = ['', ...services.map((s) => s.name), 'Emergency response', 'Tender or RFQ', 'Something else']

function ServiceSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const id = useId()
  const container = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, id, open])

  const showOptions = () => {
    setActive(Math.max(0, topicOptions.indexOf(value)))
    setOpen(true)
  }
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) showOptions()
      else setActive((index) => (index + (event.key === 'ArrowDown' ? 1 : -1) + topicOptions.length) % topicOptions.length)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) {
        onChange(topicOptions[active])
        setOpen(false)
      } else showOptions()
    } else if (event.key === 'Escape' && open) {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Tab') {
      setOpen(false)
    } else if (open && (event.key === 'Home' || event.key === 'End')) {
      event.preventDefault()
      setActive(event.key === 'Home' ? 0 : topicOptions.length - 1)
    }
  }

  return (
    <div ref={container} className="relative">
      <span id={`${id}-label`} className="text-[0.8125rem] font-semibold">Service needed <span className="font-normal text-navy/50">(optional)</span></span>
      <button
        type="button"
        role="combobox"
        aria-labelledby={`${id}-label`}
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => open ? setOpen(false) : showOptions()}
        onKeyDown={onKeyDown}
        className={`${inputClass()} flex items-center justify-between gap-3 text-left ${value ? 'text-navy' : 'text-navy/50'}`}
      >
        <span className="truncate">{value || 'Select a service'}</span>
        <Icon name="chevron" size={17} className={`shrink-0 text-navy/60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className="absolute inset-x-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-navy/10 bg-white p-1.5 shadow-[0_16px_40px_rgba(16,29,73,.16)]">
          {topicOptions.map((topic, index) => (
            <div
              key={topic || 'none'}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === topic}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => { onChange(topic); setOpen(false) }}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm leading-snug ${active === index ? 'bg-paper text-navy' : 'text-navy/75'} ${value === topic && topic ? 'font-semibold' : ''}`}
            >
              <span>{topic || 'No preference'}</span>
              {value === topic && topic && <Icon name="check" size={16} className="shrink-0 text-moss" />}
            </div>
          ))}
        </div>
      )}
    </div>
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
        Tell us what needs cleaning or maintenance, and we’ll help you plan the next step.
      </PageHero>

      <section className="bg-paper py-14 md:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <div>
              <Kicker>Reach us directly</Kicker>
              <h2 className={`mt-4 ${h2Class}`}>Let’s start a conversation.</h2>
              <p className="mt-5 max-w-md leading-relaxed text-navy/65 md:text-lg">Call our team or send us a message about your site and what you need.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {channels.map(([icon, label, value, note, href, isDownload]) => (
                <li key={label} className="group rounded-2xl bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_45px_-28px_rgba(16,29,73,.35)]">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-lime-soft text-navy transition-colors group-hover:bg-lime">
                    <Icon name={icon} size={16} />
                  </span>
                  <p className="kicker mt-4 !text-[0.625rem] text-navy/55">{label}</p>
                  <p className="mt-1 font-display text-[0.9375rem] font-semibold">
                    {href ? (
                      <a
                        href={href}
                        download={isDownload ? true : undefined}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="underline decoration-lime decoration-2 underline-offset-4 hover:decoration-navy"
                      >
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
            <p className="mt-6 max-w-md text-sm leading-relaxed text-navy/60">We’ll review your request and follow up on the details needed to prepare a proposal.</p>
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
                    Your message was submitted. Our team will follow up with you.
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
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">Tell us a little about your needs and we’ll be in touch.</p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
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
                    <div className="sm:col-span-2">
                      <ServiceSelect value={form.topic} onChange={(value) => set('topic', value)} />
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Message" error={tried && errors.message}>
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => set('message', e.target.value)}
                          placeholder="Tell us about your site and what you need."
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
                      {sending ? 'Submitting…' : 'Request site assessment'}
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
