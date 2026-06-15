import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '小市民社區公告查詢中心',
  description: '社區大小事，讓您隨時掌握',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
