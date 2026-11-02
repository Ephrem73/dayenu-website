import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface RichTextRendererProps {
  content: string
  className?: string
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content) return null

  return (
    <div className={`prose-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-10 mb-4 font-display text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 mb-4 font-display text-2xl font-bold tracking-tight text-navy md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-3 font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 mb-2 font-display text-lg font-semibold text-navy">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="my-5 text-[1.0625rem] leading-[1.8] text-navy/85">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-5 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.75] text-navy/85">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.75] text-navy/85">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-lime bg-paper/60 py-3 pr-4 pl-5 italic text-navy/80 rounded-r-lg">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-semibold text-navy underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-moss"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <figure className="my-8">
              <img
                src={src}
                alt={alt || ''}
                className="max-h-[550px] w-full rounded-2xl object-cover shadow-sm bg-navy/5"
                loading="lazy"
              />
              {alt && <figcaption className="mt-2 text-center text-sm text-navy/60 italic">{alt}</figcaption>}
            </figure>
          ),
          hr: () => <hr className="my-10 border-navy/15" />,
          code: ({ className, children }) => {
            const isBlock = /language-/.test(className || '')
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-xl bg-navy-deep p-4 font-mono text-sm text-paper">
                  {children}
                </code>
              )
            }
            return (
              <code className="rounded bg-navy/8 px-1.5 py-0.5 font-mono text-sm font-medium text-navy">
                {children}
              </code>
            )
          },
          pre: ({ children }) => <pre className="my-6 overflow-hidden rounded-xl">{children}</pre>,
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-navy/15">
              <table className="w-full text-left text-sm text-navy/80">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-navy/5 font-display font-semibold text-navy">{children}</thead>,
          th: ({ children }) => <th className="border-b border-navy/15 px-4 py-3">{children}</th>,
          td: ({ children }) => <td className="border-b border-navy/10 px-4 py-3">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

