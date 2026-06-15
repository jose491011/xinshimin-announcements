'use client';

import { useState, useRef } from 'react';

interface PdfUploaderProps {
  currentUrl: string;
  onChange: (url: string, fileName: string) => void;
}

export default function PdfUploader({ currentUrl, onChange }: PdfUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('請選擇 PDF 檔案');
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setUploaded(false);

    // 模擬上傳過程（Prototype）
    // 第二階段替換為 Supabase Storage 上傳
    setTimeout(() => {
      const mockUrl = `/uploads/${file.name}`;
      setUploading(false);
      setUploaded(true);
      onChange(mockUrl, file.name);
    }, 1200);
  };

  const handleClear = () => {
    setFileName('');
    setUploaded(false);
    onChange('', '');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 目前連結顯示 */}
      {currentUrl && !uploaded && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
          <span className="text-sm">📄</span>
          <span className="text-xs text-amber-700 truncate flex-1">{currentUrl}</span>
          <a href={currentUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-orange-500 hover:text-orange-600 font-medium flex-shrink-0">
            預覽
          </a>
        </div>
      )}

      {/* 上傳成功訊息 */}
      {uploaded && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
          <span className="text-sm">✅</span>
          <span className="text-xs text-emerald-700 truncate flex-1">{fileName}</span>
          <button type="button" onClick={handleClear}
            className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0">✕</button>
        </div>
      )}

      {/* 上傳中 */}
      {uploading && (
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
          <span className="text-sm animate-spin">⏳</span>
          <span className="text-xs text-blue-700">上傳中：{fileName}</span>
        </div>
      )}

      {/* 選擇檔案按鈕 */}
      {!uploading && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200 min-h-[44px]"
          >
            📁 瀏覽選擇 PDF
          </button>
          {uploaded && (
            <button type="button" onClick={handleClear}
              className="text-xs text-red-400 hover:text-red-600 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors border border-gray-200">
              重新選擇
            </button>
          )}
        </div>
      )}

      {/* 隱藏的 file input */}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 手動輸入連結（進階） */}
      <details className="mt-1">
        <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 select-none">
          或手動輸入 PDF 連結
        </summary>
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => onChange(e.target.value, '')}
          placeholder="/uploads/filename.pdf 或 https://..."
          className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </details>

      <p className="text-xs text-gray-400">
        ⚠️ Prototype 版本：模擬上傳。串接 Supabase Storage 後將真實儲存至雲端。
      </p>
    </div>
  );
}
