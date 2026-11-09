import { posts as staticPosts } from '../data'
import { useEffect, useState } from 'react'
import {
  calculateReadingTime,
  FALLBACK_IMAGE,
  formatPostDate,
  getBlogPostBySlug,
  getBlogPosts,
  getStrapiMediaUrl,
} from '../../api/strapi'
import type { BlogPost } from '../../api/strapi.types'
import { RichTextRenderer } from '../../components/RichTextRenderer'
import { ContactCta, Container, Kicker, PageHero } from '../ui'

function ListingSkeleton() {
  return (
    <div className="grid animate-pulse gap-x-6 gap-y-10 md:grid-cols-6" aria-label="Loading articles">
      <div className="md:col-span-4">
        <div className="aspect-[16/9] rounded-2xl bg-navy/10" />
        <div className="mt-4 h-4 w-36 rounded bg-navy/10" />
        <div className="mt-2 h-7 w-3/4 rounded bg-navy/10" />
        <div className="mt-2 h-4 w-full rounded bg-navy/10" />
        <div className="mt-1 h-4 w-2/3 rounded bg-navy/10" />
      </div>
      <div className="md:col-span-2">
        <div className="aspect-[3/2] rounded-2xl bg-navy/10" />
        <div className="mt-4 h-4 w-28 rounded bg-navy/10" />
        <div className="mt-2 h-6 w-4/5 rounded bg-navy/10" />
        <div className="mt-2 h-4 w-full rounded bg-navy/10" />
      </div>
      <div className="md:col-span-3 lg:col-span-2">
        <div className="aspect-[3/2] rounded-2xl bg-navy/10" />
        <div className="mt-4 h-4 w-24 rounded bg-navy/10" />
        <div className="mt-2 h-5 w-3/4 rounded bg-navy/10" />
        <div className="mt-2 h-4 w-5/6 rounded bg-navy/10" />
      </div>
      <div className="md:col-span-3 lg:col-span-2">
        <div className="aspect-[3/2] rounded-2xl bg-navy/10" />
        <div className="mt-4 h-4 w-24 rounded bg-navy/10" />
        <div className="mt-2 h-5 w-3/4 rounded bg-navy/10" />
        <div className="mt-2 h-4 w-5/6 rounded bg-navy/10" />
      </div>
      <div className="md:col-span-3 lg:col-span-2">
        <div className="aspect-[3/2] rounded-2xl bg-navy/10" />
        <div className="mt-4 h-4 w-24 rounded bg-navy/10" />
        <div className="mt-2 h-5 w-3/4 rounded bg-navy/10" />
        <div className="mt-2 h-4 w-5/6 rounded bg-navy/10" />
      </div>
    </div>
  )
}

