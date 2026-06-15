'use client';

import Link from 'next/link';
import { Announcement } from '@/data/mockData';
import StatusBadge from './StatusBadge';

const CATEGORY_STYLE: Record<string, { bg: string; text: string; emoji: string }> = {
  會議公告: { bg: 'bg-orange-100', text: 'text-orange-800', emoji: '📋' },
  決議公告: { bg: 'bg-amber-100', text: 'text-amber-800', emoji: '📝' },
  財務公告: { bg: 'bg-yellow-100', text: 'text-yellow-800', emoji: '💰' },
  修繕公告: { bg: 'bg-red-100',    text: 'text-red-800',    emoji: '🔧' },
  環境公告: { bg: 'bg-green-100',  text: 'text-green-800',  emoji: '🌿' },
  停車公告: { bg: 'bg-purple-100', text: 'text-purple-800', emoji: '🚗' },
  安全公告: { bg: 'bg-rose-100',   text: 'text-rose-800',   emoji: '🔒' },
  一般通知: { bg: 'bg-gray-100',   text: 'text-gray-700',   emoji: '📢' },
};

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const style = CATEGORY_STYLE[announcement.category] ?? {
    bg: 'bg-amber-100', text: 'text-amber-800', emoji: '📄',
  };

  return (
    <Link href={`/announcements/${announcement.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer overflow-hidden">
        {/* 左色條 */}
        <div className="flex">
          <div className={`w-1.5 flex-shrink-0 ${style.bg.replace('bg-', 'bg-').replace('-100', '-400')}`} />
          <div className="flex-1 p-4">
            {/* 分類 + 狀態 */}
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
                <span>{style.emoji}</span>
                <span>{announcement.category}</span>
              </span>
              <StatusBadge status={announcement.status} />
            </div>

            {/* 標題 */}
            <h3 className="text-base font-semibold text-amber-900 leading-snug mb-2 line-clamp-2">
              {announcement.title}
            </h3>

            {/* 底部：日期 + PDF按鈕 */}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span>🗓</span>
                <span>{announcement.published_date}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full min-h-[32px]">
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="12" height="13" rx="1.5" fill="white" fillOpacity="0.25" stroke="white" strokeOpacity="0.6"/>
                  <text x="6.5" y="10" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="sans-serif">PDF</text>
                </svg>
                查看
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
