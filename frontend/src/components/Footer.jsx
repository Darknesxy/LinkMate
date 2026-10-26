import React from 'react';
import { Play, Heart, Shield, ExternalLink, Code } from 'lucide-react';

export default function Footer() {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/Darknesxy',
      color: 'hover:text-white hover:border-slate-500 hover:bg-slate-800',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/subojit-sarkar-a0b212397?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      color: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-950/40',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/sxbojit?xtok=anc0dm5iMHB1bXV6',
      color: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-950/40',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#05070c] pt-12 pb-24 md:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Info & Developer Connect */}
          <div className="col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 ml-0.5" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Link<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Mate</span>
              </span>
            </div>
            
            <p className="text-slate-400 max-w-sm leading-relaxed">
              The premier next-generation online video downloader. Convert and download high-resolution videos and high-bitrate audio from 100+ social and streaming platforms completely free.
            </p>

            {/* Developer Card with Direct Profile Links */}
            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 max-w-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    Developed by Subojit Sarkar
                  </span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                    Creator
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium transition-all ${s.color}`}
                    >
                      {s.icon}
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>SSL 256-bit Encrypted • Zero Data Logging</span>
            </div>
          </div>

          {/* Column 1: Downloaders */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white tracking-wide uppercase text-[11px]">
              Downloaders
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#downloader-section" className="hover:text-cyan-400 transition">YouTube Downloader</a></li>
              <li><a href="#downloader-section" className="hover:text-cyan-400 transition">Instagram Reels</a></li>
              <li><a href="#downloader-section" className="hover:text-cyan-400 transition">TikTok Saver</a></li>
              <li><a href="#downloader-section" className="hover:text-cyan-400 transition">Facebook Video</a></li>
              <li><a href="#downloader-section" className="hover:text-cyan-400 transition">Twitter (X) MP4</a></li>
            </ul>
          </div>

          {/* Column 2: Tools */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white tracking-wide uppercase text-[11px]">
              Tools
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#downloader-section" className="hover:text-purple-400 transition">MP3 Extractor</a></li>
              <li><a href="#downloader-section" className="hover:text-purple-400 transition">4K Video Saver</a></li>
              <li><a href="#downloader-section" className="hover:text-purple-400 transition">Video Trimmer</a></li>
              <li><a href="#downloader-section" className="hover:text-purple-400 transition">Subtitle Downloader</a></li>
              <li><a href="#downloader-section" className="hover:text-purple-400 transition">Batch Downloads</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white tracking-wide uppercase text-[11px]">
              Legal & Support
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">DMCA Notice</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">API Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>© 2026 LinkMate Inc. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by <strong className="text-white">Subojit Sarkar</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/Darknesxy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/subojit-sarkar-a0b212397?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">LinkedIn</a>
            <span>•</span>
            <a href="https://www.instagram.com/sxbojit?xtok=anc0dm5iMHB1bXV6" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
