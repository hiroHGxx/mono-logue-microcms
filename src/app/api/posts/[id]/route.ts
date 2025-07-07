import { NextRequest, NextResponse } from 'next/server'
import { getManagementClient, PostData } from '@/lib/microcms-management'

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * 記事更新API
 * PATCH /api/posts/[id]
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const data: Partial<PostData> = await request.json()
    
    const client = getManagementClient()
    
    // スラッグが変更される場合は重複チェック
    if (data.slug) {
      const isAvailable = await client.checkSlugAvailability(data.slug)
      if (!isAvailable) {
        const uniqueSlug = await client.generateUniqueSlug(data.slug)
        data.slug = uniqueSlug
        console.log(`スラッグを調整しました: ${data.slug} → ${uniqueSlug}`)
      }
    }

    const result = await client.updatePost(id, data)

    return NextResponse.json({
      success: true,
      message: '記事が正常に更新されました',
      data: result,
    })

  } catch (error) {
    console.error('記事更新エラー:', error)
    
    return NextResponse.json(
      { 
        error: '記事の更新に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * 記事削除API
 * DELETE /api/posts/[id]
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    
    const client = getManagementClient()
    await client.deletePost(id)

    return NextResponse.json({
      success: true,
      message: '記事が正常に削除されました',
    })

  } catch (error) {
    console.error('記事削除エラー:', error)
    
    return NextResponse.json(
      { 
        error: '記事の削除に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}