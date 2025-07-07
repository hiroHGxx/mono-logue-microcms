import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プロフィール - Mono-Logue',
  description: 'プログラマー・3児の父・ヒロのプロフィールページ。技術と日常をつなぐブログ「Mono-Logue」の運営者をご紹介します。',
  openGraph: {
    title: 'プロフィール - Mono-Logue', 
    description: 'プログラマー・3児の父・ヒロのプロフィールページ。技術と日常をつなぐブログ「Mono-Logue」の運営者をご紹介します。',
  },
}

export default async function AboutPage() {
  return (
    <div className="min-h-screen py-12" style={{backgroundColor: 'var(--color-background)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">H</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--color-text-primary)'}}>
            ヒロのプロフィール
          </h1>
          <p className="text-xl" style={{color: 'var(--color-text-muted)'}}>
            プログラマー・3児の父・技術と日常をつなぐ人
          </p>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--color-text-primary)'}}>
            はじめまして
          </h2>
          <div className="prose prose-lg max-w-none" style={{color: 'var(--color-text-primary)'}}>
            <p className="mb-4">
              はじめまして、ヒロです。このブログ「Mono-Logue」を運営しています。
            </p>
            <p className="mb-4">
              普段はプログラマーとして働きながら、3人の子どもたちと妻との日常を大切にしています。
              このブログでは、技術の話だけでなく、家族との時間で得た気づきや、
              日常の何気ない出来事から見えてくる「なるほど」な発見を書いています。
            </p>
            <p className="mb-4">
              「技術と日常をつなぐ」というのがこのブログのコンセプト。
              表面的に流れていく情報ではなく、少し立ち止まって「これってどういうことだろう？」と
              考えてみると見えてくる、新しい視点や気づきをお届けしたいと思っています。
            </p>
          </div>
        </section>

        {/* Skills & Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--color-text-primary)'}}>
            技術・経験
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--color-primary)'}}>
                プログラミング
              </h3>
              <ul className="space-y-2" style={{color: 'var(--color-text-primary)'}}>
                <li>• JavaScript / TypeScript</li>
                <li>• React / Next.js</li>
                <li>• Node.js</li>
                <li>• Python</li>
                <li>• データベース設計・管理</li>
                <li>• クラウドインフラ</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--color-primary)'}}>
                その他の活動
              </h3>
              <ul className="space-y-2" style={{color: 'var(--color-text-primary)'}}>
                <li>• 技術ブログ執筆</li>
                <li>• 音声配信（stand.fm）</li>
                <li>• 子育て・家族との時間</li>
                <li>• 地域活性化事業</li>
                <li>• 継続学習・新技術習得</li>
                <li>• ペット（犬・保護猫）の世話</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values & Philosophy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--color-text-primary)'}}>
            大切にしていること
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{backgroundColor: 'var(--color-primary)', color: 'white'}}>
                🏠
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>
                家族中心
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                ペットも含めた家族の幸せを何より大切にしています。
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{backgroundColor: 'var(--color-primary)', color: 'white'}}>
                📚
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>
                継続学習
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                新しいことへの挑戦と学び続けることを大切にしています。
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{backgroundColor: 'var(--color-primary)', color: 'white'}}>
                🔄
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>
                適応性
              </h3>
              <p className="text-sm" style={{color: 'var(--color-text-muted)'}}>
                変化を恐れず、流れに身を任せる柔軟性を心がけています。
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--color-text-primary)'}}>
            つながり・お問い合わせ
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <p className="mb-6" style={{color: 'var(--color-text-primary)'}}>
              ブログやstand.fmの感想、技術的なご質問、お仕事のご相談など、
              お気軽にお声がけください。家族との時間を大切にしているため、
              返信にお時間をいただく場合がありますが、必ずお返事いたします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://x.com/hsrk_g_hsrk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{backgroundColor: '#1DA1F2'}}
              >
                X (Twitter)
              </a>
              <a
                href="https://github.com/hiroHGxx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{backgroundColor: '#333'}}
              >
                GitHub
              </a>
              <a
                href="https://stand.fm/channels/6399d332df23c21009b42475"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{backgroundColor: '#FF6B35'}}
              >
                stand.fm
              </a>
            </div>
          </div>
        </section>

        {/* Blog CTA */}
        <section className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--color-text-primary)'}}>
              ブログもぜひご覧ください
            </h2>
            <p className="mb-6" style={{color: 'var(--color-text-primary)'}}>
              日常の気づきから技術的な発見まで、技術と日常をつなぐヒントを
              定期的に更新しています。
            </p>
            <Link
              href="/blog"
              className="inline-block text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all font-medium"
              style={{backgroundColor: 'var(--color-primary)'}}
            >
              ブログを読む
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}