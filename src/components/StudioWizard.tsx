import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Product, AIHost, SpeechStyle, StreamingPlatform, AutomationSettings } from '../types';
import { Step1DataProduk } from './Step1DataProduk';
import { Step2AiHost } from './Step2AiHost';
import { Step3AturLive } from './Step3AturLive';
import { Step4PreviewTest } from './Step4PreviewTest';
import { Step5GoLive } from './Step5GoLive';

interface StudioWizardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  hosts: AIHost[];
  selectedHostId: string;
  setSelectedHostId: (id: string) => void;
  speechStyle: SpeechStyle;
  setSpeechStyle: (style: SpeechStyle) => void;
  language: string;
  setLanguage: (lang: string) => void;
  selectedProductIds: string[];
  setSelectedProductIds: React.Dispatch<React.SetStateAction<string[]>>;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  durationHours: number;
  setDurationHours: (hours: number) => void;
  platforms: StreamingPlatform[];
  setPlatforms: React.Dispatch<React.SetStateAction<StreamingPlatform[]>>;
  automations: AutomationSettings;
  setAutomations: React.Dispatch<React.SetStateAction<AutomationSettings>>;
  rtmpUrl: string;
  streamKey: string;
  onStartLive: () => void;
  onOpenAuth?: (tab?: any) => void;
  currentUser?: any;
}

export const StudioWizard: React.FC<StudioWizardProps> = ({
  products,
  setProducts,
  hosts,
  selectedHostId,
  setSelectedHostId,
  speechStyle,
  setSpeechStyle,
  language,
  setLanguage,
  selectedProductIds,
  setSelectedProductIds,
  activeProductId,
  setActiveProductId,
  durationHours,
  setDurationHours,
  platforms,
  setPlatforms,
  automations,
  setAutomations,
  rtmpUrl,
  streamKey,
  onStartLive
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const selectedHost = hosts.find(h => h.id === selectedHostId) || hosts[1];

  const steps = [
    { num: 1, label: 'Data Produk' },
    { num: 2, label: 'AI Host' },
    { num: 3, label: 'Atur Live' },
    { num: 4, label: 'Preview & Test' },
    { num: 5, label: 'Go Live' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Studio Header with Step Progress Wizard */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Live Studio 24/7</span>
            <h1 className="text-base sm:text-lg font-bold text-white">Set up Live Otomatis dalam 5 Langkah</h1>
          </div>
        </div>

        {/* Step Indicator Badges */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 justify-center">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <React.Fragment key={step.num}>
                <button
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : isCompleted
                      ? 'bg-blue-950 text-blue-300 border border-blue-800/40 hover:bg-blue-900/50'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                  id={`step-wizard-btn-${step.num}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white text-blue-600' : isCompleted ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                  </span>
                  <span>{step.label}</span>
                </button>

                {idx < steps.length - 1 && (
                  <span className="hidden sm:inline-block w-4 h-0.5 bg-slate-800" />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>

      {/* Render Current Step */}
      <div className="animate-fade-in">
        {currentStep === 1 && (
          <Step1DataProduk
            products={products}
            setProducts={setProducts}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2AiHost
            hosts={hosts}
            selectedHostId={selectedHostId}
            setSelectedHostId={setSelectedHostId}
            speechStyle={speechStyle}
            setSpeechStyle={setSpeechStyle}
            language={language}
            setLanguage={setLanguage}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3AturLive
            products={products}
            selectedProductIds={selectedProductIds}
            setSelectedProductIds={setSelectedProductIds}
            durationHours={durationHours}
            setDurationHours={setDurationHours}
            platforms={platforms}
            setPlatforms={setPlatforms}
            automations={automations}
            setAutomations={setAutomations}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4PreviewTest
            products={products}
            selectedProductIds={selectedProductIds}
            activeProductId={activeProductId}
            setActiveProductId={setActiveProductId}
            host={selectedHost}
            speechStyle={speechStyle}
            language={language}
            durationHours={durationHours}
            platforms={platforms}
            autoReplyEnabled={automations.autoReplyComments}
            onNext={() => setCurrentStep(5)}
            onPrev={() => setCurrentStep(3)}
            onGoToStep={(s) => setCurrentStep(s)}
          />
        )}

        {currentStep === 5 && (
          <Step5GoLive
            host={selectedHost}
            products={products}
            selectedProductIds={selectedProductIds}
            speechStyle={speechStyle}
            durationHours={durationHours}
            platforms={platforms}
            automations={automations}
            rtmpUrl={rtmpUrl}
            streamKey={streamKey}
            onStartLive={onStartLive}
            onPrev={() => setCurrentStep(4)}
          />
        )}
      </div>

    </div>
  );
};
