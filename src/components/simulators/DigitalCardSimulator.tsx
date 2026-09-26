import React, { useState } from 'react';
import { CreditCard, Phone, MapPin, Send, Share2, Check, Download } from 'lucide-react';

export const DigitalCardSimulator: React.FC = () => {
  const [copiedCard, setCopiedCard] = useState<boolean>(false);
  const [savedContact, setSavedContact] = useState<boolean>(false);

  const copyBankCard = () => {
    navigator.clipboard.writeText('6037-9975-1234-5678');
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const handleSaveContact = () => {
    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 2500);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">دموی تعاملی: کارت ویزیت دیجیتال و بیولینک هوشمند اصناف</h4>
            <span className="text-xs text-neutral-400">جایگزین چاپ هزینه‌بر کارت کاغذی؛ ذخیره شماره در گوشی مشتری با ۱ کلیک</span>
          </div>
        </div>
        <span className="text-xs font-mono text-indigo-400/90 bg-indigo-500/10 px-2.5 py-1 rounded-md">
          نسخه VIP تعاملی
        </span>
      </div>

      <div className="max-w-md mx-auto bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Profile Header */}
        <div className="text-center pb-4 border-b border-neutral-800">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 mb-3">
            <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center text-amber-300 font-bold text-xl">
              دکتر امینی
            </div>
          </div>
          <h5 className="font-bold text-base text-neutral-100">دکتر رضا امینی</h5>
          <p className="text-xs text-amber-400 font-medium mt-0.5">متخصص جراحی زیبایی و ایمپلنت دیجیتال</p>
          <p className="text-[11px] text-neutral-400 mt-1">تهران، سعادت‌آباد، میدان کاج، مجتمع پزشکی سرو</p>
        </div>

        {/* 1-Click Save Contact */}
        <div className="py-4">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            {savedContact ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {savedContact ? 'شماره در مخاطبین شما ذخیره شد!' : 'ذخیره مستقیم شماره در مخاطبین (vCard)'}
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pb-4">
          <a
            href="tel:09120000000"
            className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-center transition-colors flex flex-col items-center gap-1"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-neutral-300">تماس مطب</span>
          </a>
          <button
            type="button"
            onClick={() => alert('مسیریابی در نشان و بلد باز شد')}
            className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-center transition-colors flex flex-col items-center gap-1"
          >
            <MapPin className="w-4 h-4 text-sky-400" />
            <span className="text-[11px] text-neutral-300">مسیریابی</span>
          </button>
          <button
            type="button"
            onClick={() => alert('پیام در واتساپ باز شد')}
            className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-center transition-colors flex flex-col items-center gap-1"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-neutral-300">واتساپ</span>
          </button>
        </div>

        {/* Bank Account Copy */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-neutral-400">شماره کارت بیعانه (بانک ملی - به نام رضا امینی):</div>
            <div className="font-mono text-neutral-200 tracking-wider text-xs mt-0.5" dir="ltr">
              ۶۰۳۷ - ۹۹۷۵ - ۱۲۳۴ - ۵۶۷۸
            </div>
          </div>
          <button
            type="button"
            onClick={copyBankCard}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-[11px] flex items-center gap-1 transition-colors"
          >
            {copiedCard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copiedCard ? 'کپی شد' : 'کپی'}
          </button>
        </div>
      </div>
    </div>
  );
};
