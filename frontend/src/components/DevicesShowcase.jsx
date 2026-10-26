import React from 'react';
import { Laptop, Tablet, Smartphone, Monitor } from 'lucide-react';

export default function DevicesShowcase() {
  const osList = [
    { name: 'Android', desc: 'Phones & Tablets' },
    { name: 'iOS', desc: 'iPhone & iPad' },
    { name: 'Windows', desc: 'PC & Surface' },
    { name: 'macOS', desc: 'MacBook & iMac' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-2xl border border-white/[0.08] relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-indigo-600/15 blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Works on All Devices
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Responsive Design — Perfect experience on Mobile, Tablet and PC.
          </p>
        </div>

        {/* Multi-Device Visual Mockup Showcase */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 py-6 px-2">
          {/* Laptop Mockup */}
          <div className="relative w-48 sm:w-64 h-32 sm:h-40 rounded-xl bg-slate-900 border-2 border-slate-700 p-2 shadow-2xl flex flex-col justify-between">
            <div className="w-full h-3 bg-slate-800 rounded-t flex items-center px-1.5 gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 bg-[#07090e] rounded p-2 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-white flex items-center gap-1">
                <Laptop className="w-3 h-3 text-cyan-400" /> LinkMate Web
              </span>
              <span className="text-[8px] text-slate-400 mt-0.5">Desktop Browser</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-b mt-1" />
          </div>

          {/* Tablet Mockup */}
          <div className="relative w-28 sm:w-36 h-36 sm:h-44 rounded-2xl bg-slate-900 border-2 border-slate-700 p-2 shadow-2xl flex flex-col justify-between">
            <div className="w-full flex justify-center py-0.5">
              <span className="w-2 h-0.5 rounded-full bg-slate-700" />
            </div>
            <div className="flex-1 bg-[#07090e] rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <Tablet className="w-4 h-4 text-purple-400 mb-1" />
              <span className="text-[9px] font-bold text-white">Tablet View</span>
              <span className="text-[7px] text-slate-400">Touch Friendly</span>
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div className="relative w-20 sm:w-24 h-40 sm:h-48 rounded-2xl bg-slate-900 border-2 border-indigo-500/50 p-1.5 shadow-2xl shadow-indigo-500/20 flex flex-col justify-between">
            <div className="w-full flex justify-center py-0.5">
              <span className="w-4 h-1 rounded-full bg-slate-700" />
            </div>
            <div className="flex-1 bg-[#07090e] rounded-xl p-1.5 flex flex-col items-center justify-center text-center">
              <Smartphone className="w-4 h-4 text-pink-400 mb-1" />
              <span className="text-[8px] font-bold text-white">Mobile View</span>
              <span className="text-[7px] text-slate-400">PWA Ready</span>
            </div>
            <div className="w-full flex justify-center py-0.5">
              <span className="w-3 h-0.5 rounded-full bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Operating Systems Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-6 border-t border-white/[0.06]">
          {osList.map((os, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-2 hover:border-slate-600 transition"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                {os.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
