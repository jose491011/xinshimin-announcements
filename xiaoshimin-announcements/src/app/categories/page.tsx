'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import { announcements, ALL_CATEGORIES, AnnouncementCategory } from '@/data/mockData';

const CATEGORY_EMOJI: Record<string, string> = {
  會議公告: '📋', 決議公告: '📝', 財務公告: '💰', 修繕公告: '🔧',
  環境公告: '🌿', 停車公告: '🚗', 安全公告: '🔒', 一般通知: '📢',
};

export default function CategoriesPage() {
  const [selected, setSelected] = useState<AnnouncementCategory | null>(null);

  const getCategoryCount = (cat: AnnouncementCategory) =>
    announcements.filter((a) => a.category === cat).length;

  const filtered = selected
    ? announcements.filter((a) => a.category === selected)
    : [];

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">公告分類</div>
          <div className="text-xs text-amber-600">依類別瀏覽公告</div>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3 mb-5">
          {ALL_CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat);
            const isActive = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelected(isActive ? null : cat)}
                className={`flex items-center gap-3 p-4 rounded-2xl border text-left min-h-[64px] transition-all ${
                  isActive
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                    : 'bg-white border-amber-100 text-amber-900 hover:border-orange-300'
                }`}
              >
                <span className="text-2xl">{CATEGORY_EMOJI[cat]}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-amber-900'}`}>{cat}</div>
                  <div className={`text-xs ${isActive ? 'text-orange-100' : 'text-amber-500'}`}>{count} 筆</div>
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-amber-900">
                {CATEGORY_EMOJI[selected]} {selected}
              </h2>
              <span className="text-xs text-amber-500">{filtered.length} 筆</span>
            </div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-amber-100">
                <div className="text-3xl mb-2">📭</div>
                <p className="text-sm text-amber-500">此分類尚無公告</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((ann) => (
                  <AnnouncementCard key={ann.id} announcement={ann} />
                ))}
              </div>
            )}
          </div>
        )}

        {!selected && (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">👆</div>
            <p className="text-sm text-amber-500">點選上方分類查看公告</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </Layout>
  );
}
