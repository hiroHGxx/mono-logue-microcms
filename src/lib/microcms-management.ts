/**
 * microCMS Management API クライアント
 * 記事の作成・更新・削除機能を提供
 */

interface PostData {
  title: string
  content: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  categories?: string[]
  eyecatch?: {
    url: string
    alt?: string
  }
}

interface MicroCMSResponse {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

class MicroCMSManagementClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
    const apiKey = process.env.MICROCMS_MANAGEMENT_API_KEY

    if (!serviceDomain || !apiKey) {
      throw new Error('microCMS Management API configuration missing')
    }

    this.baseUrl = `https://${serviceDomain}.microcms.io/api/v1`
    this.apiKey = apiKey
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    console.log(`[DEBUG] microCMS Request: ${options.method || 'GET'} ${url}`)
    if (options.body) {
      console.log(`[DEBUG] Request Body:`, JSON.parse(options.body as string))
    }
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-MICROCMS-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    console.log(`[DEBUG] Response Status: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.log(`[DEBUG] Error Response:`, errorText)
      throw new Error(`microCMS API Error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()
    console.log(`[DEBUG] Success Response:`, result)
    return result
  }

  /**
   * 新しい記事を作成
   */
  async createPost(data: PostData): Promise<MicroCMSResponse> {
    return this.request('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * 既存記事を更新
   */
  async updatePost(id: string, data: Partial<PostData>): Promise<MicroCMSResponse> {
    return this.request(`/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  /**
   * 記事を削除
   */
  async deletePost(id: string): Promise<void> {
    await this.request(`/blogs/${id}`, {
      method: 'DELETE',
    })
  }

  /**
   * 記事の下書き保存
   */
  async saveDraft(data: PostData): Promise<MicroCMSResponse> {
    // publishedAtを設定しないことで下書きとして保存
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { publishedAt, ...draftData } = data
    return this.createPost(draftData)
  }

  /**
   * 下書きから公開
   */
  async publishDraft(id: string): Promise<MicroCMSResponse> {
    return this.updatePost(id, {
      publishedAt: new Date().toISOString(),
    })
  }

  /**
   * スラッグの重複チェック
   */
  async checkSlugAvailability(slug: string): Promise<boolean> {
    try {
      // 読み取り用APIキーで確認
      const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
      const readApiKey = process.env.MICROCMS_API_KEY
      
      const response = await fetch(
        `https://${serviceDomain}.microcms.io/api/v1/blogs?filters=slug[equals]${slug}&limit=1`,
        {
          headers: {
            'X-MICROCMS-API-KEY': readApiKey!,
          },
        }
      )
      
      const data = await response.json()
      return data.totalCount === 0
    } catch {
      return false
    }
  }

  /**
   * ユニークなスラッグを生成
   */
  async generateUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug
    let counter = 1

    while (!(await this.checkSlugAvailability(slug))) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    return slug
  }
}

// シングルトンインスタンス
let client: MicroCMSManagementClient | null = null

export function getManagementClient(): MicroCMSManagementClient {
  if (!client) {
    client = new MicroCMSManagementClient()
  }
  return client
}

export type { PostData, MicroCMSResponse }