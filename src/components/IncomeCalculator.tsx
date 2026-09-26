import React, { useState } from 'react';
import { DollarSign, Award, ArrowUpRight } from 'lucide-react';

export const IncomeCalculator: React.FC = () => {
  const [projectsPerMonth, setProjectsPerMonth] = useState<number>(4);
  const [feePerProjectMillion, setFeePerProjectMillion] = useState<number>(8); // 8M Tomans
  const [supportFeeMillion, setSupportFeeMillion] = useState<number>(3); // 3M monthly maintenance

  const monthlyProjectIncome = projectsPerMonth * feePerProjectMillion;
  const totalMonthlyEarnings = monthlyProjectIncome + supportFeeMillion;
  const totalYearlyEarnings = totalMonthlyEarnings * 12;

  return (
    <section className="py-16 border-b border-neutral-800/80 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
          <DollarSign className="w-3.5 h-3.5 text-amber-500" />
          <span>ماشین حساب برآورد پتانسیل درآمدزایی</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-neutral-100">
          با ساخت این ابزارها در گوگل استودیو ماهانه چقدر می‌توانید درآورید؟
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
          اگر تنها برای ۴ کسب‌وکار در دیوار (مثلاً ۲ دفتر بازسازی و ۲ شرکت باربری یا سالن زیبایی) ابزار آنلاین بسازید:
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-neutral-300">تعداد پروژه‌های تحویلی در ماه:</span>
                <span className="text-amber-400 font-bold tabular-nums text-sm">{projectsPerMonth} پروژه</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={projectsPerMonth}
                onChange={(e) => setProjectsPerMonth(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>۱ عدد</span>
                <span>۶ عدد</span>
                <span>۱۲ عدد</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-neutral-300">میانگین تعرفه هر ابزار:</span>
                <span className="text-amber-400 font-bold tabular-nums text-sm">{feePerProjectMillion} میلیون تومان</span>
              </div>
              <input
                type="range"
                min="4"
                max="25"
                step="1"
                value={feePerProjectMillion}
                onChange={(e) => setFeePerProjectMillion(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>۴ میلیون</span>
                <span>۱۴ میلیون</span>
                <span>۲۵ میلیون</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-neutral-300">درآمد ماهانه پشتیبانی و شارژ:</span>
                <span className="text-amber-400 font-bold tabular-nums text-sm">{supportFeeMillion} میلیون تومان</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={supportFeeMillion}
                onChange={(e) => setSupportFeeMillion(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>برآورد درآمد خالص شما از گوگل استودیو:</span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tabular-nums my-3">
                {totalMonthlyEarnings.toLocaleString('fa-IR')}{' '}
                <span className="text-base font-normal text-neutral-400">میلیون تومان در ماه</span>
              </div>

              <div className="text-xs text-neutral-400">
                معادل تقریباً {totalYearlyEarnings.toLocaleString('fa-IR')} میلیون تومان در سال با صرف تنها چند ساعت زمان در هفته!
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-800 grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">زمان ساخت هر پروژه در استودیو:</span>
                  <span className="text-amber-300 font-bold mt-1 block">۳۰ الی ۴۵ دقیقه</span>
                </div>
                <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">هزینه سرور و هاستینگ:</span>
                  <span className="text-emerald-400 font-bold mt-1 block">صفر تومان (هاست رایگان ابری)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>با پرامپت‌های طلایی آماده داخل همین صفحه، کار شما فقط کپی و تحویل است.</span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                شروع از امروز <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
