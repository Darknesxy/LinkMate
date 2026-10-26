import React from 'react';
import { Zap, Gem, ShieldCheck, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Super Fast',
      description: 'Get your videos in seconds.',
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      glowColor: 'from-cyan-500/20 to-blue-600/20',
      borderColor: 'group-hover:border-cyan-500/50',
    },
    {
      title: 'High Quality',
      description: 'Up to 4K resolution support.',
      icon: <Gem className="w-6 h-6 text-purple-400" />,
      glowColor: 'from-purple-500/20 to-fuchsia-600/20',
      borderColor: 'group-hover:border-purple-500/50',
    },
    {
      title: 'Safe & Secure',
      description: 'No login required. Your privacy matters.',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      glowColor: 'from-indigo-500/20 to-purple-600/20',
      borderColor: 'group-hover:border-indigo-500/50',
    },
    {
      title: 'All Devices',
      description: 'Works on mobile, tablet and PC.',
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      glowColor: 'from-pink-500/20 to-rose-600/20',
      borderColor: 'group-hover:border-pink-500/50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`group relative p-5 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/[0.07] ${f.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Subtle corner glow */}
            <div
              className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${f.glowColor} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`}
            />

            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {f.icon}
            </div>

            <h4 className="text-base font-bold text-white mb-1 tracking-tight">
              {f.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
