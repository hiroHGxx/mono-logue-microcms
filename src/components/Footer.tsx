import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{backgroundColor: 'var(--color-primary)'}} className="text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mono-Logue</h3>
            <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              技術の視点から日常を見つめ直し、新しい発見や学びを共有するブログです。
              プログラミング、テクノロジー、そして生活の中の気づきをお届けします。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">サイトマップ</h3>
            <ul className="space-y-2" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              <li><Link href="/" className="hover:text-white transition-colors">ホーム</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">ブログ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">プロフィール</Link></li>
              <li><Link href="/blog?category=technology" className="hover:text-white transition-colors">技術・プログラミング</Link></li>
              <li><Link href="/blog?category=daily" className="hover:text-white transition-colors">日常・学び</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">つながり</h3>
            <ul className="space-y-2" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://qiita.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Qiita</a></li>
              <li><Link href="/about" className="hover:text-white transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center" style={{borderColor: 'rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.7)'}}>
          <p>&copy; 2024 Mono-Logue. All rights reserved.</p>
          <p className="mt-2 text-sm">技術と日常をつなぐブログ</p>
        </div>
      </div>
    </footer>
  )
}