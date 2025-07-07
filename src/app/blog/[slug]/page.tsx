import { getPost, getPosts } from '@/lib/microcms'
import { BlogPostStructuredData } from '@/components/StructuredData'
import RelatedPosts from '@/components/RelatedPosts'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import '@/styles/blog-content.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

// 動的メタデータ生成
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const post = await getPost(slug)
    const excerpt = post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
    
    return {
      title: `${post.title} - Mono-Logue`,
      description: excerpt,
      openGraph: {
        title: post.title,
        description: excerpt,
        url: `http://localhost:3000/blog/${post.slug}`,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        images: post.eyecatch 
          ? [{ url: post.eyecatch.url, width: 1200, height: 630, alt: post.title }]
          : [{ url: '/og-image.svg', width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: excerpt,
        images: post.eyecatch ? [post.eyecatch.url] : ['/og-image.svg'],
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch {
    return {
      title: '記事が見つかりません - Mono-Logue',
      description: 'お探しの記事は見つかりませんでした。',
    }
  }
}

// 静的パス生成
export async function generateStaticParams() {
  const { contents: posts } = await getPosts(100)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  
  let post
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }

  // 読了時間計算
  const readingTime = calculateReadingTime(post.content)

  return (
    <>
      <BlogPostStructuredData post={post} />
      
      <div className="min-h-screen" style={{backgroundColor: 'var(--color-background)'}}>
        {/* パンくずナビゲーション */}
        <nav className="py-4" style={{backgroundColor: 'var(--color-surface)'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm" style={{color: 'var(--color-text-muted)'}}>
              <li>
                <Link href="/" className="hover:underline">ホーム</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/blog" className="hover:underline">ブログ</Link>
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span style={{color: 'var(--color-text-primary)'}}>{post.title}</span>
              </li>
            </ol>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{color: 'var(--color-text-primary)'}}
            >
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm" style={{color: 'var(--color-text-muted)'}}>
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
{formatReadingTime(readingTime)}で読めます
              </span>
            </div>
          </header>

          {/* アイキャッチ画像 */}
          {post.eyecatch && (
            <div className="mb-8 relative h-64 md:h-96">
              <Image
                src={post.eyecatch.url}
                alt={post.eyecatch.alt || post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* 記事本文 */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 関連記事 */}
          <RelatedPosts 
            currentPostId={post.id}
            categories={post.categories || []}
          />

          {/* 記事フッター */}
          <footer className="mt-12 pt-8 border-t" style={{borderColor: 'var(--color-secondary)'}}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                  最終更新: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                }}
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ブログ一覧に戻る
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </>
  )
}