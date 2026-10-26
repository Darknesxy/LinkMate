import React from 'react';
import { Link2, SlidersHorizontal, Download, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Paste Link',
      description: 'Copy and paste your video link.',
      icon: <Link2 className="w-6 h-6 text-cyan-400" />,
      circleBg: 'from-cyan-600/30 to-blue-600/30 border-cyan-500/40',
    },
    {
      num: '2',
      title: 'Choose Format',
      description: 'Select video, audio or both with quality.',
      icon: <SlidersHorizontal className="w-6 h-6 text-purple-400" />,
      circleBg: 'from-purple-600/30 to-indigo-600/30 border-purple-500/40',
    },
    {
      num: '3',
      title: 'Download',
      description: 'Get your file instantly and enjoy!',
      icon: <Download className="w-6 h-6 text-pink-400" />,
      circleBg: 'from-pink-600/30 to-fuchsia-600/30 border-pink-500/40',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="text-left mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          How It Works?
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Save any video or audio in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center sm:items-start p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/[0.06] hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.circleBg} border flex items-center justify-center shadow-lg`}
              >
                {step.icon}
              </div>
              <span className="text-3xl font-black text-slate-800 select-none">
                0{step.num}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
              {step.num}. {step.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center sm:text-left">
              {step.description}
            </p>

            {/* Arrow indicator between steps for desktop */}
            {idx < 2 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
