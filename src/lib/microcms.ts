import { createClient } from 'microcms-js-sdk';

// microCMS クライアント設定
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// ブログ記事の型定義
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt: string;
  categories: Category[];
  eyecatch?: {
    url: string;
    alt?: string;
  };
}

// カテゴリの型定義
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// API レスポンスの型定義
export interface BlogListResponse {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
}

// 記事一覧取得
export async function getPosts(limit = 10, offset = 0): Promise<BlogListResponse> {
  const response = await client.get({
    endpoint: 'blogs',
    queries: {
      limit,
      offset,
      orders: '-publishedAt',
      // draftKeyを指定しないことで公開記事のみ取得
    },
  });
  return response;
}

// 個別記事取得
export async function getPost(slug: string): Promise<BlogPost> {
  const response = await client.get({
    endpoint: 'blogs',
    queries: {
      filters: `slug[equals]${slug}`,
      // draftKeyを指定しないことで公開記事のみ取得
    },
  });
  
  if (!response.contents || response.contents.length === 0) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
  return response.contents[0];
}

// カテゴリ一覧取得
export async function getCategories(): Promise<Category[]> {
  const response = await client.get({
    endpoint: 'categories',
  });
  return response.contents;
}

// 関連記事取得（カテゴリベース）
export async function getRelatedPosts(currentPostId: string, categories: Category[], limit = 3): Promise<BlogPost[]> {
  if (categories.length === 0) {
    // カテゴリがない場合は最新記事を返す
    const response = await getPosts(limit);
    return response.contents.filter(post => post.id !== currentPostId);
  }

  const categoryIds = categories.map(cat => cat.id).join('[or]');
  const response = await client.get({
    endpoint: 'blogs',
    queries: {
      filters: `categories[contains]${categoryIds}[and]id[not_equals]${currentPostId}`,
      limit,
      orders: '-publishedAt',
      // draftKeyを指定しないことで公開記事のみ取得
    },
  });
  
  return response.contents;
}