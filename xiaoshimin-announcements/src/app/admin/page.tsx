import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { announcements, workProgressList } from '@/data/mockData';

export default function AdminPage() {
  const totalAnn = announcements.length;
  const activeAnn = announcements.filter((a) => ['已發布', '進行中', '異議期間'].includes(a.status)).length;
  const totalWp = workProgressList.length;
  const activeWp = workProgressList.filter((w) => ['施工中', '進行中', '待安排'].includes(w.status)).length;

  const stats = [
    { label: '公告總數', value: totalAnn, sub: `${activeAnn} 筆進行中`, icon: '📋', href: '/admin/announcements', color: 'bg-orange-50 border-orange-200' },
    { label: '工作進程', value: totalWp, sub: `${activeWp} 筆進行中`, icon: '📊', href: '/admin/progress', color: 'bg-blue-50 border-blue-200' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* 頁面標題 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">後台管理首頁</h1>
          <p className="text-sm text-gray-500 mt-1">管理社區公告與工作進程資料</p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}>
              <div className={`rounded-2xl border p-5 hover:shadow-md transition-shadow cursor-pointer ${s.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-3xl font-bold text-gray-800">{s.value}</span>
                </div>
                <div className="text-sm font-semibold text-gray-700">{s.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 快速操作 */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-700 mb-3">快速操作</h2>
          <div className="flex gap-3 flex-wrap">
            <Link href="/admin/announcements/new">
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <span>＋</span> 新增公告
              </button>
            </Link>
            <Link href="/admin/progress/new">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <span>＋</span> 新增工作進程
              </button>
            </Link>
          </div>
        </div>

        {/* 最近公告 */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-700">最近公告</h2>
            <Link href="/admin/announcements" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              查看全部 ›
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {announcements.slice(0, 4).map((ann) => (
              <div key={ann.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{ann.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ann.published_date} · {ann.category}</p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{ann.status}</span>
                  <Link href={`/admin/announcements/${ann.id}/edit`}>
                    <button className="text-xs text-orange-500 hover:text-orange-600 font-medium px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">
                      編輯
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 工作進程 */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-700">工作進程</h2>
            <Link href="/admin/progress" className="text-sm text-blue-500 hover:text-blue-600 font-medium">
              查看全部 ›
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {workProgressList.map((wp) => (
              <div key={wp.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{wp.project_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{wp.project_type} · 進度 {wp.progress_percentage}%</p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{wp.status}</span>
                  <Link href={`/admin/progress/${wp.id}/edit`}>
                    <button className="text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                      編輯
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
