'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import StatusBadge from '@/components/StatusBadge';
import ProgressStageBar from '@/components/ProgressStageBar';
import { workProgressList, WorkProgressStatus } from '@/data/mockData';

type FilterOption = '全部' | '進行中' | '施工中' | '待安排' | '已完成';

const FILTERS: FilterOption[] = ['全部', '進行中', '施工中', '待安排', '已完成'];

const TYPE_EMOJI: Record<string, string> = {
  修繕工程: '🔨', 設備檢修: '⚙️', 行政作業: '📋', 會議決議追蹤: '📝',
  環境改善: '🌿', 財務作業: '💰', 停車管理: '🚗', 其他事項: '📌',
};

export default function ProgressPage() {
  const [filter, setFilter] = useState<FilterOption>('全部');

  const filtered = filter === '全部'
    ? workProgressList
    : workProgressList.filter((w) => w.status === (filter as WorkProgressStatus));

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">社區工作進程表</div>
          <div className="text-xs text-amber-600">追蹤各項工程與行政進度</div>
        </div>
      </header>

      {/* 篩選列 */}
      <div className="bg-white border-b border-amber-100 px-4 py-3 flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium min-h-[44px] transition-all ${
              filter === f
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-amber-100">
            <div className="text-3xl mb-2">📭</div>
            <p className="text-sm text-amber-500">此狀態目前無進程項目</p>
          </div>
        ) : (
          filtered.map((wp) => (
            <Link key={wp.id} href={`/progress/${wp.id}`}>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer">
                {/* 頂部 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                    {TYPE_EMOJI[wp.project_type]} {wp.project_type}
                  </span>
                  <StatusBadge status={wp.status} />
                </div>

                <h3 className="text-base font-bold text-amber-900 mb-3">{wp.project_name}</h3>

                {/* 進度條 */}
                <ProgressStageBar
                  stages={wp.stages}
                  current_stage={wp.current_stage}
                  progress_percentage={wp.progress_percentage}
                />

                {/* 底部資訊 */}
                <div className="mt-3 pt-3 border-t border-amber-50 flex flex-col gap-1.5">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">🔜 下一步</span>
                    <span className="text-xs text-amber-700 line-clamp-2">{wp.next_step}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>🎯 預計完成：{wp.estimated_completion_date}</span>
                    <span>🕐 {wp.last_updated_at}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <BottomNavigation />
    </Layout>
  );
}
