'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Regulation, ALL_REGULATION_TAGS, RegulationTag } from '@/data/mockData';

export default function EditRegulationClient({ reg }: { reg: Regulation }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: reg.title,
    description: reg.description,
    tag: reg.tag as RegulationTag,
    updated: reg.updated.replace(/\//g, '-'),
    pdf_url: reg.pdf_url,
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('編輯規約（Prototype）:', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/regulations">
            <button className="text-gray-500 hover:text-gray-700 text-sm">‹ 返回列表</button>
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-800">編輯規約辦法</h1>
        </div>

        {saved && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
            ✅ 已模擬儲存（Prototype 版本）
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">文件名稱 <span className="text-red-400">*</span></label>
            <input type="text" required value={form.title} onChange={(e) => handleChange('title', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">說明</label>
            <textarea rows={3} value={form.description} onChange={(e) => handleChange('description', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">類型</label>
              <select value={form.tag} onChange={(e) => handleChange('tag', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white">
                {ALL_REGULATION_TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">更新日期</label>
              <input type="date" value={form.updated}
                onChange={(e) => handleChange('updated', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">PDF 連結</label>
            <input type="text" value={form.pdf_url} onChange={(e) => handleChange('pdf_url', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
              儲存變更
            </button>
            <Link href="/admin/regulations" className="flex-1">
              <button type="button" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold transition-colors">
                取消
              </button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
