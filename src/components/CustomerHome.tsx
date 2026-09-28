import React, { lazy, Suspense, useState } from 'react';
import { ArrowLeft, Check, Menu, X, Phone, MessageSquare, Smartphone, SlidersHorizontal, QrCode, MapPin, Images, Plus, Minus } from 'lucide-react';
import { contactPhone, contactDisplay, serviceLabels, plans } from '../customerConfig';
import { RequestDialog } from './RequestDialog';
import './customer.css';

const Demo = lazy(() => import('./ServiceSimulatorHost').then(m => ({ default: m.ServiceSimulatorHost })));
const questions = [
  ['نوینیا دقیقاً چه چیزی تحویل می‌دهد؟', 'یک ابزار آنلاین با نام، لوگو، خدمات و تعرفهٔ کسب‌وکار شما؛ مثلاً محاسبه‌گر قیمت، منوی دیجیتال یا فرم درخواست نوبت. مشتری لینک آن را باز می‌کند و بدون نصب برنامه از آن استفاده می‌کند. امکانات دقیق پیش از شروع کار با شما مشخص می‌شود.'],
  ['قیمت، زمان تحویل و پشتیبانی چطور مشخص می‌شود؟', 'پس از بررسی نوع ابزار و امکانات، هزینهٔ ساخت، زمان تحویل، تعداد اصلاحات و مدت پشتیبانی در پیشنهاد قیمت مشخص می‌شود. هزینه‌های دوره‌ای مانند میزبانی، دامنه و پیامک نیز باید پیش از تأیید شما روشن شوند. درخواست اولیه رایگان است.'],
  ['لینک را کجا به مشتری بدهم؟', 'در بیوی اینستاگرام، پیام‌رسان، پیامک یا QR چاپی. برای دیوار از روش‌های ارتباطی مجاز همان پلتفرم و دسته‌بندی آگهی خود استفاده کنید؛ دسترسی به فیلد لینک در همهٔ آگهی‌ها یکسان نیست.'],
  ['آیا نمونه‌های این صفحه سفارش واقعی ثبت می‌کنند؟', 'خیر. نمونه‌ها فقط برای تجربهٔ امکانات هستند؛ قیمت‌ها، نام‌ها و اطلاعات داخل آن‌ها نمایشی‌اند. برای سفارش ساخت ابزار خودتان، دکمهٔ «درخواست پیش‌نمایش رایگان» را انتخاب کنید.'],
  ['برای شروع چه اطلاعاتی لازم است؟', 'نام کسب‌وکار و حوزهٔ فعالیت کافی است. پس از هماهنگی، فهرست خدمات، تعرفه‌ها، لوگو و راه تماس را ارائه می‌کنید. زمان آماده‌سازی نمونهٔ اختصاصی پس از دریافت اطلاعات لازم مشخص می‌شود.'],
  ['دامنه، میزبانی و تغییر تعرفه‌ها با چه کسی است؟', 'نیاز به دامنهٔ اختصاصی، محل میزبانی، مالکیت و دسترسی‌ها و روش تغییر قیمت‌ها هنگام برآورد مشخص می‌شود. اگر پنل مدیریت می‌خواهید، در درخواست ذکر کنید تا در محدودهٔ کار و هزینه لحاظ شود.'],
  ['آیا پیامک خودکار یا افزایش فروش تضمین می‌شود؟', 'ارسال خودکار پیامک نیازمند سرویس پیامکی و اتصال فعال است و هزینهٔ آن جداگانه مشخص می‌شود. ابزار می‌تواند مسیر استعلام و تماس را ساده‌تر کند؛ نتیجهٔ فروش به قیمت، کیفیت خدمات، تبلیغات و پیگیری شما هم وابسته است.'],
];

