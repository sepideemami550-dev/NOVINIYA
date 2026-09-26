import React from 'react';
import { ArrowDown, Flame, Zap, ShieldCheck } from 'lucide-react';
import { divarMarketStats } from '../data/servicesData';

interface Props {
  onExploreClick: () => void;
  onAdGenClick: () => void;
}

export const HeroSection: React.FC<Props> = ({ onExploreClick, onAdGenClick }) => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden border-b border-neutral-800/80">
      {/* Subtle ambient gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.08),rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Unboxed editorial kicker */}
        <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium mb-4">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>تحلیل جامع بازار خدمات دیوار ایران</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-amber-300 font-bold">بروزرسانی زنده سال ۱۴۰۵</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>ساخت سریع وب‌اپلیکیشن در کمتر از ۴۵ دقیقه</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-100 max-w-4xl leading-[1.3] text-balance">
          ۱۰ خدمت پرفروش و پربازدید دیوار با <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">بالاترین زنگ‌خور و درآمد</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed">
          تحلیل عمیق رفتار کاربران و اصناف در دیوار نشان می‌دهد که آگهی‌های معمولی متن‌محور دیگر پاسخگوی نیاز بازار نیستند. معرفی ابزارهای تعاملی آنلاین (محاسبه‌گرهای قیمت بازسازی، اسباب‌کشی، نوبت‌دهی و منوی دیجیتال) نرخ تماس و فروش را تا <strong className="text-neutral-200 font-semibold">۴ برابر</strong> افزایش می‌دهد. تمام این ابزارها را می‌توانید در <strong className="text-amber-400 font-semibold">گوگل استودیو</strong> بسیار شیک و سریع بسازید.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExploreClick}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2"
          >
            <span>بررسی لیست ۱۰ خدمت به همراه دمو</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onAdGenClick}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>سازنده آگهی دیوار آماده کپی</span>
          </button>
        </div>

        {/* Real Marketplace Metrics Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-100 tabular-nums">۵۳+ میلیون</div>
            <div className="text-xs text-neutral-400 mt-1">بازدید ۶ ماهه بخش خدمات دیوار</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">۴× تماس بیشتر</div>
            <div className="text-xs text-neutral-400 mt-1">با محاسبه‌گر آنلاین و شفافیت قیمت</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-100 tabular-nums">زیر ۴۵ دقیقه</div>
            <div className="text-xs text-neutral-400 mt-1">زمان ساخت هر ابزار در گوگل استودیو</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">۵ تا ۲۵ میلیون</div>
            <div className="text-xs text-neutral-400 mt-1">تعرفه واگذاری هر ابزار به کسبه شهر</div>
          </div>
        </div>
      </div>
    </section>
  );
};
