import React, { useState, useEffect, useRef } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, ShoppingBag, Send, RefreshCw, Pin, MessageSquare, Zap, Play, Pause, Bot, Globe } from 'lucide-react';
import { Product, AIHost, LiveComment } from '../types';
import { generateHostResponse, generateHostResponseAsync, getLiveMonologue } from '../utils/aiResponseEngine';
import { speakText, stopSpeaking } from '../utils/speechHelper';
import confetti from 'canvas-confetti';

interface LiveSimulationScreenProps {
  activeProduct: Product;
  host: AIHost;
  speechStyle?: string;
  language?: string;
  voiceCharacter?: string;
  autoReplyEnabled?: boolean;
  onProductChangeRequest?: () => void;
  onBuyClick?: (product: Product) => void;
  isInteractive?: boolean;
  showToolbar?: boolean;
  className?: string;
}

export const LiveSimulationScreen: React.FC<LiveSimulationScreenProps> = ({
  activeProduct,
  host,
  speechStyle = 'Persuasif',
  language = 'Bahasa Indonesia',
  voiceCharacter = '',
  autoReplyEnabled = true,
  onProductChangeRequest,
  onBuyClick,
  isInteractive = true,
  showToolbar = true,
  className = ''
}) => {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [inputComment, setInputComment] = useState('');
  const [hearts, setHearts] = useState<{ id: number; left: number; color: string }[]>([]);
  const [showPromoBanner, setShowPromoBanner] = useState(false);
  const [liveDuration, setLiveDuration] = useState(135);
  const [viewerCount, setViewerCount] = useState(1238);
  const [monologueIdx, setMonologueIdx] = useState(0);
  const [currentMonologueText, setCurrentMonologueText] = useState('');

  const [comments, setComments] = useState<LiveComment[]>([
    {
      id: 'c1',
      sender: 'AI Host (Live)',
      avatar: host.avatarUrl,
      message: getLiveMonologue(activeProduct, host, speechStyle, language, 0),
      timestamp: 'Baru saja',
      isAiReply: true
    },
    {
      id: 'c2',
      sender: 'Sari Rahayu',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      message: 'Wah pas banget lagi cari produk ini! Diskonnya sampai kapan kak?',
      timestamp: '1 mnt lalu'
    }
  ]);

  const commentsContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll comments
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [comments, isAiThinking]);

  // Rotate monologues if audio is running or live is playing
  useEffect(() => {
    const monologueTimer = setInterval(() => {
      setMonologueIdx((prev) => {
        const nextIdx = prev + 1;
        const newMonologue = getLiveMonologue(activeProduct, host, speechStyle, language, nextIdx);
        setCurrentMonologueText(newMonologue);
        
        // Add autonomous live speech event to chat
        if (Math.random() > 0.4) {
          setComments(cPrev => [
            ...cPrev.slice(-15),
            {
              id: `mono-${Date.now()}`,
              sender: `AI Host (${host.name})`,
              avatar: host.avatarUrl,
              message: newMonologue,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isAiReply: true
            }
          ]);
        }

        if (isAudioOn) {
          setIsSpeaking(true);
          speakText(newMonologue, {
            gender: host.voiceGender,
            language,
            speechStyle,
            voiceCharacter
          }).then(() => {
            setIsSpeaking(false);
          });
        }

        return nextIdx;
      });
    }, 11000);

    return () => clearInterval(monologueTimer);
  }, [activeProduct, host, speechStyle, language, voiceCharacter, isAudioOn]);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveDuration(prev => prev + 1);
      // Random organic viewer fluctuations
      if (Math.random() > 0.6) {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Floating hearts generator
  useEffect(() => {
    const heartTimer = setInterval(() => {
      const colors = ['#f43f5e', '#ec4899', '#a855f7', '#06b6d4', '#eab308'];
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.floor(Math.random() * 60) + 20,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setHearts(prev => [...prev.slice(-8), newHeart]);
    }, 1600);
    return () => clearInterval(heartTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendCommentText = async (userMsg: string) => {
    if (!userMsg.trim()) return;

    const newComment: LiveComment = {
      id: `user-${Date.now()}`,
      sender: 'Anda (Penonton)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      message: userMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setComments(prev => [...prev, newComment]);

    if (autoReplyEnabled) {
      setIsAiThinking(true);
      try {
        const aiAnswer = await generateHostResponseAsync(userMsg, activeProduct, host, speechStyle, language);
        setIsAiThinking(false);

        const replyComment: LiveComment = {
          id: `ai-${Date.now()}`,
          sender: `AI Host (${host.name})`,
          avatar: host.avatarUrl,
          message: aiAnswer.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAiReply: true
        };
        setComments(prev => [...prev, replyComment]);
        setCurrentMonologueText(aiAnswer.text);

        if (isAudioOn) {
          setIsSpeaking(true);
          await speakText(aiAnswer.text, {
            gender: host.voiceGender,
            language,
            speechStyle,
            voiceCharacter
          });
          setIsSpeaking(false);
        }
      } catch (e) {
        setIsAiThinking(false);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;
    const msg = inputComment;
    setInputComment('');
    handleSendCommentText(msg);
  };

  const toggleSound = () => {
    if (isAudioOn) {
      stopSpeaking();
      setIsAudioOn(false);
      setIsSpeaking(false);
    } else {
      setIsAudioOn(true);
      setIsSpeaking(true);
      const greeting = getLiveMonologue(activeProduct, host, speechStyle, language, 0);
      setCurrentMonologueText(greeting);
      speakText(greeting, {
        gender: host.voiceGender,
        language,
        speechStyle,
        voiceCharacter
      }).then(() => setIsSpeaking(false));
    }
  };

  const handleBuy = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (_) {}
    if (onBuyClick) {
      onBuyClick(activeProduct);
    }
  };

  return (
    <div className={`flex flex-col bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl ${className}`}>
      
      {/* Video Stream Stage */}
      <div className="relative aspect-[9/12] sm:aspect-[9/13] max-h-[580px] w-full bg-slate-950 overflow-hidden flex items-center justify-center select-none">
        
        {/* Dynamic Animated AI Host Avatar Presentation */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={host.avatarUrl}
            alt={host.name}
            className={`w-full h-full object-cover object-center filter transition-all duration-500 transform ${
              isSpeaking
                ? 'scale-105 brightness-110 contrast-105 animate-pulse'
                : 'scale-100 brightness-95'
            }`}
          />

          {/* Dynamic Talking Lip-Sync & Breathing Visualizer Layer */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 via-transparent to-transparent pointer-events-none animate-pulse" />
          )}

          {/* Studio Atmosphere Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />
        </div>

        {/* Live Top Header HUD (Mockup Accurate) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
          
          {/* Host Tag Info */}
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <div className="relative">
              <img src={host.avatarUrl} alt={host.name} className="w-7 h-7 rounded-full object-cover border border-cyan-400" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white">{host.name}</span>
                <span className="text-[9px] px-1 py-0.2 bg-cyan-500/30 text-cyan-300 rounded font-semibold">
                  AI Host
                </span>
              </div>
              <p className="text-[9px] text-slate-300 leading-none">
                {language} • {host.voiceGender}
              </p>
            </div>
          </div>

          {/* Live Badge + Viewers Count */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-rose-600/90 text-white text-[10px] font-extrabold px-2 py-0.8 rounded-full shadow-lg shadow-rose-600/30 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>LIVE</span>
            </div>
            
            <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.8 rounded-full border border-white/10 flex items-center gap-1">
              <span className="text-rose-400">👁️</span>
              <span>{viewerCount.toLocaleString('id-ID')}</span>
            </div>
          </div>

        </div>

        {/* Floating Subtitle / Monologue Live Speech Bar */}
        {currentMonologueText && (
          <div className="absolute top-16 inset-x-3 z-20">
            <div className="bg-black/80 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-2.5 shadow-xl transition-all">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider">
                  Sedang Bicara ({host.voiceGender} • {speechStyle})
                </span>
              </div>
              <p className="text-xs text-white leading-relaxed font-medium line-clamp-2">
                "{currentMonologueText}"
              </p>
            </div>
          </div>
        )}

        {/* Promo Flash Sale Overlay Banner (Conditional toggle) */}
        {showPromoBanner && (
          <div className="absolute top-36 inset-x-3 z-20 bg-gradient-to-r from-amber-500 to-rose-600 text-white p-2.5 rounded-2xl shadow-2xl flex items-center justify-between border border-amber-300/40 animate-bounce">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-200 fill-current" />
              <div>
                <p className="text-[11px] font-extrabold leading-none">FLASH SALE LIVE SPESIAL!</p>
                <p className="text-[9px] text-amber-100">Diskon hingga 40% + Gratis Ongkir</p>
              </div>
            </div>
            <span className="text-xs font-black bg-white text-rose-600 px-2 py-0.5 rounded-lg shadow">
              KLAIM
            </span>
          </div>
        )}

        {/* Floating Heart Animations */}
        <div className="absolute bottom-28 right-3 w-16 h-48 pointer-events-none overflow-hidden z-20">
          {hearts.map(h => (
            <div
              key={h.id}
              style={{ left: `${h.left}%`, color: h.color }}
              className="absolute bottom-0 text-xl animate-float-heart opacity-0"
            >
              ❤️
            </div>
          ))}
        </div>

        {/* Bottom Comments Stream Overlay (TikTok / Shopee Live Style) */}
        <div
          ref={commentsContainerRef}
          className="absolute bottom-24 inset-x-3 max-h-48 overflow-y-auto space-y-1.5 z-20 scrollbar-none pr-1 pointer-events-auto"
        >
          {comments.map((c) => (
            <div
              key={c.id}
              className={`text-xs rounded-2xl px-3 py-1.5 backdrop-blur-md max-w-[92%] transition-all ${
                c.isAiReply
                  ? 'bg-blue-900/80 border border-cyan-400/40 text-cyan-100 shadow-md'
                  : 'bg-black/60 border border-white/10 text-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <img src={c.avatar} alt={c.sender} className="w-3.5 h-3.5 rounded-full object-cover" />
                <span className={`text-[10px] ${c.isAiReply ? 'text-cyan-300' : 'text-amber-300'}`}>
                  {c.sender}
                </span>
                {c.isAiReply && (
                  <span className="text-[8px] bg-cyan-500/30 text-cyan-200 px-1 rounded font-normal">
                    AI Host
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-snug text-slate-200">{c.message}</p>
            </div>
          ))}

          {isAiThinking && (
            <div className="text-xs rounded-2xl px-3 py-1.5 bg-blue-950/80 border border-cyan-400/50 text-cyan-200 max-w-[70%] flex items-center gap-2 animate-pulse">
              <Bot className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span className="text-[10px]">AI Host sedang memikirkan jawaban...</span>
            </div>
          )}
        </div>

        {/* Pinned Product Card in Live Stream (Mockup Accurate) */}
        <div className="absolute bottom-3 inset-x-3 z-20 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-800"
              />
              <span className="absolute -top-1.5 -left-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 rounded-md shadow">
                1
              </span>
            </div>

            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{activeProduct.name}</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-bold text-cyan-400">
                  Rp{activeProduct.price.toLocaleString('id-ID')}
                </span>
                {activeProduct.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through">
                    Rp{activeProduct.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleBuy}
            className="shrink-0 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-blue-600/30 flex items-center gap-1 transition-all active:scale-95"
            id="btn-beli-pinned-product"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Beli Sekarang</span>
          </button>
        </div>

      </div>

      {/* Interactive Toolbar below the screen */}
      {showToolbar && (
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 space-y-2.5">
          
          {/* Quick Clickable Question Chips */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Contoh Pertanyaan (Bisa ketik bebas di kolom bawah):</span>
              </span>
              <span className="text-cyan-400 font-medium">NLP AI Aktif</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
              <button
                onClick={() => handleSendCommentText('Berapa harganya kak? Ada diskon?')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap transition-colors border border-slate-700 shrink-0"
              >
                💰 Berapa harganya?
              </button>
              <button
                onClick={() => handleSendCommentText('Apakah cowok juga bisa pakai produk ini?')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap transition-colors border border-slate-700 shrink-0"
              >
                👨 Bisa buat cowok?
              </button>
              <button
                onClick={() => handleSendCommentText('Bisa kirim ke Papua dan bayar COD gak kak?')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap transition-colors border border-slate-700 shrink-0"
              >
                🚚 Kirim ke pelosok & COD?
              </button>
              <button
                onClick={() => handleSendCommentText('Aman gak untuk ibu hamil dan kulit sensitif?')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap transition-colors border border-slate-700 shrink-0"
              >
                🤰 Aman bumil / sensitif?
              </button>
              <button
                onClick={() => handleSendCommentText('Kapan tanggal expired datenya kak?')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap transition-colors border border-slate-700 shrink-0"
              >
                📅 Kapan Expired Date?
              </button>
              <button
                onClick={() => handleSendCommentText('Host-nya cantik banget, namanya siapa?')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap transition-colors border border-slate-700 shrink-0"
              >
                🥰 Sapa Host
              </button>
            </div>
          </div>

          {/* Quick Custom Comment Input */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="Ketik pertanyaan bebas apa saja ke AI Host..."
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              id="input-simulasi-komentar"
            />
            <button
              type="submit"
              disabled={isAiThinking}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white transition-colors flex items-center justify-center shrink-0"
              title="Kirim Komentar"
              id="btn-send-simulasi-komentar"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Action buttons matching mockup footer controls */}
          <div className="grid grid-cols-5 gap-1.5 pt-1 text-[10px]">
            <button
              onClick={onProductChangeRequest}
              className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Ganti Produk Aktif"
              id="btn-action-ganti-produk"
            >
              <RefreshCw className="w-3.5 h-3.5 mb-0.5 text-blue-400" />
              <span>Ganti</span>
            </button>

            <button
              onClick={() => {
                alert(`📌 "${activeProduct.name}" berhasil disematkan di layar live!`);
              }}
              className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Pin Produk"
              id="btn-action-pin-produk"
            >
              <Pin className="w-3.5 h-3.5 mb-0.5 text-amber-400" />
              <span>Pin Produk</span>
            </button>

            <button
              onClick={() => setShowPromoBanner(!showPromoBanner)}
              className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Tampilkan Banner Promo"
              id="btn-action-tampilkan-promo"
            >
              <Zap className="w-3.5 h-3.5 mb-0.5 text-yellow-400" />
              <span>Promo</span>
            </button>

            <button
              onClick={toggleSound}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors ${
                isAudioOn ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Nyalakan/Matikan Suara AI"
              id="btn-action-suara-toggle"
            >
              <Volume2 className="w-3.5 h-3.5 mb-0.5 text-cyan-400" />
              <span>{isAudioOn ? 'Suara ON' : 'Suara OFF'}</span>
            </button>

            <button
              onClick={handleBuy}
              className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-white border border-emerald-500/40 transition-colors"
              title="Simulasikan Beli"
              id="btn-action-simulasi-order"
            >
              <ShoppingBag className="w-3.5 h-3.5 mb-0.5 text-emerald-400" />
              <span>Beli</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
