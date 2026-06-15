'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = '491011';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true');
        router.push('/admin');
      } else {
        setError(true);
        setLoading(false);
        setPassword('');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🏘️</div>
          <h1 className="text-xl font-bold text-amber-900">台北新市民公寓大廈</h1>
          <p className="text-sm text-amber-600 mt-1">後台管理系統</p>
        </div>

        {/* 登入卡片 */}
        <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6">
          <h2 className="text-base font-bold text-gray-700 mb-5 text-center">請輸入管理密碼</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="請輸入管理密碼"
                autoFocus
                className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              />
              {error && (
                <p className="text-xs text-red-500">密碼錯誤，請重新輸入。</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white py-3 rounded-xl text-sm font-semibold transition-colors mt-1"
            >
              {loading ? '驗證中...' : '登入後台'}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            僅限管委會及管理員使用
          </p>
        </div>

        <p className="text-xs text-amber-400 text-center mt-4">
          Prototype v1.0 · 曾煥宗 版權所有
        </p>
      </div>
    </div>
  );
}