function GrowthExample() {
  const [calls, setCalls] = useState(15);
  const [growth, setGrowth] = useState(20);
  const result = Math.round(calls * (1 + growth / 100));
  return <div className="growth-grid">
    <div><label htmlFor="calls">تماس‌های فعلی در ماه</label><input id="calls" type="number" min="0" max="10000" value={calls} onChange={e=>setCalls(Math.max(0,Math.min(10000, Number(e.target.value))))}/></div>
    <div><label htmlFor="growth">رشد فرضی موردنظر شما: {growth.toLocaleString('fa-IR')}٪</label><input id="growth" type="range" min="0" max="200" step="10" value={growth} onChange={e=>setGrowth(Number(e.target.value))}/></div>
    <p className="scenario-result"><b>{result.toLocaleString('fa-IR')}</b> تماس در این سناریو <span>فرمول: تماس فعلی × (۱ + درصد رشد ÷ ۱۰۰). عدد گرد شده است. این مثال پیش‌بینی فروش یا محاسبهٔ سود نیست.</span></p>
  </div>;
}

function AdExample() {
  const [name,setName] = useState('');
  const [city,setCity] = useState('');
  const [feedback,setFeedback] = useState('');
  const text = `${name || '[نام کسب‌وکار]'} در ${city || '[شهر فعالیت]'}\nبرای آشنایی با خدمات و دریافت برآورد قیمت با ما در ارتباط باشید.\n[خدمات، شرایط و راه تماس واقعی خود را اینجا اضافه کنید.]`;
  return <div className="ad-example"><p>این متن شروعی برای نوشتن آگهی است. فقط خدمات و امکاناتی را اضافه کنید که واقعاً ارائه می‌دهید.</p><div className="two-fields"><label>نام کسب‌وکار<input value={name} maxLength={100} onChange={e=>setName(e.target.value)}/></label><label>شهر فعالیت<input value={city} maxLength={80} onChange={e=>setCity(e.target.value)}/></label></div><textarea aria-label="نمونه متن آگهی" readOnly value={text} rows={5}/><button className="secondary" onClick={async()=>{try {await navigator.clipboard.writeText(text);setFeedback('متن کپی شد. پیش از انتشار، بخش‌های داخل کروشه را تکمیل کنید.');}catch{setFeedback('متن را انتخاب و به صورت دستی کپی کنید.');}}}>کپی متن آگهی</button><p role="status">{feedback}</p></div>;
}

