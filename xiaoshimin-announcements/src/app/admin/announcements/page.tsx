import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { announcements } from '@/data/mockData';

const STATUS_COLOR: Record<string, string> = {
  已發布: 'bg-emerald-100 text-emerald-700',
  進行中: 'bg-blue-100 text-blue-700',
  異議期間: 'bg-orange-100 text-orange-700',
  已完成: 'bg-emerald-100 text-emerald-700',
  已結案: 'bg-gray-100 text-gray-600',
  已撤回: 'bg-gray-100 text-gray-600',
  草稿: 'bg-gray-100 text-gray-600',
};

export default function AdminAnnouncementsPage() {
  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">公告管理</h1>
            <p className="text-sm text-gray-500 mt-1">共 {announcements.length} 筆公告</p>
          </div>
          <Link href="/admin/announcements/new">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
              <span>＋</span> 新增公告
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
            <span>標題</span>
            <span>分類</span>
            <span>狀態</span>
            <span>發布日期</span>
            <span>操作</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {announcements.map((ann) => (
              <div key={ann.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] gap-3 px-5 py-4 items-center hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{ann.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ann.notice_number}</p>
                </div>
                <span className="text-sm text-gray-600">{ann.category}</span>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full w-fit ${STATUS_COLOR[ann.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {ann.status}
                </span>
                <span className="text-sm text-gray-500">{ann.published_date}</span>
                <div className="flex items-center gap-2">
                  <Link href={`/announcements/${ann.id}`} target="_blank">
                    <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      預覽
                    </button>
                  </Link>
                  <Link href={`/admin/announcements/${ann.id}/edit`}>
                    <button className="text-xs text-orange-500 hover:text-orange-600 font-medium px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
                      編輯
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          ⚠️ Prototype 版本：修改不會實際儲存。串接 Supabase 後將支援完整 CRUD。
        </p>
      </div>
    </AdminLayout>
  );
}
