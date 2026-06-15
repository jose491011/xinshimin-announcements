import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { workProgressList } from '@/data/mockData';

const STATUS_COLOR: Record<string, string> = {
  施工中: 'bg-blue-100 text-blue-700',
  進行中: 'bg-blue-100 text-blue-700',
  待安排: 'bg-orange-100 text-orange-700',
  規劃中: 'bg-orange-100 text-orange-700',
  招標中: 'bg-orange-100 text-orange-700',
  已完成: 'bg-emerald-100 text-emerald-700',
  暫停: 'bg-gray-100 text-gray-600',
  延期: 'bg-gray-100 text-gray-600',
};

export default function AdminProgressPage() {
  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">工作進程管理</h1>
            <p className="text-sm text-gray-500 mt-1">共 {workProgressList.length} 筆進程</p>
          </div>
          <Link href="/admin/progress/new">
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
              <span>＋</span> 新增進程
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
            <span>項目名稱</span>
            <span>類型</span>
            <span>狀態</span>
            <span>進度</span>
            <span>操作</span>
          </div>

          <div className="divide-y divide-gray-50">
            {workProgressList.map((wp) => (
              <div key={wp.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] gap-3 px-5 py-4 items-center hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{wp.project_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">負責：{wp.responsible_party}</p>
                </div>
                <span className="text-sm text-gray-600">{wp.project_type}</span>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full w-fit ${STATUS_COLOR[wp.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {wp.status}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${wp.progress_percentage}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{wp.progress_percentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/progress/${wp.id}`} target="_blank">
                    <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      預覽
                    </button>
                  </Link>
                  <Link href={`/admin/progress/${wp.id}/edit`}>
                    <button className="text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
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
