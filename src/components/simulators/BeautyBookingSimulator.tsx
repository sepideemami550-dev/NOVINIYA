import React, { useState } from 'react';
import { Sparkles, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const BeautyBookingSimulator: React.FC = () => {
  const [clinicType, setClinicType] = useState<'salon' | 'medical'>('medical');
  const [service, setService] = useState<string>('laser');
  const [hairLength, setHairLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [fillerCc, setFillerCc] = useState<number>(2);
  const [laserAreas, setLaserAreas] = useState<string>('full-body');
  const [dentalUnits, setDentalUnits] = useState<number>(4);
  const [selectedDate, setSelectedDate] = useState<string>('شنبه');
  const [selectedTime, setSelectedTime] = useState<string>('۱۶:۰۰');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  // Price Calculation (in 1,000 Tomans)
  let calculatedPrice = 0;
  if (clinicType === 'salon') {
    if (service === 'keratin') {
      calculatedPrice = hairLength === 'short' ? 2200 : hairLength === 'medium' ? 3800 : 5400;
    } else if (service === 'facial') {
      calculatedPrice = 1600;
    } else if (service === 'bride') {
      calculatedPrice = 14500;
    } else if (service === 'lash-nail') {
      calculatedPrice = 1100;
    }
  } else {
    // Medical & Aesthetic Clinic
    if (service === 'laser') {
      calculatedPrice = laserAreas === 'full-body' ? 890 : laserAreas === 'economic' ? 520 : 380;
    } else if (service === 'filler') {
      calculatedPrice = fillerCc * 1950;
    } else if (service === 'botox') {
      calculatedPrice = 1350;
    } else if (service === 'dental-composite') {
      calculatedPrice = dentalUnits * 2200;
    } else if (service === 'prp') {
      calculatedPrice = 2400;
    }
  }

  // 15% promotional discount
  const discount = Math.round(calculatedPrice * 0.15);
  const finalPrice = Math.max(0, calculatedPrice - discount);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100">
      
      {/* Tab Switcher: Salon vs Medical Clinic */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-neutral-100">سامانه هوشمند استعلام هزینه و رزرو نوبت کلینیک و سالن</h4>
            <span className="text-xs text-neutral-400">طراحی اختصاصی دوگانه: کلینیک‌های پوست، مو، لیزر و دندانپزشکی + سالن‌های زیبایی</span>
          </div>
        </div>
        <span className="text-xs font-mono text-rose-400/90 bg-rose-500/10 px-2.5 py-1 rounded-md hidden sm:inline">
          تخفیف فصلی ۱۵٪ فعال
        </span>
      </div>

      {/* Switcher Bar */}
      <div className="flex items-center p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-5 max-w-md mx-auto text-xs">
        <button
          type="button"
          onClick={() => { setClinicType('medical'); setService('laser'); }}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${
            clinicType === 'medical'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          🏥 ویژه کلینیک‌های پزشکی، پوست و دندانپزشکی
        </button>
        <button
          type="button"
          onClick={() => { setClinicType('salon'); setService('keratin'); }}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${
            clinicType === 'salon'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          💇‍♀️ ویژه سالن‌های زیبایی و آرایشگاه‌ها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          
          {/* Main Service Selector */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-2">
              {clinicType === 'medical' ? 'خدمات تخصصی کلینیک پزشکی:' : 'خدمات تخصصی سالن زیبایی:'}
            </label>
            
            {clinicType === 'medical' ? (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'laser', name: 'لیزر موهای زائد (الکس/تیتانیوم)', tag: 'کولینگ بدون درد' },
                  { id: 'filler', name: 'تزریق ژل و فیلر لب/گونه', tag: 'برندهای تاییدیه وزارت بهداشت' },
                  { id: 'botox', name: 'بوتاکس پیشانی و خط اخم', tag: 'برند دیسپورت/مصپورت' },
                  { id: 'dental-composite', name: 'کامپوزیت و لمینت دندان', tag: 'طراحی خط لبخند هالیوودی' },
                  { id: 'prp', name: 'مزوتراپی و PRP مو و صورت', tag: 'توسط پزشک متخصص' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s.id)}
                    className={`p-2.5 text-right rounded-xl border text-xs transition-all ${
                      service === s.id
                        ? 'border-teal-400 bg-teal-500/10 text-teal-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs text-neutral-200">{s.name}</div>
                    <div className="text-[10px] text-teal-400 mt-0.5">{s.tag}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'keratin', name: 'کراتین و احیای نانو', tag: 'تضمین ماندگاری' },
                  { id: 'facial', name: 'فیشیال تخصصی VIP', tag: 'پاکسازی عمقی' },
                  { id: 'lash-nail', name: 'کاشت مژه و ناخن ژورنالی', tag: 'متریال روسی' },
                  { id: 'bride', name: 'پکیج میکاپ عروس', tag: 'خدمات کامل رویایی' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s.id)}
                    className={`p-2.5 text-right rounded-xl border text-xs transition-all ${
                      service === s.id
                        ? 'border-rose-500 bg-rose-500/10 text-rose-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs text-neutral-200">{s.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.tag}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sub Option: Laser Areas */}
          {clinicType === 'medical' && service === 'laser' && (
            <div className="bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/80">
              <span className="text-xs font-medium text-neutral-300 block mb-2">ناحیه لیزر را انتخاب کنید:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'full-body', title: 'فول بادی کامل (کاربردی)' },
                  { id: 'economic', title: 'اقتصادی (دست و پا)' },
                  { id: 'face-underarm', title: 'صورت و زیربغل' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLaserAreas(l.id)}
                    className={`p-2 text-center rounded-lg border text-xs ${
                      laserAreas === l.id
                        ? 'border-teal-400 bg-teal-500/20 text-teal-200 font-medium'
                        : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {l.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub Option: Dental Composite */}
          {clinicType === 'medical' && service === 'dental-composite' && (
            <div className="bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/80">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-neutral-300">تعداد واحد دندان:</span>
                <span className="text-teal-400 font-bold tabular-nums">{dentalUnits} واحد</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={dentalUnits}
                onChange={(e) => setDentalUnits(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          )}

          {/* Sub Option: Keratin */}
          {clinicType === 'salon' && service === 'keratin' && (
            <div className="bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/80">
              <span className="text-xs font-medium text-neutral-300 block mb-2">قد مو را مشخص کنید:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'short', title: 'کوتاه (تا سرشانه)' },
                  { id: 'medium', title: 'متوسط (بند لباس)' },
                  { id: 'long', title: 'بلند (گودی کمر)' },
                ].map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setHairLength(h.id as any)}
                    className={`p-2 text-center rounded-lg border text-xs ${
                      hairLength === h.id
                        ? 'border-rose-400 bg-rose-500/20 text-rose-200 font-medium'
                        : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {h.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub Option: Filler CC */}
          {service === 'filler' && (
            <div className="bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/80">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-neutral-300">میزان فیلر/ژل مورد نیاز:</span>
                <span className="text-rose-400 font-bold tabular-nums">{fillerCc} سی‌سی</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={fillerCc}
                onChange={(e) => setFillerCc(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          )}

          {/* Slot Selection */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-neutral-400 block mb-1">روز مراجعه:</span>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-100"
              >
                <option value="شنبه">شنبه آینده</option>
                <option value="یکشنبه">یکشنبه</option>
                <option value="دوشنبه">دوشنبه</option>
                <option value="چهارشنبه">چهارشنبه</option>
                <option value="پنج‌شنبه">پنج‌شنبه VIP</option>
              </select>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">ساعت تقریبی:</span>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-100"
              >
                <option value="۱۱:۰۰">۱۱:۰۰ صبح</option>
                <option value="۱۴:۰۰">۱۴:۰۰ بعدازظهر</option>
                <option value="۱۶:۰۰">۱۶:۰۰ عصر</option>
                <option value="۱۸:۳۰">۱۸:۳۰ عصر</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Booking */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-medium mb-1">تعرفه قطعی خدمت:</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-400 tabular-nums">
                {(finalPrice * 1000).toLocaleString('fa-IR')}
              </span>
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                {(calculatedPrice * 1000).toLocaleString('fa-IR')}
              </span>
              <span className="text-xs text-neutral-400">تومان</span>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-300">
              <div className="flex items-center gap-2 text-neutral-400">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>زمان رزرو: {selectedDate} ساعت {selectedTime}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>مدت زمان تقریبی جلسه: ۲ الی ۳ ساعت</span>
              </div>
              <div className="text-emerald-400/90 text-[11px] pt-1">
                تضمین استفاده از متریال اصل با بسته‌بندی پلمپ در حضور مراجع
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800">
            {confirmed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>نوبت با موفقیت ثبت موقت شد! پیامک هماهنگی و آدرس دقیق ارسال گردید.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-rose-500"
                />
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="شماره تماس (۰۹۱۲۳۴۵۶۷۸۹)"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    dir="ltr"
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (clientPhone.length >= 10) setConfirmed(true);
                    }}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    تایید نوبت
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
