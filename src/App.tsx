import React, { useState, useEffect } from 'react';
import { servicesData } from './data/servicesData';
import { DivarService, CategoryFilter } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceCard } from './components/ServiceCard';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceSimulatorHost } from './components/ServiceSimulatorHost';
import { DivarAdGenerator } from './components/DivarAdGenerator';
import { MarketAnalysisSection } from './components/MarketAnalysisSection';
import { IncomeCalculator } from './components/IncomeCalculator';
import { RoadmapSection } from './components/RoadmapSection';
import { Footer } from './components/Footer';
import { ClientShowcaseView } from './components/ClientShowcaseView';
import { Search, Play, Filter, Sparkles, Eye, Layers, Send, X, PhoneCall, MessageSquareText, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Current view mode: 'client' (Public Customer Facing Showcase) or 'admin' (Internal Strategy & Prompts Dashboard)
  const [currentView, setCurrentView] = useState<'client' | 'admin'>('client');

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('همه');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal state
  const [activeModalService, setActiveModalService] = useState<DivarService | null>(null);
  const [modalDefaultTab, setModalDefaultTab] = useState<'demo' | 'ad' | 'pitch' | 'prompt' | 'why'>('demo');

  // Interactive Live Showcase State
  const [showcaseServiceId, setShowcaseServiceId] = useState<string>(servicesData[0].id);

  // Leads list synced from localStorage
  const [leadsList, setLeadsList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('noviniya_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showAdminLeadsModal, setShowAdminLeadsModal] = useState<boolean>(false);

  // Sync leads from localStorage on view changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noviniya_leads');
      if (saved) setLeadsList(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, [currentView, showAdminLeadsModal]);

  const categories: CategoryFilter[] = [
    'همه',
    'ساختمان و فنی',
    'حمل‌ونقل',
    'زیبایی و کلینیک‌ها',
    'تشریفات و مجالس',
    'کافه و غذا',
    'املاک و مالی',
    'دیجیتال و فروش',
  ];

  // Filtering
  const filteredServices = servicesData.filter((s) => {
    const matchesCategory = selectedCategory === 'همه' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.adCopy.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetails = (service: DivarService, tab: 'demo' | 'ad' | 'pitch' | 'prompt' | 'why' = 'ad') => {
    setActiveModalService(service);
    setModalDefaultTab(tab);
  };

  const handleTestDemo = (service: DivarService) => {
    setActiveModalService(service);
    setModalDefaultTab('demo');
  };

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showcaseService = servicesData.find((s) => s.id === showcaseServiceId) || servicesData[0];

  // If Client View is active, render the dedicated public portfolio view
  if (currentView === 'client') {
    return (
      <div className="relative">
        {/* Floating Switcher to Admin Dashboard for owner convenience */}
        <div className="fixed top-20 left-4 z-50">
          <button
            onClick={() => setCurrentView('admin')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-amber-400 text-xs font-bold border border-amber-500/40 shadow-xl backdrop-blur-md hover:bg-slate-800 transition-all hover:scale-105"
            title="رفتن به داشبورد مدیریت و مهندسی پرامپت‌ها"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>داشبورد استراتژی شما</span>
          </button>
        </div>

        <ClientShowcaseView onSwitchToDashboard={() => setCurrentView('admin')} />
      </div>
    );
  }

  // Otherwise, render the Internal Admin/Strategy Dashboard
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Top Banner indicating Admin Mode with quick switch */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs flex items-center justify-between text-amber-300">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>شما در پنل استراتژی و مدیریت هستید:</strong> اینجا شامل فیلم‌نامه‌های تلفنی، پرامپت‌های گوگل استودیو و تحلیل‌های دیوار است.</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Admin Leads button */}
          <button
            onClick={() => setShowAdminLeadsModal(true)}
            className="px-3 py-1 bg-slate-900 border border-amber-500/40 hover:bg-slate-800 text-amber-300 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>سفارش‌ها و سرنخ‌ها</span>
            {leadsList.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {leadsList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('client')}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg text-xs transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>دیدن صفحه نهایی مشتری (نوینیا)</span>
          </button>
        </div>
      </div>

      {/* Top Header */}
      <Header 
        onSelectNav={handleScrollTo} 
        onSwitchToClientView={() => setCurrentView('client')}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => handleScrollTo('services-section')}
        onAdGenClick={() => handleScrollTo('ad-generator-section')}
      />

      {/* Main 10 Services Section */}
      <section id="services-section" className="py-16 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>بررسی موشکافانه ۱۰ فرصت طلایی بازار دیوار</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-100">
                فهرست ۱۰ خدمت پربازدید با بیشترین زنگ‌خور و درآمد
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                هر کدام از این خدمات همراه با متن آماده آگهی، اسکریپت تلفنی، دموی زنده و پرامپت ساخت در گوگل استودیو است.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="جستجوی خدمت یا کلمه کلیدی..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 text-xs">
            <span className="flex items-center gap-1 text-neutral-400 ml-2 shrink-0">
              <Filter className="w-3 h-3" />
              <span>دسته‌بندی:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-neutral-900/50 rounded-2xl border border-neutral-800 text-neutral-400 text-xs">
              خدمتی با این کلمه کلیدی پیدا نشد. لطفاً عبارت دیگری را جستجو کنید.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpenDetails={(s) => handleOpenDetails(s, 'ad')}
                  onTestDemo={(s) => handleTestDemo(s)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Simulators Showcase Section */}
      <section id="simulators-section" className="py-16 border-b border-neutral-800/80 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-2">
            <Play className="w-3.5 h-3.5 text-amber-500" />
            <span>جعبه‌ابزار دمو و آزمایش زنده</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-100">
            شبیه‌ساز زنده هر ۱۰ ابزار پرزنگ‌خور دیوار
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            ابزار مورد نظر را از نوار زیر انتخاب کنید و عملکرد واقعی آن را دقیقاً همان‌طور که مشتری نهایی در موبایلش تجربه می‌کند، تست نمایید:
          </p>

          {/* Quick service selector buttons */}
          <div className="mt-6 flex flex-wrap gap-2 pb-2">
            {servicesData.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShowcaseServiceId(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                  showcaseServiceId === s.id
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75">#{s.rank}</span>
                <span>{s.title.split(' ')[0]} {s.title.split(' ')[1]} {s.title.split(' ')[2]}</span>
              </button>
            ))}
          </div>

          {/* Live Simulator Viewport */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-xs text-neutral-400">
              <span className="font-bold text-neutral-200">
                در حال نمایش: {showcaseService.title}
              </span>
              <button
                type="button"
                onClick={() => handleOpenDetails(showcaseService, 'prompt')}
                className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
              >
                دریافت پرامپت ساخت این ابزار در استودیو →
              </button>
            </div>
            
            <ServiceSimulatorHost serviceId={showcaseServiceId} />
          </div>
        </div>
      </section>

      {/* Divar Ad Generator */}
      <DivarAdGenerator />

      {/* Market Analysis & Buyer Psychology */}
      <MarketAnalysisSection />

      {/* Monthly Income Potential Calculator */}
      <IncomeCalculator />

      {/* 4-Step Roadmap */}
      <RoadmapSection />

      {/* Footer */}
      <Footer />

      {/* Service Detail Modal */}
      {activeModalService && (
        <ServiceDetailModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          defaultTab={modalDefaultTab}
        />
      )}

      {/* Admin Leads / Orders Modal */}
      {showAdminLeadsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowAdminLeadsModal(false)}
              className="absolute top-5 left-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">داشبورد سفارش‌ها و لیدهای دریافتی (دید مدیریت)</h3>
                <p className="text-xs text-neutral-400">تمام مشتریانی که از طریق وب‌اپلیکیشن‌ها، دموها یا فرم‌های مشاوره درخواست ثبت کرده‌اند.</p>
              </div>
            </div>

            {/* Direct SMS Gateway Info Banner */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-4 flex items-start gap-2.5">
              <MessageSquareText className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <div className="leading-relaxed">
                <strong>سامانه اطلاع‌رسانی پیامک زنده فعال است:</strong> علاوه بر ذخیره‌سازی در این پنل، پیامک آنی وب‌هوک به شماره شما ارسال می‌شود و پیامک تاییدیه برای موبایل مشتری فرستاده خواهد شد.
              </div>
            </div>

            {/* Leads List */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-3">
              {leadsList.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs">
                  هنوز سفارشی ثبت نشده است. می‌توانید در صفحه مشتری یا دموها یک درخواست نمونه ثبت کنید تا بلافاصله اینجا مشاهده کنید.
                </div>
              ) : (
                leadsList.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">{lead.businessName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                          {lead.jobCategory}
                        </span>
                      </div>
                      <div className="text-neutral-400 text-[11px] mb-1">
                        پلن انتخابی: <span className="text-neutral-200">{lead.planType}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        تاریخ ثبت: {lead.date} - ساعت {lead.time}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href={`tel:${lead.phone}`}
                        className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-mono font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{lead.phone}</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400 mt-4">
              <span>تعداد کل لیدها: <strong className="text-white">{leadsList.length} مورد</strong></span>
              {leadsList.length > 0 && (
                <button
                  onClick={() => {
                    localStorage.removeItem('noviniya_leads');
                    setLeadsList([]);
                  }}
                  className="text-rose-400 hover:text-rose-300 text-[11px]"
                >
                  پاکسازی کل تاریخچه
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
