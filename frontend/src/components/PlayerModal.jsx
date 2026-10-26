import React, { useEffect } from 'react';
import { X, Play, Volume2, Film } from 'lucide-react';

export default function PlayerModal({ video, onClose }) {
  if (!video) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const youtubeId = getVideoId(video.webpage_url);

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0b0f19]">
          <h4 className="text-sm font-bold text-white truncate max-w-md">
            {video.title}
          </h4>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              {video.thumbnail && (
                <img
                  src={video.thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                />
              )}
              <div className="relative z-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <p className="text-white font-semibold text-sm max-w-md mx-auto line-clamp-2">
                  {video.title}
                </p>
                <p className="text-xs text-slate-300">
                  Ready to stream or download in high quality.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#0b0f19] flex items-center justify-between text-xs text-slate-400">
          <span>Duration: {video.duration || 'N/A'}</span>
          <span>Source: {video.uploader || 'Web'}</span>
        </div>

      </div>
    </div>
  );
}

function getVideoId(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : '';
}
