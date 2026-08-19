import React, { useState } from 'react';
import { ShieldCheck, Cpu, DollarSign, Layers, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Terminal, FileCode, Check } from 'lucide-react';
import { PRICING_LIVE_TIERS, PRICING_VIDEO_TIERS, TECH_STACK_SPECS } from '../data/mockData';

interface TentangLiveStreamerProps {
  onStartLive: () => void;
  onOpenVideoPromo: () => void;
}

export const TentangLiveStreamer: React.FC<TentangLiveStreamerProps> = ({
  onStartLive,
  onOpenVideoPromo
}) => {
  const [calcHours, setCalcHours] = useState(8);
  const [calcVideos, setCalcVideos] = useState(10);

  const humanHostCostPerHour = 100000; // Rp100k/hr
  const aiHostCostPerHour = 12500; // Rp12.5k/hr (Average of Rp10k-Rp15k)

  const totalHumanCost = calcHours * humanHostCostPerHour;
  const totalAiCost = calcHours * aiHostCostPerHour;
  const totalSavings = totalHumanCost - totalAiCost;
  const savingsPercent = Math.round((totalSavings / totalHumanCost) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-slate-200">
      
      {/* Blueprint Header */}
      <div className="border-b border-blue-500/40 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">LiveStreamer</span>
          <span className="text-3xl font-extrabold text-cyan-400">AI</span>
        </div>
        <p className="text-sm font-medium text-slate-400 mt-1">
          Autonomous AI Social Commerce & Video Creation Platform — Specification & Architecture
        </p>
      </div>

      {/* 1. APA ITU LIVESTREAMERAI? */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
          1. APA ITU LIVESTREAMERAI?
        </h2>
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 leading-relaxed text-sm sm:text-base text-slate-300 shadow-xl">
          <p>
            <strong className="text-white">LiveStreamerAI</strong> adalah platform SaaS berbasis AI yang memungkinkan pemilik bisnis/UMKM menjalankan <strong className="text-cyan-300">AI Live Selling Otonom</strong> (interaktif & balasi chat) atau memproduksi <strong className="text-blue-300">Video Promosi Produk Otomatis</strong>. Menggunakan <em>Self-Hosted Open-Source Stack</em>, platform ini memangkas biaya operasional hingga <strong className="text-emerald-400 font-extrabold">90%</strong> dibanding host manusia.
          </p>
        </div>
      </section>

      {/* 2. USER JOURNEY & ALUR TEKNIS END-TO-END */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
          2. USER JOURNEY & ALUR TEKNIS END-TO-END
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
          
          {/* STEP 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
              STEP 1
            </span>
            <h4 className="font-bold text-white text-sm">Business Data</h4>
            <p className="text-slate-400 leading-relaxed">
              Unggah foto produk, deskripsi, stok & harga. Data diolah ke RAG Knowledge Base.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
              STEP 2
            </span>
            <h4 className="font-bold text-white text-sm">Avatar Model</h4>
            <p className="text-slate-400 leading-relaxed">
              Pilih avatar AI (2D/3D Digital Twin) & gaya suara (persuasif, ceria, casual).
            </p>
          </div>

          {/* STEP 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
              STEP 3
            </span>
            <h4 className="font-bold text-white text-sm">Mode Output</h4>
            <p className="text-slate-400 leading-relaxed">
              Pilih AI Live Streaming (per durasi jam) atau Video Promo Short (per durasi detik).
            </p>
          </div>

          {/* STEP 4 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
              STEP 4
            </span>
            <h4 className="font-bold text-white text-sm">Pricing & Checkout</h4>
            <p className="text-slate-400 leading-relaxed">
              Pilih durasi paket yang diinginkan, lakukan pembayaran otomatis via Midtrans.
            </p>
          </div>

          {/* STEP 5 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
              STEP 5
            </span>
            <h4 className="font-bold text-white text-sm">Execution</h4>
            <p className="text-slate-400 leading-relaxed">
              AI berjalan otomatis: live streaming 24/7 via RTMP atau render video promo MP4.
            </p>
          </div>

        </div>
      </section>

      {/* 3. RINCIAN BIAYA MODAL SELF-HOSTED OPEN-SOURCE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            3. RINCIAN BIAYA MODAL SELF-HOSTED OPEN-SOURCE (TERMURAH)
          </h2>
          <span className="text-xs text-cyan-400 font-semibold">
            Estimasi COGS Akurat
          </span>
        </div>

        {/* Table 1: Tech Stack Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-blue-600 text-white font-bold">
              <tr>
                <th className="p-3.5">Komponen Teknologi</th>
                <th className="p-3.5">Pilihan Software (Open-Source)</th>
                <th className="p-3.5">Estimasi Biaya Modal (COGS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="p-3.5 font-semibold text-white">GPU Cloud Instance</td>
                <td className="p-3.5 text-slate-300">NVIDIA RTX 4090 / A10G (RunPod / Vast.ai)</td>
                <td className="p-3.5 font-mono text-cyan-300">~$0.50 – $0.69 / jam (~Rp8.000 – Rp11.000/jam)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-white">Core LLM & Voice (TTS)</td>
                <td className="p-3.5 text-slate-300">Llama 3 8B / Qwen 2.5 + EdgeTTS / XTTS v2</td>
                <td className="p-3.5 font-mono text-cyan-300">~$0.02 / jam (~Rp300/jam)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-white">Avatar & Lip-Sync</td>
                <td className="p-3.5 text-slate-300">MuseTalk / LivePortrait / SadTalker</td>
                <td className="p-3.5 text-emerald-400 font-bold">Free / Open-Source (Berjalan di GPU Cloud)</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-950 border-t-2 border-cyan-500/40">
              <tr>
                <td colSpan={2} className="p-3.5 font-extrabold text-white">
                  TOTAL BIAYA MODAL OTONOM (COGS)
                </td>
                <td className="p-3.5 font-extrabold text-emerald-400 text-sm">
                  ~Rp10.000 – Rp15.000 / JAM LIVE | ~Rp200 – Rp500 / VIDEO PROMO
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Interactive Cost Comparison Calculator */}
        <div className="bg-linear-to-br from-slate-900 via-blue-950/30 to-slate-900 border border-blue-800/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Simulasi Penghematan Operasional</h3>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800/40">
              Hemat {savingsPercent}% Biaya
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Durasi Siaran Live per Bulan:</span>
              <span className="font-bold text-cyan-400 text-sm">{calcHours} Jam / Hari (≈ {calcHours * 30} Jam / Bulan)</span>
            </div>
            <input
              type="range"
              min={2}
              max={24}
              step={2}
              value={calcHours}
              onChange={(e) => setCalcHours(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Host Manusia (Rp100k/jam)</span>
              <span className="text-base font-bold text-rose-400">
                Rp{(totalHumanCost * 30).toLocaleString('id-ID')} / bln
              </span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-blue-500/30">
              <span className="text-blue-300 block mb-1">LiveStreamerAI (~Rp12.5k/jam)</span>
              <span className="text-base font-bold text-cyan-300">
                Rp{(totalAiCost * 30).toLocaleString('id-ID')} / bln
              </span>
            </div>

            <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-500/40">
              <span className="text-emerald-300 font-bold block mb-1">Total Dana Dihemat UMKM</span>
              <span className="text-base font-extrabold text-emerald-400">
                Rp{(totalSavings * 30).toLocaleString('id-ID')} / bln
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING OPTION A: AI LIVE STREAMING (OTONOM & INTERAKTIF) */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
          4. PRICING OPTION A: AI LIVE STREAMING (OTONOM & INTERAKTIF)
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-blue-600 text-white font-bold">
              <tr>
                <th className="p-3.5">Tier Durasi Live</th>
                <th className="p-3.5">Spesifikasi & Fitur</th>
                <th className="p-3.5">Harga Jual User</th>
                <th className="p-3.5">Modal (COGS)</th>
                <th className="p-3.5">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {PRICING_LIVE_TIERS.map((tier) => (
                <tr key={tier.id} className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    <div>{tier.title} ({tier.durationLabel})</div>
                    {tier.isPopular && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-extrabold text-[9px] uppercase">
                        POPULAR
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {tier.features.join(', ')}
                  </td>
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    Rp{tier.price.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 text-slate-400 font-mono whitespace-nowrap">
                    ~Rp{tier.cogsCost.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-400 whitespace-nowrap">
                    {tier.profitMargin}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. PRICING OPTION B: SHORT VIDEO PROMO PRODUK (SIAP UPLOAD MP4) */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
          5. PRICING OPTION B: SHORT VIDEO PROMO PRODUK (SIAP UPLOAD MP4)
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-blue-600 text-white font-bold">
              <tr>
                <th className="p-3.5">Tier Durasi Video</th>
                <th className="p-3.5">Spesifikasi & Output Format</th>
                <th className="p-3.5">Harga Jual User</th>
                <th className="p-3.5">Modal (COGS)</th>
                <th className="p-3.5">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {PRICING_VIDEO_TIERS.map((tier) => (
                <tr key={tier.id} className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    <div>{tier.title} ({tier.durationLabel})</div>
                    {tier.isPopular && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-extrabold text-[9px] uppercase">
                        POPULAR
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {tier.features.join(', ')}
                  </td>
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    Rp{tier.price.toLocaleString('id-ID')} / video
                  </td>
                  <td className="p-3.5 text-slate-400 font-mono whitespace-nowrap">
                    ~Rp{tier.cogsCost.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-400 whitespace-nowrap">
                    {tier.profitMargin}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center text-xs text-slate-500 pt-4">
          LiveStreamerAI Specification & Updated Tiered Pricing Architecture - v2
        </div>
      </section>

      {/* CTA Footer */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={onStartLive}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Coba Studio Live Streaming
        </button>
        <button
          onClick={onOpenVideoPromo}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Coba Generator Video Promo (MP4)
        </button>
      </div>

    </div>
  );
};
