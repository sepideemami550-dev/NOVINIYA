import React, { useState } from 'react';
import { Crown, CheckCircle2, PhoneCall } from 'lucide-react';

export const WeddingBudgetSimulator: React.FC = () => {
  const [guests, setGuests] = useState<number>(200);
  const [menuType, setMenuType] = useState<'single' | 'buffet' | 'royal'>('buffet');
  const [flowers, setFlowers] = useState<boolean>(true);
  const [fireworks, setFireworks] = useState<boolean>(true);
  const [djStage, setDjStage] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [booked, setBooked] = useState<boolean>(false);

  // Per person menu (in 1,000 Tomans)
  const menuRatePerPerson = menuType === 'single' ? 650 : menuType === 'buffet' ? 1100 : 1850;
  const foodTotal = guests * menuRatePerPerson; // in 1,000 Tomans

  // Fixed ceremony amenities (in 1,000 Tomans)
  const flowersCost = flowers ? 35000 : 0;
  const fireworksCost = fireworks ? 18000 : 0;
  const djStageCost = djStage ? 22000 : 0;

  const totalCeremony = foodTotal + flowersCost + fireworksCost + djStageCost;
  const perGuestTotal = Math.round(totalCeremony / guests);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 text-yellow-400 rounded-xl">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: برآورد بودجه تالار و تشریفات عروسی</h4>
            <span className="text-xs text-neutral-400">محاسبه دقیق سرانه هر مهمان، منوی پذیرایی و امکانات تشریفات</span>
          </div>
        </div>
        <span className="text-xs font-mono text-yellow-400/90 bg-yellow-500/10 px-2.5 py-1 rounded-md">
          تست رایگان منوی غذا
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-300">تعداد مهمانان گرامی:</span>
              <span className="text-yellow-400 font-bold tabular-nums">{guests} نفر</span>
            </div>
            <input
              type="range"
              min="80"
              max="500"
              step="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-2">نوع منوی پذیرایی و شام:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'single', label: 'دیس‌پرس مجلسی', sub: '۲ مدل غذا + دسر' },
                { id: 'buffet', label: 'بوفه سلف‌سرویس', sub: '۵ مدل غذا + سالادبار' },
                { id: 'royal', label: 'سلطنتی رویال VIP', sub: '۸ مدل غذا و فینگرفود' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMenuType(m.id as any)}
                  className={`p-2 text-right rounded-xl border text-xs transition-all ${
                    menuType === m.id
                      ? 'border-yellow-500 bg-yellow-500/10 text-yellow-300 font-bold'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="text-xs text-neutral-200">{m.label}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{m.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-2">خدمات جانبی تشریفات:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-1.5 p-2 bg-neutral-800/60 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={flowers}
                  onChange={(e) => setFlowers(e.target.checked)}
                  className="rounded accent-yellow-500"
                />
                <span className="text-neutral-300">گل‌آرایی طبیعی</span>
              </label>
              <label className="flex items-center gap-1.5 p-2 bg-neutral-800/60 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={fireworks}
                  onChange={(e) => setFireworks(e.target.checked)}
                  className="rounded accent-yellow-500"
                />
                <span className="text-neutral-300">مه سرد و آتش‌بازی</span>
              </label>
              <label className="flex items-center gap-1.5 p-2 bg-neutral-800/60 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={djStage}
                  onChange={(e) => setDjStage(e.target.checked)}
                  className="rounded accent-yellow-500"
                />
                <span className="text-neutral-300">دی‌جی و سیستم نور</span>
              </label>
            </div>
          </div>
        </div>

        {/* Pricing & Visit Invitation */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-medium mb-1">کل برآورد تشریفات عروسی:</div>
            <div className="text-3xl font-black text-yellow-400 tabular-nums">
              {(Math.round(totalCeremony / 1000)).toLocaleString('fa-IR')}{' '}
              <span className="text-sm font-normal text-neutral-400">میلیون تومان</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              سرانه به ازای هر مهمان: {(perGuestTotal * 1000).toLocaleString('fa-IR')} تومان
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between text-neutral-400">
                <span>پذیرایی و شام ({guests} نفر):</span>
                <span>{(Math.round(foodTotal / 1000)).toLocaleString('fa-IR')} م.ت</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>تزئینات، گل‌آرایی و استیج:</span>
                <span>{(Math.round((flowersCost + fireworksCost + djStageCost) / 1000)).toLocaleString('fa-IR')} م.ت</span>
              </div>
              <div className="flex justify-between text-emerald-400/90 font-medium pt-1">
                <span>سفره عقد اختصاصی و ورودی باغ:</span>
                <span>رایگان (هدیه قرارداد)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {booked ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>دعوت‌نامه تست رایگان شام عروسی و بازدید باغ‌تالار به شماره شما پیامک شد!</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="شماره تماس زوجین (۰۹۱۲۳۴۵۶۷۸۹)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-yellow-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (phone.length >= 10) setBooked(true);
                    }}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    رزرو تست منو
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
