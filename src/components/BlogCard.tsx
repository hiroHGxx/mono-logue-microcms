import Link from 'next/link'
import Image from 'next/image'
import { calculateReadingTime } from '@/lib/reading-time'

interface BlogPost {
  id: string
  title: string
  content: string
  slug: string
  publishedAt: string
  excerpt?: string
  eyecatch?: {
    url: string
    alt?: string
  }
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const readingTime = calculateReadingTime(post.content)

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 ${featured ? 'lg:col-span-2' : ''}`}>
      {post.eyecatch && (
        <div className={`relative ${featured ? 'h-64' : 'h-48'}`}>
          <Image
            src={post.eyecatch.url}
            alt={post.eyecatch.alt || post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <time 
            dateTime={post.publishedAt}
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-muted)'
            }}
          >
            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
          </time>
          <span 
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white'
            }}
          >
            約{readingTime}分
          </span>
        </div>

        <h3 className={`font-bold mb-3 leading-tight ${featured ? 'text-2xl' : 'text-xl'}`} style={{color: 'var(--color-text-primary)'}}>
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:opacity-80 transition-opacity"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className={`mb-4 leading-relaxed ${featured ? 'text-base' : 'text-sm'}`} style={{color: 'var(--color-text-secondary)'}}>
            {post.excerpt.length > (featured ? 200 : 120) 
              ? `${post.excerpt.substring(0, featured ? 200 : 120)}...` 
              : post.excerpt
            }
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">H</span>
            </div>
            <span className="text-sm font-medium" style={{color: 'var(--color-text-secondary)'}}>
              ヒロ
            </span>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-medium hover:opacity-80 transition-all group"
            style={{color: 'var(--color-accent)'}}
          >
            続きを読む
            <svg 
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}