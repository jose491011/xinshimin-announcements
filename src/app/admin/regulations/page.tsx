'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { regulations as initialData } from '@/data/mockData';

const TAG_COLOR: Record<string, string> = {
  規約:     'bg-amber-100 text-amber-700',
  管理辦法:  'bg-blue-100 text-blue-700',
  財務辦法:  'bg-emerald-100 text-emerald-700',
  會議規則:  'bg-purple-100 text-purple-700',
  其他:     'bg-gray-100 text-gray-600',
};

export default function AdminRegulationsPage() {
  const [items, setItems] = useState(initialData);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">規約辦法管理</h1>
            <p className="text-sm text-gray-500 mt-1">共 {items.length} 筆文件</p>
          </div>
          <Link href="/admin/regulations/new">
            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
              ＋ 新增文件
            </button>
          </Link>
        </div>

        {deleteId && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="text-2xl mb-3 text-center">🗑️</div>
              <h3 className="text-base font-bold text-gray-800 text-center mb-2">確認刪除？</h3>
              <p className="text-sm text-gray-500 text-center mb-5">刪除後無法復原（Prototype 版本僅模擬）</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">確認刪除</button>
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors">取消</button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_120px] gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
            <span>文件名稱</span><span>類型</span><span>更新日期</span><span>操作</span>
          </div>
          <div className="divide-y divide-gray-50">
            {items.map((reg) => (
              <div key={reg.id} className="grid grid-cols-[2fr_1fr_1fr_120px] gap-3 px-5 py-4 items-center hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{reg.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{reg.description}</p>
                </div>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full w-fit ${TAG_COLOR[reg.tag] ?? 'bg-gray-100 text-gray-600'}`}>
                  {reg.tag}
                </span>
                <span className="text-sm text-gray-500">{reg.updated}</span>
                <div className="flex items-center gap-1">
                  <Link href={`/regulations`} target="_blank">
                    <button className="text-xs text-gray-500 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">預覽</button>
                  </Link>
                  <Link href={`/admin/regulations/${reg.id}/edit`}>
                    <button className="text-xs text-amber-600 font-medium px-2 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">編輯</button>
                  </Link>
                  <button onClick={() => setDeleteId(reg.id)}
                    className="text-xs text-red-400 hover:text-red-600 font-medium px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors">刪除</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          ⚠️ Prototype 版本：修改不會實際儲存。串接 Supabase 後將支援完整 CRUD。
        </p>
      </div>
    </AdminLayout>
  );
}
