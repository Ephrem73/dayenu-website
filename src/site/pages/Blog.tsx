import { useEffect, useState } from 'react'
import { posts } from '../data'
import { Container, ContactCta, Kicker, PageHero } from '../ui'

export function Blog() {
  const tags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))]
  const [tag, setTag] = useState('All')
  const list = posts.filter((p) => tag === 'All' || p.tag === tag)
  return (
    <>
      <PageHero
        kicker="Journal"
        title={
          <>
            Clean thinking, <span className="text-lime">shared.</span>
          </>
        }
      >
        Notes on how we plan, deliver and report road, environmental and facility services, safely and responsibly.
      </PageHero>
      <section className="bg-white py-12 md:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by topic">
            <span className="kicker mr-2 text-navy/50">Topics</span>
            {tags.map((t) => (
              <button
                key={t}
                aria-pressed={t === tag}
                onClick={() => setTag(t)}
                className={`h-8 rounded-full border px-3.5 font-display text-[0.8125rem] font-semibold transition ${
                  t === tag ? 'border-navy bg-navy text-white' : 'border-navy/25 hover:border-navy'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-6">
            {list.map((p, i) => (
              <a
                key={p.slug}
                href={`#/blog/${p.slug}`}
                className={`group ${i === 0 ? 'md:col-span-4' : i === 1 ? 'md:col-span-2' : 'md:col-span-3 lg:col-span-2'}`}
              >
                <div className={`overflow-hidden rounded-2xl bg-navy/10 ${i === 0 ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
                  <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="kicker mt-4 text-navy/60">
                  {p.tag} · {p.read} · {p.date}
                </p>
                <h2
                  className={`mt-1.5 font-bold leading-snug decoration-lime decoration-[3px] underline-offset-4 group-hover:underline ${
                    i === 0 ? 'text-2xl md:text-[1.75rem]' : 'text-lg'
                  }`}
                >
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-navy/65">{p.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.8125rem] font-semibold">
                  Read <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  )
}

function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div aria-hidden className="fixed top-0 left-0 z-50 h-1 bg-lime" style={{ width: `${p * 100}%` }} />
}

export function Article({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug)
  if (!post)
    return (
      <Container className="py-40">
        <h1 className="text-4xl font-extrabold">Article not found.</h1>
        <a href="#/blog" className="mt-5 inline-block underline">
          Back to journal
        </a>
      </Container>
    )
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2)
  return (
    <>
      <ReadingProgress />
      <article className="bg-white pt-28 md:pt-32">
        <Container className="max-w-3xl">
          <a href="#/blog" className="font-display text-[0.8125rem] font-semibold text-navy/60 hover:text-navy">
            ← Journal
          </a>
          <div className="mt-6">
            <Kicker>
              {post.tag} · {post.read} · {post.date}
            </Kicker>
          </div>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] md:text-[2.75rem]">{post.title}</h1>
          <p className="mt-4 text-lg text-navy/70">{post.excerpt}</p>
        </Container>
        <Container className="mt-10 max-w-5xl">
          <div className="aspect-[21/9] overflow-hidden rounded-2xl bg-navy/10">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>
        </Container>
        <Container className="max-w-[44rem] space-y-5 py-12 text-[1.0625rem] leading-[1.75] text-navy/85">
          {post.body.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'first-letter:float-left first-letter:mr-2.5 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.9] first-letter:font-extrabold'
                  : ''
              }
            >
              {para}
            </p>
          ))}
        </Container>
      </article>
      <section className="bg-paper py-14">
        <Container>
          <h2 className="mb-7 text-2xl font-extrabold">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <a key={p.slug} href={`#/blog/${p.slug}`} className="group">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-navy/10">
                  <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-3 text-lg font-bold group-hover:underline">{p.title}</h3>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  )
}
