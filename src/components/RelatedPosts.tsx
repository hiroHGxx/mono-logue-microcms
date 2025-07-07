import Link from 'next/link'
import Image from 'next/image'
import { getRelatedPosts, BlogPost } from '@/lib/microcms'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'

interface RelatedPostsProps {
  currentPostId: string
  categories: Array<{ id: string; name: string; slug: string }>
  limit?: number
}

export default async function RelatedPosts({ 
  currentPostId, 
  categories, 
  limit = 3 
}: RelatedPostsProps) {
  let relatedPosts: BlogPost[] = []

  try {
    relatedPosts = await getRelatedPosts(currentPostId, categories, limit)
  } catch (error) {
    console.error('Failed to fetch related posts:', error)
    return null
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t" style={{borderColor: 'var(--color-secondary)'}}>
      <h2 
        className="text-2xl font-bold mb-6"
        style={{color: 'var(--color-text-primary)'}}
      >
        関連記事
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => {
          const readingTime = calculateReadingTime(post.content)
          
          return (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-secondary)',
              }}
            >
              {post.eyecatch && (
                <div className="relative h-32">
                  <Image
                    src={post.eyecatch.url}
                    alt={post.eyecatch.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="font-semibold mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                    style={{color: 'var(--color-text-primary)'}}
                  >
                    {post.title}
                  </Link>
                </h3>
                
                {post.excerpt && (
                  <p 
                    className="text-sm line-clamp-2 mb-3"
                    style={{color: 'var(--color-text-secondary)'}}
                  >
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs" style={{color: 'var(--color-text-muted)'}}>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatReadingTime(readingTime)}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}