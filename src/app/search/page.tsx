import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import SearchBar from '@/components/SearchBar';
import { searchAnnouncements } from '@/data/mockData';

interface SearchPageProps {
  searchParams: { keyword?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams.keyword ?? '';
  const results = keyword ? searchAnnouncements(keyword) : [];

  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">搜尋公告</div>
          <div className="text-xs text-amber-600">{keyword ? `「${keyword}」的搜尋結果` : '輸入關鍵字查詢'}</div>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="mb-4">
          <SearchBar defaultValue={keyword} />
        </div>

        {!keyword && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-base font-medium text-amber-800 mb-2">搜尋社區公告</p>
            <p className="text-sm text-amber-500">輸入公告標題、摘要或關鍵字</p>
          </div>
        )}

        {keyword && (
          <div>
            <p className="text-sm text-amber-600 mb-3">
              共找到 <span className="font-bold text-orange-500">{results.length}</span> 筆結果
            </p>
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-amber-100">
                <div className="text-3xl mb-2">😔</div>
                <p className="text-sm font-medium text-amber-800 mb-1">找不到相關公告</p>
                <p className="text-xs text-amber-500">請嘗試其他關鍵字</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {results.map((ann) => (
                  <AnnouncementCard key={ann.id} announcement={ann} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </Layout>
  );
}
