import React, { useState } from 'react';
import { Calculator, Copy, Check } from 'lucide-react';

export const TaxSalarySimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posTax' | 'laborSalary'>('posTax');
  
  // Note 100 POS Tax state
  const [posTurnoverBillion, setPosTurnoverBillion] = useState<number>(3.5); // 3.5 Billion Tomans
  const [profitMarginPercent, setProfitMarginPercent] = useState<number>(12); // 12% guild profit ratio
  
  // Labor Salary state
  const [baseSalaryMillion, setBaseSalaryMillion] = useState<number>(11.5); // 11.5 Million Tomans base
  const [childrenCount, setChildrenCount] = useState<number>(1);
  const [housingAllowanceMillion, setHousingAllowanceMillion] = useState<number>(0.9); // 900k tomans
  const [foodAllowanceMillion, setFoodAllowanceMillion] = useState<number>(1.4); // 1.4M tomans

  const [copied, setCopied] = useState<boolean>(false);

  // Calculations:
  // Taxable profit = turnover * profitMargin
  // Tax free exemption ceiling for 1404 = ~144 Million Tomans per year
  const turnoverMillion = posTurnoverBillion * 1000;
  const taxableProfitMillion = turnoverMillion * (profitMarginPercent / 100);
  const exemptCeilingMillion = 144;
  const netTaxableBase = Math.max(0, taxableProfitMillion - exemptCeilingMillion);
  
  // Tiered calculation (15% up to 200M, 20% next)
  let estimatedTaxMillion = 0;
  if (netTaxableBase <= 200) {
    estimatedTaxMillion = netTaxableBase * 0.15;
  } else {
    estimatedTaxMillion = (200 * 0.15) + ((netTaxableBase - 200) * 0.20);
  }

  // Labor Salary calculations
  const childAllowance = childrenCount * 0.72; // ~720k per child
  const grossSalary = baseSalaryMillion + housingAllowanceMillion + foodAllowanceMillion + childAllowance;
  const workerInsurance7 = grossSalary * 0.07;
  const employerInsurance23 = grossSalary * 0.23;
  const netTakeHome = grossSalary - workerInsurance7;

  const copyReport = () => {
    let text = '';
    if (activeTab === 'posTax') {
      text = `گزارش برآورد مالیات تبصره ماده ۱۰۰ اصناف:
گردش سالانه کارتخوان: ${posTurnoverBillion} میلیارد تومان
ضریب سود صنفی: ${profitMarginPercent}٪
سود مشمول: ${taxableProfitMillion.toFixed(1)} میلیون تومان
معافیت سالانه قانون بودجه: ${exemptCeilingMillion} میلیون تومان
مالیات نمایشی: ${estimatedTaxMillion.toFixed(1)} میلیون تومان`;
    } else {
      text = `فیش برآورد حقوق و بیمه قانون کار:
جمع کل ناخالص دریافتی: ${grossSalary.toFixed(2)} میلیون تومان
سهم بیمه کارگر (۷٪): ${workerInsurance7.toFixed(2)} میلیون تومان
خالص دریافتی کارمند: ${netTakeHome.toFixed(2)} میلیون تومان
سهم بیمه کارفرما (۲۳٪): ${employerInsurance23.toFixed(2)} میلیون تومان`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/10 text-violet-400 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: محاسبه‌گر مالیات اصناف و حقوق قانون کار</h4>
            <span className="text-xs text-neutral-400">محاسبه دقیق تبصره ماده ۱۰۰، بیمه تامین اجتماعی و مالیات حقوق</span>
          </div>
        </div>
        
        <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab('posTax')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'posTax' ? 'bg-violet-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            مالیات کارتخوان (ماده ۱۰۰)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('laborSalary')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'laborSalary' ? 'bg-violet-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            حقوق و بیمه کارگری
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'posTax' ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">گردش سالانه کارتخوان (پوز و درگاه):</span>
                <span className="text-violet-400 font-bold tabular-nums">{posTurnoverBillion} میلیارد تومان</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="18"
                step="0.5"
                value={posTurnoverBillion}
                onChange={(e) => setPosTurnoverBillion(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>۵۰۰ میلیون</span>
                <span>۹ میلیارد</span>
                <span>۱۸ میلیارد (سقف تبصره)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">ضریب سود صنفی اینتاکد (%):</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 8, title: '۸٪ (سوپرمارکت و مواد غذایی)' },
                  { rate: 12, title: '۱۲٪ (پوشاک و لوازم خانگی)' },
                  { rate: 20, title: '۲۰٪ (خدماتی و تخصصی)' },
                ].map((s) => (
                  <button
                    key={s.rate}
                    type="button"
                    onClick={() => setProfitMarginPercent(s.rate)}
                    className={`p-2 text-right rounded-lg border text-xs ${
                      profitMarginPercent === s.rate
                        ? 'border-violet-500 bg-violet-500/10 text-violet-300 font-bold'
                        : 'border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs text-neutral-200">{s.rate} درصد</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-800">
              طبق دستورالعمل تبصره ماده ۱۰۰: مودیانی که مجموع فروش کالا و خدمات آنها تا سقف قانونی باشد، از تسلیم اظهارنامه و نگهداری اسناد و دفاتر معاف بوده و مالیات مقطوع پرداخت می‌نمایند.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">پایه حقوق ماهانه:</span>
                <span className="text-violet-400 font-bold tabular-nums">{baseSalaryMillion} میلیون تومان</span>
              </div>
              <input
                type="range"
                min="9"
                max="25"
                step="0.5"
                value={baseSalaryMillion}
                onChange={(e) => setBaseSalaryMillion(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-neutral-400 block mb-1">تعداد فرزند:</span>
                <select
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-100"
                >
                  <option value={0}>بدون فرزند</option>
                  <option value={1}>۱ فرزند</option>
                  <option value={2}>۲ فرزند</option>
                  <option value={3}>۳ فرزند یا بیشتر</option>
                </select>
              </div>
              <div>
                <span className="text-neutral-400 block mb-1">بن و مسکن:</span>
                <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-300">
                  ۲.۳ میلیون تومان
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculation Result */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            {activeTab === 'posTax' ? (
              <>
                <div className="text-xs text-neutral-400 font-medium mb-1">مالیات نمایشی سالانه:</div>
                <div className="text-3xl font-black text-violet-400 tabular-nums">
                  {(Math.round(estimatedTaxMillion * 10) / 10).toLocaleString('fa-IR')}{' '}
                  <span className="text-sm font-normal text-neutral-400">میلیون تومان</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between text-neutral-400">
                    <span>سود مشمول مالیات ({profitMarginPercent}٪):</span>
                    <span>{(taxableProfitMillion).toFixed(1)} م.ت</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>معافیت معیشتی پایه:</span>
                    <span>{exemptCeilingMillion} م.ت</span>
                  </div>
                  <div className="flex justify-between text-emerald-400/90 font-medium pt-1">
                    <span>امکان تقسیط مالیات در سامانه:</span>
                    <span>تا ۴ قسط بدون سود</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-neutral-400 font-medium mb-1">خالص دریافتی کارمند (پس از کسر بیمه):</div>
                <div className="text-3xl font-black text-violet-400 tabular-nums">
                  {(Math.round(netTakeHome * 1000000)).toLocaleString('fa-IR')}{' '}
                  <span className="text-sm font-normal text-neutral-400">تومان</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between text-neutral-400">
                    <span>ناخالص حقوق و مزایا:</span>
                    <span>{(Math.round(grossSalary * 1000000)).toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>کسر سهم بیمه کارگر (۷٪):</span>
                    <span>{(Math.round(workerInsurance7 * 1000000)).toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="flex justify-between text-amber-400/90 font-medium pt-1">
                    <span>سهم بیمه کارفرما (۲۳٪):</span>
                    <span>{(Math.round(employerInsurance23 * 1000000)).toLocaleString('fa-IR')} ت</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={copyReport}
              className="w-full py-2.5 bg-violet-500 hover:bg-violet-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'متن گزارش کپی شد!' : 'کپی فیش و خلاصه گزارش'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
