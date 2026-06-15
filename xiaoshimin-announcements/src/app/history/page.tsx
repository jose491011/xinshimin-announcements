import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import { announcements } from '@/data/mockData';

export default function HistoryPage() {
  // 依年月分組
  const grouped: Record<string, typeof announcements> = {};
  [...announcements]
    .sort((a, b) => new Date(b.published_date.replace(/\//g, '-')).getTime() - new Date(a.published_date.replace(/\//g, '-')).getTime())
    .forEach((ann) => {
      const [year, month] = ann.published_date.split('/');
      const key = `${year} 年 ${month} 月`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ann);
    });

  const months = Object.keys(grouped);

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">歷史公告</div>
          <div className="text-xs text-amber-600">依年月查詢</div>
        </div>
      </header>

      <div className="px-4 py-4 flex flex-col gap-6">
        {months.map((month) => (
          <section key={month}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-orange-400 rounded-full" />
              <h2 className="text-base font-bold text-amber-900">{month}</h2>
              <span className="text-xs text-amber-500 ml-1">{grouped[month].length} 筆</span>
            </div>
            <div className="flex flex-col gap-3">
              {grouped[month].map((ann) => (
                <AnnouncementCard key={ann.id} announcement={ann} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <BottomNavigation />
    </Layout>
  );
}
