import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Play, LogOut } from 'lucide-react';

export default function Navbar({ 
  onOpenAuth, 
  onNavigate, 
  currentUser, 
  onLogout, 
  isDark, 
  onToggleTheme 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const navLinks = ['Home', 'Downloader', 'Tools', 'Pricing', 'Blog', 'FAQ'];

  const handleNavClick = (link) => {
    setActiveTab(link);
    setMobileMenuOpen(false);
    onNavigate?.(link.toLowerCase());
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080d1a]/90 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('Home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400 ml-0.5 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center">
            Link<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Mate</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link;
            return (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Day / Night Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl border border-white/10 bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
            title={isDark ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-purple-300 transition-transform hover:scale-110" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 transition-transform hover:scale-110" />
            )}
          </button>

          {/* User Account / Login State */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-black shrink-0">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-bold text-white max-w-[110px] truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500 text-white font-extrabold tracking-wider">
                  PRO
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Login */}
              <button
                onClick={() => onOpenAuth?.('login')}
                className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/5 transition cursor-pointer"
              >
                Login
              </button>

              {/* Sign Up */}
              <button
                onClick={() => onOpenAuth?.('signup')}
                className="px-5 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-purple-600/25 hover:shadow-purple-500/40 transition active:scale-95 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-300"
            title="Toggle theme"
          >
            {isDark ? <Moon className="w-4 h-4 text-purple-300" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#080d1a]/98 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === link
                  ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link}
            </button>
          ))}


          <div className="pt-2 border-t border-white/10">
            {currentUser ? (
              <div className="flex items-center justify-between px-2 py-1 bg-purple-950/30 rounded-xl border border-purple-500/30">
                <span className="text-xs font-semibold text-white">Signed in as {currentUser.name} (PRO)</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-3 py-1 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg border border-rose-500/30"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth?.('login'); }}
                  className="flex-1 py-2 text-sm font-medium text-slate-200 border border-white/10 rounded-lg hover:bg-white/5"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth?.('signup'); }}
                  className="flex-1 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
