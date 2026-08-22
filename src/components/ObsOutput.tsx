import React, { useEffect, useState } from 'react';
import { Product, AIHost } from '../types';
import { LiveSimulationScreen } from './LiveSimulationScreen';
import { getConfiguredLiveSessionId, getLiveSession, subscribeToLiveSession } from '../lib/liveSession';

interface ObsOutputProps {
  product: Product;
  host: AIHost;
  speechStyle?: string;
  language?: string;
}

export const ObsOutput: React.FC<ObsOutputProps> = ({ product, host, speechStyle = 'Persuasif', language = 'Bahasa Indonesia' }) => {
  const [sessionStatus, setSessionStatus] = useState<string>('draft');
  const liveSessionId = getConfiguredLiveSessionId();

  useEffect(() => {
    if (!liveSessionId) return;

    const applyStatus = (status?: string) => {
      setSessionStatus(status || 'draft');
    };

    void getLiveSession(liveSessionId).then(session => {
      applyStatus(session?.status);
    });

    const poller = window.setInterval(() => {
      void getLiveSession(liveSessionId).then(session => {
        applyStatus(session?.status);
      });
    }, 1500);
    const channel = subscribeToLiveSession(liveSessionId, session => {
      applyStatus(session.status);
    });

    return () => {
      window.clearInterval(poller);
      void channel?.unsubscribe();
    };
  }, [liveSessionId]);

  if (sessionStatus !== 'running') {
    return (
      <main className="flex min-h-screen w-screen items-center justify-center bg-[#02050d] px-6 text-center text-slate-300">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">LiveStreamerAI Output</p>
          <h1 className="mt-3 text-xl font-bold text-white">Menunggu sesi live dimulai</h1>
          <p className="mt-2 text-sm text-slate-400">Selesaikan Studio Live sampai Step 5, lalu klik Mulai Live.</p>
          <p className="mt-3 text-[11px] text-slate-500">Status sesi: {sessionStatus}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="obs-output min-h-screen w-screen overflow-hidden bg-[#02050d] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[540px] items-start justify-center">
        <LiveSimulationScreen
          activeProduct={product}
          host={host}
          speechStyle={speechStyle}
          language={language}
          autoReplyEnabled={true}
          isInteractive={false}
          isOutput={true}
          showToolbar={false}
          className="w-full rounded-none border-0 shadow-none"
        />
      </div>
    </main>
  );
};
