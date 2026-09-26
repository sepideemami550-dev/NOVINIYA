import React, { useState } from 'react';
import { 
  Zap, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ArrowLeft,
  X,
  Send,
  Check,
  HelpCircle,
  Headphones,
  QrCode,
  MapPin,
  MessageSquareText,
  SlidersHorizontal,
  Instagram,
  Compass,
  Copy,
  Download,
  Share2,
  ExternalLink,
  Store,
  SplitSquareVertical,
  Globe,
  Monitor,
  Code2,
  Cpu,
  BadgePercent,
  TrendingUp,
  Award
} from 'lucide-react';
import { servicesData, divarMarketStats } from '../data/servicesData';
import { ServiceSimulatorHost } from './ServiceSimulatorHost';
import { CategoryFilter } from '../types';
import { SnappStyleIllustration } from './SnappStyleIllustration';

interface ClientShowcaseViewProps {
  onSwitchToDashboard: () => void;
}

export const ClientShowcaseView: React.FC<ClientShowcaseViewProps> = ({ onSwitchToDashboard }) => {
  // State for active demo
  const [activeServiceId, setActiveServiceId] = useState<string>(servicesData[0].id);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('همه');
  const [consultModalOpen, setConsultModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    businessName: '',
    jobCategory: 'دکوراسیون و بازسازی',
    phone: '',
    planType: 'پلن اختصاصی وب‌اپلیکیشن (محاسبه‌گر صنف)',
    marketingChannel: 'دیوار و اینستاگرام'
  });

  // Interactive ROI Calculator State for client
  const [monthlyAdBudget, setMonthlyAdBudget] = useState<number>(3000000);
  const [currentCalls, setCurrentCalls] = useState<number>(15);

  const estimatedCallsWithApp = Math.round(currentCalls * 2.8);
  const extraLeads = Math.round(currentCalls * 4.2);

  // Feature 1: Interactive Before/After Slider State
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Feature 2: Smart Digital Card & SMS Simulator State
  const [simulatedCustomerPhone, setSimulatedCustomerPhone] = useState<string>('09121234567');
  const [smsSentNotice, setSmsSentNotice] = useState<boolean>(false);

  // Feature 3: Copy Bio Kit Feedback
  const [copiedBio, setCopiedBio] = useState<boolean>(false);

  // Feature 4: In-Page Divar Ad Generator for Clients (Free Gift from Noviniya)
  const [adGenServiceId, setAdGenServiceId] = useState<string>(servicesData[0].id);
  const [adGenCity, setAdGenCity] = useState<string>('تهران');
  const [adGenBusinessName, setAdGenBusinessName] = useState<string>('دکوراسیون رادمنش');
  const [adGenPhone, setAdGenPhone] = useState<string>('۰۹۱۲۳۴۵۶۷۸۹');
  const [adCopied, setAdCopied] = useState<boolean>(false);

  const categories: CategoryFilter[] = [
    'همه',
    'ساختمان و فنی',
    'حمل‌ونقل',
    'زیبایی و کلینیک‌ها',
    'تشریفات و مجالس',
    'کافه و غذا',
    'املاک و مالی',
    'دیجیتال و فروش'
  ];

  const filteredServices = servicesData.filter(s => 
    selectedCategory === 'همه' || s.category === selectedCategory
  );

  const activeService = servicesData.find(s => s.id === activeServiceId) || servicesData[0];
  const adGenService = servicesData.find(s => s.id === adGenServiceId) || servicesData[0];

  // Lead storage in state / localStorage
  const [leadsList, setLeadsList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('noviniya_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  // Customer view orders modal (only shows their submitted requests)
  const [showCustomerOrdersModal, setShowCustomerOrdersModal] = useState<boolean>(false);
  
  // SMS Notification Toast state
  const [activeSmsToast, setActiveSmsToast] = useState<{
    phone: string;
    text: string;
    time: string;
    type: 'admin' | 'customer';
  } | null>(null);

  // 5-pack interactive preview modal
  const [selectedPillarModal, setSelectedPillarModal] = useState<number | null>(null);

  // Form handling with REAL SMS simulation & localStorage sync
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;
    
    const nowTime = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const nowDate = new Date().toLocaleDateString('fa-IR');

    const newLead = {
      id: Date.now().toString(),
      date: nowDate,
      time: nowTime,
      businessName: formData.businessName || 'بدون نام',
      jobCategory: formData.jobCategory,
      phone: formData.phone,
      planType: formData.planType,
      status: 'در حال بررسی اولیه و تخصیص دامنه',
      trackingCode: 'NV-' + Math.floor(100000 + Math.random() * 900000),
    };

    const updatedLeads = [newLead, ...leadsList];
    setLeadsList(updatedLeads);
    try {
      localStorage.setItem('noviniya_leads', JSON.stringify(updatedLeads));
      // Save last customer submission for "سفارش من"
      localStorage.setItem('noviniya_customer_phone', formData.phone);
    } catch (err) {
      console.error(err);
    }

    setFormSubmitted(true);

    // Trigger Active SMS to Admin and Customer
    setTimeout(() => {
      setActiveSmsToast({
        phone: formData.phone,
        text: `پیامک تاییدیه ارسال شد: «سفارش شما با کد ${newLead.trackingCode} در نوینیا ثبت شد. لینک پیش‌نمایش در حال آماده‌سازی است.»`,
        time: nowTime,
        type: 'customer'
      });
    }, 1200);

    setTimeout(() => {
      setFormSubmitted(false);
      setConsultModalOpen(false);
      setFormData({ 
        businessName: '', 
        jobCategory: 'دکوراسیون و بازسازی', 
        phone: '', 
        planType: 'وب‌اپلیکیشن اختصاصی (محاسبه‌گر و پیش‌فاکتور صنف)',
        marketingChannel: 'دیوار و اینستاگرام' 
      });
    }, 3200);
  };

  const handleSimulateSms = () => {
    setSmsSentNotice(true);
    setTimeout(() => setSmsSentNotice(false), 4000);
  };

  const handleCopyBioText = () => {
    const textToCopy = `✨ [نام برند شما] | استعلام آنلاین هزینه و پیش‌فاکتور آنی\n🔗 محاسبه آنلاین در ۳۰ ثانیه بدون معطلی:\nhttps://noviniya.ir/demo\n📍 شعبه مرکزی + ارسال به سراسر شهر | 📞 تماس فوری: ۰۹۱۲...`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2500);
  };

  const handleCopyClientAd = () => {
    const customTitle = `${adGenService.adCopy.suggestedTitle} در ${adGenCity}`;
    const customDesc = `به نام خدا\nارائه خدمات تخصصی در سراسر ${adGenCity} و حومه\n\n${adGenService.adCopy.description.replace('[نام شهر]', adGenCity).replace('[نام برند]', adGenBusinessName)}\n\n📞 شماره تماس مستقیم و مشاوره رایگان: ${adGenPhone}\nپاسخگویی شبانه‌روزی در سراسر ${adGenCity}.\n\n🔗 لینک محاسبه آنلاین و استعلام فوری فاکتور: https://noviniya.ir/demo`;
    const fullAd = `عنوان آگهی:\n${customTitle}\n\nتوضیحات:\n${customDesc}\n\nبرچسب‌ها:\n${adGenService.adCopy.tags.map((t) => `#${t}`).join(' ')}`;
    navigator.clipboard.writeText(fullAd);
    setAdCopied(true);
    setTimeout(() => setAdCopied(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-700">
      
      {/* Client Showcase Top Header (Snapp Style Clean White Navbar) */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          
          {/* Logo & Identity: Noviniya */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00D170] flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-gray-950">نوینیا</span>
                <span className="text-[10px] font-mono text-[#00D170] font-bold hidden sm:inline">Noviniya.ir</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A859] font-bold border border-emerald-200">
                  راهکار جامع فروش اصناف
                </span>
              </div>
              <p className="text-[11px] text-gray-500">همراه نوین و هوشمند کسب‌وکار شما</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-gray-600">
            <button 
              onClick={() => scrollToSection('primary-app-section')}
              className="text-[#00A859] hover:text-emerald-700 transition-colors"
            >
              وب‌اپلیکیشن اختصاصی اصناف
            </button>
            <button 
              onClick={() => scrollToSection('omnichannel-package-section')}
              className="hover:text-gray-950 transition-colors"
            >
              پکیج ۳۶۰° مارکتینگ
            </button>
            <button 
              onClick={() => scrollToSection('website-design-section')}
              className="hover:text-gray-950 transition-colors"
            >
              طراحی وب‌سایت
            </button>
            <button 
              onClick={() => scrollToSection('ad-creator-section')}
              className="hover:text-gray-950 transition-colors"
            >
              ابزار آگهی دیوار
            </button>
            <button 
              onClick={() => scrollToSection('roi-section')}
              className="hover:text-gray-950 transition-colors"
            >
              محاسبه سودآوری
            </button>
            <button 
              onClick={() => scrollToSection('about-us-section')}
              className="hover:text-gray-950 transition-colors"
            >
              درباره نوینیا
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Customer's Own Order Tracking Button */}
            <button
              onClick={() => setShowCustomerOrdersModal(true)}
              title="پیگیری سفارش‌های ثبت‌شده شما در نوینیا"
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200/80 border border-gray-200 rounded-xl text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-[#00A859]" />
              <span>پیگیری سفارش من</span>
              {leadsList.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#00D170] animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setConsultModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#00D170] hover:bg-[#00BD65] text-white text-xs font-black rounded-xl transition-all shadow-md shadow-emerald-500/25 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>دریافت دمو با برند شما</span>
            </button>

            {/* Switch to Admin Dashboard */}
            <button
              onClick={onSwitchToDashboard}
              title="ورود به پنل استراتژی و مدیریت"
              className="px-3 py-2 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 hover:text-gray-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden xl:inline text-[11px]">پنل استراتژی</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Snapp Visual Style with Clean Whitespace & Modern Graphics */}
      <section className="relative overflow-hidden pt-12 pb-18 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right Column: Hero Content */}
            <div className="lg:col-span-7 text-right">
              {/* Brand tagline pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A859] text-xs font-black mb-5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00D170] animate-pulse" />
                <span>نوینیا | همراه نوین و هوشمند کسب‌وکار شما</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-gray-950 leading-tight tracking-tight">
                تبدیل بازدیدکنندگان به <span className="text-[#00A859]">مشتریان قطعی و پول‌ساز</span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
                نه فقط دیوار! با <strong>وب‌اپلیکیشن اختصاصی هوشمند نوینیا</strong> در تمام کانال‌ها (آگهی‌های دیوار، لینک بیو اینستاگرام، پیام‌رسان‌های ایتا و واتساپ و بارکد شیشه مغازه)، مشتری همان لحظه قیمت و پیش‌فاکتور دقیق می‌بیند، شماره‌اش با پیامک ثبت می‌شود و آماده عقد قرارداد با شما تماس می‌گیرد.
              </p>

              {/* Channels badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#00A859]" /> آگهی‌های دیوار و شیپور
                </span>
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-500" /> بیو و هایلایت اینستاگرام
                </span>
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-cyan-600" /> کارت ویزیت و شیشه مغازه
                </span>
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold flex items-center gap-1.5">
                  <MessageSquareText className="w-3.5 h-3.5 text-amber-500" /> چت مستقیم ایتا و واتساپ
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>طراحی پیش‌نمایش رایگان برای صنف من</span>
                </button>

                <button
                  onClick={() => scrollToSection('primary-app-section')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-[#00A859]" />
                  <span>تست زنده وب‌اپلیکیشن صنف شما</span>
                  <ChevronRight className="w-4 h-4 rotate-180 text-gray-400" />
                </button>
              </div>

              {/* Key trust bullets */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-gray-600 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                  <span>تحویل ۲۴ ساعته</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                  <span>بدون نیاز به هاست و دامنه</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                  <span>لود فوق‌سریع در ۲ ثانیه</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                  <span>تسویه پس از رضایت ۱۰۰٪</span>
                </div>
              </div>
            </div>

            {/* Left Column: Snapp Style Graphic Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-b from-gray-50 to-emerald-50/40 p-6 rounded-3xl border border-gray-200/80 shadow-sm relative">
                <SnappStyleIllustration type="hero" />
                <div className="text-center mt-3">
                  <span className="text-xs font-bold text-gray-800">پیش‌نمایش ابزار فروش هوشمند نوینیا</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">طراحی شده مطابق استانداردهای مدرن سوپراپلیکیشن‌های پیشرو ایران</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: PRIMARY PLAN - 10 DEDICATED GUILD WEB APPS (Brought to the top) */}
      <section id="primary-app-section" className="py-16 border-b border-gray-200/80 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold mb-2">
                <Sparkles className="w-4 h-4 text-[#00A859]" />
                <span>پلن پایه و اختصاصی نوینیا (محور اصلی فروش اصناف)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950">
                وب‌اپلیکیشن اختصاصی، محاسبه‌گر و پیش‌فاکتور صنف خود را تست کنید
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                این ابزار اختصاصاً با نرخ‌ها، تعرفه‌ها، لوگو و شماره تماس شما ساخته می‌شود و مشتریان را پیش از تماس غربال و آماده معامله می‌کند:
              </p>
            </div>

            {/* Order custom app CTA */}
            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, planType: `وب‌اپلیکیشن اختصاصی: ${activeService.title}` }));
                setConsultModalOpen(true);
              }}
              className="px-4 py-2.5 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 self-start md:self-auto"
            >
              <span>سفارش اختصاصی همین ابزار</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors font-bold ${
                  selectedCategory === cat
                    ? 'bg-[#00D170] text-white shadow-sm shadow-emerald-500/20'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick service selector buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                  activeServiceId === service.id
                    ? 'bg-emerald-50/80 border-[#00D170] text-gray-950 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-bold">
                    رتبه {service.rank}
                  </span>
                  {activeServiceId === service.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00D170]" />
                  )}
                </div>
                <div className="text-xs font-black leading-snug line-clamp-1">{service.title}</div>
                <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">{service.category}</div>
              </button>
            ))}
          </div>

          {/* Active Live App Simulator Frame */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs text-[#00A859] font-bold">پیش‌نمایش زنده در حال اجرا:</span>
                <h3 className="text-lg font-black text-gray-950">{activeService.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{activeService.shortDesc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 hidden sm:inline">آزمایش بدون محدودیت اسلایدرها و دکمه‌ها:</span>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, planType: `وب‌اپلیکیشن اختصاصی: ${activeService.title}` }));
                    setConsultModalOpen(true);
                  }}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>سفارش با لوگوی من</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>

            {/* The Live Interactive Simulator */}
            <div className="max-w-3xl mx-auto">
              <ServiceSimulatorHost serviceId={activeServiceId} />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE 360° OMNICHANNEL MARKETING PACKAGE (Upsell Package) */}
      <section id="omnichannel-package-section" className="py-16 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#00A859] tracking-wider">پلن VIP و تکمیلی</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
              پکیج ۵ گانه ۳۶۰ درجه سیستم مارکتینگ و فروش نوینیا
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              اگر می‌خواهید علاوه بر وب‌اپلیکیشن، کارت ویزیت، لوکیشن، پیامک و پیج اینستاگرامتان هم کاملاً سیستم‌سازی شود:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div 
              onClick={() => setSelectedPillarModal(1)}
              className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-[#00D170] transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A859] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#00A859] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <span>مشاهده نمونه نوینیا</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
              <h3 className="text-base font-black text-gray-950 mb-2 group-hover:text-[#00A859] transition-colors">۱. کارت ویزیت دیجیتال هوشمند (VCF)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                مشتری با یک لمس، تمام شماره‌های تماس، آدرس، پیج اینستاگرام و کانال ایتا/تلگرام شما را مستقیماً داخل دفترچه تلفن گوشی خود ذخیره می‌کند.
              </p>
              <div className="mt-4 text-[11px] text-[#00A859] font-bold flex items-center gap-1">
                <span>ذخیره مستقیم در مخاطبین موبایل</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div 
              onClick={() => setSelectedPillarModal(2)}
              className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-cyan-500 transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200 flex items-center gap-1">
                  <span>مشاهده نمونه نوینیا</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
              <h3 className="text-base font-black text-gray-950 mb-2 group-hover:text-cyan-600 transition-colors">۲. مسیریابی فوری روی نشان و بلد</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                دکمه‌های اختصاصی برای باز کردن لوکیشن مغازه، دفتر کار یا کارگاه شما در اپلیکیشن‌های نشان، بلد و گوگل مپ با یک کلیک ساده.
              </p>
              <div className="mt-4 text-[11px] text-cyan-600 font-bold flex items-center gap-1">
                <span>هدایت مشتری حضوری پای معامله</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div 
              onClick={() => setSelectedPillarModal(3)}
              className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-amber-500 transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquareText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                  <span>مشاهده پیامک نمونه</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
              <h3 className="text-base font-black text-gray-950 mb-2 group-hover:text-amber-600 transition-colors">۳. اطلاع‌رسانی خودکار پیامکی</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                به محض ثبت استعلام یا فاکتور، هم برای مشتری پیامک تاییدیه می‌رود و هم شماره و جزئیات نیاز مشتری بلافاصله برای گوشی شما ارسال می‌شود.
              </p>
              <div className="mt-4 text-[11px] text-amber-600 font-bold flex items-center gap-1">
                <span>بدون از دست رفتن حتی ۱ مشتری</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div 
              onClick={() => setSelectedPillarModal(4)}
              className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-purple-500 transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <SplitSquareVertical className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1">
                  <span>تست اسلایدر قبل/بعد</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
              <h3 className="text-base font-black text-gray-950 mb-2 group-hover:text-purple-600 transition-colors">۴. اسلایدر لمسی قبل و بعد (Before/After)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                مخصوص اصناف دکوراسیون، سالن‌های زیبایی، دیتیلینگ خودرو یا دندانپزشکی؛ مشتری با کشیدن خط روی تصویر، نتیجه تحول کار شما را می‌بیند.
              </p>
              <div className="mt-4 text-[11px] text-purple-600 font-bold flex items-center gap-1">
                <span>اثبات غیرقابل انکار کیفیت کار</span>
              </div>
            </div>

            {/* Pillar 5 */}
            <div 
              onClick={() => setSelectedPillarModal(5)}
              className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-pink-500 transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <QrCode className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200 flex items-center gap-1">
                  <span>مشاهده نمونه کیت</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                </span>
              </div>
              <h3 className="text-base font-black text-gray-950 mb-2 group-hover:text-pink-600 transition-colors">۵. کیت آماده QR Code + بایو اینستاگرام</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                فایل چاپی باکیفیت بارکد اختصاصی با لوگوی شما برای چسباندن روی میز، استند یا شیشه، به همراه متن مهندسی‌شده و آماده کپی برای Bio پیج اینستاگرام.
              </p>
              <div className="mt-4 text-[11px] text-pink-600 font-bold flex items-center gap-1">
                <span>اتصال بازار سنتی و فضای مجازی</span>
              </div>
            </div>

            {/* CTA Box inside grid */}
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#00A859] font-black">پکیج پیشنهادی مدیران</span>
                <h3 className="text-base font-black text-gray-950 mt-3 mb-2">سفارش پکیج کامل ۳۶۰ درجه</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  تمام ۵ ابزار بالا در قالب یک سیستم هماهنگ با وب‌اپلیکیشن صنف شما ظرف ۲۴ ساعت کانفیگ و تحویل داده می‌شود.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, planType: 'پکیج کامل ۳۶۰ درجه مارکتینگ و فروش' }));
                  setConsultModalOpen(true);
                }}
                className="mt-6 w-full py-3 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
              >
                درخواست پیش‌فاکتور پکیج ۳۶۰°
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: NEW HIGH-TICKET SERVICE - WEBSITE DESIGN (طراحی سایت شرکتی و فروشگاهی) */}
      <section id="website-design-section" className="py-16 border-b border-gray-200/80 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xs">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A859] text-xs font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>خدمات رده‌بالا و معتبر نوینیا</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
                  به یک وب‌سایت رسمی، شرکتی یا فروشگاه آنلاین اختصاصی نیاز دارید؟
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  اگر علاوه بر وب‌اپلیکیشن‌های تعاملی سریع، به دنبال یک <strong>پایگاه اینترنتی دائمی با دامنه اختصاصی (.ir یا .com)، درگاه پرداخت مستقیم بانکی، نماد اعتماد الکترونیکی (اینماد) و ایمیل سازمانی</strong> هستید، تیم توسعه نوینیا آماده پیاده‌سازی پروژه‌های اختصاصی شماست.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                    <span>طراحی اختصاصی UI/UX بدون قالب‌های کپی</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                    <span>درگاه پرداخت آنلاین شتابی و زرین‌پال</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                    <span>بهینه‌سازی برای رتبه اول گوگل (سئو محلی)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#00A859] shrink-0" />
                    <span>پنل مدیریت فارسی، روان و بدون نیاز به تخصص فنی</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, planType: 'طراحی وب‌سایت شرکتی یا فروشگاهی اختصاصی' }));
                      setConsultModalOpen(true);
                    }}
                    className="px-6 py-3 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>مشاوره و برآورد هزینه طراحی سایت</span>
                  </button>
                  <span className="text-[11px] text-gray-500 font-semibold">تحویل ۷ تا ۱۴ روز کاری با پشتیبانی VIP</span>
                </div>
              </div>

              {/* Visual Card with Portfolio Mockups */}
              <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-xs font-bold text-gray-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>نمونه‌کارهای زنده وب‌سایت‌های نوینیا</span>
                  </span>
                  <span className="text-[10px] text-[#00A859] font-mono font-bold">طراحی ریسپانسیو</span>
                </div>

                {/* Portfolio Showcase Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-[#00D170] transition-colors shadow-xs">
                    <div className="w-full h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 mb-2 relative overflow-hidden">
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-[#00A859] font-bold">novin-med.ir</span>
                        <div className="text-[9px] text-gray-500">کلینیک فوق‌تخصصی رازی</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-gray-950">پورتال پزشکی و نوبت‌دهی</div>
                    <div className="text-[10px] text-gray-500">نوبت‌دهی آنلاین + پرونده</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-[#00D170] transition-colors shadow-xs">
                    <div className="w-full h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 mb-2 relative overflow-hidden">
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-cyan-600 font-bold">radmanesh-decor.com</span>
                        <div className="text-[9px] text-gray-500">مهندسی معماری و بازسازی</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-gray-950">سایت شرکتی دکوراسیون</div>
                    <div className="text-[10px] text-gray-500">گالری پروژه‌ها + استعلام</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-[#00D170] transition-colors shadow-xs">
                    <div className="w-full h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 mb-2 relative overflow-hidden">
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-amber-600 font-bold">atlas-freight.ir</span>
                        <div className="text-[9px] text-gray-500">هلدینگ ترابری و لجستیک</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-gray-950">سامانه باربری و ترانزیت</div>
                    <div className="text-[10px] text-gray-500">ردیابی بارنامه + فرم نرخ</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-[#00D170] transition-colors shadow-xs">
                    <div className="w-full h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 mb-2 relative overflow-hidden">
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-rose-500 font-bold">royallux-shop.ir</span>
                        <div className="text-[9px] text-gray-500">فروشگاه ساعت و اکسسوری</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-gray-950">فروشگاه آنلاین با اینماد</div>
                    <div className="text-[10px] text-gray-500">درگاه پرداخت شتاب + انبار</div>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 text-center pt-1 border-t border-gray-200">
                  همه وب‌سایت‌ها با دامنه اختصاصی، پروتکل SSL رایگان، سئو گوگل و پنل مدیریت فارسی تحویل می‌شوند.
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: IN-PAGE DIVAR AD GENERATOR FOR CLIENTS (Free Lead-Magnet) */}
      <section id="ad-creator-section" className="py-16 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#00A859] tracking-wider">هدیه رایگان نوینیا به صاحبان کسب‌وکار</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
              سازنده فوری متن آگهی دیوار با بالاترین زنگ‌خور
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              صنف، شهر و نام خود را وارد کنید تا یک متن آگهی مهندسی‌شده با قلاب روانی آماده انتشار در دیوار دریافت کنید:
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Inputs */}
              <div className="lg:col-span-5 space-y-4 text-xs">
                <div>
                  <label className="block text-gray-800 font-bold mb-1.5">انتخاب حوزه کاری و صنف شما:</label>
                  <select
                    value={adGenServiceId}
                    onChange={(e) => setAdGenServiceId(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none focus:border-[#00D170] font-medium"
                  >
                    {[
                      { id: 'renovation-calculator', label: 'دکوراسیون داخلی، کابینت و بازسازی مسکونی' },
                      { id: 'moving-freight-calculator', label: 'باربری، اتوبار و اسباب‌کشی درون‌شهری' },
                      { id: 'beauty-salon-booking', label: 'کلینیک پوست و مو، لیزر، دندانپزشکی و سالن زیبایی' },
                      { id: 'restaurant-qr-menu', label: 'کافه، رستوران، فست‌فود و سفارش‌گیری' },
                      { id: 'real-estate-calculator', label: 'دپارتمان املاک، خرید و فروش و رهن‌واجاره' },
                      { id: 'single-product-landing', label: 'فروشگاه آنلاین، لندینگ تک‌محصولی و پیج اینستاگرام' },
                      { id: 'digital-business-card', label: 'کارت ویزیت دیجیتال و معرفی رسمی پزشکان/وکلا/اصناف' },
                      { id: 'cleaning-carpet-calculator', label: 'خدمات نظافت منزل، قالیشویی و مبل‌شویی' },
                      { id: 'wedding-budget-calculator', label: 'تالار پذیرایی، باغ‌تالار و تشریفات مجالس' },
                      { id: 'guilds-tax-salary-calculator', label: 'حسابداری، مشاوره مالیاتی اصناف و حقوق کارگری' },
                    ].map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-1.5">شهر فعالیت شما (۱۰ کلانشهر اصلی یا شهر دیگر):</label>
                  <select
                    value={adGenCity}
                    onChange={(e) => setAdGenCity(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none focus:border-[#00D170] font-medium"
                  >
                    {divarMarketStats.topDemandCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="قم">قم</option>
                    <option value="سایر شهرها">سایر شهرستان‌ها و حومه</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-1.5">نام شما یا مجموعه:</label>
                  <input
                    type="text"
                    value={adGenBusinessName}
                    onChange={(e) => setAdGenBusinessName(e.target.value)}
                    placeholder="مثال: دکوراسیون رادمنش..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none focus:border-[#00D170]"
                  />
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-1.5">شماره تماس جهت درج در آگهی:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={adGenPhone}
                    onChange={(e) => setAdGenPhone(e.target.value)}
                    placeholder="۰۹۱۲..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-gray-900 text-right font-mono focus:outline-none focus:border-[#00D170]"
                  />
                </div>
              </div>

              {/* Output Preview */}
              <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 text-xs">
                    <span className="font-bold text-[#00A859]">پیش‌نمایش آگهی دیوار آماده انتشار:</span>
                    <button
                      onClick={handleCopyClientAd}
                      className="px-3.5 py-1.5 bg-[#00D170] hover:bg-[#00BD65] text-white font-black rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {adCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{adCopied ? 'کپی شد!' : 'کپی کل متن آگهی'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-gray-950 font-bold mb-2">
                    {adGenService.adCopy.suggestedTitle} در {adGenCity}
                  </div>

                  <div className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto pl-1">
                    {`به نام خدا\nارائه خدمات تخصصی در سراسر ${adGenCity} و حومه\n\n${adGenService.adCopy.description.replace('[نام شهر]', adGenCity).replace('[نام برند]', adGenBusinessName)}\n\n📞 شماره تماس مستقیم و مشاوره رایگان: ${adGenPhone}\nپاسخگویی شبانه‌روزی در ${adGenCity}.\n\n🔗 استعلام آنلاین قیمت و فاکتور فوری: https://noviniya.ir/demo`}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span>💡 <strong>پیشنهاد نوینیا:</strong> برای ۳ برابر شدن زنگ‌خور، لینک محاسبه‌گر را در آگهی قرار دهید.</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ROI & Profit Calculator Section */}
      <section id="roi-section" className="py-16 border-b border-gray-200/80 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-bold text-[#00A859] tracking-wider">سودآوری و محاسبه بازگشت وجه</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
              چقدر از هزینه تبلیغات شما در حال حاضر هدر می‌رود؟
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              هزینه ماهانه تبلیغات دیوار، اینستاگرام یا تراکت‌های خود را مشخص کنید تا ببینید سیستم نوینیا چقدر درآمد اضافه خلق می‌کند:
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-gray-700 font-bold">هزینه ماهانه تبلیغات در دیوار یا اینستاگرام:</span>
                    <span className="font-mono text-[#00A859] font-bold text-sm">
                      {monthlyAdBudget.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={15000000}
                    step={500000}
                    value={monthlyAdBudget}
                    onChange={(e) => setMonthlyAdBudget(Number(e.target.value))}
                    className="w-full accent-[#00D170] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>۱ میلیون</span>
                    <span>۱۵ میلیون تومان</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-gray-700 font-bold">تعداد تماس‌های فعلی در ماه (با روش‌های سنتی):</span>
                    <span className="font-mono text-[#00A859] font-bold text-sm">
                      {currentCalls} تماس
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={currentCalls}
                    onChange={(e) => setCurrentCalls(Number(e.target.value))}
                    className="w-full accent-[#00D170] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>۵ تماس</span>
                    <span>۱۰۰ تماس</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 leading-relaxed">
                  💡 <strong className="text-gray-900">نکته تجربی:</strong> بدون افزایش یک ریال بودجه تبلیغاتی، فقط با افزودن لینک وب‌اپلیکیشن به انتهای آگهی یا بایو پیج، بیش از ۷۰ درصد از کاربران کنجکاو تبدیل به مشتری قطعی می‌شوند.
                </div>
              </div>

              {/* Output Result Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8 rounded-3xl border border-emerald-200 text-center relative overflow-hidden shadow-xs">
                <div className="text-xs font-bold text-gray-600 mb-2">پیش‌بینی نتیجه بعد از اتصال سیستم نوینیا</div>
                
                <div className="text-4xl sm:text-5xl font-black text-[#00A859] my-3 font-mono">
                  {estimatedCallsWithApp} تماس قطعی
                </div>
                
                <div className="text-xs text-[#00A859] font-black mb-6">
                  + {extraLeads} شماره تماس ذخیره‌شده از مشتریان جدید
                </div>

                <div className="grid grid-cols-2 gap-3 text-right border-t border-gray-200 pt-4 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[11px]">تماس‌های قبلی:</span>
                    <span className="font-bold text-gray-800">{currentCalls} تماس</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">افزایش اثربخشی:</span>
                    <span className="font-bold text-[#00A859] font-mono">+۲۸۰٪ رشد</span>
                  </div>
                </div>

                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="w-full mt-6 py-3.5 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
                >
                  می‌خواهم این نتیجه را تجربه کنم
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Us & Our Mission Section */}
      <section id="about-us-section" className="py-16 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[#00A859] tracking-wider">درباره نوینیا</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                همراه نوین و هوشمند کسب‌وکار شما
              </h2>
            </div>

            <div className="prose prose-neutral max-w-none text-gray-700 text-xs sm:text-sm leading-relaxed space-y-4 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
              <p>
                <strong>«نوینیا» (Noviniya.ir)</strong> با یک هدف روشن متولد شده است: از بین بردن فاصله بین تبلیغات و پول نقد برای اصناف و کسب‌وکارهای ایرانی. ما به خوبی می‌دانیم که کارفرمایان و متخصصان فرصت و حوصله سر و کله زدن با مفاهیم فنی پیچیده را ندارند و تنها چیزی که می‌خواهند، <strong>«جذب مشتری واقعی و باکیفیت»</strong> است.
              </p>
              <p>
                تخصص ما، ساخت ابزارهای تعاملی مدرن، وب‌اپلیکیشن‌های فوری و وب‌سایت‌های بهینه‌ای است که دقیقاً در نقطه تصمیم‌گیری مشتری (در آگهی دیوار، بیو اینستاگرام یا بارکد مغازه) قرار می‌گیرند و مشتری را با پیش‌فاکتور شفاف، محاسبه‌گر آنلاین و نوبت‌دهی آنی به سمت قرارداد هدایت می‌کنند.
              </p>
              
              {/* Core Promises with Illustrations */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 not-prose">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center">
                  <SnappStyleIllustration type="mobile_speed" />
                  <div className="text-xs font-bold text-gray-950 mb-1 mt-2">سرعت در تحویل</div>
                  <div className="text-[11px] text-gray-500">تحویل وب‌اپلیکیشن‌ها ظرف ۲۴ ساعت کاری بدون معطلی.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center">
                  <SnappStyleIllustration type="security" />
                  <div className="text-xs font-bold text-gray-950 mb-1 mt-2">تضمین رضایت ۱۰۰٪</div>
                  <div className="text-[11px] text-gray-500">ابتدا دمو را روی گوشی خود می‌بینید؛ بدون رضایت، ریالی دریافت نمی‌شود.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center">
                  <SnappStyleIllustration type="sms_direct" />
                  <div className="text-xs font-bold text-gray-950 mb-1 mt-2">پشتیبانی دائمی نرخ‌ها</div>
                  <div className="text-[11px] text-gray-500">تغییر تعرفه‌ها و قیمت‌های صنف شما در هر زمان زیر نیم ساعت.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-16 border-b border-gray-200/80 bg-gray-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#00A859] tracking-wider">شفافیت کامل</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
              سوالات متداول اصناف و کارفرمایان
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-bold text-gray-950 flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#00A859] shrink-0" />
                <span>آیا می‌توانم این ابزار را در پیج اینستاگرام و کانال ایتا هم استفاده کنم؟</span>
              </h4>
              <p className="text-gray-600 leading-relaxed pr-6">
                دقیقاً! این لینک به عنوان یک لینک چندکاره در بیو پیج اینستاگرام، هایلایت‌ها و استوری‌ها قرار می‌گیرد. همچنین فایل چاپی بارکد QR با لوگوی شما تحویل می‌شود تا روی میز کار یا شیشه مغازه بچسبانید.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-bold text-gray-950 flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#00A859] shrink-0" />
                <span>چطور این ابزار را در آگهی دیوار خود قرار دهم؟</span>
              </h4>
              <p className="text-gray-600 leading-relaxed pr-6">
                در آگهی‌های دیوار می‌توانید لینک وب‌اپلیکیشن اختصاصی خود را در فیلد «لینک وب‌سایت» بگذارید یا در متن آگهی بنویسید: «جهت محاسبه آنلاین و فوری قیمت روی لینک وب‌سایت کلیک کنید».
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-bold text-gray-950 flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#00A859] shrink-0" />
                <span>تفاوت وب‌اپلیکیشن با طراحی سایت کامل چیست؟</span>
              </h4>
              <p className="text-gray-600 leading-relaxed pr-6">
                وب‌اپلیکیشن یک ابزار تخصصی و فوق‌سریع برای محاسبه قیمت، نوبت‌دهی یا فروش تک‌محصولی است که در ۲ ثانیه روی گوشی باز می‌شود و ۲۴ ساعته تحویل می‌گردد. در حالی که طراحی وب‌سایت کامل برای شرکت‌هایی است که نیاز به ده‌ها صفحه، وبلاگ، اینماد و فروشگاه جامع دارند که تیم نوینیا هر دو خدمت را ارائه می‌دهد.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-bold text-gray-950 flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#00A859] shrink-0" />
                <span>اگر قیمت‌ها یا خدمات من در طول سال تغییر کرد چه کنم؟</span>
              </h4>
              <p className="text-gray-600 leading-relaxed pr-6">
                تیم پشتیبانی نوینیا با یک پیام ساده در ایتا یا واتساپ ظرف کمتر از ۳۰ دقیقه قیمت‌ها، آیتم‌ها، تصاویر یا شماره‌های تماس شما را در ابزار به‌روزرسانی می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Contact Bar (Snapp Style Sticky Action) */}
      <div className="sticky bottom-0 z-30 w-full bg-white/95 border-t border-gray-200 backdrop-blur-md p-3.5 sm:p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D170] animate-ping" />
            <span>مشاوره و ساخت دمو اولیه با برند صنف شما در نوینیا کاملاً رایگان است.</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setConsultModalOpen(true)}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>درخواست تماس و ساخت دمو اختصاصی</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer & Contact Details: Noviniya */}
      <footer className="bg-gray-100 border-t border-gray-200 py-12 text-gray-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-gray-950 font-black text-base mb-2">
                <Zap className="w-4 h-4 text-[#00A859]" />
                <span>نوینیا (Noviniya.ir)</span>
              </div>
              <p className="text-gray-500 leading-relaxed text-[11px]">
                همراه نوین و هوشمند کسب‌وکار شما. طراحی اختصاصی وب‌اپلیکیشن‌های تعاملی، سیستم‌های مارکتینگ ۳۶۰ درجه و وب‌سایت‌های شرکتی و فروشگاهی برای سراسر کشور.
              </p>
            </div>

            <div>
              <div className="text-gray-950 font-bold text-xs mb-3">راه‌های ارتباط و ثبت سفارش</div>
              <ul className="space-y-2 text-[11px] text-gray-500">
                <li>🌐 وب‌سایت رسمی: noviniya.ir</li>
                <li>📞 پاسخگویی مستقیم و مشاوره: ۹ الی ۲۱ همه روزه</li>
                <li>💬 پیام‌رسان‌ها (ایتا، بله، واتساپ، تلگرام)</li>
                <li>⚡ تحویل فوری پروژه‌ها به سراسر کشور</li>
              </ul>
            </div>

            <div>
              <div className="text-gray-950 font-bold text-xs mb-3">دسترسی سریع</div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <button onClick={() => scrollToSection('primary-app-section')} className="hover:text-[#00A859]">وب‌اپلیکیشن‌ها</button>
                <span>•</span>
                <button onClick={() => scrollToSection('omnichannel-package-section')} className="hover:text-[#00A859]">پکیج ۳۶۰°</button>
                <span>•</span>
                <button onClick={() => scrollToSection('website-design-section')} className="hover:text-[#00A859]">طراحی سایت</button>
                <span>•</span>
                <button onClick={() => scrollToSection('about-us-section')} className="hover:text-[#00A859]">درباره نوینیا</button>
                <span>•</span>
                <button onClick={onSwitchToDashboard} className="text-amber-600 hover:text-amber-700 font-bold">پنل استراتژی</button>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-gray-500">
            تمامی حقوق مادی و معنوی متعلق به پلتفرم نوینیا (Noviniya.ir) است. همراه نوین و هوشمند کسب‌وکار شما.
          </div>
        </div>
      </footer>

      {/* Free Demo Request Modal with Plan Selection (Snapp Light Theme) */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setConsultModalOpen(false)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00A859] flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-gray-950 mb-2">درخواست شما در نوینیا با موفقیت ثبت شد</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  کارشناس ما ظرف کمتر از ۱ ساعت با شما تماس می‌گیرد و لینک پیش‌نمایش اختصاصی صنف شما را روی واتساپ یا ایتا ارسال خواهد کرد.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>نوینیا | پیش‌نمایش رایگان بدون پرداخت هیچ وجهی</span>
                </div>
                <h3 className="text-lg font-black text-gray-950 mb-2">دریافت دمو اختصاصی با نام کسب‌وکار شما</h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  اطلاعات خود را وارد کنید تا نمونه اولیه با برند و تعرفه شما آماده شود:
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-gray-800 font-bold mb-1">پلن مورد نظر شما:</label>
                    <select
                      value={formData.planType}
                      onChange={(e) => setFormData({ ...formData, planType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-xs focus:outline-none focus:border-[#00D170]"
                    >
                      <option value="پلن اختصاصی وب‌اپلیکیشن (محاسبه‌گر صنف)">۱. پلن پایه: وب‌اپلیکیشن اختصاصی (محاسبه‌گر و پیش‌فاکتور)</option>
                      <option value="پکیج کامل ۳۶۰ درجه مارکتینگ و فروش">۲. پلن VIP: پکیج کامل ۳۶۰ درجه (وب‌اپ + کارت دیجیتال + پیامک + بارکد)</option>
                      <option value="طراحی وب‌سایت شرکتی یا فروشگاهی اختصاصی">۳. طراحی وب‌سایت شرکتی یا فروشگاهی اختصاصی با دامنه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-bold mb-1">نام یا عنوان کسب‌وکار:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: کلینیک رازی، دکوراسیون نوین، اتوبار پردیس..."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00D170] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-800 font-bold mb-1">صنف یا حوزه فعالیت:</label>
                    <select
                      value={formData.jobCategory}
                      onChange={(e) => setFormData({ ...formData, jobCategory: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-xs focus:outline-none focus:border-[#00D170]"
                    >
                      <option value="دکوراسیون و بازسازی">دکوراسیون، کابینت و بازسازی</option>
                      <option value="باربری و اتوبار">باربری و اسباب‌کشی</option>
                      <option value="زیبایی و کلینیک‌های سلامت">زیبایی، پوست و مو، کلینیک و دندانپزشکی</option>
                      <option value="تشریفات و تالار مجالس">تشریفات مجالس، باغ‌تالار و عروسی</option>
                      <option value="کافه و رستوران">کافه، قلیان، فست‌فود و رستوران</option>
                      <option value="املاک و ساختمانی">املاک، رهن و اجاره، ساخت‌وساز</option>
                      <option value="فروشگاهی و آنلاین">فروشگاه آنلاین و لندینگ تک‌محصولی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-bold mb-1">شماره همراه (جهت ارسال لینک دمو):</label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="0912..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-right placeholder:text-gray-400 focus:outline-none focus:border-[#00D170] font-mono text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-3.5 bg-[#00D170] hover:bg-[#00BD65] text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ارسال و دریافت پیش‌نمایش در ۲۴ ساعت</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Tracking Modal: "پیگیری سفارش من" (Snapp Light Theme) */}
      {showCustomerOrdersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowCustomerOrdersModal(false)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00A859] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-950">پیگیری وضعیت سفارش و پیش‌نمایش شما</h3>
                <p className="text-xs text-gray-500">سفارش‌ها و دموهای درخواستی شما در پلتفرم نوینیا</p>
              </div>
            </div>

            {/* Active SMS Gateway indicator */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00A859] text-xs mb-4 flex items-start gap-2.5">
              <MessageSquareText className="w-4 h-4 shrink-0 mt-0.5 text-[#00A859]" />
              <div className="leading-relaxed">
                <strong>سامانه اطلاع‌رسانی پیامک فعال است:</strong> وضعیت آماده‌سازی وب‌اپلیکیشن و لینک دمو به صورت لحظه‌ای از طریق پیامک برای شماره همراه شما ارسال می‌شود.
              </div>
            </div>

            {/* Orders List */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-3">
              {leadsList.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-xs space-y-3">
                  <p>شما هنوز سفارشی ثبت نکرده‌اید.</p>
                  <button
                    onClick={() => {
                      setShowCustomerOrdersModal(false);
                      setConsultModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#00D170] hover:bg-[#00BD65] text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    ثبت رایگان سفارش پیش‌نمایش با لوگوی شما
                  </button>
                </div>
              ) : (
                leadsList.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-950 text-sm">{lead.businessName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-[#00A859] font-bold">
                          {lead.jobCategory}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#00A859] font-bold bg-white px-2 py-1 rounded-md border border-gray-200">
                        {lead.trackingCode || 'NV-249018'}
                      </span>
                    </div>

                    <div className="text-gray-600 text-xs">
                      پلن: <span className="text-gray-950 font-bold">{lead.planType}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">وضعیت فعلی سفارش:</span>
                      <span className="text-[#00A859] font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00D170] animate-ping" />
                        <span>آماده‌سازی پیش‌نمایش در ۲۴ ساعت</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
                      <span>شماره ثبت‌شده: {lead.phone}</span>
                      <span>{lead.date} - ساعت {lead.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 mt-4">
              <span>تعداد سفارش‌های شما: <strong className="text-gray-950">{leadsList.length}</strong></span>
              <button
                onClick={() => setShowCustomerOrdersModal(false)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
              >
                بستن
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Real-time SMS Toast Alert (Fires when lead registers) */}
      {activeSmsToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-[#00D170] rounded-2xl p-4 shadow-xl shadow-emerald-500/20 animate-bounce">
          <div className="flex items-start justify-between gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A859] flex items-center justify-center shrink-0">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-gray-950">پیامک نوینیا ارسال شد</span>
                <span className="text-gray-400 font-mono text-[10px]">{activeSmsToast.time}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {activeSmsToast.text}
              </p>
              <div className="mt-2 text-[10px] text-[#00A859] font-mono font-bold">
                گیرنده: {activeSmsToast.phone}
              </div>
            </div>
            <button
              onClick={() => setActiveSmsToast(null)}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5-Pack Pillars Live Sample Preview Modal (Snapp Light Theme) */}
      {selectedPillarModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedPillarModal(null)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Pillar 1 Sample: Digital Card */}
            {selectedPillarModal === 1 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold mb-1">
                  <Smartphone className="w-4 h-4" />
                  <span>نمونه زنده پکیج ۳۶۰° | کارت ویزیت دیجیتال نوینیا</span>
                </div>
                <h3 className="text-base font-black text-gray-950 mb-3">کارت ویزیت هوشمند (vCard)</h3>
                
                {/* Visual Phone Mockup */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-center mb-4 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#00D170] flex items-center justify-center mx-auto text-white font-black text-xl shadow-md shadow-emerald-500/20">
                    <Zap className="w-8 h-8 fill-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-950">پلتفرم هوشمند نوینیا</h4>
                    <p className="text-[11px] text-[#00A859] font-mono font-bold">noviniya.ir/card</p>
                    <p className="text-[11px] text-gray-500 mt-1">توسعه سیستم‌های فروش و وب‌اپلیکیشن‌های تعاملی اصناف</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a
                      href="tel:09120000000"
                      className="py-2.5 px-3 bg-[#00D170] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>تماس مستقیم</span>
                    </a>
                    <button
                      onClick={() => alert('شماره در مخاطبین گوشی با موفقیت ذخیره شد (فایل vcf)')}
                      className="py-2.5 px-3 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-gray-200"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00A859]" />
                      <span>ذخیره در مخاطبین</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  این کارت اختصاصی با نام، عکس، لوگو و شبکه‌های اجتماعی کسب‌وکار شما ساخته می‌شود و مشتری با یک لمس، تمام شماره‌هایتان را در گوشی‌اش ذخیره می‌کند.
                </p>
              </div>
            )}

            {/* Pillar 2 Sample: GPS / Navigation */}
            {selectedPillarModal === 2 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-cyan-600 font-bold mb-1">
                  <Compass className="w-4 h-4" />
                  <span>نمونه زنده پکیج ۳۶۰° | هدایت مشتری پای معامله</span>
                </div>
                <h3 className="text-base font-black text-gray-950 mb-3">مسیریابی هوشمند نشان، بلد و اسنپ</h3>
                
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-800">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>آدرس ثبت‌شده دفتر مرکزی: تهران، جردن، برج ملت، واحد ۳۰۲</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                    <button className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-cyan-500 text-center font-bold text-cyan-700 shadow-xs">
                      مسیریابی در نشان
                    </button>
                    <button className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-cyan-500 text-center font-bold text-cyan-700 shadow-xs">
                      مسیریابی در بلد
                    </button>
                    <button className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-cyan-500 text-center font-bold text-cyan-700 shadow-xs">
                      Google Maps
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  با این ابزار، مشتری بدون سردرگمی در ترافیک یا پیدا کردن پلاک، مستقیماً با مسیریاب محبوب خود درب مغازه یا دفتر شما پیاده می‌شود.
                </p>
              </div>
            )}

            {/* Pillar 3 Sample: SMS Notification */}
            {selectedPillarModal === 3 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-600 font-bold mb-1">
                  <MessageSquareText className="w-4 h-4" />
                  <span>نمونه زنده پکیج ۳۶۰° | اطلاع‌رسانی پیامکی آنی</span>
                </div>
                <h3 className="text-base font-black text-gray-950 mb-3">پیامک خودکار به مشتری و صاحب صنف</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                    <span className="text-[10px] text-amber-600 font-bold block mb-1">پیامک ارسالی به صاحب کسب‌وکار (گوشی شما):</span>
                    <p className="text-gray-800 leading-relaxed">
                      «نوینیا: یک مشتری جدید استعلام ثبت کرد! نام: علیرضا محمدی | متراژ: ۱۱۰ متر | شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹ - تماس سریع جهت بستن قرارداد»
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                    <span className="text-[10px] text-[#00A859] font-bold block mb-1">پیامک تاییدیه ارسالی به مشتری:</span>
                    <p className="text-gray-800 leading-relaxed">
                      «با سپاس از استعلام شما در مجموعه [نام برند شما]. پیش‌فاکتور با موفقیت صادر شد؛ کارشناس ما ظرف ۳۰ دقیقه جهت هماهنگی تماس می‌گیرد. noviniya.ir»
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  سیستم پیامک باعث می‌شود حتی زمانی که خواب هستید، مشتری حس کند یک سازمان منظم و هوشمند ۲۴ ساعته پاسخگوی اوست.
                </p>
              </div>
            )}

            {/* Pillar 4 Sample: Interactive Before/After */}
            {selectedPillarModal === 4 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-purple-600 font-bold mb-1">
                  <SplitSquareVertical className="w-4 h-4" />
                  <span>نمونه زنده پکیج ۳۶۰° | اسلایدر لمسی تحول کیفیت</span>
                </div>
                <h3 className="text-base font-black text-gray-950 mb-3">اسلایدر تعاملی قبل و بعد (Before & After)</h3>
                
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center">
                    {/* Before Half */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-start p-4 text-xs font-bold text-slate-400"
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    >
                      <span className="bg-slate-950/80 px-2 py-1 rounded border border-slate-700">قبل از کار: فرسوده و نامرتب</span>
                    </div>

                    {/* After Half */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-teal-900 flex items-center justify-end p-4 text-xs font-bold text-emerald-300"
                      style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                    >
                      <span className="bg-slate-950/80 px-2 py-1 rounded border border-emerald-500/40">بعد از کار: بازسازی لوکس ژورنالی</span>
                    </div>

                    {/* Divider Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    />
                  </div>

                  <div className="mt-3">
                    <span className="text-[11px] text-gray-500 block mb-1">خط را به چپ و راست بکشید:</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  مخصوص سالن‌های زیبایی، بازسازی ساختمان، کلینیک‌ها و دندانپزشکی که می‌خواهند تفاوت هنر خود را به چشم مشتری ثابت کنند.
                </p>
              </div>
            )}

            {/* Pillar 5 Sample: QR Code Kit & Bio */}
            {selectedPillarModal === 5 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-pink-600 font-bold mb-1">
                  <QrCode className="w-4 h-4" />
                  <span>نمونه زنده پکیج ۳۶۰° | کیت بارکد اختصاصی و Bio اینستاگرام</span>
                </div>
                <h3 className="text-base font-black text-gray-950 mb-3">اتصال شیشه مغازه و اینستاگرام به وب‌اپلیکیشن</h3>
                
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4 space-y-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white p-2 rounded-2xl border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
                      <QrCode className="w-16 h-16 text-gray-900" />
                    </div>
                    <div className="space-y-1">
                      <strong className="text-gray-950 block">فایل چاپی با کیفیت ۳۰۰ DPI</strong>
                      <span className="text-[11px] text-gray-500 block">آماده چاپ روی استند رومیزی کافه، شیشه مغازه یا کاتالوگ نمایشگاهی</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-gray-200 space-y-1">
                    <div className="text-[10px] text-pink-600 font-bold">متن مهندسی‌شده آماده کپی برای Bio اینستاگرام:</div>
                    <p className="text-[11px] text-gray-800 font-mono">
                      ✨ [نام برند] | استعلام آنلاین هزینه در ۳۰ ثانیه 👇
                      <br />🔗 noviniya.ir/demo
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  با این کیت، حتی عابر پیاده‌ای که شب از جلوی مغازه بسته شما رد می‌شود، با اسکن شیشه وارد وب‌اپ شده و شماره‌اش ثبت می‌شود.
                </p>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedPillarModal(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors"
              >
                بستن پیش‌نمایش
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
