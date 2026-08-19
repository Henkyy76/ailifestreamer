import React, { useState, useEffect, useRef } from 'react';
import { Video, Play, Pause, Download, Sparkles, Wand2, RefreshCw, Check, CheckCircle2, Clock, Globe, Volume2, Film, Layers, Zap, Flame, Eye } from 'lucide-react';
import { Product, AIHost } from '../types';
import { PRICING_VIDEO_TIERS } from '../data/mockData';
import { generateVideoPromoScript, VideoScript } from '../utils/aiResponseEngine';
import { speakText, stopSpeaking } from '../utils/speechHelper';
import confetti from 'canvas-confetti';

interface VideoPromoStudioProps {
  products: Product[];
  hosts: AIHost[];
}

export const VideoPromoStudio: React.FC<VideoPromoStudioProps> = ({
  products,
  hosts
}) => {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [selectedHostId, setSelectedHostId] = useState(hosts[1]?.id || hosts[0]?.id);
  const [selectedTierId, setSelectedTierId] = useState('video-standard');
  const [selectedFrameworkIdx, setSelectedFrameworkIdx] = useState(0);
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreparingAudio, setIsPreparingAudio] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState('');
  const [activeSubtitlePart, setActiveSubtitlePart] = useState<'hook' | 'body' | 'cta'>('hook');
  const [regenCount, setRegenCount] = useState(0);
  const [currentScript, setCurrentScript] = useState<VideoScript>(() => 
    generateVideoPromoScript(products[0], 30, 0, 'Bahasa Indonesia')
  );

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const selectedHost = hosts.find(h => h.id === selectedHostId) || hosts[0];
  const selectedTier = PRICING_VIDEO_TIERS.find(t => t.id === selectedTierId) || PRICING_VIDEO_TIERS[1];

  // Framework Options
  const frameworks = [
    { label: '🔥 Problem - Agitate - Solve', desc: 'Konversi Tinggi Pain Point' },
    { label: '✨ Viral TikTok Curiosity', desc: 'Trik Rahasia & FYP Hook' },
    { label: '⚡ Before vs After Transformation', desc: 'Bukti Nyata 7 Hari' },
    { label: '📦 Review Jujur & Unboxing', desc: 'Storytelling & Trust' },
    { label: '🚨 Urgent Flash Sale FOMO', desc: 'Direct Selling & Countdown' },
    { label: '💎 POV Trending Challenge', desc: 'Gen-Z Vibe Engagement' }
  ];

  // Update script whenever product, tier, framework, or language changes
  useEffect(() => {
    const duration = selectedTier.id === 'video-short' ? 15 : selectedTier.id === 'video-standard' ? 30 : 60;
    const newScript = generateVideoPromoScript(selectedProduct, duration, selectedFrameworkIdx + regenCount, language);
    setCurrentScript(newScript);
    setActiveSubtitle(newScript.hook);
  }, [selectedProductId, selectedTierId, selectedFrameworkIdx, regenCount, language]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    stopSpeaking();
    setIsPlaying(false);

    setTimeout(() => {
      setRegenCount(prev => prev + 1);
      setIsGenerating(false);
      try {
        confetti({ particleCount: 35, spread: 50 });
      } catch (_) {}
    }, 600);
  };

  const togglePlayVoiceover = async () => {
    if (isPlaying || isPreparingAudio) {
      stopSpeaking();
      setIsPlaying(false);
      setIsPreparingAudio(false);
      setActiveSubtitle(currentScript.hook);
      setActiveSubtitlePart('hook');
    } else {
      setIsPreparingAudio(true);
      setActiveSubtitle(currentScript.hook);
      setActiveSubtitlePart('hook');
      let timer1: number | undefined;
      let timer2: number | undefined;

      const fullText = `${currentScript.hook} ${currentScript.body} ${currentScript.cta}`;
      await speakText(fullText, {
        gender: selectedHost.voiceGender,
        language,
        speechStyle: 'Persuasif',
        voiceCharacter: selectedHost.voiceTone,
        onStart: () => {
          setIsPreparingAudio(false);
          setIsPlaying(true);
          timer1 = window.setTimeout(() => {
            setActiveSubtitle(currentScript.body);
            setActiveSubtitlePart('body');
          }, 4000);
          timer2 = window.setTimeout(() => {
            setActiveSubtitle(currentScript.cta);
            setActiveSubtitlePart('cta');
          }, 9500);
        }
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsPreparingAudio(false);
      setIsPlaying(false);
      setActiveSubtitle(currentScript.hook);
      setActiveSubtitlePart('hook');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              MODE OUTPUT B
            </span>
            <h1 className="text-2xl font-bold text-white">Video Promo Produk Otomatis (MP4)</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Hasilkan video promosi vertikal 9:16 resolusi Full HD dengan animasi gerak avatar dinamis, kinetic typography, dan AI voiceover multilingual.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            COGS: ~Rp200 – Rp600 / Video MP4
          </span>
        </div>
      </div>

      {/* Main Grid: Form Controls + Vertical Video Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Video Config */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Pilih Durasi Video */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>1. Pilih Durasi Video Promo</span>
              <span className="text-[11px] text-cyan-400 font-normal">Resolusi 1080x1920 Vertikal</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PRICING_VIDEO_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedTierId === tier.id
                      ? 'border-emerald-500 bg-emerald-950/30 text-white shadow-lg shadow-emerald-600/10'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{tier.title}</span>
                    {tier.isPopular && (
                      <span className="text-[9px] bg-emerald-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                        HOT
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-extrabold text-emerald-400 mt-1">{tier.durationLabel}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Rp{tier.price.toLocaleString('id-ID')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Pilih Produk */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              2. Pilih Produk yang Dipromosikan
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                    selectedProductId === prod.id
                      ? 'border-blue-500 bg-blue-950/40 shadow-md shadow-blue-500/10'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                    <p className="text-[11px] text-cyan-400 font-semibold">Rp{prod.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. AI Presenter & Multilingual Voice */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                3. AI Presenter & Bahasa Voiceover
              </label>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs rounded-lg px-2 py-1 focus:outline-none"
                >
                  <option value="Bahasa Indonesia">🇮🇩 Bahasa Indonesia</option>
                  <option value="English Global">🇺🇸 English Global</option>
                  <option value="Mandarin Chinese">🇨🇳 Mandarin Chinese</option>
                  <option value="Japanese">🇯🇵 Japanese</option>
                  <option value="Korean">🇰🇷 Korean</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {hosts.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHostId(h.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all ${
                    selectedHostId === h.id
                      ? 'border-blue-500 bg-blue-950/40 shadow-md shadow-blue-500/20'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mx-auto mb-1.5 border border-slate-700">
                    <img src={h.avatarUrl} alt={h.name} className="w-full h-full object-cover object-top" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-bold text-white">
                      {h.voiceGender}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white">{h.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{h.style}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. AI Script Framework Selector & Script Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            
            {/* Framework Selector Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Pilih Formula Copywriting Viral ({frameworks.length} Frameworks)
                  </span>
                </div>
                <button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/40 transition-all hover:scale-105 active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate Skrip Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {frameworks.map((fw, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFrameworkIdx(idx)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      selectedFrameworkIdx === idx
                        ? 'border-emerald-500 bg-emerald-950/50 text-white shadow-md'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <p className="text-[11px] font-bold truncate">{fw.label}</p>
                    <p className="text-[9px] text-slate-500">{fw.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Script Sections */}
            <div className="space-y-2.5 text-xs">
              <div className={`p-3 rounded-xl border transition-all ${
                activeSubtitlePart === 'hook' && isPlaying ? 'bg-amber-950/40 border-amber-500' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-emerald-400">🎣 Viral Hook (0-5s)</span>
                  <span className="text-[10px] text-slate-500">Kategori: {currentScript.frameworkCategory}</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">{currentScript.hook}</p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${
                activeSubtitlePart === 'body' && isPlaying ? 'bg-cyan-950/40 border-cyan-500' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-cyan-400">💡 Value Proposition & Formula (5-20s)</span>
                  <span className="text-[10px] text-slate-500">{currentScript.frameworkName}</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{currentScript.body}</p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${
                activeSubtitlePart === 'cta' && isPlaying ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-950 border-slate-800'
              }`}>
                <span className="text-[10px] font-bold text-rose-400 block mb-1">🎯 Call to Action / FOMO (20-30s)</span>
                <p className="text-slate-200 leading-relaxed">{currentScript.cta}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right 5 Cols: Dynamic 9:16 Video MP4 Player */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1.5">
              <Film className="w-4 h-4 text-emerald-400" />
              Live MP4 Video Player (9:16 Vertical Full HD)
            </span>
          </div>

          {/* Realistic Phone & Video Player Mockup */}
          <div className="max-w-[320px] mx-auto bg-black rounded-[40px] p-3 border-4 border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Screen Container */}
            <div className="relative aspect-[9/16] rounded-[30px] overflow-hidden bg-slate-950 flex flex-col justify-between p-3.5 select-none">
              
              {/* Dynamic Animated Motion Video Presenter */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={selectedHost.avatarUrl}
                  alt={selectedHost.name}
                  className={`w-full h-full object-cover object-center filter transition-all duration-700 transform ${
                    isPlaying ? 'scale-110 brightness-105 animate-pulse' : 'scale-100 brightness-95'
                  }`}
                />

                {/* Animated Video Glare & Particle Atmosphere */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/70 pointer-events-none" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-radial from-cyan-500/20 via-transparent to-transparent pointer-events-none animate-ping" />
                )}
              </div>

              {/* Top HUD Badges */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white">
                <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold border border-white/10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  MP4 60FPS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-lg shadow-emerald-600/40">
                  <Clock className="w-3 h-3" />
                  {selectedTier.durationLabel}
                </span>
              </div>

              {/* Center Kinetic Video Subtitle Box */}
              <div className="relative z-10 my-auto text-center px-1">
                <div className="inline-block bg-linear-to-r from-yellow-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-2xl border-2 border-black transform rotate-[-1deg] transition-all duration-300">
                  <p className="leading-snug drop-shadow-sm">
                    {activeSubtitle || currentScript.hook}
                  </p>
                </div>
              </div>

              {/* Bottom Product Overlay Card in Video */}
              <div className="relative z-10 space-y-2">
                <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 flex items-center gap-2.5 shadow-2xl">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-white truncate">{selectedProduct.name}</p>
                    <p className="text-xs font-extrabold text-cyan-400">Rp{selectedProduct.price.toLocaleString('id-ID')}</p>
                  </div>
                  <span className="text-[9px] bg-blue-600 text-white font-bold px-2.5 py-1.5 rounded-xl shadow-md shadow-blue-600/30">
                    Beli
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Action Buttons: Play Voiceover & Download */}
          <div className="max-w-[320px] mx-auto space-y-2">
            <button
              onClick={togglePlayVoiceover}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                isPlaying || isPreparingAudio
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
              }`}
              id="btn-play-video-voiceover"
            >
              {isPlaying || isPreparingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              <span>{isPreparingAudio ? 'Menyiapkan Audio AI...' : isPlaying ? 'Jeda Video & Voiceover' : 'Putar Video & Voiceover AI'}</span>
            </button>

            <button
              onClick={() => {
                alert(`🎬 Berhasil me-render Video Promo ${selectedTier.durationLabel} untuk "${selectedProduct.name}" dalam Bahasa ${language}! File MP4 siap dipublikasikan ke TikTok, Instagram Reels, dan Shopee Video.`);
                try {
                  confetti({ particleCount: 60, spread: 70 });
                } catch (_) {}
              }}
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              id="btn-download-video-mp4"
            >
              <Download className="w-4 h-4" />
              <span>Download File MP4 ({selectedTier.durationLabel})</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
