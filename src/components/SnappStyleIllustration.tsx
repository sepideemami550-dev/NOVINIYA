import React from 'react';

export const SnappStyleIllustration: React.FC<{ type: 'hero' | 'mobile_speed' | 'sms_direct' | 'security' | 'growth' }> = ({ type }) => {
  if (type === 'hero') {
    return (
      <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl select-none">
        {/* Soft background shape */}
        <circle cx="210" cy="160" r="140" fill="#E8F8F0" />
        <rect x="70" y="50" width="280" height="220" rx="24" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        
        {/* Header bar */}
        <rect x="70" y="50" width="280" height="42" rx="24" fill="#F9FAFB" />
        <circle cx="100" cy="71" r="5" fill="#EF4444" />
        <circle cx="116" cy="71" r="5" fill="#F59E0B" />
        <circle cx="132" cy="71" r="5" fill="#10B981" />
        <rect x="160" y="63" width="140" height="16" rx="8" fill="#E5E7EB" />
        
        {/* Main Phone Mockup */}
        <rect x="130" y="105" width="160" height="150" rx="18" fill="#FFFFFF" stroke="#22C55E" strokeWidth="2.5" />
        
        {/* Snapp Green Accent Banner inside phone */}
        <rect x="142" y="118" width="136" height="34" rx="10" fill="#22C55E" />
        <rect x="156" y="128" width="80" height="6" rx="3" fill="#FFFFFF" />
        <rect x="156" y="138" width="50" height="4" rx="2" fill="#D1FAE5" />
        
        {/* Interactive Slider preview inside phone */}
        <rect x="142" y="162" width="136" height="40" rx="8" fill="#F3F4F6" />
        <circle cx="195" cy="182" r="10" fill="#22C55E" />
        <rect x="152" y="180" width="35" height="4" rx="2" fill="#22C55E" />
        <rect x="205" y="180" width="60" height="4" rx="2" fill="#D1D5DB" />
        
        {/* Bottom CTA in phone */}
        <rect x="142" y="212" width="136" height="28" rx="8" fill="#111827" />
        <rect x="175" y="223" width="70" height="6" rx="3" fill="#FFFFFF" />
        
        {/* Floating badge 1: Sales multiplier */}
        <g transform="translate(40, 120)">
          <rect width="110" height="48" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.06))" />
          <circle cx="24" cy="24" r="12" fill="#DCFCE7" />
          <path d="M20 25L23 28L29 20" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="44" y="16" width="50" height="6" rx="3" fill="#111827" />
          <rect x="44" y="26" width="36" height="4" rx="2" fill="#22C55E" />
        </g>
        
        {/* Floating badge 2: SMS instant lead */}
        <g transform="translate(270, 180)">
          <rect width="120" height="52" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.06))" />
          <circle cx="26" cy="26" r="12" fill="#FEF3C7" />
          <path d="M21 24H31M21 28H28" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <rect x="46" y="17" width="58" height="6" rx="3" fill="#111827" />
          <rect x="46" y="28" width="44" height="4" rx="2" fill="#9CA3AF" />
        </g>
      </svg>
    );
  }

  if (type === 'mobile_speed') {
    return (
      <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 mx-auto select-none">
        <rect x="30" y="15" width="100" height="110" rx="18" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2" />
        <rect x="45" y="28" width="70" height="12" rx="6" fill="#22C55E" />
        <rect x="45" y="50" width="70" height="35" rx="8" fill="#FFFFFF" stroke="#DCFCE7" strokeWidth="2" />
        <path d="M72 68L80 60L88 68" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="45" y="95" width="70" height="14" rx="6" fill="#111827" />
      </svg>
    );
  }

  if (type === 'sms_direct') {
    return (
      <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 mx-auto select-none">
        <rect x="25" y="25" width="110" height="85" rx="16" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
        <circle cx="50" cy="52" r="12" fill="#F59E0B" />
        <path d="M45 52H55M45 56H52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <rect x="70" y="44" width="50" height="6" rx="3" fill="#1F2937" />
        <rect x="70" y="55" width="38" height="5" rx="2.5" fill="#D97706" />
        <rect x="40" y="80" width="80" height="16" rx="6" fill="#FFFFFF" stroke="#FEF3C7" />
      </svg>
    );
  }

  if (type === 'security') {
    return (
      <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 mx-auto select-none">
        <rect x="25" y="25" width="110" height="85" rx="16" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
        <path d="M80 40L100 48V68C100 80 80 92 80 92C80 92 60 80 60 68V48L80 40Z" fill="#3B82F6" />
        <path d="M74 65L78 69L87 59" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 mx-auto select-none">
      <rect x="25" y="25" width="110" height="85" rx="16" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="2" />
      <path d="M45 85L65 65L85 75L115 45" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="115" cy="45" r="5" fill="#A855F7" />
    </svg>
  );
};
