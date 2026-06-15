import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import StatusBadge from '@/components/StatusBadge';
import { announcements, getAnnouncementById } from '@/data/mockData';

export async function generateStaticParams() {
  return announcements.map((a) => ({ id: a.id }));
}

export default function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const ann = getAnnouncementById(params.id);
  if (!ann) notFound();

  const CATEGORY_EMOJI: Record<string, string> = {
    會議公告: '📋', 決議公告: '📝', 財務公告: '💰', 修繕公告: '🔧',
    環境公告: '🌿', 停車公告: '🚗', 安全公告: '🔒', 一般通知: '📢',
  };
  const emoji = CATEGORY_EMOJI[ann.category] ?? '📄';

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/announcements" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-amber-900 truncate">公告詳情</div>
          <div className="text-xs text-amber-600">{ann.notice_number}</div>
        </div>
      </header>

      <div className="px-4 py-5 flex flex-col gap-4">
        {/* 標題卡 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
              {emoji} {ann.category}
            </span>
            <StatusBadge status={ann.status} size="md" />
          </div>
          <h1 className="text-xl font-bold text-amber-900 leading-snug mb-4">{ann.title}</h1>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">發布日期</span>
              <span className="text-amber-800 font-medium">📅 {ann.published_date}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">最後更新</span>
              <span className="text-amber-800 font-medium">🕐 {ann.last_updated_at}</span>
            </div>
          </div>
        </div>

        {/* 摘要 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <h2 className="text-sm font-bold text-amber-700 mb-2">📋 公告摘要</h2>
          <p className="text-base text-amber-900 leading-relaxed">{ann.summary}</p>
        </div>

        {/* PDF 預覽 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <h2 className="text-sm font-bold text-amber-700 mb-3">📄 PDF 公告文件</h2>
          <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-xl p-6 text-center mb-4">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-sm text-amber-600 font-medium">PDF 預覽區</p>
            <p className="text-xs text-amber-400 mt-1">正式版將串接 Supabase Storage</p>
          </div>
          <div className="flex gap-3">
            <a
              href={ann.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white rounded-xl py-3 text-sm font-semibold min-h-[48px]"
            >
              👁️ 查看 PDF
            </a>
            <a
              href={ann.pdf_url}
              download
              className="flex-1 flex items-center justify-center gap-2 bg-amber-100 text-amber-800 rounded-xl py-3 text-sm font-semibold min-h-[48px]"
            >
              ⬇️ 下載 PDF
            </a>
          </div>
        </div>

        {/* 下一步 */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <h2 className="text-sm font-bold text-blue-700 mb-2">🔜 下一步</h2>
          <p className="text-sm text-blue-800 leading-relaxed">{ann.next_step}</p>
        </div>

        {/* 完成紀錄 */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
          <h2 className="text-sm font-bold text-emerald-700 mb-2">✅ 完成紀錄</h2>
          <p className="text-sm text-emerald-800 leading-relaxed">{ann.completion_record}</p>
        </div>

        {/* 關鍵字 */}
        {ann.keywords.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
            <h2 className="text-sm font-bold text-amber-700 mb-3">🏷️ 關鍵字</h2>
            <div className="flex flex-wrap gap-2">
              {ann.keywords.map((kw) => (
                <span key={kw} className="bg-amber-100 text-amber-700 text-xs px-3 py-1.5 rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </Layout>
  );
}
