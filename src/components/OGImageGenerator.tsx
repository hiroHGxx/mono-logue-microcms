// OGP画像生成用コンポーネント（開発時にSVG→PNG変換用）
export const OGImageSVG = () => (
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2D3748" />
        <stop offset="50%" stopColor="#4A5568" />
        <stop offset="100%" stopColor="#3182CE" />
      </linearGradient>
      <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#63B3ED" />
        <stop offset="100%" stopColor="#3182CE" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    
    {/* Decorative Elements */}
    <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.1)"/>
    <circle cx="1100" cy="530" r="60" fill="rgba(255,255,255,0.05)"/>
    
    {/* Main Icon */}
    <circle cx="300" cy="315" r="80" fill="url(#iconGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
    <text x="300" y="340" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold">M</text>
    
    {/* Main Title */}
    <text x="450" y="280" fill="white" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="bold">Mono-Logue</text>
    
    {/* Subtitle */}
    <text x="450" y="330" fill="#E2E8F0" fontFamily="Arial, sans-serif" fontSize="32">〜技術と日常をつなぐブログ〜</text>
    
    {/* Description */}
    <text x="450" y="390" fill="#CBD5E0" fontFamily="Arial, sans-serif" fontSize="24">プログラマー・3児の父・ヒロが書く</text>
    <text x="450" y="425" fill="#CBD5E0" fontFamily="Arial, sans-serif" fontSize="24">技術と暮らしの気づきを記録するブログ</text>
    
    {/* Bottom accent */}
    <rect x="450" y="460" width="120" height="4" fill="#3182CE" rx="2"/>
  </svg>
)

export default OGImageSVG