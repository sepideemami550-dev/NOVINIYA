import React from 'react';
import { BarChart3, TrendingUp, Users, CheckCircle, XCircle } from 'lucide-react';

export const MarketAnalysisSection: React.FC = () => {
  return (
    <section id="market-insights-section" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
          <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
          <span>تحلیل آماری و رفتارشناسی کاربران دیوار ایران</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-neutral-100">
          چرا این ۱۰ خدمت بالاترین زنگ‌خور و درآمد را در دیوار دارند؟
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          کاربران دیوار روزانه میلیون‌ها بار کلمات مربوط به خدمات را جستجو می‌کنند. درک روانشناسی مخاطب ایرانی نشان می‌دهد چه عواملی یک آگهی ساده را به یک ماشین تولید زنگ‌خور تبدیل می‌کند.
        </p>

        {/* 3 Pillars of High-Converting Divar Services */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">۱. از بین بردن ترس دبه در قیمت</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              بزرگ‌ترین وحشت متقاضیان خدمات در ایران (خصوصاً بازسازی، اسباب‌کشی و نظافت) این است که با پیمانکار تماس بگیرند و سر قیمت غافلگیر شوند. محاسبه‌گر آنلاین پیش از هر مکالمه‌ای خیال مشتری را راحت می‌کند.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">۲. فیلتر کردن تماس‌های وقت‌تلف‌کن</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              کسبه و متخصصان در دیوار از پاسخ دادن مکرر به سوال تکراری «قیمتش چنده؟» خسته شده‌اند. با ارائه لینک استودیو، مشتری با دیدن قیمت دقیق تماس می‌گیرد و تماس به جای استعلام، به قرارداد ختم می‌شود.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-100">۳. سرعت و پرستیژ گوگل استودیو</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              ساخت سایت‌های وردپرسی روزها زمان می‌برد و هزینه هاست میلیونی دارد. با Google AI Studio می‌توانید در ۳۰ تا ۴۵ دقیقه وب‌اپی با سرعت بارگذاری آنی، بدون باگ و با گرافیک فوق‌العاده مدرن تحویل دهید.
            </p>
          </div>
        </div>

        {/* Funnel Comparison Table */}
        <div className="mt-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-neutral-100 mb-4">
            مقایسه عملکرد: آگهی متنی سنتی در برابر آگهی مجهز به وب‌اپ گوگل استودیو
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-neutral-950/60 rounded-xl border border-red-500/20 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-4 h-4" />
                <span>روش سنتی (متن خشک در دیوار)</span>
              </div>
              <ul className="space-y-2 text-neutral-400 leading-relaxed">
                <li>• کاربر متن طولانی را نمی‌خواند و آگهی را رد می‌کند.</li>
                <li>• زنگ می‌زند فقط برای پرسیدن قیمت و بلافاصله قطع می‌کند.</li>
                <li>• روزانه ده‌ها تماس بدون خروجی مالی ایجاد می‌شود.</li>
                <li>• هیچ شماره تماسی از کاربر ذخیره نمی‌شود.</li>
                <li>• تبدیل ۱۰۰ بازدید به حداکثر ۲ تا ۵ تماس سرگردان.</li>
              </ul>
            </div>

            <div className="p-4 bg-neutral-950/60 rounded-xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>روش هوشمند (ابزار تعاملی گوگل استودیو)</span>
              </div>
              <ul className="space-y-2 text-neutral-300 leading-relaxed">
                <li>• کاربر با ابزار بازی می‌کند، متراژ یا اقلام را وارد می‌کند و لذت می‌برد.</li>
                <li>• پیش‌فاکتور شفاف می‌بیند و با اطمینان کامل تماس می‌گیرد.</li>
                <li>• برای دریافت فایل یا ثبت سفارش شماره موبایلش را وارد می‌کند.</li>
                <li>• پرستیژ و کلاس کاری کسب‌وکار در شهر تا ۵ برابر بالا می‌رود.</li>
                <li>• تبدیل ۱۰۰ بازدید به ۱۵ تا ۳۰ تماس هدفمند و آماده واریز بیعانه!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
