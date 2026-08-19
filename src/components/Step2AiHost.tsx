import React, { useState, useEffect } from 'react';
import { Play, Pause, Check, Volume2, Sparkles, UserCheck, ChevronRight, ChevronLeft, Globe, Mic, Radio } from 'lucide-react';
import { AIHost, SpeechStyle } from '../types';
import { speakText, stopSpeaking } from '../utils/speechHelper';

interface Step2AiHostProps {
  hosts: AIHost[];
  selectedHostId: string;
  setSelectedHostId: (id: string) => void;
  speechStyle: SpeechStyle;
  setSpeechStyle: (style: SpeechStyle) => void;
  language: string;
  setLanguage: (lang: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2AiHost: React.FC<Step2AiHostProps> = ({
  hosts,
  selectedHostId,
  setSelectedHostId,
  speechStyle,
  setSpeechStyle,
  language,
  setLanguage,
  onNext,
  onPrev
}) => {
  const [filterType, setFilterType] = useState<'Semua' | 'Avatar 2D' | 'Avatar 3D'>('Avatar 3D');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [voiceCharacter, setVoiceCharacter] = useState<string>('Natural Standard');

  const selectedHost = hosts.find(h => h.id === selectedHostId) || hosts[1];

  const filteredHosts = hosts.filter(h => {
    if (filterType === 'Avatar 2D') return h.type === '2D';
    if (filterType === 'Avatar 3D') return h.type === '3D';
    return true;
  });

  // Get localized sample text
  const getLocalizedSample = () => {
    if (language.includes('English')) {
      if (selectedHost.voiceGender === 'Pria') {
        return `Hello everyone, this is Kenzo! Welcome to our special live show. Check out our exclusive discounts today and tap the link below!`;
      }
      return `Hello everyone, welcome to our live shopping stream! Don't miss out on today's massive discount, tap the yellow cart right now!`;
    }
    if (language.includes('Mandarin')) {
      return `大家好，欢迎来到我们的官方直播间！今天带来的是全场独家限时特惠，赶紧点击下方小黄车一键抢购吧！`;
    }
    if (language.includes('Japanese')) {
      return `みなさん、こんにちは！ライブ配信へようこそ！本日限りの特別セールです。ぜひ黄色いカートをタップしてチェックしてくださいね！`;
    }
    if (language.includes('Korean')) {
      return `여러분 안녕하세요! 라이브 방송에 오신 것을 환영합니다! 오늘만 드리는 특별 할인 혜택, 지금 바로 확인해 보세요!`;
    }
    // Default: Indonesian
    if (selectedHost.voiceGender === 'Pria') {
      return `Halo bro dan semuanya! Saya Kenzo, siap memandu live session kali ini. Ada promo diskon eksklusif dan gratis ongkir, langsung amankan di keranjang ya!`;
    }
    if (speechStyle === 'Energetic') {
      return `HALO SEMUANYA! Selamat datang di live super seru kita! Ada diskon kilat sampai 50%, buruan checkout sebelum kehabisan!`;
    }
    if (speechStyle === 'Professional') {
      return `Selamat datang, Bapak dan Ibu sekalian. Produk kami telah teruji klinis dan tersertifikasi resmi BPOM untuk hasil terbaik.`;
    }
    return `Halo semuanya! Selamat datang di sesi live belanja kita hari ini. Jangan lupa langsung tap keranjang kuning sekarang ya!`;
  };

  const togglePlayAudio = async () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      setAudioProgress(0);
    } else {
      setIsPlayingAudio(true);
      setAudioProgress(10);
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 14;
        });
      }, 700);

      const sampleText = getLocalizedSample();
      await speakText(sampleText, {
        gender: selectedHost.voiceGender,
        language,
        speechStyle,
        voiceCharacter
      });

      setIsPlayingAudio(false);
      setAudioProgress(0);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [selectedHostId, language, speechStyle, voiceCharacter]);

  return (
    <div className="space-y-6">
      
      {/* Step Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            STEP 2
          </span>
          <h2 className="text-xl font-bold text-white">Pilih AI Host</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Pilih avatar AI (2D/3D), karakter suara, bahasa utama, dan gaya bicara yang sesuai dengan brand Anda.
        </p>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        
        {/* Avatar Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterType('Avatar 2D')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'Avatar 2D' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Avatar 2D
            </button>
            <button
              onClick={() => setFilterType('Avatar 3D')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'Avatar 3D' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Avatar 3D
            </button>
            <button
              onClick={() => setFilterType('Semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'Semua' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-cyan-400 font-semibold flex items-center gap-1 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40">
              <Sparkles className="w-3.5 h-3.5" />
              Aktif: {selectedHost.name} ({selectedHost.voiceGender})
            </span>
          </div>
        </div>

        {/* Avatar Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {filteredHosts.map((host) => {
            const isSelected = host.id === selectedHostId;
            return (
              <div
                key={host.id}
                onClick={() => setSelectedHostId(host.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-950/30 shadow-xl shadow-blue-500/20 scale-[1.02]'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:scale-[1.01]'
                }`}
              >
                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                {/* Avatar Type & Gender Badge */}
                <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[9px] font-bold border border-white/10">
                    {host.type} Digital Twin
                  </span>
                  <span className={`px-2 py-0.5 rounded-md backdrop-blur-md text-[9px] font-bold border ${
                    host.voiceGender === 'Pria' ? 'bg-indigo-900/80 text-indigo-200 border-indigo-500/40' : 'bg-pink-900/80 text-pink-200 border-pink-500/40'
                  }`}>
                    {host.voiceGender === 'Pria' ? '👨 Suara Pria' : '👩 Suara Wanita'}
                  </span>
                </div>

                {/* Avatar Image Aspect Ratio */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={host.avatarUrl}
                    alt={host.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Avatar Card Info */}
                <div className="p-3 bg-slate-950/90 relative z-10 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{host.name}</h4>
                    <span className="text-[10px] font-medium text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded-md border border-cyan-800/40">
                      {host.style}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                    {host.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voice & Language Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          {/* Karakter Suara Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                Karakter Suara ({selectedHost.voiceGender})
              </span>
              <span className="text-[10px] text-slate-400">Timbre & Pitch Realistis</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={voiceCharacter}
                onChange={(e) => setVoiceCharacter(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                {selectedHost.voiceGender === 'Pria' ? (
                  <>
                    <option value="Pria Karismatik & Bass">Pria Karismatik & Deep Bass (Maskulin, Tegas, Otomotif & Tech)</option>
                    <option value="Pria Enerjik & Ceria">Pria Enerjik & Hype (Dinamis, Flash Sale, Apparel)</option>
                    <option value="Pria Eksekutif Dewasa">Pria Eksekutif & Profesional (Formal, Elegan, Luxury)</option>
                  </>
                ) : (
                  <>
                    <option value="Gadis Muda & Ramah">Wanita Muda & Ramah (Cerah, Hangat, Skincare & Beauty)</option>
                    <option value="Wanita Enerjik & Ceria">Wanita Enerjik & Ceria (Flash Sale, Hype, Fashion)</option>
                    <option value="Wanita Eksekutif Dewasa">Wanita Eksekutif & Elegan (Terpercaya, BPOM, Premium)</option>
                    <option value="Modern Casual Gen-Z">Modern Casual & Akrab (Santai, Gen-Z Vibe)</option>
                  </>
                )}
              </select>

              <button
                onClick={togglePlayAudio}
                className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 transition-colors shrink-0 flex items-center gap-1"
                title="Dengarkan Contoh Suara"
                id="btn-play-voice-sample"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 fill-current text-blue-400" />}
              </button>
            </div>
          </div>

          {/* Bahasa Utama Live Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                Bahasa Utama Live & Video
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold">Multilingual AI</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Bahasa Indonesia">🇮🇩 Bahasa Indonesia (Dialek Percakapan Natural Live)</option>
              <option value="English Global">🇺🇸 English Global (International Social Commerce)</option>
              <option value="Mandarin Chinese">🇨🇳 Mandarin Chinese (中文 - Live Selling Accent)</option>
              <option value="Japanese">🇯🇵 Japanese (日本語 - Polite & High Conversion)</option>
              <option value="Korean">🇰🇷 Korean (한국어 - Trendy K-Beauty Live Style)</option>
            </select>
          </div>

        </div>

        {/* Gaya Bicara Selection Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Gaya Bicara AI Host (Pitch, Tempo & Nada Bicara)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['Persuasif', 'Casual', 'Professional', 'Energetic'] as SpeechStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setSpeechStyle(style)}
                className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                  speechStyle === style
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {speechStyle === style && <Check className="w-3.5 h-3.5 text-white" />}
                <span>{style}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Waveform Live Sample Card */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={togglePlayAudio}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30 transition-all"
              id="btn-waveform-play"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">
                {selectedHost.name} ({selectedHost.voiceGender}) • {speechStyle}
              </span>
              <span className="text-[10px] text-cyan-400">
                Bahasa: {language} | XTTS v2 Neural Engine
              </span>
            </div>
          </div>

          {/* Animated Waveform Bars */}
          <div className="flex-1 w-full flex items-center justify-between gap-1 h-9 px-3 bg-slate-900/80 rounded-xl overflow-hidden">
            {Array.from({ length: 36 }).map((_, i) => {
              const heights = [25, 50, 75, 95, 65, 35, 85, 100, 45, 70, 90, 55, 40, 80, 100, 50, 65, 85];
              const h = heights[i % heights.length];
              const isPast = (i / 36) * 100 <= audioProgress;
              return (
                <span
                  key={i}
                  style={{ height: `${isPlayingAudio ? Math.max(18, (h * (0.5 + Math.random() * 0.5))) : h * 0.35}%` }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPast ? 'bg-cyan-400' : isPlayingAudio ? 'bg-blue-500' : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          <span className="text-xs text-slate-400 font-mono shrink-0">
            {isPlayingAudio ? `00:0${Math.min(8, Math.floor(audioProgress / 12))}` : '00:00'} / 00:08
          </span>
        </div>

      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
        >
          ← Kembali ke Data Produk
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
          id="btn-next-to-step3"
        >
          <span>Lanjut: Atur Live</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
