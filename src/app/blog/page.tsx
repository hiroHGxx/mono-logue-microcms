import { getPosts } from '@/lib/microcms'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ブログ一覧 - Mono-Logue',
  description: '技術、プログラミング、日常の学びに関する記事一覧です。',
}

export default async function BlogPage() {
  const { contents: posts } = await getPosts(20)

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-background)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{color: 'var(--color-text-primary)'}}
          >
            ブログ記事
          </h1>
          <p 
            className="text-lg"
            style={{color: 'var(--color-text-secondary)'}}
          >
            技術と日常をつなぐ気づきや学びを共有しています
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p style={{color: 'var(--color-text-muted)'}}>
              記事がまだありません。最初の記事をお楽しみに！
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:gap-12">
            {posts.map((post) => {
              const readingTime = calculateReadingTime(post.content)
              
              return (
                <article
                  key={post.id}
                  className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-secondary)',
                  }}
                >
                  <div className="flex flex-col space-y-4">
                    <div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <h2 
                          className="text-2xl font-semibold mb-2 group-hover:underline"
                          style={{color: 'var(--color-text-primary)'}}
                        >
                          {post.title}
                        </h2>
                      </Link>
                      
                      {post.excerpt && (
                        <p 
                          className="text-base line-clamp-3"
                          style={{color: 'var(--color-text-secondary)'}}
                        >
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm" style={{color: 'var(--color-text-muted)'}}>
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatReadingTime(readingTime)}
                        </span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: 'var(--color-accent)',
                          color: 'white',
                        }}
                      >
                        記事を読む
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <p style={{color: 'var(--color-text-muted)'}}>
              {posts.length} 件の記事を表示中
            </p>
          </div>
        )}
      </div>
    </div>
  )
}