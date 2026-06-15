# 小市民社區公告查詢中心

**手機版社區 PDF 公告查詢系統 — Next.js 14 Prototype**

> Prototype v1.0 | Mock Data 版本

---

## 安裝與啟動

```bash
npm install
npm run dev
```

開啟 http://localhost:3000，建議用 Chrome DevTools 390px 手機模式瀏覽。

---

## 如何新增公告資料

編輯 `src/data/mockData.ts`，在 `announcements` 陣列新增物件：

```typescript
{
  id: 'ann-005',
  notice_number: '新市民社區-115-06-010',
  title: '公告標題',
  category: '一般通知',
  status: '已發布',
  published_date: '2026/06/15',
  summary: '公告摘要...',
  keywords: ['關鍵字1'],
  pdf_url: '/sample/my-notice.pdf',
  next_step: '下一步說明',
  completion_record: '完成紀錄',
  last_updated_at: '2026/06/15 10:00',
}
```

---

## 第二階段：改接 Supabase

1. `npm install @supabase/supabase-js`
2. 建立 `src/lib/supabase.ts` 初始化 client
3. 建立 `.env.local` 填入 URL 與 ANON_KEY
4. 依 mockData.ts 的型別建立 Supabase Table（announcements、work_progress）
5. 各頁面將 import mockData 替換為 supabase.from(...).select('*') 查詢
6. PDF 改用 supabase.storage.from('bucket').getPublicUrl(path)

---

## 頁面路由

| 路由 | 說明 |
|------|------|
| `/` | 首頁 |
| `/announcements` | 所有公告 |
| `/announcements/[id]` | 公告詳情 |
| `/categories` | 公告分類 |
| `/status` | 依狀態分組 |
| `/history` | 歷史公告 |
| `/search?keyword=xxx` | 搜尋 |
| `/progress` | 工作進程列表 |
| `/progress/[id]` | 工作進程詳情 |
