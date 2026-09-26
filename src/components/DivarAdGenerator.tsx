import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { Zap, Copy, Check, Sparkles } from 'lucide-react';

export const DivarAdGenerator: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0].id);
  const [city, setCity] = useState<string>('تهران');
  const [businessName, setBusinessName] = useState<string>('مهندس رادمنش');
  const [phone, setPhone] = useState<string>('۰۹۱۲۳۴۵۶۷۸۹');
  const [copied, setCopied] = useState<boolean>(false);

  const activeService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  // Customized title and description
  const customTitle = `${activeService.adCopy.suggestedTitle} در ${city}`;
  const customDescription = `به نام خدا
ارائه خدمات تخصصی در سراسر ${city} و حومه

${activeService.adCopy.description.replace('[نام شهر]', city).replace('[نام برند]', businessName)}

📞 شماره تماس مستقیم و مشاوره رایگان: ${phone}
پاسخگویی شبانه‌روزی و اعزام کارشناس به محل شما در ${city}.`;

  const copyAdContent = () => {
    const fullAd = `عنوان آگهی:\n${customTitle}\n\nتوضیحات:\n${customDescription}\n\nبرچسب‌ها:\n${activeService.adCopy.tags.map((t) => `#${t}`).join(' ')}`;
    navigator.clipboard.writeText(fullAd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ad-generator-section" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>جعبه‌ابزار تولید آگهی دیوار با بالاترین زنگ‌خور</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-neutral-100">
          سازنده آگهی دیوار مهندسی‌شده (آماده کپی و انتشار)
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
          با وارد کردن نام شهر و شماره تماس خود، یک متن آگهی دیوار استاندارد با کلمات کلیدی پرجستجو و قلاب‌های روانی قوی ایجاد کنید که تماس‌های هدفمند جذب کند.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">انتخاب خدمت هدف:</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
              >
                {servicesData.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.rank}. {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">شهر محل آگهی:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="مثلاً: تهران، مشهد، کرج..."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">نام شما یا برند کسب‌وکار:</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="مثلاً: دکوراسیون رادمنش یا شرکت باربری البرز"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">شماره تماس جهت درج در آگهی:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
              <span className="text-amber-400 font-medium block mb-1">نکات طلایی انتشار در دیوار:</span>
              <div>• آگهی را در ساعات اوج (۱۰ تا ۱۳ یا ۱۹ تا ۲۲) منتشر کنید.</div>
              <div>• عکس اول آگهی حتماً پیش‌نمایش تمیز ابزار آنلاین باشد.</div>
              <div>• لینک محاسبه‌گر را در چت دیوار برای مشتریان بفرستید.</div>
            </div>
          </div>

          {/* Generated Preview */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>پیش‌نمایش آگهی دیوار برای {city}:</span>
                </div>
                <button
                  type="button"
                  onClick={copyAdContent}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'کل آگهی کپی شد!' : 'کپی کل متن آگهی'}</span>
                </button>
              </div>

              {/* Title */}
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">عنوان آگهی در دیوار:</span>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-sm font-bold text-amber-300">
                  {customTitle}
                </div>
              </div>

              {/* Body */}
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">متن توضیحات آگهی:</span>
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap max-h-72 overflow-y-auto">
                  {customDescription}
                </div>
              </div>

              {/* Tags */}
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">برچسب‌ها:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.adCopy.tags.map((tag) => (
                    <span key={tag} className="text-amber-400/90 text-xs font-mono">
                      #{tag}
                    </span>
                  ))}
                  <span className="text-amber-400/90 text-xs font-mono">#{city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
