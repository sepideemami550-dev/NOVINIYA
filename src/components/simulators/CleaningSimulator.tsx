import React, { useState } from 'react';
import { Sparkle, CheckCircle2, PhoneCall } from 'lucide-react';

export const CleaningSimulator: React.FC = () => {
  const [cleanerType, setCleanerType] = useState<'female' | 'male'>('female');
  const [hours, setHours] = useState<number>(4);
  const [carpetMetrage, setCarpetMetrage] = useState<number>(18); // 18 sqm
  const [sofaSeats, setSofaSeats] = useState<number>(7); // 7 seats
  const [staircase, setStaircase] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [ordered, setOrdered] = useState<boolean>(false);

  // Pricing (in 1,000 Tomans)
  const hourlyRate = cleanerType === 'female' ? 140 : 120;
  const cleaningWage = hours * hourlyRate;
  const carpetWashingRatePerSqm = 35; // 35k per sqm
  const carpetPrice = carpetMetrage * carpetWashingRatePerSqm;
  const sofaCleaningPrice = sofaSeats * 90; // 90k per seat
  const staircasePrice = staircase ? 450 : 0;

  const total = cleaningWage + carpetPrice + sofaCleaningPrice + staircasePrice;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl">
            <Sparkle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: محاسبه‌گر هزینه نظافت منزل و قالیشویی</h4>
            <span className="text-xs text-neutral-400">محاسبه آنلاین ساعت کاری، شستشوی مبل و قالی با اعزام فوری نیرو</span>
          </div>
        </div>
        <span className="text-xs font-mono text-teal-400/90 bg-teal-500/10 px-2.5 py-1 rounded-md">
          شوینده‌های درجه ۱ نانو
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-2">انتخاب نیروی نظافتچی:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCleanerType('female')}
                className={`p-2.5 text-right rounded-xl border text-xs ${
                  cleanerType === 'female'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-300 font-bold'
                    : 'border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="text-neutral-200">نظافتچی خانم</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">ویژه ظریف‌کاری، آشپزخانه و گردگیری</div>
              </button>
              <button
                type="button"
                onClick={() => setCleanerType('male')}
                className={`p-2.5 text-right rounded-xl border text-xs ${
                  cleanerType === 'male'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-300 font-bold'
                    : 'border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="text-neutral-200">نظافتچی آقا</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">ویژه دیوارشویی، راه‌پله و کارهای سنگین</div>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-300">مدت زمان نظافت:</span>
              <span className="text-teal-400 font-bold tabular-nums">{hours} ساعت</span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-300">متراژ فرش جهت قالیشویی مکانیزه:</span>
              <span className="text-teal-400 font-bold tabular-nums">{carpetMetrage} متر مربع</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="6"
              value={carpetMetrage}
              onChange={(e) => setCarpetMetrage(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-300">شستشوی مبل در محل:</span>
            <div className="flex gap-1.5">
              {[0, 7, 9].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setSofaSeats(cnt)}
                  className={`px-2.5 py-1 rounded border ${
                    sofaSeats === cnt
                      ? 'border-teal-400 bg-teal-500/20 text-teal-200 font-bold'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  {cnt === 0 ? 'ندارم' : `${cnt} نفره`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total & Booking */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-medium mb-1">هزینه نهایی خدمات:</div>
            <div className="text-3xl font-black text-teal-400 tabular-nums">
              {(total * 1000).toLocaleString('fa-IR')}{' '}
              <span className="text-sm font-normal text-neutral-400">تومان</span>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between text-neutral-400">
                <span>دستمزد نظافت ({hours} ساعت):</span>
                <span>{(cleaningWage * 1000).toLocaleString('fa-IR')} ت</span>
              </div>
              {carpetMetrage > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>قالیشویی مکانیزه ({carpetMetrage} متر):</span>
                  <span>{(carpetPrice * 1000).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              {sofaSeats > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>خشکشویی مبل ({sofaSeats} نفره با دستگاه):</span>
                  <span>{(sofaCleaningPrice * 1000).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {ordered ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>درخواست ثبت شد! کارشناس اعزام نیرو تا ۱۰ دقیقه دیگر هماهنگ می‌کند.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="شماره موبایل (۰۹۱۲۳۴۵۶۷۸۹)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (phone.length >= 10) setOrdered(true);
                    }}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    اعزام فوری
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
