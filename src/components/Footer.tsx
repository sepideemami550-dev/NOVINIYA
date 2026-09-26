import React from 'react';
import { Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-neutral-950 text-neutral-400 border-t border-neutral-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-neutral-200">
            پنل استراتژی رادار خدمات دیوار و مهندسی وب‌اپلیکیشن‌های تعاملی
          </span>
        </div>

        <div className="flex items-center gap-6 text-[11px] text-neutral-400">
          <span>طراحی‌شده با استاندارد طراحی مدرن و وب‌اپ‌های تعاملی</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400 font-bold">نسخه به‌روزرسانی‌شده سال ۱۴۰۵</span>
        </div>

        <div className="text-[11px] text-neutral-400">
          تمامی حقوق محفوظ است © ۱۴۰۵
        </div>
      </div>
    </footer>
  );
};
