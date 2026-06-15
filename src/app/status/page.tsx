import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import StatusBadge from '@/components/StatusBadge';
import { announcements, ALL_STATUSES, AnnouncementStatus } from '@/data/mockData';

export default function StatusPage() {
  const grouped = ALL_STATUSES.reduce<Record<AnnouncementStatus, typeof announcements>>(
    (acc, status) => {
      acc[status] = announcements.filter((a) => a.status === status);
      return acc;
    },
    {} as Record<AnnouncementStatus, typeof announcements>
  );

  const activeStatuses = ALL_STATUSES.filter((s) => grouped[s].length > 0);

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">公告狀態</div>
          <div className="text-xs text-amber-600">依狀態分組瀏覽</div>
        </div>
      </header>

      <div className="px-4 py-4 flex flex-col gap-6">
        {activeStatuses.map((status) => (
          <section key={status}>
            <div className="flex items-center gap-2 mb-3">
              <StatusBadge status={status} size="md" />
              <span className="text-xs text-amber-500">{grouped[status].length} 筆</span>
            </div>
            <div className="flex flex-col gap-3">
              {grouped[status].map((ann) => (
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
