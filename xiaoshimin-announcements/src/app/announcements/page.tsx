import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import { announcements } from '@/data/mockData';

export default function AnnouncementsPage() {
  const sorted = [...announcements].sort(
    (a, b) => new Date(b.published_date.replace(/\//g, '-')).getTime() - new Date(a.published_date.replace(/\//g, '-')).getTime()
  );

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">最新公告</div>
          <div className="text-xs text-amber-600">共 {sorted.length} 筆公告</div>
        </div>
      </header>

      <div className="px-4 py-4 flex flex-col gap-3">
        {sorted.map((ann) => (
          <AnnouncementCard key={ann.id} announcement={ann} />
        ))}
      </div>

      <BottomNavigation />
    </Layout>
  );
}
