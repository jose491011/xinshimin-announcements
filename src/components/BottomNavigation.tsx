'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/',           icon: '🏠', label: '首頁'   },
  { href: '/categories', icon: '📂', label: '分類'   },
  { href: '/search',     icon: '🔍', label: '搜尋'   },
  { href: '/history',    icon: '📅', label: '歷史'   },
  { href: '/progress',   icon: '📊', label: '進程'   },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[390px] mx-auto">
        <div className="bg-white border-t border-amber-100 h-[68px] flex items-center justify-around px-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[56px] rounded-xl transition-all ${
                  active ? 'text-orange-500' : 'text-amber-400'
                }`}
              >
                {/* 活躍底色 */}
                {active && (
                  <span className="absolute inset-1 bg-orange-50 rounded-xl" />
                )}
                <span className={`relative text-xl transition-transform ${active ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className={`relative text-[10px] font-semibold tracking-wide ${
                  active ? 'text-orange-500' : 'text-amber-400'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
