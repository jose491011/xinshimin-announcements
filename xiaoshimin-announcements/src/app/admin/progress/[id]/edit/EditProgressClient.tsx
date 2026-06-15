'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { WorkProgress, WorkProgressType, WorkProgressStatus } from '@/data/mockData';

const ALL_TYPES: WorkProgressType[] = ['修繕工程','設備檢修','行政作業','會議決議追蹤','環境改善','財務作業','停車管理','其他事項'];
const ALL_WP_STATUSES: WorkProgressStatus[] = ['規劃中','待安排','招標中','施工中','檢測中','驗收中','進行中','已完成','暫停','延期'];

export default function EditProgressClient({ wp }: { wp: WorkProgress }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    project_name: wp.project_name,
    project_type: wp.project_type as WorkProgressType,
    status: wp.status as WorkProgressStatus,
    stages: wp.stages.join(','),
    current_stage: wp.current_stage,
    progress_percentage: wp.progress_percentage,
    estimated_completion_date: wp.estimated_completion_date.replace(/\//g, '-'),
    responsible_party: wp.responsible_party,
    description: wp.description,
    next_step: wp.next_step,
  });

  const handleChange = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('編輯工作進程（Prototype）:', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/progress">
            <button className="text-gray-500 hover:text-gray-700 text-sm">‹ 返回列表</button>
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-800">編輯工作進程</h1>
        </div>

        {saved && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
            ✅ 已模擬儲存（Prototype 版本）
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">項目名稱 <span className="text-red-400">*</span></label>
            <input type="text" required value={form.project_name} onChange={(e) => handleChange('project_name', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">類型</label>
              <select value={form.project_type} onChange={(e) => handleChange('project_type', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                {ALL_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">狀態</label>
              <select value={form.status} onChange={(e) => handleChange('status', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                {ALL_WP_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">階段（逗號分隔）</label>
            <input type="text" value={form.stages} onChange={(e) => handleChange('stages', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">目前階段</label>
              <input type="text" value={form.current_stage} onChange={(e) => handleChange('current_stage', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">進度 {form.progress_percentage}%</label>
              <input type="range" min={0} max={100} step={5} value={form.progress_percentage}
                onChange={(e) => handleChange('progress_percentage', Number(e.target.value))}
                className="w-full mt-2 accent-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">預計完成日</label>
              <input type="date" value={form.estimated_completion_date} onChange={(e) => handleChange('estimated_completion_date', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">負責單位</label>
              <input type="text" value={form.responsible_party} onChange={(e) => handleChange('responsible_party', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">項目說明</label>
            <textarea rows={3} value={form.description} onChange={(e) => handleChange('description', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">下一步</label>
            <textarea rows={2} value={form.next_step} onChange={(e) => handleChange('next_step', e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
              儲存變更
            </button>
            <Link href="/admin/progress" className="flex-1">
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
