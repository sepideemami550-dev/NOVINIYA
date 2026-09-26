export interface DivarService {
  id: string;
  rank: number;
  title: string;
  shortDesc: string;
  category: string;
  weeklyCallEstimate: string; // e.g. "۸۰ تا ۱۲۰ تماس در هفته"
  callVolumeLevel: 'بسیار بالا' | 'فوق‌العاده بالا' | 'پربازدید و پرسود';
  targetAudience: string;
  pricingRange: string; // e.g. "۶ تا ۱۸ میلیون تومان"
  buildTimeAIStudio: string; // e.g. "۳۵ دقیقه"
  difficulty: 'آسان' | 'متوسط';
  whyItConverts: string[];
  adCopy: {
    suggestedTitle: string;
    description: string;
    tags: string[];
    callToAction: string;
  };
  clientPitchScript: {
    hook: string;
    coreValue: string;
    objectionHandling: string;
    closingDeal: string;
  };
  studioPrompt: string;
  features: string[];
  iconName: string;
}

export type CategoryFilter = 
  | 'همه' 
  | 'ساختمان و فنی' 
  | 'حمل‌ونقل' 
  | 'زیبایی و کلینیک‌ها' 
  | 'تشریفات و مجالس'
  | 'کافه و غذا' 
  | 'املاک و مالی' 
  | 'دیجیتال و فروش';
