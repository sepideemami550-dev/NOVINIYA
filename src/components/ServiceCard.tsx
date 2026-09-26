import React from 'react';
import { DivarService } from '../types';
import { Phone, Clock, DollarSign, Play, ArrowLeft } from 'lucide-react';

interface Props {
  service: DivarService;
  onOpenDetails: (service: DivarService) => void;
  onTestDemo: (service: DivarService) => void;
}

export const ServiceCard: React.FC<Props> = ({ service, onOpenDetails, onTestDemo }) => {
  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all flex flex-col justify-between group">
      <div>
        {/* Top line metadata unboxed */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-amber-400 font-bold">#{service.rank.toString().padStart(2, '۰')}</span>
            <span aria-hidden="true">·</span>
            <span>{service.category}</span>
          </div>
          <span className="text-emerald-400/90 font-medium">{service.callVolumeLevel}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Quantitative Grid */}
        <div className="mt-4 pt-4 border-t border-neutral-800/80 grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{service.weeklyCallEstimate}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{service.pricingRange}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300 col-span-2">
            <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>زمان ساخت در هوش مصنوعی: {service.buildTimeAIStudio}</span>
          </div>
        </div>

        {/* Why it converts snippet */}
        <div className="mt-4 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
          <strong className="text-amber-400/90 font-medium block mb-1">علت انفجار زنگ‌خور در دیوار:</strong>
          {service.whyItConverts[0]}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTestDemo(service)}
          className="flex-1 py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" />
          <span>تست دموی زنده</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenDetails(service)}
          className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
        >
          <span>پرامپت و آگهی</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
