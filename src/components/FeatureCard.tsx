'use client';

import Link from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  href: string;
  description?: string;
  fullWidth?: boolean;
  accent?: boolean;
}

export default function FeatureCard({
  icon,
  title,
  href,
  description,
  fullWidth = false,
  accent = false,
}: FeatureCardProps) {
  return (
    <Link href={href} className={fullWidth ? 'block w-full' : 'block'}>
      <div
        className={`rounded-2xl shadow-sm p-4 flex items-center gap-3 min-h-[64px] active:scale-[0.98] transition-all cursor-pointer border ${
          accent
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400'
            : 'bg-white text-amber-900 border-amber-100 hover:border-orange-200 hover:shadow-md'
        }`}
      >
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-base ${accent ? 'text-white' : 'text-amber-900'}`}>
            {title}
          </div>
          {description && (
            <div className={`text-xs mt-0.5 ${accent ? 'text-orange-100' : 'text-amber-600'}`}>
              {description}
            </div>
          )}
        </div>
        <span className={`text-lg ${accent ? 'text-orange-100' : 'text-amber-400'}`}>›</span>
      </div>
    </Link>
  );
}
