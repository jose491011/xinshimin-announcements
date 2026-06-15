import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import StatusBadge from '@/components/StatusBadge';
import ProgressStageBar from '@/components/ProgressStageBar';
import { workProgressList, getWorkProgressById } from '@/data/mockData';

export async function generateStaticParams() {
  return workProgressList.map((w) => ({ id: w.id }));
}

const TYPE_EMOJI: Record<string, string> = {
  修繕工程: '🔨', 設備檢修: '⚙️', 行政作業: '📋', 會議決議追蹤: '📝',
  環境改善: '🌿', 財務作業: '💰', 停車管理: '🚗', 其他事項: '📌',
};

export default function ProgressDetailPage({ params }: { params: { id: string } }) {
  const wp = getWorkProgressById(params.id);
  if (!wp) notFound();

  const emoji = TYPE_EMOJI[wp.project_type] ?? '📌';

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/progress" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-amber-900 truncate">工作進程詳情</div>
          <div className="text-xs text-amber-600">{wp.project_type}</div>
        </div>
      </header>

      <div className="px-4 py-5 flex flex-col gap-4">
        {/* 標題卡 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
              {emoji} {wp.project_type}
            </span>
            <StatusBadge status={wp.status} size="md" />
          </div>
          <h1 className="text-xl font-bold text-amber-900 mb-4">{wp.project_name}</h1>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">負責單位</span>
              <span className="text-amber-800 font-medium text-xs leading-snug">{wp.responsible_party}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">最後更新</span>
              <span className="text-amber-800 font-medium text-xs">🕐 {wp.last_updated_at}</span>
            </div>
          </div>
        </div>

        {/* 進度概覽 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <h2 className="text-sm font-bold text-amber-700 mb-4">📊 進度概覽</h2>
          <ProgressStageBar
            stages={wp.stages}
            current_stage={wp.current_stage}
            progress_percentage={wp.progress_percentage}
          />
          <div className="mt-4 flex items-center justify-between bg-amber-50 rounded-xl px-4 py-3">
            <div className="text-center">
              <div className="text-xs text-amber-500 mb-1">當前階段</div>
              <div className="text-sm font-bold text-orange-500">{wp.current_stage}</div>
            </div>
            <div className="w-px h-8 bg-amber-200" />
            <div className="text-center">
              <div className="text-xs text-amber-500 mb-1">整體進度</div>
              <div className="text-sm font-bold text-orange-500">{wp.progress_percentage}%</div>
            </div>
            <div className="w-px h-8 bg-amber-200" />
            <div className="text-center">
              <div className="text-xs text-amber-500 mb-1">預計完成</div>
              <div className="text-xs font-bold text-amber-800">{wp.estimated_completion_date}</div>
            </div>
          </div>
        </div>

        {/* 描述 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <h2 className="text-sm font-bold text-amber-700 mb-2">📋 項目說明</h2>
          <p className="text-base text-amber-900 leading-relaxed">{wp.description}</p>
        </div>

        {/* 下一步 */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <h2 className="text-sm font-bold text-blue-700 mb-2">🔜 下一步</h2>
          <p className="text-sm text-blue-800 leading-relaxed">{wp.next_step}</p>
        </div>
      </div>

      <BottomNavigation />
    </Layout>
  );
}
