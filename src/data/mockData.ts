import { Product, AIHost, PricingLiveTier, PricingVideoTier, TechStackItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Serum Brightening Premium',
    category: 'Skincare',
    price: 99000,
    originalPrice: 149000,
    stock: 120,
    soldCount: 42,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80',
    description: 'Serum dengan kandungan Niacinamide 10% dan Vitamin C aktif mencerahkan wajah dalam 7 hari tanpa rasa lengket.',
    benefits: ['Mencerahkan kulit kusam', 'Menyamarkan noda hitam', 'Memudarkan bekas jerawat', 'Aman untuk kulit sensitif'],
    promoText: 'Diskon 33% + Gratis Ongkir Seluruh Indonesia!',
    selected: true,
  },
  {
    id: 'prod-2',
    name: 'Moisturizer Glow Natural',
    category: 'Skincare',
    price: 129000,
    originalPrice: 169000,
    stock: 85,
    soldCount: 28,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&auto=format&fit=crop&q=80',
    description: 'Pelembab gel ringan dengan 5X Ceramide dan Hyaluronic Acid mengunci hidrasi 24 jam.',
    benefits: ['Memperbaiki skin barrier rusak', 'Menghidrasi kulit mendalam', 'Tekstur water-gel cepat meresap'],
    promoText: 'Beli 1 Dapat 1 Mini Travel Size!',
    selected: true,
  },
  {
    id: 'prod-3',
    name: 'Sunscreen Daily Protection SPF 50+',
    category: 'Skincare',
    price: 79000,
    originalPrice: 109000,
    stock: 200,
    soldCount: 95,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    description: 'Tabir surya hybrid ringan tanpa whitecast, tahan keringat, dan proteksi maksimal UVA/UVB + Blue Light.',
    benefits: ['No Whitecast formula', 'Ringan & tidak berminyak', 'Bisa jadi makeup primer'],
    promoText: 'Promo Flash Sale khusus Live!',
    selected: true,
  },
  {
    id: 'prod-4',
    name: 'Paket Glowing Ultimate (4 in 1)',
    category: 'Paket',
    price: 199000,
    originalPrice: 320000,
    stock: 60,
    soldCount: 19,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=80',
    description: 'Rangkaian lengkap: Facial Cleanser, Toner Essense, Serum Brightening, dan Night Cream.',
    benefits: ['Perawatan menyeluruh all-in-one', 'Hasil maksimal 14 hari', 'Bonus pouch exclusive'],
    promoText: 'Hemat Rp121.000 + Bonus Pouch Cantik!',
    selected: true,
  },
  {
    id: 'prod-5',
    name: 'Velvet Lip Matte Waterproof',
    category: 'Makeup',
    price: 65000,
    originalPrice: 89000,
    stock: 150,
    soldCount: 88,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=80',
    description: 'Lip cream velvet tahan 16 jam, transferproof, dan tidak membuat bibir kering dengan Vitamin E.',
    benefits: ['Transferproof & Smudgeproof', 'Hasil velvet matte ringan', '12 pilihan shade elegan'],
    promoText: 'Beli 2 Cuma Rp110.000!',
    selected: false,
  },
  {
    id: 'prod-6',
    name: 'Hydrating Facial Wash Gentle',
    category: 'Skincare',
    price: 55000,
    originalPrice: 75000,
    stock: 180,
    soldCount: 54,
    image: 'https://images.unsplash.com/photo-1556228722-d0b7d7f955d9?w=500&auto=format&fit=crop&q=80',
    description: 'Sabun cuci muka pH balance 5.5 dengan Amino Acid, membersihkan tanpa rasa ketarik.',
    benefits: ['pH seimbang 5.5', 'Bebas SLS/Paraben', 'Membersihkan debu halus hingga ke pori'],
    promoText: 'Gratis busa foaming net!',
    selected: false,
  }
];

