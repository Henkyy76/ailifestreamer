import React, { useState } from 'react';
import { Sparkles, Sliders, ChevronRight, CheckCircle2, TrendingUp, Users, ShoppingCart, DollarSign, RefreshCw, Send, Volume2 } from 'lucide-react';
import { Product, AIHost, LiveComment, StreamingPlatform } from '../types';
import { LiveSimulationScreen } from './LiveSimulationScreen';

interface Step4PreviewTestProps {
  products: Product[];
  selectedProductIds: string[];
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  host: AIHost;
  speechStyle: string;
  language?: string;
  durationHours: number;
  platforms: StreamingPlatform[];
  autoReplyEnabled: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoToStep: (step: number) => void;
}

export const Step4PreviewTest: React.FC<Step4PreviewTestProps> = ({
  products,
  selectedProductIds,
  activeProductId,
  setActiveProductId,
  host,
  speechStyle,
  language = 'Bahasa Indonesia',
  durationHours,
  platforms,
  autoReplyEnabled,
  onNext,
  onPrev,
  onGoToStep
}) => {
  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  const handleCycleProduct = () => {
    const currentIndex = products.findIndex(p => p.id === activeProductId);
    const nextIndex = (currentIndex + 1) % products.length;
    setActiveProductId(products[nextIndex].id);
  };

  return (
    <div className="space-y-6">
      
      {/* Step Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            STEP 4
          </span>
          <h2 className="text-xl font-bold text-white">Preview & Test</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Lihat preview live dan uji performa AI Host Anda secara interaktif dalam Bahasa {language}.
        </p>
      </div>

      {/* Main Grid: Left/Center Live Screen + Right Summary & Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Center/Left 8 Cols: Interactive Live Screen */}
        <div className="lg:col-span-8 space-y-3">
          <div className="max-w-md mx-auto">
            <LiveSimulationScreen
              activeProduct={activeProduct}
              host={host}
              speechStyle={speechStyle}
              language={language}
              autoReplyEnabled={autoReplyEnabled}
              onProductChangeRequest={handleCycleProduct}
              onBuyClick={(prod) => {
                alert(`🛒 Simulasi Pembelian: ${prod.name} seharga Rp${prod.price.toLocaleString('id-ID')}`);
              }}
              showToolbar={true}
            />
          </div>
        </div>

        {/* Right 4 Cols: Ringkasan Live + Performa Estimasi */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Ringkasan Live Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Ringkasan Live
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Durasi
                </span>
                <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                  {durationHours} Jam
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Produk Ditampilkan
                </span>
                <span className="font-bold text-white">
                  {selectedProductIds.length || products.length} Produk
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Platform
                </span>
                <span className="font-bold text-white">
                  {platforms.join(', ')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  AI Host
                </span>
                <span className="font-bold text-cyan-300">
                  {host.name} ({host.voiceGender} • {speechStyle})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Bahasa Utama
                </span>
                <span className="font-bold text-amber-300">
                  {language}
                </span>
              </div>
            </div>

            <button
              onClick={() => onGoToStep(3)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              id="btn-ubah-pengaturan-live"
            >
              Ubah Pengaturan
            </button>
          </div>

          {/* Performa Estimasi Card */}
          <div className="bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Performa Estimasi</span>
              </h3>
              <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-800/50">
                AI Projection
              </span>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Viewer Potensial</span>
                </div>
                <span className="font-extrabold text-white text-sm">
                  {durationHours === 2 ? '500 – 1.200' : durationHours === 8 ? '1.800 – 3.200' : '6.500 – 12.000'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  <span>Total Klik Produk</span>
                </div>
                <span className="font-extrabold text-cyan-400 text-sm">
                  {durationHours === 2 ? '80 – 150' : durationHours === 8 ? '250 – 480' : '900 – 1.800'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Penjualan Potensial</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-sm">
                  {durationHours === 2 ? 'Rp800rb – Rp1.8jt' : durationHours === 8 ? 'Rp2.5jt – Rp6jt' : 'Rp9jt – Rp22jt'}
                </span>
              </div>

            </div>

            <p className="text-[10px] text-slate-500 text-center italic">
              *Estimasi dihitung berdasarkan data rata-rata konversi UMKM
            </p>
          </div>

          {/* Quick CTA to Go Live */}
          <button
            onClick={onNext}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            id="btn-next-to-step5"
          >
            <span>Lanjut: Siap Go Live</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
        >
          ← Kembali ke Atur Live
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
        >
          <span>Konfirmasi & Go Live</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
