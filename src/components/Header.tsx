import React from 'react';
import { Layers, ArrowLeft, Eye, Sparkles } from 'lucide-react';

interface Props {
  onSelectNav: (sectionId: string) => void;
  onSwitchToClientView: () => void;
}

export const Header: React.FC<Props> = ({ onSelectNav, onSwitchToClientView }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-black tracking-tight text-neutral-100 flex items-center gap-2">
              <span>رادار خدمات دیوار</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                پنل مدیریت و استراتژی
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
          <button
            type="button"
            onClick={() => onSelectNav('services-section')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            ۱۰ خدمت پرزنگ‌خور
          </button>
          <button
            type="button"
            onClick={() => onSelectNav('simulators-section')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            شبیه‌ساز زنده ابزارها
          </button>
          <button
            type="button"
            onClick={() => onSelectNav('ad-generator-section')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            سازنده آگهی دیوار
          </button>
          <button
            type="button"
            onClick={() => onSelectNav('market-insights-section')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            تحلیل عمیق بازار دیوار
          </button>
          <button
            type="button"
            onClick={() => onSelectNav('roadmap-section')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            نقشه راه درآمدزایی
          </button>
        </nav>

        {/* Zone 3: Switch view action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onSwitchToClientView}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>مشاهده ویترین مشتریان (نوینیا)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
