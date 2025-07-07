/**
 * 読了時間を計算する関数
 * @param content HTML文字列
 * @returns 読了時間（分）
 */
export function calculateReadingTime(content: string): number {
  // HTMLタグを除去してテキストのみを取得
  const textContent = content.replace(/<[^>]*>/g, '')
  
  // 文字数を計算
  const wordCount = textContent.length
  
  // 日本語の読み速度: 約400文字/分
  const wordsPerMinute = 400
  
  // 読了時間を計算（最低1分）
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  
  return readingTime
}

/**
 * 読了時間を表示用フォーマットに変換
 * @param minutes 分数
 * @returns フォーマット済み文字列
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return '1分未満'
  } else if (minutes === 1) {
    return '約1分'
  } else {
    return `約${minutes}分`
  }
}