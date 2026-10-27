import React from 'react';
import { 
  Play, 
  Download, 
  Video, 
  Music, 
  VolumeX, 
  Clock,
  Eye,
  UserCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PreviewCard({ 
  videoData, 
  onTriggerDownload, 
  downloadingId, 
  onPreviewPlay,
  apiBase = '',
  selectedQuality = 'Auto',
  bitrate = '320k'
}) {
  if (!videoData) return null;

  const handleDownloadClick = (option) => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e']
      });
    } catch (e) {}

    onTriggerDownload(option);
  };

  const getFormatIcon = (type) => {
    if (type === 'audio') {
      return (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
          <Music className="w-5 h-5" />
        </div>
      );
    }
    if (type === 'video_only') {
      return (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-purple-800 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
          <VolumeX className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-red-500/30">
        <Video className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-purple-500/30 shadow-[0_20px_60px_-15px_rgba(147,51,234,0.3)]">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.08]">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Preview & Download</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-medium">
              Ready
            </span>
          </h3>
          <span className="text-xs text-slate-400">High speed direct download link</span>
        </div>

        {/* Video Metadata Card */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#090d19]/90 border border-slate-800 mb-6">
          {/* Thumbnail with interactive Play overlay */}
          <div 
            onClick={() => onPreviewPlay(videoData)}
            className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden cursor-pointer group shrink-0 bg-slate-950"
            title="Click to watch preview"
          >
            <img
              src={videoData.thumbnail || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'}
              alt={videoData.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
            </div>
            {videoData.duration && videoData.duration !== 'N/A' && (
              <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-semibold text-white">
                {videoData.duration}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2 text-center sm:text-left w-full">
            <h4 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
              {videoData.title}
            </h4>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
              {videoData.duration && videoData.duration !== 'N/A' && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {videoData.duration}
                </span>
              )}
              {videoData.views && videoData.views !== 'N/A' && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  {videoData.views}
                </span>
              )}
              {videoData.uploader && (
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  {videoData.uploader}
                </span>
              )}
            </div>

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Direct high-speed stream ready • No watermark • 100% Free</span>
            </div>
          </div>
        </div>

        {/* Download Options Section */}
        <div>
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
            Download Options
          </h4>

          <div className="space-y-2.5">
            {videoData.options?.map((opt, idx) => {
              const optId = opt.id || 'best';
              const isDownloading = downloadingId === optId;
              const directDownloadUrl = `${apiBase}/api/download?url=${encodeURIComponent(videoData.webpage_url)}&format_id=${encodeURIComponent(optId)}&format_type=${opt.type}&quality=${encodeURIComponent(selectedQuality)}&bitrate=${encodeURIComponent(bitrate)}`;

              return (
                <div
                  key={optId || idx}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#090d19]/80 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3.5">
                    {getFormatIcon(opt.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {opt.format}
                        </span>
                        {opt.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="font-semibold text-slate-300">{opt.quality}</span>
                        <span>•</span>
                        <span>{opt.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Native Download Anchor Button */}
                  <a
                    href={directDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDownloadClick(opt)}
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-purple-600/25 hover:shadow-purple-500/40 transition active:scale-95 cursor-pointer shrink-0 text-center no-underline"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Starting Download...</span>
                      </>
                    ) : (
                      <>
                        <span>Download</span>
                        <Download className="w-4 h-4" />
                      </>
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
