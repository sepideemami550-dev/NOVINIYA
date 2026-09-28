import React, { useEffect, useRef, useState } from 'react';
import { X, Phone, Copy, MessageSquare, ArrowRight } from 'lucide-react';
import { contactPhone, contactDisplay, plans, serviceLabels } from '../customerConfig';

export function RequestDialog({ serviceId, planId, onClose }: { serviceId: string; planId: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [job, setJob] = useState(serviceLabels[serviceId] || 'سایر / نیاز به راهنمایی دارم');
  const [plan, setPlan] = useState(planId);
  const [notes, setNotes] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [feedback, setFeedback] = useState('');
  useEffect(() => {
    const el = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    el?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { el?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  const text = `سلام نوینیا؛ برای کسب‌وکار «${name.trim()}» درخواست پیش‌نمایش رایگان و برآورد هزینه دارم.\nحوزهٔ فعالیت: ${job}\nخدمت: ${plans.find(p => p.id === plan)?.title}\n${notes.trim() ? `توضیحات: ${notes.trim()}\n` : ''}لطفاً شرایط، هزینه‌ها و زمان آماده‌سازی را اعلام کنید.`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setFeedback('متن کپی شد؛ برای رسیدن درخواست، آن را به شمارهٔ نوینیا ارسال کنید.'); }
    catch { setFeedback('کپی خودکار انجام نشد؛ متن زیر را انتخاب و کپی کنید یا تماس بگیرید.'); }
  };
  return <dialog ref={dialog} className="request-dialog" aria-labelledby="request-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-inner">
      <button className="close-button" aria-label="بستن فرم درخواست" onClick={onClose}><X size={22}/></button>
      <span className="eyebrow">بدون پرداخت و بدون ثبت‌نام</span>
      <h2 id="request-title">{prepared ? 'درخواست شما آمادهٔ ارسال است' : 'درخواست پیش‌نمایش رایگان'}</h2>
      {!prepared ? <form onSubmit={e => { e.preventDefault(); if (name.trim()) setPrepared(true); }}>
        <p>دو انتخاب کوتاه و نام کسب‌وکارتان را وارد کنید؛ سپس متن درخواست را برای نوینیا می‌فرستید.</p>
        <label htmlFor="business-name">نام شما یا کسب‌وکار</label>
        <input id="business-name" autoFocus required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="مثلاً اتوبار پارس" autoComplete="organization"/>
        <label htmlFor="business-job">حوزهٔ فعالیت</label>
        <select id="business-job" value={job} onChange={e=>setJob(e.target.value)}>{[...Object.values(serviceLabels), 'سایر / نیاز به راهنمایی دارم'].map(j=><option key={j}>{j}</option>)}</select>
        <label htmlFor="request-plan">خدمت موردنظر</label>
        <select id="request-plan" value={plan} onChange={e=>setPlan(e.target.value)}>{plans.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select>
        <label htmlFor="request-notes">توضیح نیاز شما <span className="muted">(اختیاری)</span></label>
        <textarea id="request-notes" maxLength={600} rows={2} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="مثلاً محاسبهٔ کرایه بر اساس خودرو و طبقه"/>
        <p className="form-note">این مرحله فقط متن را آماده می‌کند. اطلاعات با ارسال پیام توسط شما در اختیار نوینیا قرار می‌گیرد.</p>
        <button type="submit" className="primary full">ادامه و آماده‌سازی درخواست <ArrowRight size={18}/></button>
      </form> : <div>
        <p><strong>هنوز پیامی ارسال نشده است.</strong> پیام را در برنامهٔ پیامک باز کنید و ارسال را بزنید، یا متن را کپی کنید و به شمارهٔ زیر بفرستید.</p>
        <label htmlFor="request-message">متن آمادهٔ درخواست</label>
        <textarea id="request-message" className="message-preview" readOnly value={text} rows={6}/>
        <a className="primary full" href={`sms:${contactPhone}?body=${encodeURIComponent(text)}`}><MessageSquare size={18}/> باز کردن پیامک برای ارسال</a>
        <button className="secondary full" onClick={copy}><Copy size={18}/> کپی متن درخواست</button>
        <p className="form-note">اگر پیامک روی این دستگاه باز نمی‌شود، متن را از گوشی ارسال کنید یا تماس بگیرید. آماده‌سازی و کپی متن، ثبت سفارش نیست.</p>
        <p role="status">{feedback}</p>
        <button className="text-button" onClick={()=>setPrepared(false)}>ویرایش اطلاعات درخواست</button>
      </div>}
      <a className="dialog-contact" href={`tel:${contactPhone}`}><Phone size={17}/> تماس و هماهنگی مستقیم <b dir="ltr">{contactDisplay}</b></a>
    </div>
  </dialog>;
}
