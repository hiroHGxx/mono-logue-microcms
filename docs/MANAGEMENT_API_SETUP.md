# microCMS Management API 設定手順

## 1. APIキー作成（書き込み権限付き）

### 管理画面での設定
1. microCMS管理画面にログイン
2. 「API設定」→「APIキー」タブ
3. 「追加」をクリック
4. 以下を設定：
   - **キー名**: `mono-logue-management`
   - **権限**: 
     - ✅ `GET` (読み取り)
     - ✅ `POST` (作成)
     - ✅ `PATCH` (更新)
     - ✅ `DELETE` (削除)
   - **参照許可**: 「すべてのAPI」

5. 生成されたAPIキーをコピー

## 2. 環境変数設定

`.env.local`に追加：
```bash
# 読み取り用
MICROCMS_API_KEY=existing-read-key

# 書き込み用（Management API）
MICROCMS_MANAGEMENT_API_KEY=new-management-key
```

## 3. Management APIクライアント作成

`src/lib/microcms-management.ts`を作成し、書き込み機能を実装。

## 注意事項

- Management APIキーは機密情報です
- 本番環境では適切な権限制御を実装
- APIキーの定期的な更新を推奨