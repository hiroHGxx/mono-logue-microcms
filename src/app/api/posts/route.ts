import { NextRequest, NextResponse } from 'next/server'
import { getManagementClient, PostData } from '@/lib/microcms-management'
import { marked } from 'marked'

/**
 * 記事作成API
 * POST /api/posts
 */
export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json()
    
    // 必須フィールドの検証
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'タイトルとコンテンツは必須です' },
        { status: 400 }
      )
    }

    // スラッグが提供されていない場合は自動生成
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    const client = getManagementClient()
    
    console.log(`[DEBUG] Creating post with slug: ${slug}`)

    // Markdownが含まれている場合はHTMLに変換
    const content = data.content.includes('#') || data.content.includes('**') || data.content.includes('- ')
      ? await marked(data.content)
      : data.content

    // 記事作成（既存記事の構造に合わせて）
    const result = await client.createPost({
      title: data.title,
      content: content,
      slug: slug,
    })

    return NextResponse.json({
      success: true,
      message: '記事が正常に作成されました',
      data: result,
      slug: slug,
    })

  } catch (error) {
    console.error('記事作成エラー:', error)
    
    return NextResponse.json(
      { 
        error: '記事の作成に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * 記事一覧取得API（管理用）
 * GET /api/posts
 */
export async function GET() {
  try {
    // 通常の読み取りAPIを使用
    const { getPosts } = await import('@/lib/microcms')
    const { contents, totalCount } = await getPosts(100)
    
    return NextResponse.json({
      success: true,
      data: {
        posts: contents,
        totalCount,
      }
    })
    
  } catch (error) {
    console.error('記事取得エラー:', error)
    
    return NextResponse.json(
      { 
        error: '記事の取得に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}