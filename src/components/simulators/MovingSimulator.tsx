import React, { useState } from 'react';
import { Truck, CheckCircle2, PhoneCall } from 'lucide-react';

export const MovingSimulator: React.FC = () => {
  const [vehicle, setVehicle] = useState<'khavar' | 'neisan' | 'van'>('khavar');
  const [originFloor, setOriginFloor] = useState<number>(2);
  const [originElevator, setOriginElevator] = useState<boolean>(true);
  const [destFloor, setDestFloor] = useState<number>(3);
  const [destElevator, setDestElevator] = useState<boolean>(false);
  const [workersCount, setWorkersCount] = useState<number>(4);
  const [hasSideBySide, setHasSideBySide] = useState<boolean>(true);
  const [hasPiano, setHasPiano] = useState<boolean>(false);
  const [packingBox, setPackingBox] = useState<boolean>(true);
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [booked, setBooked] = useState<boolean>(false);

  // Price Calculation (in 1,000 Tomans)
  // Vehicle base for 3 hours
  const vehicleBase = vehicle === 'khavar' ? 1800 : vehicle === 'neisan' ? 1100 : 800;
  // Worker wage base (3 hours each)
  const workerBase = workersCount * 450;
  // Floor charges if no elevator
  const originFloorCharge = originElevator ? 0 : originFloor * 120 * workersCount;
  const destFloorCharge = destElevator ? 0 : destFloor * 120 * workersCount;
  // Heavy item charges
  const heavyItemsCharge = (hasSideBySide ? 400 : 0) + (hasPiano ? 900 : 0);
  const packingCharge = packingBox ? 750 : 0;

  const totalCost = vehicleBase + workerBase + originFloorCharge + destFloorCharge + heavyItemsCharge + packingCharge;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: محاسبه‌گر دقیق هزینه اسباب‌کشی</h4>
            <span className="text-xs text-neutral-400">قیمت قطعی و تضمینی بدون دبه و افزایش کرایه پای ماشین</span>
          </div>
        </div>
        <span className="text-xs font-mono text-sky-400/90 bg-sky-500/10 px-2.5 py-1 rounded-md">
          نرخ مصوب اتحادیه ۱۴۰۴
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Vehicle Selector */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-2">نوع خودروی باربری:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'khavar', title: 'خاور مسقف پتودار', sub: '۶ متری ویژه اثاثیه' },
                { id: 'neisan', title: 'نیسان بار کفی‌دار', sub: 'بارهای سبک و متوسط' },
                { id: 'van', title: 'وانت پیکان', sub: 'خرده‌بار و بارهای کم' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicle(v.id as any)}
                  className={`p-2.5 text-right rounded-xl border text-xs transition-all ${
                    vehicle === v.id
                      ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-bold'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs text-neutral-200">{v.title}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{v.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Floors & Elevators */}
          <div className="grid grid-cols-2 gap-3 bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/80">
            <div>
              <span className="text-xs font-medium text-neutral-300 block mb-1">طبقه مبدأ:</span>
              <select
                value={originFloor}
                onChange={(e) => setOriginFloor(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-1.5 text-xs text-neutral-100"
              >
                <option value={0}>همکف</option>
                <option value={1}>طبقه ۱</option>
                <option value={2}>طبقه ۲</option>
                <option value={3}>طبقه ۳</option>
                <option value={4}>طبقه ۴ یا بالاتر</option>
              </select>
              <label className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={originElevator}
                  onChange={(e) => setOriginElevator(e.target.checked)}
                  className="rounded accent-sky-500"
                />
                آسانسور باربری دارد
              </label>
            </div>

            <div>
              <span className="text-xs font-medium text-neutral-300 block mb-1">طبقه مقصد:</span>
              <select
                value={destFloor}
                onChange={(e) => setDestFloor(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-1.5 text-xs text-neutral-100"
              >
                <option value={0}>همکف</option>
                <option value={1}>طبقه ۱</option>
                <option value={2}>طبقه ۲</option>
                <option value={3}>طبقه ۳</option>
                <option value={4}>طبقه ۴ یا بالاتر</option>
              </select>
              <label className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={destElevator}
                  onChange={(e) => setDestElevator(e.target.checked)}
                  className="rounded accent-sky-500"
                />
                آسانسور باربری دارد
              </label>
            </div>
          </div>

          {/* Workers & Heavy items */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-300">تعداد کارگران ماهر:</span>
              <span className="text-sky-400 font-bold tabular-nums">{workersCount} نفر</span>
            </div>
            <input
              type="range"
              min="2"
              max="6"
              step="1"
              value={workersCount}
              onChange={(e) => setWorkersCount(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <label className="flex items-center gap-1.5 p-2 bg-neutral-800/60 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={hasSideBySide}
                onChange={(e) => setHasSideBySide(e.target.checked)}
                className="rounded accent-sky-500"
              />
              <span className="text-neutral-300">یخچال ساید بای ساید</span>
            </label>
            <label className="flex items-center gap-1.5 p-2 bg-neutral-800/60 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={hasPiano}
                onChange={(e) => setHasPiano(e.target.checked)}
                className="rounded accent-sky-500"
              />
              <span className="text-neutral-300">پیانو / گاوصندوق</span>
            </label>
            <label className="flex items-center gap-1.5 p-2 bg-neutral-800/60 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={packingBox}
                onChange={(e) => setPackingBox(e.target.checked)}
                className="rounded accent-sky-500"
              />
              <span className="text-neutral-300">پکیج کارتن و بابل‌رپ</span>
            </label>
          </div>
        </div>

        {/* Total Box */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-medium mb-1">کرایه قطعی و نهایی اسباب‌کشی:</div>
            <div className="text-3xl font-black text-sky-400 tabular-nums">
              {(totalCost * 1000).toLocaleString('fa-IR')}{' '}
              <span className="text-sm font-normal text-neutral-400">تومان</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              مدت زمان پایه: ۳ ساعت کامل از زمان رسیدن ماشین
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between text-neutral-400">
                <span>خودرو ({vehicle === 'khavar' ? 'خاور مسقف' : vehicle === 'neisan' ? 'نیسان' : 'وانت'}):</span>
                <span>{(vehicleBase * 1000).toLocaleString('fa-IR')} ت</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>دستمزد {workersCount} نفر کارگر:</span>
                <span>{(workerBase * 1000).toLocaleString('fa-IR')} ت</span>
              </div>
              {(originFloorCharge > 0 || destFloorCharge > 0) && (
                <div className="flex justify-between text-amber-400/90">
                  <span>طبقات بدون آسانسور:</span>
                  <span>{((originFloorCharge + destFloorCharge) * 1000).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              {heavyItemsCharge > 0 && (
                <div className="flex justify-between text-sky-400/90">
                  <span>وسایل سنگین و حساس:</span>
                  <span>{(heavyItemsCharge * 1000).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {booked ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>سفارش ثبت شد! راننده خاور جهت تایید ساعت و آدرس دقیق با شما تماس می‌گیرد.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-neutral-300 block">
                  رزرو فوری خاور و ارسال پیش‌فاکتور به گوشی:
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    dir="ltr"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (leadPhone.length >= 10) setBooked(true);
                    }}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    رزرو قطعی
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
