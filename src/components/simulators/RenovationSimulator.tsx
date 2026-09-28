import React, { useState } from 'react';
import { Home, CheckCircle2, PhoneCall } from 'lucide-react';

export const RenovationSimulator: React.FC = () => {
  const [area, setArea] = useState<number>(85);
  const [tier, setTier] = useState<'economic' | 'modern' | 'luxury'>('modern');
  const [kitchenCabinet, setKitchenCabinet] = useState<boolean>(true);
  const [flooring, setFlooring] = useState<boolean>(true);
  const [painting, setPainting] = useState<boolean>(true);
  const [bathroom, setBathroom] = useState<boolean>(false);
  const [knaufLighting, setKnaufLighting] = useState<boolean>(true);
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Pricing formula (in Million Tomans)
  const baseRatePerSqm = tier === 'economic' ? 1.8 : tier === 'modern' ? 3.2 : 5.8;
  const basePrice = area * baseRatePerSqm;
  const cabinetPrice = kitchenCabinet ? (tier === 'economic' ? 35 : tier === 'modern' ? 65 : 120) : 0;
  const flooringPrice = flooring ? area * (tier === 'economic' ? 0.35 : tier === 'modern' ? 0.65 : 1.1) : 0;
  const paintingPrice = painting ? area * (tier === 'economic' ? 0.2 : tier === 'modern' ? 0.35 : 0.6) : 0;
  const bathroomPrice = bathroom ? (tier === 'economic' ? 25 : tier === 'modern' ? 45 : 85) : 0;
  const knaufPrice = knaufLighting ? area * (tier === 'economic' ? 0.25 : tier === 'modern' ? 0.45 : 0.8) : 0;

  const totalPrice = Math.round(basePrice + cabinetPrice + flooringPrice + paintingPrice + bathroomPrice + knaufPrice);
  const estimatedDays = Math.max(15, Math.round(area * 0.3 + (tier === 'luxury' ? 20 : 10)));

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: محاسبه‌گر هزینه بازسازی و نوسازی</h4>
            <span className="text-xs text-neutral-400">نمونهٔ نمایش قیمت بر اساس متراژ و خدمات انتخابی</span>
          </div>
        </div>
        <span className="text-xs font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-md">
          {estimatedDays} روز زمان تخمینی
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          {/* Area Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-neutral-300">متراژ زیربنای واحد:</span>
              <span className="text-amber-400 font-bold tabular-nums text-base">{area} متر مربع</span>
            </div>
            <input
              type="range"
              min="40"
              max="250"
              step="5"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1 font-mono">
              <span>۴۰ متر</span>
              <span>۱۴۰ متر</span>
              <span>۲۵۰ متر</span>
            </div>
          </div>

          {/* Tier Selector */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">کیفیت متریال و سبک کار:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'economic', label: 'اقتصادی و تمیز', sub: 'مناسب اجاره/فروش' },
                { id: 'modern', label: 'مدرن و استاندارد', sub: 'کیفیت عالی و روز' },
                { id: 'luxury', label: 'لوکس و ژورنالی VIP', sub: 'متریال وارداتی' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id as any)}
                  className={`p-2.5 text-right rounded-xl border text-xs transition-all ${
                    tier === t.id
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold shadow-sm'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-sm text-neutral-200">{t.label}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{t.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Work Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">آیتم‌های مورد نیاز نوسازی:</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 bg-neutral-800/60 rounded-lg cursor-pointer hover:bg-neutral-800">
                <input
                  type="checkbox"
                  checked={kitchenCabinet}
                  onChange={(e) => setKitchenCabinet(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span className="text-neutral-300">کابینت MDF/های‌گلاس</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-neutral-800/60 rounded-lg cursor-pointer hover:bg-neutral-800">
                <input
                  type="checkbox"
                  checked={flooring}
                  onChange={(e) => setFlooring(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span className="text-neutral-300">کفپوش، سرامیک یا پارکت</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-neutral-800/60 rounded-lg cursor-pointer hover:bg-neutral-800">
                <input
                  type="checkbox"
                  checked={painting}
                  onChange={(e) => setPainting(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span className="text-neutral-300">نقاشی و کناف سقف</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-neutral-800/60 rounded-lg cursor-pointer hover:bg-neutral-800">
                <input
                  type="checkbox"
                  checked={bathroom}
                  onChange={(e) => setBathroom(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span className="text-neutral-300">نوسازی سرویس و حمام</span>
              </label>
            </div>
          </div>
        </div>

        {/* Calculation Result & Lead Capture */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-medium mb-1">برآورد کل هزینه بازسازی:</div>
            <div className="text-3xl font-black text-amber-400 tabular-nums">
              {totalPrice.toLocaleString('fa-IR')}{' '}
              <span className="text-sm font-normal text-neutral-400">میلیون تومان</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              میانگین هر متر مربع: {Math.round(totalPrice / area * 10) / 10} میلیون تومان
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>تخمین زمان اجرا:</span>
                <span className="text-neutral-200 font-medium">{estimatedDays} روز کاری</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>گارانتی کتبی حسن اجرا:</span>
                <span className="text-emerald-400 font-medium">۲۴ ماه معتبر</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>طراحی ۳ بعدی قبل از اجرا:</span>
                <span className="text-amber-400 font-medium">رایگان (هدیه قرارداد)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {isSubmitted ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>آزمایش کامل شد؛ هیچ درخواستی ثبت نشده و تماسی انجام نمی‌شود.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-neutral-300 block">
                  نمونهٔ مرحلهٔ درخواست (بدون ثبت واقعی):
                </label>
                <div className="flex gap-2">
                  <p className="text-xs text-neutral-300">برای آزمایش، شمارهٔ واقعی لازم نیست.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(true);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    آزمایش درخواست
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
