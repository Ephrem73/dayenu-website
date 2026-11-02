/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_URL?: string
  readonly NEXT_PUBLIC_STRAPI_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