export const AI_HOSTS: AIHost[] = [
  {
    id: 'host-alya',
    name: 'Alya',
    style: 'Friendly',
    type: '3D',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    voiceGender: 'Wanita',
    voiceTone: 'Ramah, Cerah, Hangat (Indonesian Natural Female)',
    languages: ['Bahasa Indonesia', 'English'],
    description: 'Host ramah dan bersahabat, sangat cocok untuk produk skincare, parenting, kecantikan, dan makanan ringan.',
    sampleAudioText: 'Halo semuanya! Selamat datang di live shopping kita hari ini. Jangan lupa langsung tap keranjang kuning sekarang ya!'
  },
  {
    id: 'host-luna',
    name: 'Luna',
    style: 'Energetic',
    type: '3D',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    voiceGender: 'Wanita',
    voiceTone: 'Energik, Dinamis, Antusias, High-Conversion',
    languages: ['Bahasa Indonesia', 'English'],
    description: 'Host dengan pembawaan energik dan hype tinggi. Sangat efektif menciptakan FOMO flash sale dan konversi instan.',
    sampleAudioText: 'Halo guys! Khusus sesi ini ada diskon gede-gedean sampai 50%! Buruan checkout sebelum kehabisan stok ya kak!'
  },
  {
    id: 'host-cinta',
    name: 'Cinta',
    style: 'Professional',
    type: '3D',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    voiceGender: 'Wanita',
    voiceTone: 'Elegan, Terpercaya, Artikulatif, Profesional',
    languages: ['Bahasa Indonesia', 'English'],
    description: 'Host bertampilan profesional dan terpercaya. Sangat cocok untuk produk premium, gadget elektronik, fashion formal, dan suplemen.',
    sampleAudioText: 'Selamat datang, Bapak dan Ibu sekalian. Produk ini telah teruji klinis dan memiliki sertifikasi resmi BPOM.'
  },
  {
    id: 'host-maya',
    name: 'Maya 2D',
    style: 'Casual',
    type: '2D',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    voiceGender: 'Wanita',
    voiceTone: 'Santai, Akrab, Gen-Z Vibe',
    languages: ['Bahasa Indonesia'],
    description: 'Avatar 2D kartun anime / ilustrasi modern, super ringan untuk GPU low-resource dan streaming santai.',
    sampleAudioText: 'Hai bestie! Yuk intip spill produk favorit yang lagi viral banget minggu ini, jangan sampai nyesel kehabisan ya!'
  },
  {
    id: 'host-kenzo',
    name: 'Kenzo',
    style: 'Energetic',
    type: '3D',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    voiceGender: 'Pria',
    voiceTone: 'Maskulin, Percaya Diri, Karismatik',
    languages: ['Bahasa Indonesia', 'English'],
    description: 'Host pria karismatik cocok untuk produk otomotif, pakaian pria, gadget teknologi, dan gym apparel.',
    sampleAudioText: 'Halo bro! Kali ini kita mau review langsung performa produk yang super gahar ini. Tonton sampai habis ya!'
  }
];

export const TECH_STACK_SPECS: TechStackItem[] = [
  {
    component: 'GPU Cloud Instance',
    software: 'NVIDIA RTX 4090 / A10G (RunPod / Vast.ai)',
    costEstimate: '~$0.50 – $0.69 / jam (~Rp8.000 – Rp11.000/jam)',
    details: 'Hardware akselerasi AI dengan efisiensi tinggi, latency streaming real-time di bawah 800ms.'
  },
  {
    component: 'Core LLM & Voice (TTS)',
    software: 'Llama 3 8B / Qwen 2.5 + EdgeTTS / XTTS v2',
    costEstimate: '~$0.02 / jam (~Rp300/jam)',
    details: 'Model bahasa open-weight yang di-finetune untuk closing penjualan social commerce dan text-to-speech natural ultra-cepat.'
  },
  {
    component: 'Avatar & Lip-Sync',
    software: 'MuseTalk / LivePortrait / SadTalker',
    costEstimate: 'Free / Open-Source (Berjalan di GPU Cloud)',
    details: 'Sinkronisasi bibir dan ekspresi wajah presisi frame-by-frame dengan output RTMP resolusi 1080p 60fps.'
  }
];

export const PRICING_LIVE_TIERS: PricingLiveTier[] = [
  {
    id: 'live-express',
    title: 'Express Live',
    durationLabel: '2 Jam',
    hours: 2,
    price: 99000,
    cogsCost: 25000,
    profitMargin: 74.7,
    features: [
      '1 Sesi Live (2 Jam nonstop)',
      'Auto-reply Comment realtime',
      'Auto Pin Produk otomatis',
      'Integrasi 1 Platform Tujuan',
      'Laporan analitik ringkas'
    ],
    description: 'Sangat cocok untuk testing performa produk atau flash sale jam makan siang.'
  },
  {
    id: 'live-shift',
    title: 'Shift Live',
    durationLabel: '8 Jam',
    hours: 8,
    price: 299000,
    cogsCost: 90000,
    profitMargin: 69.8,
    isPopular: true,
    features: [
      '1 Sesi Shift (8 Jam nonstop)',
      'Cocok untuk sesi malam sampai pagi',
      'Auto-reply AI cerdas dengan RAG Knowledge Base',
      'Auto-pin produk bergantian',
      'Multi-platform streaming simultan',
      'Full catalog rotation'
    ],
    description: 'Pilihan paling populer untuk menangkap traffic audiens saat malam hari tanpa perlu staf lembur.'
  },
  {
    id: 'live-marathon',
    title: 'Marathon 24/7',
    durationLabel: '24 Jam',
    hours: 24,
    price: 699000,
    cogsCost: 250000,
    profitMargin: 64.2,
    features: [
      'Live Streaming 24 Jam Nonstop',
      'Full Catalog Rotation & Dynamic Scripting',
      'Priority GPU Queue & Zero Downtime',
      'Automated checkout via Midtrans / direct link',
      'Auto moderasi filter komentar negatif',
      'Export rekaman VOD & Analitik mendalam'
    ],
    description: 'Solusi optimal bagi brand besar dan toko e-commerce untuk mendominasi algoritma live 24/7.'
  }
];

