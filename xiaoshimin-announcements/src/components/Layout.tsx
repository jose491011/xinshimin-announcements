'use client';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-amber-50 shadow-lg relative pb-24">
      {children}
    </div>
  );
}
