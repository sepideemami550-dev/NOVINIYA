import React, { useState } from 'react';
import { DivarService } from '../types';
import { X, Copy, Check, Sparkles, MessageSquare, Play, HelpCircle } from 'lucide-react';
import { ServiceSimulatorHost } from './ServiceSimulatorHost';

interface Props {
  service: DivarService;
  onClose: () => void;
  defaultTab?: 'demo' | 'ad' | 'pitch' | 'prompt' | 'why';
}

export const ServiceDetailModal: React.FC<Props> = ({ service, onClose, defaultTab = 'demo' }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'ad' | 'pitch' | 'prompt' | 'why'>(defaultTab);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedAd, setCopiedAd] = useState<boolean>(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(service.studioPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyAd = () => {
    const text = `عنوان آگهی دیوار:
${service.adCopy.suggestedTitle}

متن توضیحات آگهی:
${service.adCopy.description}

برچسب‌ها:
${service.adCopy.tags.map((t) => `#${t}`).join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedAd(true);
    setTimeout(() => setCopiedAd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-amber-400 font-bold text-sm">
              #{service.rank.toString().padStart(2, '۰')}
            </span>
            <h3 className="font-bold text-base text-neutral-100">{service.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-950/30 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('demo')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'demo'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>دموی زنده و تست کاربری</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ad')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ad'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>متن آماده آگهی دیوار</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pitch')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pitch'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>اسکریپت بستن قرارداد با کارفرما</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'prompt'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>پرامپت طلایی گوگل استودیو</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('why')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'why'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <span>روانشناسی زنگ‌خور بالا</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'demo' && (
            <div>
              <div className="mb-4 text-xs text-neutral-400 flex items-center justify-between">
                <span>دموی زنده عملکرد واقعی ابزار در سمت کاربر:</span>
                <span className="text-amber-400">امکان تست کامل تمامی گزینه‌ها و محاسبات</span>
              </div>
              <ServiceSimulatorHost serviceId={service.id} />
            </div>
          )}

          {activeTab === 'ad' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">متن آگهی مهندسی‌شده با فرمول جذب بیشترین تماس:</span>
                <button
                  type="button"
                  onClick={handleCopyAd}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedAd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAd ? 'کپی شد!' : 'کپی کل متن آگهی'}</span>
                </button>
              </div>

              {/* Title Box */}
              <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-1">تیتر پیشنهادی دیوار:</span>
                <div className="text-sm font-bold text-amber-300">{service.adCopy.suggestedTitle}</div>
              </div>

              {/* Description Box */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-2">متن توضیحات آگهی (قلاب روانی + شفافیت):</span>
                <pre className="text-xs text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {service.adCopy.description}
                </pre>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 items-center text-xs">
                <span className="text-neutral-400">برچسب‌ها:</span>
                {service.adCopy.tags.map((tag) => (
                  <span key={tag} className="text-amber-400/90 font-mono text-[11px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pitch' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-400">
                اسکریپت و فن بیان اثبات‌شده برای مذاکره تلفنی با اصناف و بستن قرارداد ۵ تا ۲۰ میلیون تومانی:
              </div>

              <div className="space-y-3">
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                  <div className="text-xs font-bold text-amber-400 mb-1">۱. قلاب شروع مکالمه (Hook):</div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{service.clientPitchScript.hook}</p>
                </div>

                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                  <div className="text-xs font-bold text-sky-400 mb-1">۲. ارائه ارزش اصلی و تمایز (Core Value):</div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{service.clientPitchScript.coreValue}</p>
                </div>

                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                  <div className="text-xs font-bold text-amber-400 mb-1">۳. پاسخ به مقاومت و ابهامات کارفرما (Objection Handling):</div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{service.clientPitchScript.objectionHandling}</p>
                </div>

                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                  <div className="text-xs font-bold text-emerald-400 mb-1">۴. قطعی کردن معامله و دریافت بیعانه (Closing):</div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{service.clientPitchScript.closingDeal}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  پرامپت آماده برای تولید مجدد یا سفارشی‌سازی این ابزار در هوش مصنوعی گوگل استودیو:
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'پرامپت کپی شد!' : 'کپی پرامپت'}</span>
                </button>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <pre className="text-xs text-amber-300/90 whitespace-pre-wrap font-mono leading-relaxed" dir="ltr">
                  {service.studioPrompt}
                </pre>
              </div>

              <div className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200 font-semibold block mb-1">راهنمای استفاده در استودیو:</strong>
                این دستور را مستقیماً در کادر چت Google AI Studio ارسال کنید تا کل وب‌اپ، محاسبات جاوااسکریپت و استایل‌های واکنش‌گرا را در چند ثانیه تحویل بگیرید.
              </div>
            </div>
          )}

          {activeTab === 'why' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <h4 className="text-sm font-bold text-neutral-100">چرا این خدمت در دیوار زنگ‌خور بسیار بالایی دارد؟</h4>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {service.whyItConverts.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">مشتری هدف در دیوار:</span>
                  <span className="text-neutral-200 font-medium mt-1 block">{service.targetAudience}</span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">میانگین زنگ‌خور هفتگی:</span>
                  <span className="text-amber-400 font-bold mt-1 block">{service.weeklyCallEstimate}</span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">تعرفه فروش ابزار:</span>
                  <span className="text-emerald-400 font-bold mt-1 block">{service.pricingRange}</span>
                </div>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">زمان ساخت در استودیو:</span>
                  <span className="text-sky-400 font-bold mt-1 block">{service.buildTimeAIStudio}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
