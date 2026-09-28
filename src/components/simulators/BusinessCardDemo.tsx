import React, { useState } from 'react';
import { Phone, MapPin, MessageSquare, Contact } from 'lucide-react';
export const DigitalCardSimulator = () => {
  const [notice, setNotice] = useState('');
  return <div className="bg-neutral-900 rounded-2xl p-6 text-neutral-100">
    <h4 className="font-bold text-lg">نمونهٔ کارت ویزیت دیجیتال</h4>
    <p className="text-sm text-neutral-300 mt-2">نام، نشانی و دکمه‌ها در این نمونه نمایشی هستند.</p>
    <div className="max-w-md mx-auto bg-neutral-950 rounded-2xl p-6 mt-5 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-800 grid place-items-center mx-auto mb-4 text-2xl">ن</div>
      <h5 className="font-bold text-lg">نام کسب‌وکار شما</h5><p className="text-neutral-300 text-sm my-3">معرفی خدمات و نشانی کسب‌وکار</p>
      <div className="grid grid-cols-2 gap-3">{[
        [Phone, 'تماس', 'در نسخهٔ اختصاصی، شمارهٔ واقعی کسب‌وکار شما شماره‌گیری می‌شود.'],
        [MapPin, 'مسیریابی', 'در نسخهٔ اختصاصی، نشانی تأییدشدهٔ شما روی نقشه باز می‌شود.'],
        [MessageSquare, 'پیام‌رسان', 'در نسخهٔ اختصاصی، پیام‌رسان انتخابی شما باز می‌شود.'],
        [Contact, 'ذخیرهٔ مخاطب', 'در نسخهٔ اختصاصی، فایل مخاطب برای ذخیره در گوشی ارائه می‌شود.'],
      ].map(([Icon,label,text])=>{const I=Icon as typeof Phone;return <button key={String(label)} className="p-3 rounded-xl bg-neutral-800 flex items-center justify-center gap-2 text-sm" onClick={()=>setNotice(String(text))}><I size={18}/>{String(label)}</button>;})}</div>
      <p role="status" className="text-emerald-300 text-sm mt-4">{notice}</p>
    </div>
  </div>;
};
