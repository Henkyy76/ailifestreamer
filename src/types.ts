export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  soldCount: number;
  image: string;
  description: string;
  benefits: string[];
  promoText?: string;
  selected?: boolean;
}

export interface AIHost {
  id: string;
  name: string;
  style: 'Friendly' | 'Energetic' | 'Professional' | 'Casual' | 'Glamour';
  type: '2D' | '3D';
  avatarUrl: string;
  avatarVideoUrl?: string;
  voiceGender: 'Wanita' | 'Pria';
  voiceTone: string;
  languages: string[];
  description: string;
  sampleAudioText: string;
}

export type SpeechStyle = 'Persuasif' | 'Casual' | 'Professional' | 'Energetic';

export type StreamingPlatform = 'TikTok LIVE' | 'YouTube' | 'Shopee Live' | 'Facebook Live' | 'Custom RTMP';

export interface AutomationSettings {
  autoReplyComments: boolean;
  autoPinProducts: boolean;
  autoPromo: boolean;
  autoModeration: boolean;
  replyDelaySec: number;
  discountPercentage: number;
  customWelcomeMessage: string;
}

export interface LiveStreamConfig {
  selectedProductIds: string[];
  activeProductId: string;
  selectedHostId: string;
  speechStyle: SpeechStyle;
  language: string;
  durationHours: number;
  platforms: StreamingPlatform[];
  automations: AutomationSettings;
  customScriptPrompt?: string;
  rtmpUrl: string;
  streamKey: string;
}

export interface LiveComment {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
  isAiReply?: boolean;
  replyTo?: string;
  isPinned?: boolean;
}

export interface LiveStats {
  viewers: number;
  commentsCount: number;
  productClicks: number;
  totalSales: number;
  itemsSold: number;
  liveDurationSeconds: number;
  likesCount: number;
}

export interface PricingLiveTier {
  id: string;
  title: string;
  durationLabel: string;
  hours: number;
  price: number;
  cogsCost: number;
  profitMargin: number;
  isPopular?: boolean;
  features: string[];
  description: string;
}

export interface PricingVideoTier {
  id: string;
  title: string;
  durationLabel: string;
  durationSec: number;
  price: number;
  cogsCost: number;
  profitMargin: number;
  isPopular?: boolean;
  features: string[];
  description: string;
  format: string;
}

export interface TechStackItem {
  component: string;
  software: string;
  costEstimate: string;
  details: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  storeName?: string;
  plan: 'Free Trial' | 'Pro Live Seller' | 'Enterprise Brand';
  liveHoursRemaining: number;
  videoCredits: number;
  isVerified: boolean;
  joinedDate: string;
}

export type AuthModalTab = 'login' | 'register' | 'forgot';
