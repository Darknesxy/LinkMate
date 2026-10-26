import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  ArrowRight, 
  X, 
  Video, 
  Music, 
  VolumeX, 
  Settings2, 
  Clipboard, 
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function DownloaderCard({
  url,
  setUrl,
  formatType,
  setFormatType,
  selectedQuality,
  setSelectedQuality,
  bitrate,
  setBitrate,
  codec,
  setCodec,
  subtitles,
  setSubtitles,
  onFetchVideo,
  isLoading,
  placeholderText,
  inputRef
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const formatTabs = [
    {
      id: 'video_audio',
      title: 'Video + Audio',
      subtitle: 'MP4 (with sound)',
      icon: <Video className="w-5 h-5" />,
    },
    {
      id: 'audio',
      title: 'Audio Only',
      subtitle: 'MP3 / M4A',
      icon: <Music className="w-5 h-5" />,
    },
    {
      id: 'video_only',
      title: 'Video Only',
      subtitle: 'MP4 (no sound)',
      icon: <VolumeX className="w-5 h-5" />,
    },
  ];

  const qualities = [
    { label: 'Auto', badge: null },
    { label: '144p', badge: null },
    { label: '360p', badge: null },
    { label: '480p', badge: null },
    { label: '720p', badge: 'HD' },
    { label: '1080p', badge: 'HD' },
    { label: '2K', badge: '2K' },
    { label: '4K', badge: '4K' },
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2000);
      }
    } catch (err) {
      // Fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onFetchVideo(url.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="relative rounded-3xl p-4 sm:p-6 lg:p-8 bg-slate-900/70 backdrop-blur-2xl border border-indigo-500/20 shadow-[0_15px_50px_-15px_rgba(99,102,241,0.25)]">
        
        {/* Glow ambient highlight */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* Input Row */}
        <form onSubmit={handleSubmit} className="relative mb-6">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-[#090d19]/90 border border-slate-700/60 focus-within:border-indigo-500 focus-within:shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all">
            
            {/* Input with Link icon */}
            <div className="flex items-center flex-1 px-3 gap-3">
              <LinkIcon className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={placeholderText || "Paste video link here (e.g. https://www.youtube.com/watch?v=...)"}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none py-2 font-normal"
              />
              
              {/* Paste or Clear button */}
              {url ? (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title="Clear link"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePaste}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:text-white transition cursor-pointer"
                  title="Paste from clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Paste</span>
                </button>
              )}
            </div>

            {/* Get Video Action Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-white flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Fetching Media...</span>
                </>
              ) : (
                <>
                  <span>Get Video</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Real Helper Status Bar */}
          <div className="flex items-center justify-between px-1 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Supports YouTube, Instagram, Facebook, TikTok, X, and 100+ sites.</span>
            </span>

            {copiedToast && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Link pasted from clipboard!
              </span>
            )}
          </div>
        </form>

        {/* Format Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {formatTabs.map((tab) => {
            const isSelected = formatType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFormatType(tab.id)}
                className={`relative flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-indigo-950/70 border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                    : 'bg-[#0b0f19]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0e1424]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                      : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  {tab.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {tab.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {tab.subtitle}
                  </p>
                </div>
                {isSelected && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quality Selector Row */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-300 font-semibold tracking-wide">Quality Selection</span>
            <span className="text-slate-400 text-xs">Auto will automatically choose the highest available resolution</span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {qualities.map((q) => {
              const isSelected = selectedQuality === q.label;
              return (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => setSelectedQuality(q.label)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
                      : 'bg-[#090d19] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{q.label}</span>
                  {q.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      }`}
                    >
                      {q.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Advanced Settings */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <Settings2 className="w-4 h-4 text-indigo-400" />
            <span>Show advanced settings (format, size, subtitles)</span>
            <span className="text-indigo-400 text-xs">
              {showAdvanced ? '▲' : '▼'}
            </span>
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-2xl bg-[#090d19]/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-200">
              {/* Subtitles Option */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Subtitles</label>
                <select
                  value={subtitles}
                  onChange={(e) => setSubtitles(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="none">No Subtitles</option>
                  <option value="auto">Auto-Generated (English)</option>
                  <option value="hindi">Hindi Subtitles</option>
                  <option value="all">Extract All Available Tracks</option>
                </select>
              </div>

              {/* Audio Bitrate */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Audio Bitrate</label>
                <select
                  value={bitrate}
                  onChange={(e) => setBitrate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="320k">320 kbps (Studio Quality)</option>
                  <option value="256k">256 kbps (High Quality)</option>
                  <option value="192k">192 kbps (Standard Quality)</option>
                  <option value="128k">128 kbps (Compact Size)</option>
                </select>
              </div>

              {/* Video Codec */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Video Codec</label>
                <select
                  value={codec}
                  onChange={(e) => setCodec(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="h264">H.264 (Maximum Compatibility)</option>
                  <option value="vp9">VP9 (High Efficiency)</option>
                  <option value="av1">AV1 (Next-Gen Ultra Sharp)</option>
                </select>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
