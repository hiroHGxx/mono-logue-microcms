import { NextRequest, NextResponse } from 'next/server'
import { getManagementClient } from '@/lib/microcms-management'
import { marked } from 'marked'

/**
 * MONO_LOGUE_WRITING_RULES.mdに基づく記事作成API
 * POST /api/create-article
 */
export async function POST(request: NextRequest) {
  try {
    const { title, theme, targetTechnology } = await request.json()
    
    if (!title || !theme) {
      return NextResponse.json(
        { error: 'タイトルとテーマは必須です' },
        { status: 400 }
      )
    }

    // スラッグ生成（タイトルから）
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    // Mono-Logue記事テンプレート（Markdown）
    const markdownContent = generateMonoLogueArticle(title, theme, targetTechnology)
    
    // MarkdownをHTMLに変換
    const content = await marked(markdownContent)

    const client = getManagementClient()
    
    // microCMS用のデータ形式に調整（既存記事の構造に合わせる）
    const postData = {
      title,
      content,
      slug: slug,
    }

    console.log('[DEBUG] Creating post with data:', postData)

    // 記事作成
    const result = await client.createPost(postData)

    return NextResponse.json({
      success: true,
      message: '記事が正常に作成されました',
      data: result,
      previewUrl: `/blog/${result.id}`,
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

function generateMonoLogueArticle(title: string, theme: string, targetTechnology?: string): string {
  const tech = targetTechnology || '新しい技術'
  
  return `## はじめに

最近、${tech}について調べる機会がありました。

${theme}という状況で実際に試してみることになり、今回は、実際に${tech}を試してみた過程と、そこから得られた学びについて書いていきます。

## ${tech}とは

${tech}は${theme}を解決するための技術として注目されています。簡単に説明すると、${tech}の特徴的な機能により、従来のアプローチとは異なる解決策を提供してくれます。

## 実際に試してみた

### 環境設定

まず、${tech}を使用するための環境を準備しました。

具体的には以下のような手順で進めました：

1. 必要なツールのインストール
2. 基本的な設定ファイルの作成
3. 動作確認

### 実装過程

実際の実装では、以下のポイントがありました：

- ${tech}の基本的な使用方法
- 実用的な場面での応用例
- 注意点として気をつけるべき設定

### 遭遇した課題と解決方法

実際に使ってみたところ、${theme}に関連する課題がいくつか出てきました。

メリット・デメリットは以下の通りです：

**メリット**
- ${tech}による効率的な処理
- 従来手法と比べた優位性
- 学習コストの低さ

**デメリット・注意点**
- 特定の場面での制約
- 追加で必要な知識や設定

## 得られた学び

今回${tech}を実際に使ってみて、${theme}という課題に対する新しいアプローチを学ぶことができました。

実用的な場面では、${tech}は特に以下のような状況で威力を発揮すると感じました：

- 開発効率を重視したい場合
- 既存システムとの連携を考慮する場合
- チーム開発での統一性を保ちたい場合

## まとめ

今回は「${title}」というテーマで書きました。

${tech}を実際に使ってみて、技術的な発見だけでなく、実務での応用可能性についても理解を深めることができました。

皆さんも${tech}を試す際の参考になれば幸いです。同様の${theme}に取り組んでいる方がいらっしゃいましたら、ぜひコメントで体験や工夫を教えてください。

今後の展望として、${tech}をさらに活用した応用例も試してみたいと思います。参考になれば幸いです。`
}