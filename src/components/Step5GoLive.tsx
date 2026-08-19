import React, { useState } from 'react';
import { Radio, Copy, Check, Info, Lock, Play, Sparkles, ExternalLink, ShieldCheck, ChevronRight, HelpCircle } from 'lucide-react';
import { AIHost, Product, StreamingPlatform, AutomationSettings } from '../types';

interface Step5GoLiveProps {
  host: AIHost;
  products: Product[];
  selectedProductIds: string[];
  speechStyle: string;
  durationHours: number;
  platforms: StreamingPlatform[];
  automations: AutomationSettings;
  rtmpUrl: string;
  streamKey: string;
  onStartLive: () => void;
  onPrev: () => void;
}

export const Step5GoLive: React.FC<Step5GoLiveProps> = ({
  host,
  products,
  selectedProductIds,
  speechStyle,
  durationHours,
  platforms,
  automations,
  rtmpUrl,
  streamKey,
  onStartLive,
  onPrev
}) => {
  const [copiedRtmp, setCopiedRtmp] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const copyToClipboard = (text: string, type: 'rtmp' | 'key') => {
    navigator.clipboard.writeText(text);
    if (type === 'rtmp') {
      setCopiedRtmp(true);
      setTimeout(() => setCopiedRtmp(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const activeAutomationCount = [
    automations.autoReplyComments,
    automations.autoPinProducts,
    automations.autoPromo,
    automations.autoModeration
  ].filter(Boolean).length;

  const minCogs = 10000 * durationHours;
  const maxCogs = 15000 * durationHours;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Step Header */}
      <div className="border-b border-slate-800 pb-4 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            STEP 5
          </span>
          <h2 className="text-2xl font-extrabold text-white">Go Live</h2>
        </div>
        <p className="text-sm text-slate-400">
          Semua siap! Mulai live dan AI akan bekerja otomatis mempromosikan produk Anda.
        </p>
      </div>

      {/* Main Box Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Top Two Columns: Ringkasan vs Koneksi RTMP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Ringkasan Siap Live */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Ringkasan Siap Live</span>
              <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Siap Siar
              </span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AI Host</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <img src={host.avatarUrl} alt={host.name} className="w-5 h-5 rounded-full object-cover" />
                  {host.name} ({speechStyle})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Durasi Live</span>
                <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                  {durationHours} Jam Nonstop
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Produk</span>
                <span className="font-bold text-white">
                  {selectedProductIds.length || products.length} Produk (Katalog RAG)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Platform</span>
                <span className="font-bold text-cyan-300">
                  {platforms.join(', ')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Otomatisasi</span>
                <span className="font-bold text-emerald-400">
                  {activeAutomationCount} Fitur Aktif
                </span>
              </div>
            </div>
          </div>

          {/* Right: Koneksi Streaming RTMP */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Koneksi Streaming
              </h3>
              <button
                onClick={() => setShowTutorialModal(true)}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                id="btn-lihat-tutorial-rtmp"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Lihat Tutorial &gt;</span>
              </button>
            </div>

            {/* RTMP URL input with copy */}
            <div className="space-y-1">
              <label className="block text-[11px] text-slate-400 font-semibold">
                RTMP URL
              </label>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                <input
                  type="text"
                  readOnly
                  value={rtmpUrl}
                  className="w-full bg-transparent text-xs text-slate-200 font-mono focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(rtmpUrl, 'rtmp')}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  title="Salin URL"
                >
                  {copiedRtmp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Stream Key input with copy */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] text-slate-400 font-semibold">
                  Stream Key
                </label>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="text-[10px] text-slate-500 hover:text-slate-300"
                >
                  {showKey ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                <input
                  type={showKey ? 'text' : 'password'}
                  readOnly
                  value={streamKey}
                  className="w-full bg-transparent text-xs text-slate-200 font-mono focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(streamKey, 'key')}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  title="Salin Stream Key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-slate-500">
              💡 Salin data di atas ke OBS Studio, TikTok Live Studio, atau Shopee Live Console.
            </p>
          </div>

        </div>

        {/* Estimasi Biaya Box (COGS Table summary from specs) */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-blue-800/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Estimasi Biaya Komputasi (COGS Self-Hosted)
              </span>
              <div className="text-base font-extrabold text-cyan-300 mt-0.5">
                ~Rp10.000 – Rp15.000 / jam live
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ≈ Rp{minCogs.toLocaleString('id-ID')} – Rp{maxCogs.toLocaleString('id-ID')} untuk sesi {durationHours} jam nonstop
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-xs font-bold">
              Hemat 90% vs Host Manusia
            </span>
          </div>
        </div>

        {/* Big Launch Button */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={onStartLive}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-extrabold text-base shadow-2xl shadow-blue-600/40 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
            id="btn-mulai-live-sekarang"
          >
            <Play className="w-5 h-5 fill-current text-white animate-pulse" />
            <span>Mulai Live Sekarang</span>
            <span className="text-xs font-normal opacity-80">(AI akan mulai streaming otomatis di platform Anda)</span>
          </button>

          <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Anda dapat menjeda atau menghentikan siaran live kapan saja melalui Live Control Center</span>
          </p>
        </div>

      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
        >
          ← Kembali ke Preview & Test
        </button>
      </div>

      {/* Tutorial Modal */}
      {showTutorialModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Panduan Koneksi RTMP ke Platform Live</h3>
              <button
                onClick={() => setShowTutorialModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <ol className="space-y-2.5 list-decimal pl-4 leading-relaxed">
              <li>
                <strong>Buka Platform Streaming Anda:</strong> Buka TikTok Live Studio, YouTube Studio Live, atau Shopee Live Broadcast Console.
              </li>
              <li>
                <strong>Pilih Mode RTMP / Custom Stream:</strong> Pilih opsi siaran menggunakan RTMP / Encoder eksternal.
              </li>
              <li>
                <strong>Paste Server URL & Stream Key:</strong> Masukkan URL dan Stream Key dari LiveStreamerAI ke kolom yang disediakan.
              </li>
              <li>
                <strong>Klik "Mulai Live Sekarang":</strong> AI Host akan langsung melakukan transmisi video & suara sinkron dan menyematkan keranjang belanja secara otomatis.
              </li>
            </ol>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowTutorialModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
