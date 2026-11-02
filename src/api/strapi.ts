import { BlogPost, BlogPostListResponse, BlogPostSingleResponse, StrapiMedia } from './strapi.types'

export const STRAPI_BASE_URL = (
  import.meta.env.VITE_STRAPI_URL ||
  import.meta.env.NEXT_PUBLIC_STRAPI_URL ||
  'https://dayenu-cms.onrender.com'
).replace(/\/+$/, '')

/**
 * Fallback placeholder image when a blog post or media asset is missing an image.
 */
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80'

/**
 * Resolves media URLs from Strapi 5.
 * Handles:
 * - Full Cloudinary URLs (e.g. https://res.cloudinary.com/...)
 * - Relative URLs from local Strapi upload provider (/uploads/...)
 * - Specific formats (thumbnail, small, medium, large)
 * - Safe fallback placeholder if media is absent
 */
export function getStrapiMediaUrl(
  media?: StrapiMedia | string | null,
  format?: 'thumbnail' | 'small' | 'medium' | 'large',
): string {
  if (!media) return FALLBACK_IMAGE

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) {
      return media
    }
    if (media.startsWith('/')) {
      return `${STRAPI_BASE_URL}${media}`
    }
    return media || FALLBACK_IMAGE
  }

  let rawUrl: string | undefined

  if (format && media.formats && media.formats[format]?.url) {
    rawUrl = media.formats[format]?.url
  } else if (media.url) {
    rawUrl = media.url
  }

  if (!rawUrl) return FALLBACK_IMAGE

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }

  if (rawUrl.startsWith('/')) {
    return `${STRAPI_BASE_URL}${rawUrl}`
  }

  return `${STRAPI_BASE_URL}/${rawUrl}`
}

/**
 * Normalizes a BlogPost from Strapi 5 so fields like title/Title are accessible uniformly.
 */
function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    title: post.Title || post.title || 'Untitled Post',
    Title: post.Title || post.title || 'Untitled Post',
  }
}

/**
 * Generic fetcher for Strapi REST API with error handling.
 */
async function fetchStrapi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${STRAPI_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    let errorDetails = ''
    try {
      const errorJson = await response.json()
      errorDetails = errorJson?.error?.message || response.statusText
    } catch {
      errorDetails = response.statusText
    }
    throw new Error(`Strapi request failed (${response.status}): ${errorDetails}`)
  }

  return response.json()
}

/**
 * Fetches all published blog posts sorted by publishedDate in descending order.
 * Endpoint: GET /api/blog-posts?populate=*&sort=publishedDate:desc
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const result = await fetchStrapi<BlogPostListResponse>('/api/blog-posts', {
    populate: '*',
    sort: 'publishedDate:desc',
  })

  if (!result || !Array.isArray(result.data)) {
    return []
  }

  return result.data.map(normalizePost)
}

/**
 * Fetches a single published blog post by its slug.
 * Endpoint: GET /api/blog-posts?filters[slug][$eq]=<slug>&populate=*
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null

  const result = await fetchStrapi<BlogPostSingleResponse>('/api/blog-posts', {
    'filters[slug][$eq]': slug,
    populate: '*',
  })

  if (!result || !Array.isArray(result.data) || result.data.length === 0) {
    return null
  }

  return normalizePost(result.data[0])
}

/**
 * Format ISO datetime string to a human-readable date.
 * e.g. "October 23, 2026"
 */
export function formatPostDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/**
 * Calculate estimated reading time in minutes based on content word count.
 */
export function calculateReadingTime(content?: string): string {
  if (!content) return '1 min read'
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min read`
}

