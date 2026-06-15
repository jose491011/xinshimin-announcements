'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/admin', label: '後台首頁', icon: '🏠', exact: true },
  { href: '/admin/announcements', label: '公告管理', icon: '📋', exact: false },
  { href: '/admin/progress', label: '工作進程管理', icon: '📊', exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-amber-900 text-white h-14 flex items-center px-4 gap-4 shadow-md z-50 sticky top-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-amber-800 transition-colors"
        >
          <span className="w-4 h-0.5 bg-white rounded" />
          <span className="w-4 h-0.5 bg-white rounded" />
          <span className="w-4 h-0.5 bg-white rounded" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">🏘️</span>
          <div>
            <div className="text-sm font-bold leading-tight">台北新市民公寓大廈</div>
            <div className="text-xs text-amber-300 leading-tight">後台管理系統</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>🔗</span>
            <span>前台預覽</span>
          </Link>
          <span className="text-xs text-amber-400 bg-amber-800 px-2 py-1 rounded-full">
            Prototype v1.0
          </span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-200 flex-shrink-0 ${
            sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'
          }`}
        >
          <nav className="py-4">
            <div className="px-4 mb-2">
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">選單</span>
            </div>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-amber-50 text-amber-900 border-r-2 border-amber-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="px-4 mt-6 mb-2">
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">說明</span>
            </div>
            <div className="px-4 py-2 text-xs text-gray-400 leading-relaxed">
              目前使用 Mock Data。<br />
              第二階段串接 Supabase 後，資料將存入資料庫。
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
