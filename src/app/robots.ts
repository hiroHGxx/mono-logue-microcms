import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // AI Bot向け設定
      {
        userAgent: 'GPTBot',
        allow: ['/blog/', '/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/blog/', '/'],
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/blog/', '/'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}