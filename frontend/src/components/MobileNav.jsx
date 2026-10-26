import React from 'react';
import { Home, Wrench, Download, MoreHorizontal } from 'lucide-react';

export default function MobileNav({ activeTab, onTabSelect, downloadCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'tools', label: 'Tools', icon: <Wrench className="w-5 h-5" /> },
    { 
      id: 'downloads', 
      label: 'Downloads', 
      icon: <Download className="w-5 h-5" />,
      badge: downloadCount > 0 ? downloadCount : null
    },
    { id: 'more', label: 'More', icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#080d1a]/95 border-t border-white/[0.08] px-2 py-2 safe-area-bottom shadow-2xl">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabSelect(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-[9px] font-bold text-white shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
