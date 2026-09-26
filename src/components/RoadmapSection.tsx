import React from 'react';
import { roadmapSteps } from '../data/servicesData';
import { Compass, CheckCircle2 } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap-section" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>نقشه راه عملیاتی کسب درآمد سریع</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-neutral-100">
          چگونه با گوگل استودیو و دیوار به درآمد ماهانه ۵۰ میلیونی برسیم؟
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
          فرمول تست‌شده ۴ مرحله‌ای از انتخاب خدمت تا اولین واریزی بیعانه از کارفرمایان دیوار:
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 mb-2">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-neutral-100 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>اقدام شدنی بدون سرمایه اولیه</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
