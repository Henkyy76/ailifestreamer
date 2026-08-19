import React, { useState, useEffect, useRef } from 'react';
import { Radio, Users, MessageSquare, ShoppingCart, DollarSign, ArrowUpRight, Pause, Play, Square, Settings, RefreshCw, Send, CheckCircle, Volume2, Sparkles, Pin } from 'lucide-react';
import { Product, AIHost, LiveComment, LiveStats } from '../types';
import { LiveSimulationScreen } from './LiveSimulationScreen';
import { generateHostResponse } from '../utils/aiResponseEngine';
import { speakText, stopSpeaking } from '../utils/speechHelper';
import confetti from 'canvas-confetti';

interface LiveControlCenterProps {
  activeProduct: Product;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  host: AIHost;
  speechStyle: string;
  language?: string;
  durationHours: number;
  onEndLive: () => void;
}

export const LiveControlCenter: React.FC<LiveControlCenterProps> = ({
  activeProduct,
  products,
  onSelectProduct,
  host,
  speechStyle,
  language = 'Bahasa Indonesia',
  durationHours,
  onEndLive
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [autoReply, setAutoReply] = useState(true);
  const [inputMsg, setInputMsg] = useState('');
  const [liveSeconds, setLiveSeconds] = useState(8136); // 02:15:36

  const [stats, setStats] = useState<LiveStats>({
    viewers: 2134,
    commentsCount: 156,
    productClicks: 312,
    totalSales: 3450000,
    itemsSold: 42,
    liveDurationSeconds: 8136,
    likesCount: 14500
  });

  const [recentComments, setRecentComments] = useState<LiveComment[]>([
    {
      id: 'lc-1',
      sender: 'Rina (Penonton)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      message: 'Berapa harganya kak? Ada diskon?',
      timestamp: '10:23'
    },
    {
      id: 'lc-2',
      sender: `AI Host (${host.name})`,
      avatar: host.avatarUrl,
      message: generateHostResponse('harga', activeProduct, host, speechStyle, language).text,
      timestamp: '10:23',
      isAiReply: true
    },
    {
      id: 'lc-3',
      sender: 'Andi Pratama',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      message: 'Bisa COD gak kak ke luar pulau?',
      timestamp: '10:24'
    },
    {
      id: 'lc-4',
      sender: `AI Host (${host.name})`,
      avatar: host.avatarUrl,
      message: generateHostResponse('cod', activeProduct, host, speechStyle, language).text,
      timestamp: '10:24',
      isAiReply: true
    }
  ]);

  const [salesToast, setSalesToast] = useState<{ buyer: string; item: string; amount: number } | null>(null);

  // Live timer tick
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setLiveSeconds(prev => prev + 1);
      
      // Random organic traffic fluctuations
      if (Math.random() > 0.7) {
        setStats(prev => ({
          ...prev,
          viewers: prev.viewers + Math.floor(Math.random() * 7) - 2,
          productClicks: prev.productClicks + (Math.random() > 0.6 ? 1 : 0),
          likesCount: prev.likesCount + Math.floor(Math.random() * 15)
        }));
      }

      // Random automated sales event
      if (Math.random() > 0.96) {
        triggerSimulatedSale();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, activeProduct]);

  const formatHMS = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const triggerSimulatedSale = () => {
    const buyers = ['Dewi S.', 'Bagas Pratama', 'Siti Rahma', 'Hendro', 'Lestari', 'Kevin A.'];
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    
    setStats(prev => ({
      ...prev,
      totalSales: prev.totalSales + activeProduct.price,
      itemsSold: prev.itemsSold + 1,
      productClicks: prev.productClicks + 2
    }));

    setSalesToast({
      buyer,
      item: activeProduct.name,
      amount: activeProduct.price
    });

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    setTimeout(() => {
      setSalesToast(null);
    }, 4000);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    setInputMsg('');

    const newC: LiveComment = {
      id: `live-c-${Date.now()}`,
      sender: 'Pengunjung Live',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      message: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRecentComments(prev => [...prev, newC]);
    setStats(prev => ({ ...prev, commentsCount: prev.commentsCount + 1 }));

    if (autoReply) {
      setTimeout(() => {
        const aiAnswer = generateHostResponse(userText, activeProduct, host, speechStyle, language);
        const replyC: LiveComment = {
          id: `live-ai-${Date.now()}`,
          sender: `AI Host (${host.name})`,
          avatar: host.avatarUrl,
          message: aiAnswer.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAiReply: true
        };
        setRecentComments(prev => [...prev, replyC]);
      }, 700);
    }
  };

  const cycleNextProduct = () => {
    const currentIndex = products.findIndex(p => p.id === activeProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    onSelectProduct(products[nextIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner: LIVE STATUS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        
        {/* Left: LIVE Badge + Timer + Platforms */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold shadow-lg shadow-rose-600/40 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>LIVE</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm font-bold">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>{formatHMS(liveSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span>Platform:</span>
            <span className="text-white font-semibold">TikTok • Shopee • YouTube</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-800/40">
            <span>Bahasa:</span>
            <span className="font-bold">{language}</span>
          </div>
        </div>

        {/* Right: Quick Live Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSimulatedSale()}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Simulasikan Penjualan Baru"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Simulasi Order</span>
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPaused ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Lanjutkan Live' : 'Jeda Live'}</span>
          </button>

          <button
            onClick={onEndLive}
            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 flex items-center gap-1.5 transition-all"
            id="btn-akhiri-live"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Akhiri Live</span>
          </button>
        </div>

      </div>

      {/* Main Stats 4-Card Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Penonton */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Penonton</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.viewers.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12% vs rata-rata</span>
          </div>
        </div>

        {/* Komentar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Komentar Interaktif</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.commentsCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+8% interaksi</span>
          </div>
        </div>

        {/* Klik Produk */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Klik Produk</span>
            <ShoppingCart className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.productClicks}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18% CTR</span>
          </div>
        </div>

        {/* Penjualan */}
        <div className="bg-linear-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Penjualan</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            Rp{stats.totalSales.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+22% omset</span>
          </div>
        </div>

      </div>

      {/* Main Layout: Left Live Stream Feed | Right Control Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: Active Live Stream Monitor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="max-w-md mx-auto">
            <LiveSimulationScreen
              activeProduct={activeProduct}
              host={host}
              speechStyle={speechStyle}
              language={language}
              autoReplyEnabled={autoReply}
              onProductChangeRequest={cycleNextProduct}
              onBuyClick={() => triggerSimulatedSale()}
              showToolbar={true}
            />
          </div>
        </div>

        {/* Right 5 Cols: Active Product Card + Comments Feed + Controls */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Product Control Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Pin className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Produk Aktif</h3>
              </div>
              <button
                onClick={cycleNextProduct}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Ubah</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-700 bg-slate-800"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{activeProduct.name}</h4>
                <div className="text-sm font-extrabold text-cyan-400 mt-0.5">
                  Rp{activeProduct.price.toLocaleString('id-ID')}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
                  <span>Klik: <strong className="text-white">128</strong></span>
                  <span>Terjual: <strong className="text-emerald-400">{stats.itemsSold}</strong></span>
                  <span>Sisa: <strong className="text-amber-300">{activeProduct.stock}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={cycleNextProduct}
              className="w-full py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              id="btn-set-produk-berikutnya"
            >
              <span>Set Produk Berikutnya</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Komentar Terbaru Live Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Komentar Terbaru
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">AI Auto-Reply</span>
                <button
                  onClick={() => setAutoReply(!autoReply)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${
                    autoReply ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    autoReply ? 'left-4.5' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
              {recentComments.map((c) => (
                <div
                  key={c.id}
                  className={`p-2.5 rounded-xl border ${
                    c.isAiReply
                      ? 'bg-blue-950/40 border-blue-500/30 text-blue-100'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <img src={c.avatar} alt={c.sender} className="w-4 h-4 rounded-full object-cover" />
                      <span className={c.isAiReply ? 'text-cyan-300' : 'text-slate-300'}>{c.sender}</span>
                      {c.isAiReply && (
                        <span className="text-[9px] px-1 py-0.2 bg-cyan-500/20 text-cyan-300 rounded font-bold">
                          AI Host
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{c.message}</p>
                </div>
              ))}
            </div>

            {/* Interactive Comment Input */}
            <form onSubmit={handleSendComment} className="flex gap-2 pt-1">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Tulis chat / tes tanya harga..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                title="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer Controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
              <span>{isPaused ? 'Lanjutkan' : 'Jeda Live'}</span>
            </button>

            <button
              onClick={onEndLive}
              className="py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-bold border border-rose-500/40 transition-colors flex items-center justify-center gap-2"
            >
              <Square className="w-4 h-4 fill-current text-rose-400" />
              <span>Akhiri Sesi Live</span>
            </button>
          </div>

        </div>

      </div>

      {/* Floating Sales Alert Toast */}
      {salesToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up border border-emerald-400/40">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block">
              🎉 Pesanan Baru Berhasil!
            </span>
            <p className="text-xs font-extrabold text-white">
              {salesToast.buyer} membeli {salesToast.item}
            </p>
            <span className="text-xs font-bold text-emerald-100">
              +Rp{salesToast.amount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
