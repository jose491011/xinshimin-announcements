'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import AnnouncementCard from '@/components/AnnouncementCard';
import ProgressPreviewCard from '@/components/ProgressPreviewCard';
import SearchBar from '@/components/SearchBar';
import { announcements, workProgressList } from '@/data/mockData';

const CATEGORY_ITEMS = [
  { icon: '/images/icons/icon-announcements.png', label: '最新公告', href: '/announcements' },
  { icon: '/images/icons/icon-categories.png',    label: '公告分類', href: '/categories'    },
  { icon: '/images/icons/icon-status.png',        label: '公告狀態', href: '/status'        },
  { icon: '/images/icons/icon-history.png',       label: '歷史公告', href: '/history'       },
  { icon: '/images/icons/icon-progress.png',      label: '工作進程', href: '/progress'      },
  { icon: '/images/icons/icon-contact.png',       label: '聯絡我們', href: '#'              },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Layout>
      {/* ===== Header ===== */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex flex-col">
          <span className="text-base font-bold text-amber-900 leading-tight">台北新市民公寓大廈</span>
          <span className="text-xs text-amber-500 tracking-wide">公告查詢中心</span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-amber-50 transition-colors"
          aria-label="開啟選單"
        >
          <span className={`w-5 h-0.5 bg-amber-700 rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`w-5 h-0.5 bg-amber-700 rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-amber-700 rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </header>

      {/* 漢堡選單 */}
      {menuOpen && (
        <div className="bg-white border-b border-amber-100 shadow-md z-30">
          {[
            { label: '關於本系統', icon: 'ℹ️' },
            { label: '公告查詢說明', icon: '📖' },
            { label: '聯絡管委會',  icon: '📞' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 px-5 py-4 text-base text-amber-800 hover:bg-amber-50 min-h-[52px] border-b border-amber-50 last:border-0 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              <span className="ml-auto text-amber-300">›</span>
            </button>
          ))}
        </div>
      )}

      {/* ===== Hero：水彩背景 + 文字 ===== */}
      <section className="relative overflow-hidden" style={{ height: 220 }}>
        <Image
          src="/images/hero-bg.png"
          alt="台北新市民公寓大廈社區環境"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/85 via-amber-50/55 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-5 pb-4">
          <p className="text-xs font-semibold text-amber-600 tracking-widest mb-1.5">
            台北新市民公寓大廈
          </p>
          <h1 className="text-2xl font-bold text-amber-900 leading-tight">
            用心經營・<span className="text-orange-500">安心生活</span>
          </h1>
          <p className="text-sm text-amber-700 mt-2">社區大小事，讓您隨時掌握</p>
        </div>
      </section>

      {/* ===== 搜尋框 ===== */}
      <div className="px-4 -mt-3 relative z-10 mb-1">
        <div className="bg-white rounded-2xl shadow-md px-3 py-2.5 border border-amber-100">
          <SearchBar />
        </div>
      </div>

      {/* ===== 功能入口：3欄 × 2列，透明圖示 + 白底圓角卡片 ===== */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-3">
          {CATEGORY_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="bg-white rounded-2xl border border-amber-100 flex flex-col items-center justify-center pt-4 pb-3 gap-2 min-h-[96px] hover:border-orange-200 hover:shadow-sm active:scale-95 transition-all shadow-sm">
                {/* 圖示：透明背景，直接顯示 */}
                <div className="relative w-[52px] h-[52px]">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <span className="text-xs font-semibold text-amber-800 text-center leading-tight px-1">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 工作進程預覽 ===== */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-amber-900 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-400 rounded-full inline-block" />
            社區工作進程
          </h2>
          <Link href="/progress" className="text-sm text-orange-500 font-medium min-h-[44px] flex items-center">
            查看更多 ›
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {workProgressList.map((wp) => (
            <ProgressPreviewCard key={wp.id} progress={wp} />
          ))}
        </div>
      </section>

      {/* ===== 最新公告 ===== */}
      <section className="px-4 mt-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-amber-900 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-400 rounded-full inline-block" />
            最新公告
          </h2>
          <Link href="/announcements" className="text-sm text-orange-500 font-medium min-h-[44px] flex items-center">
            查看全部 ›
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {announcements.map((ann) => (
            <AnnouncementCard key={ann.id} announcement={ann} />
          ))}
        </div>
      </section>

      <footer className="px-4 py-5 text-center border-t border-amber-100 mt-2">
        <p className="text-xs text-amber-400 font-medium">曾煥宗　版權所有</p>
        <p className="text-xs text-amber-300 mt-1">Prototype v1.0 · 2026</p>
      </footer>

      <BottomNavigation />
    </Layout>
  );
}
