import React, { useState } from 'react';
import { X, Lock, Mail, User, Store, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, Key, Eye, EyeOff, Bot, Radio } from 'lucide-react';
import { UserAccount, AuthModalTab } from '../types';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginSuccess: (user: UserAccount) => void;
  onLogout: () => void;
  initialTab?: AuthModalTab;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  initialTab = 'login'
}) => {
  const [tab, setTab] = useState<AuthModalTab>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Harap isi alamat email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserAccount = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0] || 'Rian Afrizal',
        email: email,
        storeName: storeName || 'Official Brand Store',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        plan: 'Pro Live Seller',
        liveHoursRemaining: 120,
        videoCredits: 45,
        isVerified: true,
        joinedDate: 'Agustus 2026'
      };
      onLoginSuccess(user);
      try {
        confetti({ particleCount: 60, spread: 70 });
      } catch (_) {}
      onClose();
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !email || !password) {
      setErrorMsg('Harap lengkapi semua data pendaftaran.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserAccount = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        storeName: storeName || `${name} Official Store`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        plan: 'Free Trial',
        liveHoursRemaining: 8,
        videoCredits: 10,
        isVerified: true,
        joinedDate: 'Agustus 2026'
      };
      onLoginSuccess(user);
      try {
        confetti({ particleCount: 80, spread: 80 });
      } catch (_) {}
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoUser: UserAccount = {
        id: 'user-demo-seller',
        name: 'Rian Afrizal (Live Seller Pro)',
        email: 'rianafrizal11111@gmail.com',
        storeName: 'GlowSkin Beauty Official Store',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        plan: 'Pro Live Seller',
        liveHoursRemaining: 120,
        videoCredits: 50,
        isVerified: true,
        joinedDate: 'Agustus 2026'
      };
      onLoginSuccess(demoUser);
      try {
        confetti({ particleCount: 70, spread: 70 });
      } catch (_) {}
      onClose();
    }, 400);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Harap masukkan alamat email akun Anda.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Tautan reset kata sandi telah dikirimkan ke email: ${email}`);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
          id="btn-close-auth-modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* If Already Logged In: Show Account Summary */}
        {currentUser ? (
          <div className="space-y-6 text-center">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-cyan-400 p-0.5 bg-slate-800">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover rounded-full" />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                Paket: {currentUser.plan}
              </div>
            </div>

            {/* Quota Stats Grid */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                <span className="text-[11px] text-slate-400">Sisa Kuota Live AI</span>
                <p className="text-lg font-extrabold text-emerald-400">{currentUser.liveHoursRemaining} Jam</p>
                <p className="text-[10px] text-slate-500">24/7 Multi-Platform</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                <span className="text-[11px] text-slate-400">Kredit Video MP4</span>
                <p className="text-lg font-extrabold text-cyan-400">{currentUser.videoCredits} Video</p>
                <p className="text-[10px] text-slate-500">Full HD 9:16 Vertikal</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert('Fitur Top Up Kuota Live AI & Upgrade Plan: Menghubungkan ke Payment Gateway Midtrans/Xendit.');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all"
              >
                Top Up Kuota / Upgrade Paket
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setTab('login');
                }}
                className="w-full py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 font-bold text-xs transition-colors"
                id="btn-logout"
              >
                Keluar dari Akun (Logout)
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register / Forgot tabs */
          <div className="space-y-5">
            
            {/* Header & Logo */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 mb-2">
                <Bot className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white">
                {tab === 'login' && 'Masuk ke LiveStreamerAI'}
                {tab === 'register' && 'Buat Akun Seller AI Baru'}
                {tab === 'forgot' && 'Pemulihan Kata Sandi'}
              </h2>
              <p className="text-xs text-slate-400">
                {tab === 'login' && 'Kelola siaran langsung otonom & generate video promo toko Anda'}
                {tab === 'register' && 'Dapatkan Free Trial 8 Jam Live Streaming AI & 10 Video Promo MP4'}
                {tab === 'forgot' && 'Masukkan email terdaftar untuk menerima tautan reset kata sandi'}
              </p>
            </div>

            {/* Tab Switcher (Login / Register) */}
            {tab !== 'forgot' && (
              <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-xl transition-all ${
                    tab === 'login' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-login"
                >
                  Masuk (Login)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-xl transition-all ${
                    tab === 'register' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-register"
                >
                  Daftar Akun
                </button>
              </div>
            )}

            {/* Quick Demo One-Click Login Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Akses Cepat Demo Seller</span>
                </p>
                <p className="text-[10px] text-slate-300">Masuk langsung tanpa isi form</p>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/30 transition-all shrink-0 active:scale-95"
                id="btn-quick-demo-login"
              >
                Masuk Cepat 🚀
              </button>
            </div>

            {/* Error / Success Notifications */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Login Form */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Email Seller / Akun</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@tokoanda.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-semibold">Kata Sandi</label>
                    <button
                      type="button"
                      onClick={() => setTab('forgot')}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                  id="btn-submit-login"
                >
                  <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rian Afrizal"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nama Toko / Brand E-Commerce</label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Contoh: GlowSkin Official Store"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Email Seller</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seller@tokoanda.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Buat Kata Sandi</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                  id="btn-submit-register"
                >
                  <span>{isLoading ? 'Mendaftarkan...' : 'Daftar & Klaim Free Trial'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Forgot Password Form */}
            {tab === 'forgot' && (
              <form onSubmit={handleResetPassword} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Email Akun Terdaftar</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('login');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-600/20"
                  >
                    {isLoading ? 'Mengirim...' : 'Kirim Tautan'}
                  </button>
                </div>
              </form>
            )}

            {/* Social / E-Commerce SSO Connectors */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500 text-center block uppercase tracking-wider">
                Atau Hubungkan dengan Akun Toko Anda
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemoLogin();
                  }}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="font-bold text-white">🎵 TikTok</span>
                  <span>Shop</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleQuickDemoLogin();
                  }}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="font-bold text-orange-400">🛍️ Shopee</span>
                  <span>Live</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
