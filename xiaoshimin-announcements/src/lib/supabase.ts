/**
 * Supabase 客戶端設定
 *
 * 第二階段串接說明：
 * 1. npm install @supabase/supabase-js
 * 2. 在 .env.local 填入你的 Supabase 憑證
 * 3. 將下方 createClient 的註解打開
 * 4. 各頁面將 import mockData 替換為 supabase 查詢
 */

// ============================================================
// 環境變數（需建立 .env.local）
// ============================================================
// NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

// ============================================================
// Supabase Client（第二階段啟用）
// ============================================================
// import { createClient } from '@supabase/supabase-js';
//
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// ============================================================
// 資料查詢範例（替換各頁面的 mockData）
// ============================================================

/**
 * 取得所有公告（替換 import { announcements } from '@/data/mockData'）
 *
 * const { data: announcements } = await supabase
 *   .from('announcements')
 *   .select('*')
 *   .order('published_date', { ascending: false });
 */

/**
 * 取得單一公告（替換 getAnnouncementById）
 *
 * const { data: ann } = await supabase
 *   .from('announcements')
 *   .select('*')
 *   .eq('id', id)
 *   .single();
 */

/**
 * 新增公告
 *
 * const { data, error } = await supabase
 *   .from('announcements')
 *   .insert([{ ...formData }]);
 */

/**
 * 更新公告
 *
 * const { data, error } = await supabase
 *   .from('announcements')
 *   .update({ ...formData })
 *   .eq('id', id);
 */

/**
 * 上傳 PDF 到 Supabase Storage
 *
 * const { data, error } = await supabase.storage
 *   .from('announcements-pdf')
 *   .upload(`2026/${filename}`, file);
 *
 * // 取得公開 URL
 * const { data: urlData } = supabase.storage
 *   .from('announcements-pdf')
 *   .getPublicUrl(`2026/${filename}`);
 * const pdfUrl = urlData.publicUrl;
 */

/**
 * 搜尋公告（替換 searchAnnouncements）
 *
 * const { data } = await supabase
 *   .from('announcements')
 *   .select('*')
 *   .or(`title.ilike.%${keyword}%,summary.ilike.%${keyword}%`);
 */

// ============================================================
// Supabase Table Schema（在 Supabase SQL Editor 執行）
// ============================================================
/**
 * -- announcements table
 * CREATE TABLE announcements (
 *   id TEXT PRIMARY KEY,
 *   notice_number TEXT,
 *   title TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   status TEXT NOT NULL,
 *   published_date TEXT NOT NULL,
 *   summary TEXT,
 *   keywords TEXT[],
 *   pdf_url TEXT,
 *   next_step TEXT,
 *   completion_record TEXT,
 *   last_updated_at TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- work_progress table
 * CREATE TABLE work_progress (
 *   id TEXT PRIMARY KEY,
 *   project_name TEXT NOT NULL,
 *   project_type TEXT NOT NULL,
 *   status TEXT NOT NULL,
 *   stages TEXT[],
 *   current_stage TEXT,
 *   progress_percentage INTEGER DEFAULT 0,
 *   estimated_completion_date TEXT,
 *   responsible_party TEXT,
 *   description TEXT,
 *   next_step TEXT,
 *   last_updated_at TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- Enable Row Level Security (讓前台可讀，後台可寫)
 * ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE work_progress ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Public read" ON announcements FOR SELECT USING (true);
 * CREATE POLICY "Public read" ON work_progress FOR SELECT USING (true);
 */

export {};
