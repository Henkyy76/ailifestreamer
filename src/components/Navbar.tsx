import React from 'react';
import { Radio, Sparkles, Video, Layers, ShieldCheck, ArrowRight, User, LogIn, CheckCircle2 } from 'lucide-react';
import { UserAccount, AuthModalTab } from '../types';

export type ActiveTab = 'homepage' | 'studio' | 'live-control' | 'video-promo' | 'tech-spec';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isStreamingActive?: boolean;
  onOpenCheckout?: () => void;
  currentUser: UserAccount | null;
  onOpenAuth: (tab?: AuthModalTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isStreamingActive = false,
  onOpenCheckout,
  currentUser,
  onOpenAuth
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('homepage')} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="font-bold text-xl tracking-tight text-white">LiveStreamer</span>
            <span className="font-extrabold text-xl text-cyan-400">AI</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('homepage')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'homepage' 
                ? 'text-white bg-slate-800/80 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
            id="nav-home-btn"
          >
            Beranda
          </button>
          
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'studio' 
                ? 'text-white bg-blue-600/30 border border-blue-500/40 text-blue-300' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
            id="nav-studio-btn"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            Studio Live (5 Langkah)
          </button>

          <button
            onClick={() => setActiveTab('video-promo')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'video-promo' 
                ? 'text-white bg-blue-600/30 border border-blue-500/40 text-blue-300' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
            id="nav-video-btn"
          >
            <Video className="w-4 h-4 text-emerald-400" />
            Video Promo (MP4)
          </button>

          <button
            onClick={() => setActiveTab('tech-spec')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'tech-spec' 
                ? 'text-white bg-blue-600/30 border border-blue-500/40 text-blue-300' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
            id="nav-spec-btn"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            Spesifikasi & COGS
          </button>

          {isStreamingActive && (
            <button
              onClick={() => setActiveTab('live-control')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'live-control'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse'
                  : 'bg-rose-950/60 border border-rose-600/40 text-rose-300 hover:bg-rose-900/60'
              }`}
              id="nav-control-center-btn"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <Radio className="w-4 h-4" />
              LIVE Console
            </button>
          )}
        </nav>

        {/* Right Actions: User Account & CTA */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all text-xs text-left"
              id="nav-profile-chip"
            >
              <div className="relative">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover border border-cyan-400" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-slate-900" />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="font-bold text-white max-w-[100px] truncate">{currentUser.name}</p>
                <p className="text-[10px] text-cyan-400 font-medium">{currentUser.plan}</p>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1"
                id="btn-nav-login"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 transition-colors"
                id="btn-nav-register"
              >
                <span>Daftar Gratis</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setActiveTab('studio')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            id="btn-mulai-sekarang"
          >
            <span>Mulai Live</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950/80 px-2 py-2 text-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('homepage')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'homepage' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
        >
          Beranda
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'studio' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
        >
          Studio Live
        </button>
        <button
          onClick={() => setActiveTab('video-promo')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'video-promo' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
        >
          Video Promo
        </button>
        <button
          onClick={() => setActiveTab('tech-spec')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'tech-spec' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
        >
          Spec & COGS
        </button>
        {isStreamingActive && (
          <button
            onClick={() => setActiveTab('live-control')}
            className="px-3 py-1 rounded-md bg-rose-600 text-white whitespace-nowrap font-bold animate-pulse"
          >
            🔴 Live Console
          </button>
        )}
      </div>
    </header>
  );
};
