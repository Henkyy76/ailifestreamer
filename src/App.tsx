import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { StudioWizard } from './components/StudioWizard';
import { LiveControlCenter } from './components/LiveControlCenter';
import { VideoPromoStudio } from './components/VideoPromoStudio';
import { TentangLiveStreamer } from './components/TentangLiveStreamer';
import { ObsOutput } from './components/ObsOutput';
import { AuthModal } from './components/AuthModal';
import { INITIAL_PRODUCTS, AI_HOSTS } from './data/mockData';
import { loadSupabaseCatalog } from './lib/supabaseData';
import { getConfiguredLiveSessionId, getLiveSession, subscribeToLiveSession, updateLiveSession } from './lib/liveSession';
import { Product, AIHost, SpeechStyle, StreamingPlatform, AutomationSettings, UserAccount, AuthModalTab } from './types';
import { Radio, ShieldCheck, Heart, Sparkles, ExternalLink, Bot, Layers, LogIn, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('homepage');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [hosts, setHosts] = useState<AIHost[]>(AI_HOSTS);

  useEffect(() => {
    let isMounted = true;
    void loadSupabaseCatalog().then(catalog => {
      if (!isMounted || !catalog) return;
      setProducts(catalog.products);
      setHosts(catalog.hosts);
      setSelectedProductIds(catalog.products.slice(0, 4).map(product => product.id));
      setActiveProductId(catalog.products[0].id);
      setSelectedHostId(catalog.hosts[0].id);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('livestreamer_user');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('login');

  // Live Stream Configuration
  const [selectedHostId, setSelectedHostId] = useState<string>('host-luna');
  const [speechStyle, setSpeechStyle] = useState<SpeechStyle>('Persuasif');
  const [language, setLanguage] = useState<string>('Bahasa Indonesia');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(INITIAL_PRODUCTS.slice(0, 4).map(p => p.id));
  const [activeProductId, setActiveProductId] = useState<string>(INITIAL_PRODUCTS[0].id);

  useEffect(() => {
    const sessionId = getConfiguredLiveSessionId();
    if (!sessionId) return;

    const applySession = (session: { current_product_id?: string | null; status?: string; avatar_id?: string | null; speech_style?: string; language?: string }) => {
      if (session.current_product_id) setActiveProductId(session.current_product_id);
      if (session.avatar_id) setSelectedHostId(session.avatar_id);
      if (session.speech_style) setSpeechStyle(session.speech_style as SpeechStyle);
      if (session.language) setLanguage(session.language);
      if (session.status === 'running') setIsStreamingActive(true);
      if (session.status === 'stopped' || session.status === 'ended') setIsStreamingActive(false);
    };

    void getLiveSession(sessionId).then(session => {
      if (session) applySession(session);
    });

    const sessionPoller = window.setInterval(() => {
      void getLiveSession(sessionId).then(session => {
        if (session) applySession(session);
      });
    }, 1500);

    const channel = subscribeToLiveSession(sessionId, session => {
      applySession(session);
    });

    return () => {
      void channel?.unsubscribe();
      window.clearInterval(sessionPoller);
    };
  }, []);
  const [durationHours, setDurationHours] = useState<number>(8);
  const [platforms, setPlatforms] = useState<StreamingPlatform[]>(['TikTok LIVE', 'Shopee Live']);
  
  const [automations, setAutomations] = useState<AutomationSettings>({
    autoReplyComments: true,
    autoPinProducts: true,
    autoPromo: true,
    autoModeration: true,
    replyDelaySec: 1,
    discountPercentage: 20,
    customWelcomeMessage: 'Halo selamat datang di sesi live spesial!'
  });

  const [rtmpUrl] = useState<string>('rtmp://live.livestreamer.ai/live');
  const [streamKey] = useState<string>('live_sk_7a89f92cb41209e89d');
  const [isStreamingActive, setIsStreamingActive] = useState<boolean>(false);

  const activeProduct = products.find(p => p.id === activeProductId) || products[0];
  const selectedHost = hosts.find(h => h.id === selectedHostId) || hosts[1];

  if (window.location.pathname === '/obs-output') {
    let outputConfig: { productId?: string; hostId?: string; speechStyle?: string; language?: string } = {};
    try {
      outputConfig = JSON.parse(localStorage.getItem('livestreamer_live_config') || '{}');
    } catch (_) {}
    const outputProduct = products.find(product => product.id === outputConfig.productId) || activeProduct;
    const outputHost = hosts.find(host => host.id === outputConfig.hostId) || selectedHost;
    return (
      <ObsOutput
        product={outputProduct}
        host={outputHost}
        speechStyle={outputConfig.speechStyle || speechStyle}
        language={outputConfig.language || language}
      />
    );
  }

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('livestreamer_user', JSON.stringify(user));
    } catch (_) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('livestreamer_user');
    } catch (_) {}
  };

  const openAuth = (tab: AuthModalTab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleStartLive = () => {
    setIsStreamingActive(true);
    setActiveTab('live-control');
    try {
      localStorage.setItem('livestreamer_live_config', JSON.stringify({
        productId: activeProductId,
        hostId: selectedHostId,
        speechStyle,
        language,
        selectedProductIds,
        startedAt: new Date().toISOString(),
      }));
    } catch (_) {}
    const sessionId = getConfiguredLiveSessionId();
    if (sessionId) {
      const liveProductId = products.some(product => product.id === activeProductId) ? activeProductId : null;
      void updateLiveSession(sessionId, {
        status: 'running',
        current_product_id: liveProductId,
        avatar_id: hosts.some(host => host.id === selectedHostId) ? selectedHostId : undefined,
        speech_style: speechStyle,
        language,
      }).then(updated => {
        if (!updated) {
          console.error('Live session gagal disimpan ke Supabase. Cek UUID dan policy UPDATE RLS.');
          alert('Live lokal aktif, tetapi status Supabase gagal diperbarui. Buka DevTools Console untuk melihat detail error Supabase.');
        }
      });
    }
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (_) {}
  };

  const handleEndLive = () => {
    if (confirm('Apakah Anda yakin ingin mengakhiri sesi Live Streaming?')) {
      setIsStreamingActive(false);
      setActiveTab('studio');
      try {
        localStorage.removeItem('livestreamer_live_config');
      } catch (_) {}
      const sessionId = getConfiguredLiveSessionId();
      if (sessionId) void updateLiveSession(sessionId, { status: 'ended' });
      alert('Sesi Live telah selesai. Laporan performa dan rekaman stream sedang di-generate.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isStreamingActive={isStreamingActive}
        currentUser={currentUser}
        onOpenAuth={openAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'homepage' && (
          <Homepage
            activeProduct={activeProduct}
            host={selectedHost}
            onStartLiveWizard={() => setActiveTab('studio')}
            onOpenVideoPromo={() => setActiveTab('video-promo')}
            onOpenTechSpec={() => setActiveTab('tech-spec')}
            onOpenAuth={() => openAuth('register')}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'studio' && (
          <StudioWizard
            products={products}
            setProducts={setProducts}
            hosts={hosts}
            selectedHostId={selectedHostId}
            setSelectedHostId={setSelectedHostId}
            speechStyle={speechStyle}
            setSpeechStyle={setSpeechStyle}
            language={language}
            setLanguage={setLanguage}
            selectedProductIds={selectedProductIds}
            setSelectedProductIds={setSelectedProductIds}
            activeProductId={activeProductId}
            setActiveProductId={setActiveProductId}
            durationHours={durationHours}
            setDurationHours={setDurationHours}
            platforms={platforms}
            setPlatforms={setPlatforms}
            automations={automations}
            setAutomations={setAutomations}
            rtmpUrl={rtmpUrl}
            streamKey={streamKey}
            onStartLive={handleStartLive}
            onOpenAuth={openAuth}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'live-control' && (
          <LiveControlCenter
            activeProduct={activeProduct}
            products={products}
            onSelectProduct={(p) => {
              setActiveProductId(p.id);
              try {
                const currentConfig = JSON.parse(localStorage.getItem('livestreamer_live_config') || '{}');
                localStorage.setItem('livestreamer_live_config', JSON.stringify({ ...currentConfig, productId: p.id }));
              } catch (_) {}
              const sessionId = getConfiguredLiveSessionId();
              if (sessionId) void updateLiveSession(sessionId, { current_product_id: p.id });
            }}
            host={selectedHost}
            speechStyle={speechStyle}
            language={language}
            durationHours={durationHours}
            onEndLive={handleEndLive}
          />
        )}

        {activeTab === 'video-promo' && (
          <VideoPromoStudio
            products={products}
            hosts={hosts}
          />
        )}

        {activeTab === 'tech-spec' && (
          <TentangLiveStreamer
            onStartLive={() => setActiveTab('studio')}
            onOpenVideoPromo={() => setActiveTab('video-promo')}
          />
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        initialTab={authModalTab}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-800 bg-[#050A14] py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Radio className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm">LiveStreamerAI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                v2.4 Production Full-Stack
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button onClick={() => setActiveTab('homepage')} className="hover:text-cyan-400 transition-colors">Beranda</button>
              <button onClick={() => setActiveTab('studio')} className="hover:text-cyan-400 transition-colors">Studio Live</button>
              <button onClick={() => setActiveTab('video-promo')} className="hover:text-cyan-400 transition-colors">Video Promo MP4</button>
              <button onClick={() => setActiveTab('tech-spec')} className="hover:text-cyan-400 transition-colors">Spesifikasi & COGS</button>
              <button onClick={() => openAuth('login')} className="text-cyan-400 hover:underline flex items-center gap-1">
                <LogIn className="w-3 h-3" />
                <span>{currentUser ? `Akun: ${currentUser.name}` : 'Login / Register'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
            <p>© 2026 LiveStreamerAI. Platform Live Streaming E-Commerce & Video Promosi Otonom 24/7.</p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full-Stack Gemini 3.7 Flash & Web Speech Ready</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
