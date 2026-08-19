import React, { useState } from 'react';
import { Clock, Radio, Check, Sparkles, Sliders, Shield, MessageSquare, Pin, Flame, Eye, ChevronRight } from 'lucide-react';
import { Product, StreamingPlatform, AutomationSettings } from '../types';

interface Step3AturLiveProps {
  products: Product[];
  selectedProductIds: string[];
  setSelectedProductIds: React.Dispatch<React.SetStateAction<string[]>>;
  durationHours: number;
  setDurationHours: (hours: number) => void;
  platforms: StreamingPlatform[];
  setPlatforms: React.Dispatch<React.SetStateAction<StreamingPlatform[]>>;
  automations: AutomationSettings;
  setAutomations: React.Dispatch<React.SetStateAction<AutomationSettings>>;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3AturLive: React.FC<Step3AturLiveProps> = ({
  products,
  selectedProductIds,
  setSelectedProductIds,
  durationHours,
  setDurationHours,
  platforms,
  setPlatforms,
  automations,
  setAutomations,
  onNext,
  onPrev
}) => {
  const [productSelectionMode, setProductSelectionMode] = useState<'all' | 'manual'>('all');
  const [showScriptModal, setShowScriptModal] = useState(false);

  const togglePlatform = (p: StreamingPlatform) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(prev => prev.filter(item => item !== p));
      }
    } else {
      setPlatforms(prev => [...prev, p]);
    }
  };

  const toggleProductId = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedProductIds(prev => [...prev, id]);
    }
  };

  const handleSelectAllProducts = () => {
    setProductSelectionMode('all');
    setSelectedProductIds(products.map(p => p.id));
  };

  const handleManualProductMode = () => {
    setProductSelectionMode('manual');
    if (selectedProductIds.length === 0 && products.length > 0) {
      setSelectedProductIds([products[0].id]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Step Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            STEP 3
          </span>
          <h2 className="text-xl font-bold text-white">Atur Live</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Atur detail live streaming dan otomatisasi AI Host Anda.
        </p>
      </div>

      {/* Main Settings Form Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        
        {/* 1. Pilih Produk yang Ditampilkan */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Pilih Produk yang Ditampilkan
            </label>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={handleSelectAllProducts}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  productSelectionMode === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua Produk ({products.length})
              </button>
              <button
                onClick={handleManualProductMode}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  productSelectionMode === 'manual' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Pilih Manual ({selectedProductIds.length})
              </button>
            </div>
          </div>

          {/* Product Thumbnails Carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {products.map((prod) => {
              const isSelected = selectedProductIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    if (productSelectionMode === 'manual') {
                      toggleProductId(prod.id);
                    }
                  }}
                  className={`shrink-0 w-32 rounded-xl p-2 bg-slate-950 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 shadow-md shadow-blue-500/10'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-square w-full rounded-lg overflow-hidden relative mb-1.5 bg-slate-900">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-white truncate">{prod.name}</p>
                  <p className="text-[10px] text-cyan-400 font-bold">Rp{prod.price.toLocaleString('id-ID')}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Durasi Live */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Durasi Live
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { hours: 2, label: '2 Jam', sub: 'Express Live' },
              { hours: 8, label: '8 Jam', sub: 'Shift (Rekomendasi)', popular: true },
              { hours: 24, label: '24 Jam', sub: 'Marathon 24/7' }
            ].map((tier) => (
              <button
                key={tier.hours}
                onClick={() => setDurationHours(tier.hours)}
                className={`p-3.5 rounded-xl border text-center transition-all relative ${
                  durationHours === tier.hours
                    ? 'border-blue-500 bg-blue-950/40 text-white shadow-lg shadow-blue-500/20'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-extrabold uppercase">
                    Populer
                  </span>
                )}
                <div className="text-sm font-bold text-white">{tier.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{tier.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Platform Tujuan */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Platform Tujuan (Multi-Stream RTMP)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {([
              'TikTok LIVE',
              'YouTube',
              'Shopee Live',
              'Facebook Live',
              'Custom RTMP'
            ] as StreamingPlatform[]).map((p) => {
              const active = platforms.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    active
                      ? 'border-blue-500 bg-blue-600/20 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{p}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Otomatisasi AI (4 Key Checkboxes) */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Otomatisasi AI</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. Auto-reply */}
            <div 
              onClick={() => setAutomations(prev => ({ ...prev, autoReplyComments: !prev.autoReplyComments }))}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                automations.autoReplyComments 
                  ? 'border-blue-500/60 bg-blue-950/20' 
                  : 'border-slate-800 bg-slate-950/60 opacity-60'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                automations.autoReplyComments ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                ✓
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  Auto-reply Komentar
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  AI membaca dan menjawab pertanyaan penonton secara real-time.
                </p>
              </div>
            </div>

            {/* 2. Auto-pin */}
            <div 
              onClick={() => setAutomations(prev => ({ ...prev, autoPinProducts: !prev.autoPinProducts }))}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                automations.autoPinProducts 
                  ? 'border-blue-500/60 bg-blue-950/20' 
                  : 'border-slate-800 bg-slate-950/60 opacity-60'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                automations.autoPinProducts ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                ✓
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 text-amber-400" />
                  Auto-pin Produk
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Sematkan produk terbaik dan ganti berkala sesuai topik live.
                </p>
              </div>
            </div>

            {/* 3. Auto-promosi */}
            <div 
              onClick={() => setAutomations(prev => ({ ...prev, autoPromo: !prev.autoPromo }))}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                automations.autoPromo 
                  ? 'border-blue-500/60 bg-blue-950/20' 
                  : 'border-slate-800 bg-slate-950/60 opacity-60'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                automations.autoPromo ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                ✓
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Auto-promosi
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  AI melontarkan diskon & CTA pembelian secara otomatis.
                </p>
              </div>
            </div>

            {/* 4. Auto Moderasi */}
            <div 
              onClick={() => setAutomations(prev => ({ ...prev, autoModeration: !prev.autoModeration }))}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                automations.autoModeration 
                  ? 'border-blue-500/60 bg-blue-950/20' 
                  : 'border-slate-800 bg-slate-950/60 opacity-60'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                automations.autoModeration ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                ✓
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Auto Moderasi
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Filter otomatis kata kasar, spam link, dan komentar kompetitor.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Script & Gaya Promosi */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-white">Script & Gaya Promosi</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Gunakan script otomatis AI (Direkomendasikan) – AI akan membuat alur promosi berdasarkan produk & target audiens Anda.
            </p>
          </div>
          <button
            onClick={() => setShowScriptModal(true)}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            id="btn-lihat-preview-script"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Preview Script</span>
          </button>
        </div>

      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
        >
          ← Kembali ke Pilih Host
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
          id="btn-next-to-step4"
        >
          <span>Lanjut: Preview & Test</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Script Preview Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Generated AI Live Script</h3>
              </div>
              <button
                onClick={() => setShowScriptModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-blue-400 font-bold uppercase text-[10px] block mb-1">
                  1. Opening Hook (00:00 - 02:00)
                </span>
                <p className="leading-relaxed">
                  "Halo semuanya, selamat datang di sesi live spesial kita hari ini! Siapa di sini yang lagi punya masalah kulit kusam atau flek hitam membandel? Jangan di-skip dulu, karena khusus penonton live hari ini, ada diskon rahasia sampai 40% dan voucher gratis ongkir langsung klaim sekarang!"
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-cyan-400 font-bold uppercase text-[10px] block mb-1">
                  2. Product Breakdown & Demonstration (02:00 - 15:00)
                </span>
                <p className="leading-relaxed">
                  "Kenalin ini Serum Brightening Premium kita. Formulanya mengandung Niacinamide 10% dan Vitamin C aktif. Teksturnya bener-bener seringan air, cepat meresap dan nggak lengket sama sekali. Cukup 2-3 tetes pagi dan malam, kulit auto cerah glowing dalam 7 hari!"
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-rose-400 font-bold uppercase text-[10px] block mb-1">
                  3. Urgency & Closing Call to Action (CTA)
                </span>
                <p className="leading-relaxed">
                  "Stok kita untuk harga Rp99.000 cuma tinggal 20 pcs terakhir ya kak! Kalau checkout di luar live harganya balik normal Rp149.000. Langsung klik tas belanja sekarang juga sebelum etalase kita kunci!"
                </p>
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Gunakan Script Ini
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
