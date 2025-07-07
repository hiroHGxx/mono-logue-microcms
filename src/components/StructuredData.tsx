interface BlogPostStructuredDataProps {
  post: {
    id: string
    title: string
    excerpt?: string
    publishedAt: string
    slug: string
    content: string
    eyecatch?: {
      url: string
    }
  }
}

interface WebsiteStructuredDataProps {
  url: string
  name: string
  description: string
}

export function BlogPostStructuredData({ post }: BlogPostStructuredDataProps) {
  // 記事の文字数を計算（HTMLタグを除去）
  const textContent = post.content.replace(/<[^>]*>/g, '')
  const wordCount = textContent.length

  // 読了時間の計算（分）
  const readingTime = Math.max(1, Math.ceil(wordCount / 400)) // 400文字/分

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": "Mono-Logue",
      "url": "http://localhost:3000/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mono-Logue",
      "url": "http://localhost:3000",
      "logo": {
        "@type": "ImageObject",
        "url": "http://localhost:3000/logo.svg"
      }
    },
    "url": `http://localhost:3000/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `http://localhost:3000/blog/${post.slug}`
    },
    "image": post.eyecatch 
      ? {
          "@type": "ImageObject",
          "url": post.eyecatch.url,
          "width": 1200,
          "height": 630
        }
      : {
          "@type": "ImageObject",
          "url": "http://localhost:3000/og-image.svg",
          "width": 1200,
          "height": 630
        },
    "articleSection": "技術・プログラミング",
    "inLanguage": "ja-JP",
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "about": [
      {
        "@type": "Thing",
        "name": "プログラミング"
      },
      {
        "@type": "Thing", 
        "name": "テクノロジー"
      },
      {
        "@type": "Thing",
        "name": "技術的学び"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "プログラマー、エンジニア、技術学習者"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({ url, name, description }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Mono-Logue",
      "url": "http://localhost:3000/about"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "ja-JP"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}