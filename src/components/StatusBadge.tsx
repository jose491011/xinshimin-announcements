'use client';

import { AnnouncementStatus, WorkProgressStatus } from '@/data/mockData';

type AllStatus = AnnouncementStatus | WorkProgressStatus;

interface StatusBadgeProps {
  status: AllStatus;
  size?: 'sm' | 'md';
}

function getStatusStyle(status: AllStatus): string {
  switch (status) {
    // 綠色：完成類
    case '已發布':
    case '已完成':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    // 藍色：進行中類
    case '進行中':
    case '施工中':
    case '檢測中':
    case '驗收中':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    // 橘色：待處理類
    case '異議期間':
    case '待安排':
    case '規劃中':
    case '招標中':
      return 'bg-orange-100 text-orange-800 border border-orange-200';
    // 灰色：結束/停止類
    case '已結案':
    case '已撤回':
    case '草稿':
    case '暫停':
    case '延期':
      return 'bg-gray-100 text-gray-600 border border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600 border border-gray-200';
  }
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';
  return (
    <span className={`inline-block rounded-full font-medium ${sizeClass} ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
}
