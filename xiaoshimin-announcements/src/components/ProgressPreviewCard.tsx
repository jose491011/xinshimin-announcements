'use client';

import Link from 'next/link';
import { WorkProgress } from '@/data/mockData';
import StatusBadge from './StatusBadge';

const TYPE_EMOJI: Record<string, string> = {
  修繕工程: '🔨',
  設備檢修: '⚙️',
  行政作業: '📋',
  會議決議追蹤: '📝',
  環境改善: '🌿',
  財務作業: '💰',
  停車管理: '🚗',
  其他事項: '📌',
};

interface ProgressPreviewCardProps {
  progress: WorkProgress;
}

export default function ProgressPreviewCard({ progress }: ProgressPreviewCardProps) {
  const emoji = TYPE_EMOJI[progress.project_type] ?? '📌';

  return (
    <Link href={`/progress/${progress.id}`}>
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-amber-100 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer">
        {/* 頂部：類型 + 狀態 */}
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
            <span>{emoji}</span>
            <span>{progress.project_type}</span>
          </span>
          <StatusBadge status={progress.status} />
        </div>

        {/* 項目名稱 */}
        <h3 className="text-base font-semibold text-amber-900 mb-2">{progress.project_name}</h3>

        {/* 進度條 */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">當前階段：{progress.current_stage}</span>
            <span className="text-sm font-bold text-orange-500">{progress.progress_percentage}%</span>
          </div>
          <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
              style={{ width: `${progress.progress_percentage}%` }}
            />
          </div>
        </div>

        {/* 預計完成日 */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>🎯</span>
          <span>預計完成：{progress.estimated_completion_date}</span>
        </div>
      </div>
    </Link>
  );
}
