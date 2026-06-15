'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
  defaultValue?: string;
  onSearch?: (keyword: string) => void;
}

export default function SearchBar({ defaultValue = '', onSearch }: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      if (onSearch) {
        onSearch(value.trim());
      } else {
        router.push(`/search?keyword=${encodeURIComponent(value.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-amber-400 text-lg pointer-events-none">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="搜尋公告標題、摘要或關鍵字"
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-amber-200 text-amber-900 placeholder-amber-400 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm min-h-[48px]"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute right-4 text-amber-400 text-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}
