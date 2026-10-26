import React from 'react';
import { X, Download, Trash2, CheckCircle2, Film, ExternalLink } from 'lucide-react';

export default function DownloadsModal({ downloads, onClear, onClose }) {
  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <h4 className="text-base font-bold text-white">Your Downloads</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {downloads.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {downloads.length > 0 && (
              <button
                onClick={onClear}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition cursor-pointer"
                title="Clear download history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="max-h-80 overflow-y-auto py-4 space-y-2.5">
          {downloads.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Film className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-medium">No downloads yet</p>
              <p className="text-xs text-slate-400">
                Paste any video link above to start downloading.
              </p>
            </div>
          ) : (
            downloads.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 gap-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.format} • {item.quality} • {item.time}
                    </p>
                  </div>
                </div>

                {item.downloadUrl && (
                  <a
                    href={item.downloadUrl}
                    download
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shrink-0 transition"
                  >
                    Re-download
                  </a>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
