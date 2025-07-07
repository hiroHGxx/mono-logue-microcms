import { getPosts } from '@/lib/microcms'
import BlogCard from '@/components/BlogCard'
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            {posts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                featured={index === 0}
              />
            ))}
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