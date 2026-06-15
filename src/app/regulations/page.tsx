import Link from 'next/link';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import { regulations } from '@/data/mockData';

const TAG_COLOR: Record<string, string> = {
  規約:   'bg-amber-100 text-amber-800',
  管理辦法: 'bg-blue-100 text-blue-800',
  財務辦法: 'bg-emerald-100 text-emerald-800',
  會議規則: 'bg-purple-100 text-purple-800',
  其他:   'bg-gray-100 text-gray-600',
};

export default function RegulationsPage() {
  return (
    <Layout>
      <header className="bg-white border-b border-amber-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-amber-50 text-amber-700 text-xl">‹</Link>
        <div>
          <div className="text-base font-bold text-amber-900">規約辦法</div>
          <div className="text-xs text-amber-600">社區規約與管理辦法文件</div>
        </div>
      </header>

      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-sm text-amber-800 leading-relaxed">
          📋 本區收錄社區規約及各項管理辦法，住戶可點擊查看或下載 PDF 文件。
        </p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {regulations.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
            <div className="flex">
              <div className="w-1.5 flex-shrink-0 bg-amber-400" />
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_COLOR[item.tag] ?? 'bg-gray-100 text-gray-600'}`}>
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-400">更新：{item.updated}</span>
                </div>
                <h3 className="text-base font-semibold text-amber-900 leading-snug mb-1.5">{item.title}</h3>
                <p className="text-sm text-amber-700 leading-relaxed mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <a href={item.pdf_url} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-3 py-2.5 rounded-xl min-h-[44px]">
                    👁️ 查看 PDF
                  </a>
                  <a href={item.pdf_url} download
                    className="flex-1 flex items-center justify-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-2.5 rounded-xl min-h-[44px]">
                    ⬇️ 下載
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="px-4 py-4 text-center">
        <p className="text-xs text-amber-400">如有疑問請洽管委會</p>
      </footer>

      <BottomNavigation />
    </Layout>
  );
}
