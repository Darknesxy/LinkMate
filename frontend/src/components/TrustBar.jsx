import React from 'react';
import { Gift, Infinity, Rocket, Star } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      title: '100% Free',
      subtitle: 'No hidden charges',
      icon: <Gift className="w-5 h-5 text-pink-400" />,
    },
    {
      title: 'Unlimited Downloads',
      subtitle: 'No daily limit',
      icon: <Infinity className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Multi-Platform',
      subtitle: 'Support 10+ platforms',
      icon: <Rocket className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Trusted by Millions',
      subtitle: 'Fast, reliable and safe.',
      icon: <Star className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="p-6 rounded-3xl bg-slate-900/30 backdrop-blur-md border border-white/[0.06]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/5 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {item.title}
                </h5>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