export default function CustomerHome() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeService, setActiveService] = useState('renovation-calculator');
  const [demoVisible, setDemoVisible] = useState(false);
  const [request, setRequest] = useState<{ serviceId: string; planId: string } | null>(null);
  const [sampleArea,setSampleArea] = useState(85);
  const nav = [['samples','نمونه‌ها'], ['plans','خدمات و هزینه'], ['process','مراحل سفارش'], ['faq','پرسش‌ها'], ['contact','تماس']];
  const openRequest = (planId='app') => setRequest({ serviceId: activeService, planId });
  const chooseDemo = (id: string) => { setActiveService(id); setDemoVisible(true); };
  return <div className="customer-site" dir="rtl">
    <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
    <header className="site-header"><div className="container header-row">
      <a className="brand" href="#main" aria-label="نوینیا، ابتدای صفحه"><span className="brand-mark">ن</span><span><b>نوینیا</b><small>ابزار آنلاین کسب‌وکار شما</small></span></a>
      <nav className="desktop-nav" aria-label="منوی اصلی">{nav.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <a className="header-contact" href={`tel:${contactPhone}`}><Phone size={17}/><span>مشاوره</span></a>
      <button className="menu-toggle" aria-label={mobileMenu ? 'بستن منو' : 'باز کردن منو'} aria-expanded={mobileMenu} aria-controls="mobile-nav" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button>
    </div>{mobileMenu && <nav id="mobile-nav" className="mobile-nav" aria-label="منوی موبایل">{nav.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMobileMenu(false)}>{label}</a>)}</nav>}</header>
    <main id="main">
      <section className="hero"><div className="container hero-grid">
        <div className="hero-copy"><span className="eyebrow">از سؤالِ «قیمت چنده؟» تا یک درخواست مشخص</span>
          <h1>مشتری‌تان آنلاین قیمت بگیرد؛<br/><em>شما درخواستش را دریافت کنید.</em></h1>
          <p>نوینیا برای کسب‌وکار شما <strong>صفحهٔ محاسبهٔ قیمت، رزرو یا سفارش</strong> می‌سازد؛ با نام، لوگو و تعرفه‌های خودتان. لینک را به مشتری بدهید تا بدون نصب برنامه، خدمات را انتخاب کند و برای ادامه با شما در ارتباط باشد.</p>
          <div className="hero-actions"><button className="primary" onClick={()=>openRequest()}>درخواست پیش‌نمایش رایگان <ArrowLeft size={18}/></button><a className="secondary" href="#samples">دیدن نمونه برای شغل من</a></div>
          <ul className="hero-notes"><li><Check/>بدون ثبت‌نام</li><li><Check/>درخواست اولیه رایگان</li><li><Check/>اعلام هزینه قبل از شروع</li></ul>
        </div>
        <div className="hero-product"><div className="product-top"><span className="product-dot"/> نمونهٔ ابزار مشتری شما <span className="sample-badge">آزمایشی</span></div>
          <div className="product-body"><span className="product-icon"><SlidersHorizontal/></span><h2>برآورد هزینهٔ بازسازی</h2><p>متراژ را تغییر دهید؛ مبلغ نمونه تغییر می‌کند.</p><label htmlFor="hero-area">متراژ فضا <b>{sampleArea.toLocaleString('fa-IR')} متر</b></label><input id="hero-area" type="range" min="40" max="200" step="5" value={sampleArea} onChange={e=>setSampleArea(Number(e.target.value))}/><div className="sample-total"><span>برآورد نمونه</span><strong>{(sampleArea*3).toLocaleString('fa-IR')} <small>میلیون تومان</small></strong></div><a className="secondary full" href="#samples">دیدن امکانات نمونه <ArrowLeft size={16}/></a><small className="sample-footnote">مبالغ صرفاً نمایشی‌اند؛ در نسخهٔ شما با تعرفهٔ خودتان محاسبه می‌شوند.</small></div>
        </div>
      </div></section>
      <section id="samples" className="section"><div className="container">
        <div className="section-heading"><span className="eyebrow">اول ببینید چه چیزی می‌خرید</span><h2>نمونهٔ مناسب شغل‌تان را امتحان کنید</h2><p>این‌ها نمونهٔ امکانات قابل ساخت‌اند، نه پروژه‌های تحویل‌شده یا ارائه‌دهندگان خدمات.</p></div>
        <label className="mobile-sample-select" htmlFor="sample-select">حوزهٔ کاری شما<select id="sample-select" value={activeService} onChange={e=>chooseDemo(e.target.value)}>{Object.entries(serviceLabels).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
        <div className="sample-choices" aria-label="انتخاب نمونه">{Object.entries(serviceLabels).map(([id,label])=><button key={id} aria-pressed={activeService===id} onClick={()=>chooseDemo(id)}>{label}</button>)}</div>
        {!demoVisible ? <div className="demo-start"><div><h3>نمونهٔ {serviceLabels[activeService]}</h3><p>با تغییر گزینه‌ها، نتیجه را ببینید. برای آزمایش نیازی به شمارهٔ واقعی نیست.</p></div><button className="primary" onClick={()=>setDemoVisible(true)}>باز کردن نمونهٔ تعاملی <ArrowLeft size={18}/></button></div> : <div className="demo-panel"><div className="demo-notice"><b>محیط آزمایشی — {serviceLabels[activeService]}</b><p>قیمت‌ها و اطلاعات نمایشی‌اند. هیچ رزرو، پرداخت یا پیامکی انجام نمی‌شود. نوینیا سازندهٔ این ابزار است.</p></div><Suspense fallback={<div className="demo-loading" role="status">در حال آماده‌سازی نمونه…</div>}><div className="simulator"><Demo key={activeService} serviceId={activeService}/></div></Suspense></div>}
        <div className="sample-request"><div><h3>همین ابزار، با نام و تعرفهٔ شما</h3><p>نمونهٔ انتخابی در فرم درخواست حفظ می‌شود.</p></div><button className="primary" onClick={()=>openRequest()}>درخواست پیش‌نمایش رایگان</button></div>
      </div></section>
      <section id="plans" className="section tinted"><div className="container"><div className="section-heading"><span className="eyebrow">خروجی مشخص، هزینهٔ متناسب با نیاز</span><h2>کدام خدمت برای شما مناسب است؟</h2><p>درخواست اولیه رایگان است. قیمت نهایی پس از مشخص‌شدن امکانات اعلام می‌شود؛ انتخاب این بخش تعهد خرید ایجاد نمی‌کند.</p></div><div className="plan-grid">{plans.map((p,i)=><article className={`plan-card ${i===0?'featured':''}`} key={p.id}><span className="plan-number">{(i+1).toLocaleString('fa-IR',{minimumIntegerDigits:2})}</span><h3>{p.title}</h3><p>{p.description}</p><ul>{p.features.map(f=><li key={f}><Check size={17}/>{f}</li>)}</ul><div className="plan-price"><b>برآورد اختصاصی</b><p>{p.pricing}</p></div><button className={i===0?'primary full':'secondary full'} onClick={()=>openRequest(p.id)}>درخواست پیش‌نمایش و قیمت</button></article>)}</div><p className="cost-note">پیش از تأیید: هزینهٔ ساخت و هزینه‌های دوره‌ای دامنه، میزبانی، پیامک و پشتیبانی را در پیشنهاد قیمت بررسی کنید. مبلغ نهایی متناسب با امکانات مورد توافق شماست.</p></div></section>
      <section id="deliverables" className="section"><div className="container"><div className="section-heading"><span className="eyebrow">امکانات متناسب با روش فروش شما</span><h2>ابزار شما چطور به دست مشتری می‌رسد؟</h2></div><div className="feature-grid">{[
        [Smartphone,'لینک اختصاصی','برای بیوی اینستاگرام، پیام‌رسان‌ها و ارسال مستقیم به مشتری.'],
        [QrCode,'کارت و QR چاپی','برای اتصال کارت ویزیت، میز یا شیشهٔ مغازه به ابزار آنلاین.'],
        [MapPin,'مسیریابی و راه تماس','برای پیدا کردن محل کسب‌وکار و برقراری تماس راحت‌تر.'],
        [MessageSquare,'اطلاع‌رسانی پیامکی','در صورت سفارش و فعال‌سازی سرویس پیامکی؛ با هزینه و شرایط مشخص.'],
        [Images,'تصویر و نمونه‌کار','نمایش تصاویر واقعی خدمات شما، از جمله قبل و بعد در صورت نیاز.'],
      ].map(([Icon,title,desc])=>{const I=Icon as typeof Smartphone;return <article key={String(title)} className="feature"><I/><h3>{String(title)}</h3><p>{String(desc)}</p></article>;})}</div></div></section>
      <section id="process" className="section tinted"><div className="container"><div className="section-heading"><span className="eyebrow">از درخواست تا تحویل</span><h2>چهار قدم روشن برای شروع</h2></div><ol className="steps">{[
        ['درخواست را ارسال کنید','نام کسب‌وکار و نیازتان را در متن آماده برای نوینیا بفرستید یا تماس بگیرید.'],
        ['نیاز و هزینه را هماهنگ می‌کنیم','خدمات، تعرفه‌ها، امکانات، هزینه و زمان آماده‌سازی مشخص می‌شود.'],
        ['پیش‌نمایش را بررسی کنید','نسخهٔ اختصاصی را ببینید و اصلاحات مورد توافق را اعلام کنید.'],
        ['تأیید و تحویل','پس از توافق نهایی، لینک، دسترسی‌ها و راهنمای استفاده تحویل می‌شود.'],
      ].map(([title,desc],i)=><li key={title}><span>{(i+1).toLocaleString('fa-IR')}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol></div></section>
      <section id="about" className="section"><div className="container about-grid"><div><span className="eyebrow">دربارهٔ نوینیا</span><h2>ابزار ساده برای یک نیاز مشخص</h2><p>نوینیا ابزارهای آنلاین و وب‌سایت‌های کسب‌وکار را طراحی می‌کند تا مشتری بتواند خدمات را ببیند، برآورد بگیرد و درخواستش را راحت‌تر مطرح کند.</p><p>برای انتخاب، نمونه‌های تعاملی همین صفحه را امتحان کنید. برای بررسی کار متناسب با پروژهٔ خودتان نیز مستقیم با نوینیا هماهنگ کنید.</p></div><div className="trust-card"><h3>پیش از تصمیم، این‌ها را بدانید</h3><ul><li><Check/>نمونه‌ها را بدون پرداخت آزمایش می‌کنید.</li><li><Check/>خدمت، قیمت و زمان در پیشنهاد شما مشخص می‌شود.</li><li><Check/>راه تماس مستقیم در دسترس شماست.</li></ul><a className="secondary" href={`tel:${contactPhone}`}><Phone size={18}/> <span dir="ltr">{contactDisplay}</span></a></div></div></section>
      <section id="faq" className="section tinted"><div className="container narrow"><div className="section-heading"><h2>پاسخ به سؤال‌های قبل از سفارش</h2></div>{questions.map(([q,a])=><details className="faq-item" key={q}><summary>{q}<Plus className="plus" size={18}/><Minus className="minus" size={18}/></summary><p>{a}</p></details>)}</div></section>
      <section id="contact" className="section"><div className="container contact-card"><div><span className="eyebrow">قدم بعدی شما</span><h2>برای کسب‌وکارتان چه ابزاری لازم دارید؟</h2><p>نمونهٔ دلخواه را انتخاب کنید و درخواست پیش‌نمایش بفرستید. اگر مطمئن نیستید، با ما هماهنگ کنید.</p><div className="hero-actions"><button className="primary" onClick={()=>openRequest()}>درخواست پیش‌نمایش رایگان</button><a className="secondary" href={`tel:${contactPhone}`}><Phone size={18}/><span dir="ltr">{contactDisplay}</span></a></div><p className="contact-followup">برای پیگیری درخواست قبلی، با همین شماره تماس بگیرید یا پیامک بفرستید.</p></div></div></section>
      <section className="section optional-tools"><div className="container narrow"><details className="faq-item"><summary>ابزار کمکی: نمونه متن آگهی <Plus size={18}/></summary><AdExample/></details><details className="faq-item"><summary>مثال آموزشی: اثر یک درصد رشد فرضی <Plus size={18}/></summary><p>فقط برای مقایسهٔ عددها؛ میزان رشد را خودتان انتخاب می‌کنید و نوینیا آن را تضمین نمی‌کند.</p><GrowthExample/></details></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-grid"><div><b>نوینیا · Noviniya</b><p>طراحی ابزار آنلاین و وب‌سایت برای کسب‌وکارها</p><a href={`tel:${contactPhone}`}>تماس با نوینیا: <span dir="ltr">{contactDisplay}</span></a></div><nav aria-label="جزئیات خدمات"><a href="/services/web-app/">طراحی وب‌اپلیکیشن</a><a href="/services/online-quote/">پیش‌فاکتور آنلاین</a><a href="/services/website-design/">طراحی وب‌سایت</a><a href="/services/customer-acquisition/">ابزار جذب مشتری</a></nav><p>تمامی حقوق برای نوینیا محفوظ است.</p></div></footer>
    <div className="sticky-actions"><button className="primary" onClick={()=>openRequest()}>پیش‌نمایش رایگان</button><a className="secondary" href={`tel:${contactPhone}`}><Phone size={17}/> تماس و مشاوره</a></div>
    {request && <RequestDialog {...request} onClose={()=>setRequest(null)}/>}
  </div>;
}
