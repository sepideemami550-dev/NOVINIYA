import React, { useState } from 'react';
import { Building, Copy, Check } from 'lucide-react';

export const RealEstateSimulator: React.FC = () => {
  const [tab, setTab] = useState<'commission' | 'rentMortgage'>('commission');
  
  // Commission state
  const [dealType, setDealType] = useState<'buy' | 'rent'>('buy');
  const [totalPriceBillion, setTotalPriceBillion] = useState<number>(4.5); // 4.5 Billion Tomans
  
  // Rent conversion state
  const [rahnMillion, setRahnMillion] = useState<number>(600); // 600 Million Tomans
  const [conversionRatePercent, setConversionRatePercent] = useState<number>(3); // 3%
  const [targetRahn, setTargetRahn] = useState<number>(300); // 300 Million Tomans

  const [copied, setCopied] = useState<boolean>(false);

  // Buy Commission calculation: 0.25% of total price from each party + 10% VAT
  const rawCommissionEachParty = (totalPriceBillion * 1000) * 0.0025; // in Million Tomans
  const vatAmount = rawCommissionEachParty * 0.1;
  const totalCommissionWithVat = rawCommissionEachParty + vatAmount;

  // Rent conversion: difference * rate
  const rahnDifference = Math.max(0, rahnMillion - targetRahn);
  const monthlyRentTomans = (rahnDifference * 1000000) * (conversionRatePercent / 100);

  const copySummary = () => {
    let text = '';
    if (tab === 'commission') {
      text = `گزارش محاسبه کمیسیون مبایعه‌نامه:
ارزش کل ملک: ${totalPriceBillion} میلیارد تومان
سهم کمیسیون هر طرف: ${rawCommissionEachParty.toFixed(2)} میلیون تومان
مالیات بر ارزش افزوده: ${vatAmount.toFixed(2)} میلیون تومان
مبلغ نهایی قابل پرداخت هر طرف: ${totalCommissionWithVat.toFixed(2)} میلیون تومان`;
    } else {
      text = `گزارش تبدیل رهن به اجاره:
رهن کامل: ${rahnMillion} میلیون تومان
رهن پرداختی: ${targetRahn} میلیون تومان
اجاره ماهانه (نرخ ${conversionRatePercent}٪): ${(monthlyRentTomans).toLocaleString('fa-IR')} تومان`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: محاسبه‌گر کمیسیون املاک و تبدیل رهن</h4>
            <span className="text-xs text-neutral-400">فرمول قانونی مصوب اتحادیه برای پایان دادن به بحث‌ها سر جلسه قرارداد</span>
          </div>
        </div>
        
        {/* Tab switch */}
        <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setTab('commission')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              tab === 'commission' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            کمیسیون مبایعه‌نامه
          </button>
          <button
            type="button"
            onClick={() => setTab('rentMortgage')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              tab === 'rentMortgage' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            تبدیل رهن به اجاره
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tab === 'commission' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">نوع معامله:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDealType('buy')}
                  className={`p-2 rounded-lg border text-xs text-center ${
                    dealType === 'buy'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  خرید و فروش ملک
                </button>
                <button
                  type="button"
                  onClick={() => setDealType('rent')}
                  className={`p-2 rounded-lg border text-xs text-center ${
                    dealType === 'rent'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  رهن و اجاره
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-neutral-300">مبلغ کل قرارداد معامله:</span>
                <span className="text-emerald-400 font-bold tabular-nums">{totalPriceBillion} میلیارد تومان</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="30"
                step="0.5"
                value={totalPriceBillion}
                onChange={(e) => setTotalPriceBillion(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>۵۰۰ میلیون</span>
                <span>۱۵ میلیارد</span>
                <span>۳۰ میلیارد</span>
              </div>
            </div>
            
            <p className="text-[11px] text-neutral-400 leading-relaxed bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-800">
              طبق مصوبه اتحادیه مشاوران املاک: حق کمیسیون در معاملات خرید و فروش ۰.۲۵٪ از کل ثمن معامله از هر طرف قرارداد به علاوه ۱۰٪ مالیات بر ارزش افزوده قانونی محاسبه می‌گردد.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">مبلغ رهن کامل درخواستی:</span>
                <span className="text-emerald-400 font-bold tabular-nums">{rahnMillion} میلیون تومان</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={rahnMillion}
                onChange={(e) => setRahnMillion(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">مبلغ رهن پرداختی مستاجر:</span>
                <span className="text-emerald-400 font-bold tabular-nums">{targetRahn} میلیون تومان</span>
              </div>
              <input
                type="range"
                min="0"
                max={rahnMillion}
                step="50"
                value={targetRahn}
                onChange={(e) => setTargetRahn(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">درصد تبدیل عرف بازار:</label>
              <div className="grid grid-cols-3 gap-2">
                {[2.5, 3, 3.5].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setConversionRatePercent(rate)}
                    className={`py-1.5 text-xs rounded-lg border ${
                      conversionRatePercent === rate
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {rate} درصد (عرف ۱۰۰ به {rate})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result Card */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            {tab === 'commission' ? (
              <>
                <div className="text-xs text-neutral-400 font-medium mb-1">سهم کمیسیون هر طرف (خریدار / فروشنده):</div>
                <div className="text-3xl font-black text-emerald-400 tabular-nums">
                  {(totalCommissionWithVat * 1000000).toLocaleString('fa-IR')}{' '}
                  <span className="text-sm font-normal text-neutral-400">تومان</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between text-neutral-400">
                    <span>کمیسیون خالص (۰.۲۵٪):</span>
                    <span>{(rawCommissionEachParty * 1000000).toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>مالیات بر ارزش افزوده (۱۰٪):</span>
                    <span>{(vatAmount * 1000000).toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="flex justify-between text-emerald-400/90 font-medium pt-2 border-t border-neutral-800/80">
                    <span>مجموع دریافتی آژانس از دو طرف:</span>
                    <span>{(totalCommissionWithVat * 2 * 1000000).toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-neutral-400 font-medium mb-1">اجاره بهای ماهانه پیشنهادی:</div>
                <div className="text-3xl font-black text-emerald-400 tabular-nums">
                  {monthlyRentTomans.toLocaleString('fa-IR')}{' '}
                  <span className="text-sm font-normal text-neutral-400">تومان در ماه</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between text-neutral-400">
                    <span>مبلغ ودیعه توافقی:</span>
                    <span>{targetRahn} میلیون تومان</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>مبلغ رهن تبدیل‌شده:</span>
                    <span>{rahnDifference} میلیون تومان</span>
                  </div>
                  <div className="flex justify-between text-emerald-400/90 font-medium pt-2 border-t border-neutral-800/80">
                    <span>فرمول:</span>
                    <span>هر ۱۰۰ میلیون رهن = ۳ میلیون اجاره</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={copySummary}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'متن گزارش کپی شد!' : 'کپی متن گزارش برای پیامک یا جلسه'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
