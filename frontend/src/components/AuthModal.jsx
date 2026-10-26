import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ mode = 'login', onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = isLogin ? (email.split('@')[0] || 'User') : (name.trim() || email.split('@')[0] || 'User');
    const userObj = { 
      name: displayName, 
      email: email.trim(), 
      token: 'lm_' + Date.now(),
      joinedAt: new Date().toLocaleDateString()
    };
    
    // 1. Immediately save to localStorage
    localStorage.setItem('linkmate_user', JSON.stringify(userObj));
    
    // 2. Immediately notify parent component so UI updates synchronously
    onLoginSuccess?.(userObj);
    
    // 3. Show celebration state
    setSuccess(true);

    // 4. Close modal after brief feedback
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">
              {isLogin ? 'Welcome Back!' : 'Account Created Successfully!'}
            </h4>
            <p className="text-xs text-slate-300">
              Pro Unlimited Downloads features unlocked.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-white">
                {isLogin ? 'Sign In to LinkMate' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isLogin 
                  ? 'Access unlimited fast downloads & playlist converter'
                  : 'Get priority servers, batch downloading & history'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                  <div className="flex items-center px-3 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-indigo-500">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Subojit Sarkar"
                      className="w-full bg-transparent px-2.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="flex items-center px-3 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-indigo-500">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-transparent px-2.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                <div className="flex items-center px-3 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-indigo-500">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent px-2.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-lg shadow-purple-600/30 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLogin ? 'Sign In' : 'Sign Up Free'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Login / Register */}
            <div className="mt-5 text-center text-xs text-slate-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 cursor-pointer"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