function ArticleSkeleton() {
  return (
    <article className="animate-pulse bg-white pt-28 md:pt-32" aria-label="Loading article">
      <Container className="max-w-3xl">
        <div className="h-4 w-24 rounded bg-navy/10" />
        <div className="mt-6 h-4 w-44 rounded bg-navy/10" />
        <div className="mt-4 h-10 w-4/5 rounded bg-navy/10" />
        <div className="mt-2 h-10 w-3/5 rounded bg-navy/10" />
        <div className="mt-4 h-5 w-full rounded bg-navy/10" />
        <div className="mt-1 h-5 w-5/6 rounded bg-navy/10" />
      </Container>
      <Container className="mt-10 max-w-5xl">
        <div className="aspect-[21/9] rounded-2xl bg-navy/10" />
      </Container>
      <Container className="max-w-[44rem] space-y-4 py-12">
        <div className="h-4 w-full rounded bg-navy/10" />
        <div className="h-4 w-11/12 rounded bg-navy/10" />
        <div className="h-4 w-4/5 rounded bg-navy/10" />
        <div className="h-4 w-full rounded bg-navy/10" />
        <div className="h-4 w-3/4 rounded bg-navy/10" />
      </Container>
    </article>
  )
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState('All')

  const fallbackPosts: BlogPost[] = staticPosts.map((p, i) => ({
    id: i + 1,
    documentId: p.slug,
    Title: p.title,
    title: p.title,
    slug: p.slug,
    highlight: p.excerpt,
    excerpt: p.excerpt,
    content: p.body.join('\n\n'),
    publishedDate: p.date,
    createdAt: p.date,
    updatedAt: p.date,
    publishedAt: p.date,
    tag: p.tag,
    author: p.author.name,
    authorName: p.author.name,
    authorRole: p.author.role,
    date: p.date,
    coverImage: {
      id: i + 1,
      documentId: p.slug,
      name: p.title,
      alternativeText: p.title,
      caption: null,
      width: 1200,
      height: 800,
      hash: p.slug,
      ext: '.png',
      mime: 'image/png',
      size: 100,
      url: p.image,
      provider: 'local',
      createdAt: p.date,
      updatedAt: p.date,
      publishedAt: p.date,
    },
  }))

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getBlogPosts()
      if (data && data.length > 0) {
        setPosts(data)
      } else {
        setPosts(fallbackPosts)
      }
    } catch {
      setPosts(fallbackPosts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const tags = ['All', ...Array.from(new Set(posts.map((p) => p.tag || 'Insights')))]
  const filteredPosts = posts.filter((p) => selectedTag === 'All' || (p.tag || 'Insights') === selectedTag)

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
          {/* Topic Filters */}
          {!loading && !error && tags.length > 1 && (
            <div className="mb-8 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by topic">
              <span className="kicker mr-2 text-navy/50">Topics</span>
              {tags.map((t) => (
                <button
                  key={t}
                  aria-pressed={t === selectedTag}
                  onClick={() => setSelectedTag(t)}
                  className={`h-8 rounded-full border px-3.5 font-display text-[0.8125rem] font-semibold transition ${
                    t === selectedTag ? 'border-navy bg-navy text-white' : 'border-navy/25 hover:border-navy'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && <ListingSkeleton />}

          {/* Error State */}
          {error && !loading && (
            <div className="my-10 rounded-2xl border border-red-200 bg-red-50/70 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">Unable to load journal entries</h3>
              <p className="mt-2 text-sm text-navy/70 max-w-md mx-auto">{error}</p>
              <button
                onClick={loadPosts}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 font-display text-sm font-semibold text-white transition hover:bg-navy-deep"
              >
                <span>Retry</span>
                <span aria-hidden>↻</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="my-12 rounded-2xl border border-navy/10 bg-paper py-16 text-center">
              <h3 className="font-display text-xl font-bold text-navy">No articles found</h3>
              <p className="mt-2 text-sm text-navy/60">
                {selectedTag === 'All'
                  ? 'No journal entries have been published yet.'
                  : `No articles found under topic "${selectedTag}".`}
              </p>
              {selectedTag !== 'All' && (
                <button
                  onClick={() => setSelectedTag('All')}
                  className="mt-4 font-display text-sm font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4"
                >
                  View all articles
                </button>
              )}
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-6">
              {filteredPosts.map((p, i) => {
                const coverUrl = getStrapiMediaUrl(p.coverImage, i === 0 ? 'large' : 'medium')
                const displayTitle = p.Title || p.title || 'Untitled Article'
                const displayDate = formatPostDate(p.date || p.publishedDate || p.publishedAt)
                const readingTime = calculateReadingTime(p.content)
                const tag = p.tag || 'Insights'
                const displayExcerpt = p.highlight || p.excerpt || ''
                const authorName = p.author || p.authorName || (i % 2 === 0 ? 'Ephrem Tadesse' : 'Yared Bekele')
                const authorRole = p.authorRole || (i % 2 === 0 ? 'Operations Manager' : 'Safety Officer')

                return (
                  <a
                    key={p.documentId || p.slug || p.id}
                    href={`#/blog/${p.slug}`}
                    className={`group ${
                      i === 0 ? 'md:col-span-4' : i === 1 ? 'md:col-span-2' : 'md:col-span-3 lg:col-span-2'
                    }`}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl bg-navy/10 ${
                        i === 0 ? 'aspect-[16/9]' : 'aspect-[3/2]'
                      }`}
                    >
                      <img
                        src={coverUrl}
                        alt={p.coverImage?.alternativeText || displayTitle}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-navy/60">
                      <span className="font-bold text-navy/85">{tag}</span>
                      <span>·</span>
                      <span>{displayDate || 'October 2026'}</span>
                      <span>·</span>
                      <span>{readingTime}</span>
                    </div>
                    <h2
                      className={`mt-1.5 font-bold leading-snug decoration-lime decoration-[3px] underline-offset-4 group-hover:underline ${
                        i === 0 ? 'text-2xl md:text-[1.75rem]' : 'text-lg'
                      }`}
                    >
                      {displayTitle}
                    </h2>
                    {displayExcerpt && <p className="mt-2 text-sm text-navy/65 line-clamp-3">{displayExcerpt}</p>}
                    <div className="mt-3.5 flex items-center justify-between border-t border-navy/10 pt-3">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime/40 text-[0.6875rem] font-bold text-navy">
                          {authorName.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-navy leading-none">{authorName}</p>
                          <p className="text-[0.625rem] text-navy/55">{authorRole}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 font-display text-[0.8125rem] font-semibold text-navy">
                        Read <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
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
  return <div aria-hidden className="fixed top-0 left-0 z-50 h-1 bg-lime transition-all" style={{ width: `${p * 100}%` }} />
}

export function Article({ slug }: { slug: string }) {
  const decodedSlug = decodeURIComponent(slug).replace(/\/$/, '')
  const [post, setPost] = useState<BlogPost | null>(null)
  const [morePosts, setMorePosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadArticle = async () => {
    try {
      setLoading(true)
      setError(null)
      const [fetchedPost, allPosts] = await Promise.all([
        getBlogPostBySlug(decodedSlug),
        getBlogPosts().catch(() => [] as BlogPost[]),
      ])

      setPost(fetchedPost)
      setMorePosts(allPosts.filter((p) => p.slug !== decodedSlug).slice(0, 2))
    } catch (err) {
      console.error('Failed to load article:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch article')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticle()
  }, [decodedSlug])

  if (loading) {
    return (
      <>
        <ReadingProgress />
        <ArticleSkeleton />
      </>
    )
  }

  if (error || !post) {
    return (
      <Container className="py-40">
        <div className="max-w-xl">
          <span className="kicker text-navy/60">Journal</span>
          <h1 className="mt-3 text-4xl font-extrabold text-navy">
            {error ? 'Failed to load article' : 'Article not found.'}
          </h1>
          <p className="mt-4 text-navy/70">
            {error ||
              `We couldn't find an article matching "${decodedSlug}". It may have been moved or unpublished.`}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#/blog"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-display text-sm font-semibold text-white transition hover:bg-navy-deep"
            >
              ← Back to journal
            </a>
            {error && (
              <button
                onClick={loadArticle}
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 font-display text-sm font-semibold text-navy transition hover:border-navy"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </Container>
    )
  }

  const coverUrl = getStrapiMediaUrl(post.coverImage, 'large')
  const displayTitle = post.Title || post.title || 'Untitled Article'
  const displayDate = formatPostDate(post.date || post.publishedDate || post.publishedAt)
  const displayExcerpt = post.highlight || post.excerpt || ''
  const readingTime = calculateReadingTime(post.content)
  const tag = post.tag || 'Insights'
  const authorName = post.author || post.authorName || 'Ephrem Tadesse'
  const authorRole = post.authorRole || 'Operations Manager'

  return (
    <>
      <ReadingProgress />
      <article className="bg-white pt-28 md:pt-32">
        <Container className="max-w-3xl">
          <a
            href="#/blog"
            className="inline-flex items-center gap-1.5 font-display text-[0.8125rem] font-semibold text-navy/60 transition-colors hover:text-navy"
          >
            ← Journal
          </a>
          <div className="mt-6">
            <Kicker>
              {tag} · {readingTime} {displayDate ? `· ${displayDate}` : ''}
            </Kicker>
          </div>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy md:text-[2.75rem]">
            {displayTitle}
          </h1>
          {displayExcerpt && <p className="mt-4 text-lg text-navy/70 leading-relaxed">{displayExcerpt}</p>}
          <div className="mt-6 flex items-center gap-3.5 rounded-xl border border-navy/10 bg-paper p-3.5 max-w-md">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime font-display text-sm font-bold text-navy">
              {authorName.charAt(0)}
            </span>
            <div>
              <p className="font-display text-sm font-bold text-navy">{authorName}</p>
              <p className="text-xs text-navy/60">{authorRole} · {displayDate || 'October 2026'}</p>
            </div>
          </div>
        </Container>

        {coverUrl && (
          <Container className="mt-10 max-w-5xl">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl bg-navy/10 shadow-sm">
              <img
                src={coverUrl}
                alt={post.coverImage?.alternativeText || displayTitle}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE
                }}
                className="h-full w-full object-cover"
              />
            </div>
            {post.coverImage?.caption && (
              <p className="mt-2 text-center text-xs text-navy/50 italic">{post.coverImage.caption}</p>
            )}
          </Container>
        )}

        <Container className="max-w-[44rem] py-12">
          <RichTextRenderer content={post.content} />
        </Container>
      </article>

      {morePosts.length > 0 && (
        <section className="bg-paper py-14">
          <Container>
            <h2 className="mb-7 text-2xl font-extrabold text-navy">Keep reading</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {morePosts.map((p) => {
                const moreCoverUrl = getStrapiMediaUrl(p.coverImage, 'medium')
                const moreTitle = p.Title || p.title || 'Untitled'
                return (
                  <a key={p.slug} href={`#/blog/${p.slug}`} className="group">
                    <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-navy/10">
                      <img
                        src={moreCoverUrl}
                        alt={p.coverImage?.alternativeText || moreTitle}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="kicker mt-3 text-xs text-navy/60">
                      {p.tag || 'Insights'} · {calculateReadingTime(p.content)}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-navy group-hover:underline">{moreTitle}</h3>
                  </a>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      <ContactCta />
    </>
  )
}