export const PRICING_VIDEO_TIERS: PricingVideoTier[] = [
  {
    id: 'video-short',
    title: 'Short Hook',
    durationLabel: '15 Detik',
    durationSec: 15,
    price: 19000,
    cogsCost: 200,
    profitMargin: 98.9,
    format: '1 Video MP4 Vertical (9:16)',
    features: [
      '1 Video MP4 Vertical (9:16)',
      'High-Impact Script pembuka viral',
      'AI Voiceover natural & jernih',
      'Auto Subtitle animasi dinamis',
      'Render cepat dalam 60 detik'
    ],
    description: 'Format kilat untuk TikTok Ads, Instagram Reels, dan YouTube Shorts.'
  },
  {
    id: 'video-standard',
    title: 'Standard Showcase',
    durationLabel: '30 Detik',
    durationSec: 30,
    price: 35000,
    cogsCost: 350,
    profitMargin: 99.0,
    isPopular: true,
    format: '1 Video MP4 Vertical (9:16)',
    features: [
      '1 Video MP4 Vertical (9:16)',
      'Full Benefit Breakdown & Usp produk',
      'Call to Action (CTA) Promosi',
      'Background B-Roll & Visual Enhancer',
      'Resolusi Full HD 1080p MP4'
    ],
    description: 'Durasi ideal untuk menjelaskan manfaat utama produk dan mengarahkan ke keranjang.'
  },
  {
    id: 'video-deep',
    title: 'Deep Review',
    durationLabel: '60 Detik',
    durationSec: 60,
    price: 59000,
    cogsCost: 600,
    profitMargin: 98.9,
    format: '1 Video MP4 Vertical (9:16)',
    features: [
      '1 Video MP4 Vertical (9:16)',
      'Unboxing & Storytelling Review Script',
      'Q&A Problem-Solution Narrative',
      'Multi-angle mock visual & Sound FX',
      'Free 1x AI Script Re-generation'
    ],
    description: 'Video storytelling mendalam yang membangun kepercayaan tinggi untuk produk berharga sedang/tinggi.'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Bagaimana cara kerja AI Live Streaming Otonom?',
    a: 'AI Host menerima data produk Anda, membaca katalog harga dan deskripsi ke dalam RAG Knowledge Base. Saat live berjalan, AI akan secara otomatis mempresentasikan produk, menjawab chat komentar penonton secara cerdas dalam hitungan detik, dan menyematkan produk ke layar.'
  },
  {
    q: 'Apakah bisa dihubungkan ke TikTok LIVE, Shopee, dan YouTube?',
    a: 'Ya, sistem kami mendukung transmisi stream via RTMP standar ke semua platform e-commerce dan sosial media termasuk TikTok LIVE, Shopee Live, YouTube Live, dan Facebook Live.'
  },
  {
    q: 'Bagaimana AI menjawab pertanyaan spesifik pembeli?',
    a: 'AI menggunakan LLM yang telah di-grounding dengan data produk Anda (RAG). Jika pembeli menanyakan "Apakah cocok untuk kulit kering?", AI membaca spesifikasi produk Anda dan menjawab langsung secara audio dan teks.'
  },
  {
    q: 'Berapa hematnya menggunakan LiveStreamerAI dibanding Host Manusia?',
    a: 'Host manusia rata-rata membutuhkan biaya Rp50.000 – Rp150.000 per jam plus komisi dan shift terbatas. Dengan LiveStreamerAI, biaya modal komputasi hanya ~Rp10.000/jam, memangkas biaya hingga 90% dan dapat siaran 24 jam nonstop tanpa lelah.'
  }
];
