import React, { useState } from 'react';
import { X, Check, HelpCircle, FileText, Wrench, DollarSign, ExternalLink, ChevronDown, Sparkles } from 'lucide-react';

export function FaqModal({ onClose }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Is LinkMate completely free to use?',
      a: 'Yes, LinkMate is 100% free with unlimited downloads. There are no subscriptions, daily quotas, or hidden charges.'
    },
    {
      q: 'Which platforms are supported?',
      a: 'LinkMate supports YouTube (Videos, Shorts & Music), Instagram (Reels & Posts), Facebook, TikTok, Twitter/X, Reddit, Twitch, Vimeo, Pinterest, Dailymotion, and over 100 other video hosting websites.'
    },
    {
      q: 'Can I download videos in 4K or 1080p 60fps?',
      a: 'Yes! Whenever the source video is available in 1080p, 2K, or 4K resolution, LinkMate will fetch and merge the highest quality video and audio streams seamlessly.'
    },
    {
      q: 'How do I convert a video into MP3 audio only?',
      a: 'Simply select the "Audio Only (MP3 / M4A)" tab before clicking Get Video, or click the MP3 download button in the Preview card. You can also customize audio bitrate up to 320 kbps in Advanced Settings.'
    },
    {
      q: 'Is it legal and safe to download videos?',
      a: 'LinkMate is SSL encrypted and does not store personal data or log your download history on our servers. Downloads are intended for personal offline viewing, archiving, and educational fair use.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
              <p className="text-xs text-slate-400">Everything you need to know about LinkMate</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180 text-purple-400' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function PricingModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Forever
          </div>
          <h3 className="text-2xl font-extrabold text-white">No Subscriptions. No Limits.</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            LinkMate is built for creators, students, and everyday users worldwide without hidden paywalls.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950/30 border border-indigo-500/30 mb-6 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between font-bold text-white pb-3 border-b border-white/10">
            <span className="text-base">Community Plan</span>
            <span className="text-xl text-cyan-400">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Video & Audio Downloads</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 4K Ultra-HD 60fps Resolution</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> High-Bitrate 320 kbps MP3 Conversion</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> No Watermarks on Downloads</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100+ Streaming & Social Sites Supported</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 transition"
        >
          Start Downloading Free
        </button>

      </div>
    </div>
  );
}

export function ToolsModal({ onSelectTool, onClose }) {
  const tools = [
    {
      id: 'audio_extractor',
      title: 'MP3 Audio Extractor',
      desc: 'Convert any YouTube or social media video into high-fidelity 320kbps MP3 audio.',
      formatType: 'audio',
    },
    {
      id: '4k_saver',
      title: '4K Ultra-HD Downloader',
      desc: 'Extract 1440p and 2160p 60fps streams with synced audio.',
      formatType: 'video_audio',
      quality: '4K',
    },
    {
      id: 'video_only',
      title: 'Muted Video Grabber',
      desc: 'Download high quality background footage without background audio.',
      formatType: 'video_only',
    },
    {
      id: 'subtitles',
      title: 'Subtitles & Closed Captions',
      desc: 'Extract embedded and auto-generated SRT subtitle tracks in multiple languages.',
      formatType: 'video_audio',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Media Tools Suite</h3>
              <p className="text-xs text-slate-400">Choose a dedicated mode for your needs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {tools.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                onSelectTool(t);
                onClose();
              }}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 cursor-pointer transition group"
            >
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                {t.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function BlogModal({ onClose }) {
  const articles = [
    {
      title: 'How to Download Instagram Reels in Highest Quality',
      tag: 'Instagram Guide',
      date: 'Updated today',
      snippet: 'Simply copy the share link from Instagram app or desktop, paste it into LinkMate, and select 1080p MP4.'
    },
    {
      title: 'Best Audio Bitrate: 320kbps vs 192kbps Explained',
      tag: 'Audio Tips',
      date: 'Audio Guide',
      snippet: '320kbps delivers studio quality acoustics preserving crisp highs and deep bass for music collectors.'
    },
    {
      title: 'Downloading YouTube Shorts & Playlists to Mobile',
      tag: 'YouTube Guide',
      date: 'Tutorial',
      snippet: 'LinkMate works directly in mobile Safari and Chrome without needing third party APKs or jailbreaks.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Guides & Blog</h3>
              <p className="text-xs text-slate-400">Tips, tutorials, and latest features</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {articles.map((art, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-indigo-400">{art.tag}</span>
                <span className="text-slate-500">{art.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{art.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{art.snippet}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
