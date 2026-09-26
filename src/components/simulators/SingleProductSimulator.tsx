import React, { useState } from 'react';
import { ShoppingBag, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SingleProductSimulator: React.FC = () => {
  const [ordered, setOrdered] = useState<boolean>(false);
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [buyerCity, setBuyerCity] = useState<string>('تهران');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: لندینگ پیج فروشگاهی تک‌محصولی با تسویه‌حساب سریع</h4>
            <span className="text-xs text-neutral-400">فروش مستقیم محصولات پرتقاضای دیوار بدون نیاز به اینماد و سایت‌های پیچیده</span>
          </div>
        </div>
        <span className="text-xs font-mono text-orange-400/90 bg-orange-500/10 px-2.5 py-1 rounded-md">
          تایمر تخفیف: ۰۳:۴۲:۱۹
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Visual & Pitch */}
        <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-[11px] text-neutral-400 mr-1.5">(۴.۹ از ۵ · ۳۸۲ نظر خریدار)</span>
              </div>
              <h5 className="font-bold text-sm text-neutral-100">
                پک اختصاصی ادکلن فرانسوی اکستریت د پرفیوم (ماندگاری ۴۸ ساعته)
              </h5>
            </div>
          </div>

          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-2xl font-black text-orange-400 tabular-nums">۸۹۰,۰۰۰ تومان</span>
            <span className="text-xs text-neutral-500 line-through tabular-nums">۱,۴۵۰,۰۰۰ تومان</span>
            <span className="text-[11px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded">
              ۳۸٪ تخفیف انبار
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ضمانت اصالت و بازگشت وجه ۷ روزه بدون قید و شرط</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>امکان تست رایگان درب منزل پیش از پرداخت</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ارسال فوری با پست پیشتاز و پیک درون‌شهری</span>
            </div>
          </div>
        </div>

        {/* 1-Step Checkout Form */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-200 mb-3 flex items-center justify-between">
              <span>فرم ثبت سفارش فوری در ۱ مرحله:</span>
              <span className="text-[11px] text-neutral-400 font-normal">بدون نیاز به ثبت‌نام</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <input
                type="text"
                placeholder="نام و نام خانوادگی خریدار"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-orange-500"
              />
              <input
                type="tel"
                placeholder="شماره موبایل جهت هماهنگی و کد پیگیری"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                dir="ltr"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-orange-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="شهر محل سکونت"
                  value={buyerCity}
                  onChange={(e) => setBuyerCity(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-orange-500"
                />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-2 text-neutral-100"
                >
                  <option value="cod">پرداخت درب منزل</option>
                  <option value="card">کارت به کارت با تخفیف</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {ordered ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>سفارش با موفقیت ثبت شد! پیامک تایید و کد رهگیری پستی به شماره شما ارسال گردید.</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (buyerPhone.length >= 10) setOrdered(true);
                }}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                ثبت سفارش نهایی و ارسال فوری (۸۹۰,۰۰۰ تومان)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
