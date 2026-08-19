import React from 'react';
import { Sparkles, Video, Radio, Bot, ShieldCheck, CreditCard, BarChart2, DollarSign, ArrowRight, Check, Heart, Play, Layers, ChevronRight, Zap, CheckCircle2, User, LogIn } from 'lucide-react';
import { Product, AIHost, UserAccount } from '../types';
import { PRICING_LIVE_TIERS, PRICING_VIDEO_TIERS } from '../data/mockData';
import { LiveSimulationScreen } from './LiveSimulationScreen';

interface HomepageProps {
  activeProduct: Product;
  host: AIHost;
  onStartLiveWizard: () => void;
  onOpenVideoPromo: () => void;
  onOpenTechSpec: () => void;
  onSelectPricingTier?: (tierId: string) => void;
  onOpenAuth?: () => void;
  currentUser?: UserAccount | null;
}

export const Homepage: React.FC<HomepageProps> = ({
  activeProduct,
  host,
  onStartLiveWizard,
  onOpenVideoPromo,
  onOpenTechSpec,
  onSelectPricingTier,
  onOpenAuth,
  currentUser
}) => {
  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>AI LIVE SELLING OTONOM & VIDEO PROMO OTOMATIS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Live Selling & Video Promosi,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                100% Otonom
              </span>{' '}
              oleh <span className="text-cyan-400">AI</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Platform AI yang menjalankan live streaming interaktif, membalas chat, dan membuat video promosi produk otomatis – tanpa perlu host manusia.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onStartLiveWizard}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                id="hero-btn-mulai-live"
              >
                <Zap className="w-4 h-4 text-cyan-300" />
                <span>Mulai Live Otomatis</span>
              </button>

              <button
                onClick={onOpenVideoPromo}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2"
                id="hero-btn-buat-video"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-current" />
                <span>Buat Video Promosi</span>
              </button>
            </div>

            {/* Sub-Badges */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Self-Hosted Open-Source</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">Hemat hingga 90%</span>
                <span>biaya operasional</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Live Simulation Mockup (Exact layout from Homepage.png) */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-purple-600/30 rounded-3xl blur-2xl opacity-60" />

            <div className="relative">
              <LiveSimulationScreen
                activeProduct={activeProduct}
                host={host}
                speechStyle="Persuasif"
                autoReplyEnabled={true}
                showToolbar={false}
                className="max-w-sm mx-auto shadow-2xl"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 2. LOGOS / SOCIAL PROOF BAR */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Digunakan untuk berbagai kebutuhan bisnis
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 font-bold text-sm sm:text-base">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs">✨</span>
              <span>SkincareCo</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">👗</span>
              <span>FASHION HUB</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">🌿</span>
              <span>Herbalife Store</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">📱</span>
              <span>TechLife</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">🏠</span>
              <span>SmartHome</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs">👶</span>
              <span>BabyCare</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FITUR UNGGULAN (6 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            SEMUA DALAM SATU PLATFORM AI
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Fitur Unggulan <span className="text-cyan-400">LiveStreamerAI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* 1. AI Live Selling Otonom */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">AI Live Selling Otonom</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI menjalankan live 24/7, membalas chat komentar penonton, menjelaskan produk, dan mendorong pembelian secara otomatis.
            </p>
          </div>

          {/* 2. Video Promo Otomatis */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Video Promo Otomatis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buat video promosi produk profesional dalam hitungan menit siap upload ke TikTok, Reels, dan YouTube Shorts.
            </p>
          </div>

          {/* 3. Avatar & Voice Realistis */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Avatar & Voice Realistis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pilih avatar AI 2D/3D Digital Twin, suara natural Indonesia/Inggris, ekspresi wajah dinamis, dan gaya komunikasi sesuai brand Anda.
            </p>
          </div>

          {/* 4. Integrasi Checkout */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Integrasi Checkout</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Terhubung dengan Midtrans & direct checkout link untuk pembayaran otomatis saat penonton menyaksikan live streaming.
            </p>
          </div>

          {/* 5. Data & Analitik Lengkap */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Data & Analitik Lengkap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pantau performa live & video promo dengan dashboard analytics real-time (viewer count, CTR keranjang, total omset).
            </p>
          </div>

          {/* 6. Hemat Biaya Operasional */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Hemat Biaya Operasional</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Self-hosted open-source stack menghemat hingga 90% biaya operasional dibanding mempekerjakan host manusia bergantian.
            </p>
          </div>

        </div>

      </section>

      {/* 4. ALUR KERJA (5-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            ALUR KERJA SEDERHANA
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Bagaimana <span className="text-cyan-400">LiveStreamerAI</span> Bekerja
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          
          {/* Step 1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 relative group hover:border-blue-500/50 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
              1
            </div>
            <h4 className="text-sm font-bold text-white">Input Data Bisnis</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unggah foto produk, deskripsi, stok & harga (via CSV atau API).
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 relative group hover:border-blue-500/50 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
              2
            </div>
            <h4 className="text-sm font-bold text-white">Pilih Avatar & Mode</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pilih avatar AI, suara, dan mode output (Live atau Video Promo).
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 relative group hover:border-blue-500/50 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
              3
            </div>
            <h4 className="text-sm font-bold text-white">AI Jalankan Live / Video</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI melakukan live streaming atau membuat video promo otomatis.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 relative group hover:border-blue-500/50 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
              4
            </div>
            <h4 className="text-sm font-bold text-white">Interaksi & Checkout</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI berinteraksi dengan audiens & memproses pembayaran otomatis.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 relative group hover:border-blue-500/50 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
              5
            </div>
            <h4 className="text-sm font-bold text-white">Analitik & Laporan</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dapatkan laporan lengkap performa live & video untuk optimasi omset.
            </p>
          </div>

        </div>

      </section>

      {/* 5. PAKET & PRICING (OPTION A & B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            PILIH SESUAI KEBUTUHAN ANDA
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Paket Live Streaming & Video Promo
          </h2>
        </div>

        {/* Group A: Live Streaming */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-blue-400">
            <Radio className="w-4 h-4" />
            <span>AI LIVE STREAMING (OTONOM & INTERAKTIF)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {PRICING_LIVE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`bg-slate-900 border rounded-3xl p-6 space-y-6 relative transition-all ${
                  tier.isPopular 
                    ? 'border-blue-500 shadow-2xl shadow-blue-600/20 bg-gradient-to-b from-blue-950/30 via-slate-900 to-slate-900' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    POPULER
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-white">{tier.title}</h3>
                    <span className="text-xs text-slate-400">{tier.durationLabel}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    Rp{tier.price.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{tier.description}</p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onStartLiveWizard}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                  id={`btn-pilih-paket-${tier.id}`}
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Group B: Short Video Promo */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-400">
            <Video className="w-4 h-4" />
            <span>SHORT VIDEO PROMO PRODUK (SIAP UPLOAD MP4)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {PRICING_VIDEO_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`bg-slate-900 border rounded-3xl p-6 space-y-6 relative transition-all ${
                  tier.isPopular 
                    ? 'border-emerald-500 shadow-2xl shadow-emerald-600/20 bg-gradient-to-b from-emerald-950/20 via-slate-900 to-slate-900' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    POPULER
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-white">{tier.title}</h3>
                    <span className="text-xs text-slate-400">{tier.durationLabel}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    Rp{tier.price.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">/ video</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{tier.description}</p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onOpenVideoPromo}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                  id={`btn-pilih-video-${tier.id}`}
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Tech Spec & Full Table */}
        <div className="pt-2">
          <button
            onClick={onOpenTechSpec}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group"
            id="link-lihat-semua-paket-cogs"
          >
            <span>Lihat rincian modal komputasi (COGS) & margin profit detail</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </section>

      {/* 6. BIG CTA BANNER & VALUE BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-950/60 border border-blue-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Siap Otomatiskan Live Selling & Promosi Anda?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Hemat waktu, kurangi biaya, dan tingkatkan penjualan dengan AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartLiveWizard}
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/40 transition-all transform hover:scale-105 active:scale-95"
              id="cta-mulai-gratis"
            >
              Mulai Gratis 7 Hari
            </button>
            <button
              onClick={onOpenTechSpec}
              className="px-6 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700"
              id="cta-lihat-demo"
            >
              Lihat Spec & Demo
            </button>
          </div>

        </div>

        {/* 4 Bottom Value Badges (Exact from Homepage.png) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center text-xs">
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <div className="text-left">
              <span className="font-bold text-white block">Open Source</span>
              <span className="text-[11px] text-slate-400">Transparan & Bisa Custom</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Layers className="w-5 h-5 text-blue-400" />
            <div className="text-left">
              <span className="font-bold text-white block">Self-Hosted</span>
              <span className="text-[11px] text-slate-400">Data Aman & Terkontrol</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <span className="font-bold text-white block">Hemat 90% Biaya</span>
              <span className="text-[11px] text-slate-400">Dibanding Platform Lain</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Bot className="w-5 h-5 text-purple-400" />
            <div className="text-left">
              <span className="font-bold text-white block">Support Komunitas</span>
              <span className="text-[11px] text-slate-400">Aktif & Responsif</span>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
