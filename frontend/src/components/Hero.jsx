import React from 'react';
import { Zap, Play, ArrowDown, Music, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-8 pb-4 lg:pt-12 overflow-hidden">
      {/* Background ambient neon glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 translate-x-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Badges */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
              <span>Fast • Unlimited • High Quality</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Download Videos <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Paste the link, choose your format, and download instantly. Videos, audio, or both — simple, fast, and free.
            </p>
          </div>

          {/* Right Column: 3D Glowing Visual Element (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center relative select-none">
            <div className="relative w-80 h-72">
              
              {/* Center Glow Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-cyan-500/30 rounded-full blur-3xl" />

              {/* Glass Play Tile (Floating top-left) */}
              <div className="absolute top-2 left-6 w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-900/40 backdrop-blur-xl border border-purple-400/30 shadow-[0_8px_32px_0_rgba(168,85,247,0.37)] flex items-center justify-center transform -rotate-6 hover:rotate-0 transition duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/40">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Blue Glowing Download Tile (Center-right) */}
              <div className="absolute top-14 right-8 w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-900/50 backdrop-blur-xl border border-cyan-400/40 shadow-[0_12px_40px_0_rgba(6,182,212,0.45)] flex items-center justify-center transform rotate-6 hover:rotate-0 transition duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <ArrowDown className="w-8 h-8 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* Floating 4K Badge */}
              <div className="absolute bottom-10 right-4 px-3.5 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 backdrop-blur-md shadow-lg shadow-purple-500/30 text-purple-300 font-extrabold text-sm tracking-wider transform rotate-3">
                4K UHD
              </div>

              {/* Floating Music Note Badge */}
              <div className="absolute top-0 right-20 w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-400/40 backdrop-blur-md shadow-lg shadow-cyan-500/30 flex items-center justify-center text-cyan-300 transform -rotate-12">
                <Music className="w-5 h-5 text-cyan-300" />
              </div>

              {/* Floating Sparkle Pill */}
              <div className="absolute -bottom-2 left-16 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-300 flex items-center gap-1.5 shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Any Link • Any Format • Anywhere</span>
              </div>

              {/* Laser Arc Lines */}
              <div className="absolute -bottom-4 right-10 text-[11px] font-medium tracking-wide text-cyan-300/80 italic text-right">
                Any Link<br />
                Any Format<br />
                Anywhere
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
