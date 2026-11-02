export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes?: number
}

export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint?: unknown | null
  width: number
  height: number
  formats?: {
    large?: StrapiImageFormat
    medium?: StrapiImageFormat
    small?: StrapiImageFormat
    thumbnail?: StrapiImageFormat
    [key: string]: StrapiImageFormat | undefined
  } | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata?: unknown | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface BlogPost {
  id: number
  documentId: string
  Title: string
  title?: string // Convenience alias
  slug: string
  excerpt: string
  content: string
  publishedDate: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  coverImage: StrapiMedia | null
  tag?: string
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: StrapiPagination
  }
  error?: {
    status: number
    name: string
    message: string
    details?: unknown
  }
}

export type BlogPostListResponse = StrapiResponse<BlogPost[]>
export type BlogPostSingleResponse = StrapiResponse<BlogPost[]>

