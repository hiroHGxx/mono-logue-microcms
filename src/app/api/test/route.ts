import { NextResponse } from 'next/server';
import { client } from '@/lib/microcms';

export async function GET() {
  try {
    // microCMS API接続テスト
    const response = await client.get({
      endpoint: 'blogs',
      queries: {
        limit: 1,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'microCMS API接続成功',
      data: response,
    });
  } catch (error) {
    console.error('microCMS API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'microCMS API接続失敗',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}