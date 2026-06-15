'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import PdfUploader from '@/components/admin/PdfUploader';
import { ALL_CATEGORIES, ALL_STATUSES, AnnouncementCategory, AnnouncementStatus } from '@/data/mockData';

export default function NewAnnouncementPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    notice_number: '',
    title: '',
    category: '一般通知' as AnnouncementCategory,
    status: '草稿' as AnnouncementStatus,
    published_date: new Date().toISOString().slice(0, 10),
    summary: '',
    keywords: '',
    pdf_url: '',
    next_step: '',
    completion_record: '',
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('新增公告（Prototype）:', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/announcements">
            <button className="text-gray-500 hover:text-gray-700 text-sm">‹ 返回列表</button>
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-800">新增公告</h1>
        </div>

        {saved && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
            ✅ 已模擬儲存（Prototype 版本）
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">公告編號</label>
            <input type="text" value={form.notice_number} onChange={(e) => handleChange('notice_number', e.target.value)}
              placeholder="例：新市民社區-115-06-010"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">公告標題 <span className="text-red-400">*</span></label>
            <input type="text" required value={form.title} onChange={(e) => handleChange('title', e.target.value)}
              placeholder="請輸入公告標題"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">分類</label>
              <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                {ALL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">狀態</label>
              <select value={form.status} onChange={(e) => handleChange('status', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                {ALL_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">發布日期</label>
            <input type="date" value={form.published_date} onChange={(e) => handleChange('published_date', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">公告摘要 <span className="text-red-400">*</span></label>
            <textarea required rows={4} value={form.summary} onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="請輸入公告摘要內容"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>

          {/* PDF 上傳 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">PDF 公告文件</label>
            <PdfUploader
              currentUrl={form.pdf_url}
              onChange={(url) => handleChange('pdf_url', url)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">關鍵字（逗號分隔）</label>
            <input type="text" value={form.keywords} onChange={(e) => handleChange('keywords', e.target.value)}
              placeholder="例：區權會,會議通知,郵寄"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">下一步</label>
            <textarea rows={2} value={form.next_step} onChange={(e) => handleChange('next_step', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">完成紀錄</label>
            <textarea rows={2} value={form.completion_record} onChange={(e) => handleChange('completion_record', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
              儲存公告
            </button>
            <Link href="/admin/announcements" className="flex-1">
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
