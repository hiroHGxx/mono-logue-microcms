import Link from 'next/link'
import { getPosts } from '@/lib/microcms'
import Image from 'next/image'

export default async function Home() {
  const { contents: posts } = await getPosts(3) // 最新の3記事を表示

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, var(--color-surface), #f0f0f0)'}}>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>
            Mono-Logue
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{color: 'var(--color-accent)'}}>
            〜技術と日常をつなぐブログ〜
          </p>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{color: 'var(--color-text-secondary)'}}>
            技術の視点から日常を見つめ直し、
            <br />
            新しい発見や学びを共有するブログです。
          </p>
          <Link 
            href="/blog" 
            className="inline-block text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all font-medium shadow-lg"
            style={{backgroundColor: 'var(--color-accent)'}}
          >
            ブログを読む
          </Link>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{color: 'var(--color-text-primary)'}}>
            最新の記事
          </h2>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.eyecatch && (
                    <div className="relative h-48">
                      <Image
                        src={post.eyecatch.url}
                        alt={post.eyecatch.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        続きを読む →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">記事はまだありません。</p>
              <p className="text-gray-500 mt-2">microCMSで記事を作成してください。</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-block text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              style={{backgroundColor: 'var(--color-primary)'}}
            >
              すべての記事を見る
            </Link>
          </div>
        </div>
      </section>

      {/* About & Profile Section */}
      <section className="py-16" style={{backgroundColor: 'var(--color-surface)'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Mono-Logue */}
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{color: 'var(--color-text-primary)'}}>
                Mono-Logueについて
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{color: 'var(--color-text-secondary)'}}>
                プログラミング、テクノロジー、そして日常の中で気づいたことを記録しています。
                技術的な学びを通じて、より良い暮らしや仕事のヒントを見つけていく過程を
                皆さんと共有したいと思います。
              </p>
              <Link 
                href="/about"
                className="inline-block text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium"
                style={{backgroundColor: 'var(--color-accent)'}}
              >
                詳しく見る
              </Link>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/images/profile/avatar.jpg"
                    alt="ヒロのプロフィール画像"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>
                  ヒロ
                </h3>
                <p className="text-base mb-4" style={{color: 'var(--color-text-muted)'}}>
                  プログラマー・3児の父
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{color: 'var(--color-text-secondary)'}}>
                  技術と日常の両立を追求しながら、暮らしの中で見つけた気づきや
                  学びを記録しています。家族と過ごす時間を大切にしながら、
                  継続的な学習と成長を心がけています。
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="https://x.com/hsrk_g_hsrk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded text-white text-sm transition-all hover:opacity-90"
                    style={{backgroundColor: '#1DA1F2'}}
                  >
                    Twitter
                  </a>
                  <a
                    href="https://github.com/hiroHGxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded text-white text-sm transition-all hover:opacity-90"
                    style={{backgroundColor: '#333'}}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://stand.fm/channels/6399d332df23c21009b42475"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded text-white text-sm transition-all hover:opacity-90"
                    style={{backgroundColor: '#FF6B35'}}
                  >
                    stand.fm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}