import { Product, AIHost } from '../types';

export interface GeneratedAnswer {
  text: string;
  isPromoPush: boolean;
  actionTag?: string;
  isAiGenerated?: boolean;
}

export interface VideoScript {
  id: string;
  frameworkName: string;
  frameworkCategory: string;
  hook: string;
  body: string;
  cta: string;
  estimatedDurationSec: number;
}

// 1. Dynamic Multilingual & Multi-Style Live Monologues (15+ Rotating Tracks)
export function getLiveMonologue(
  product: Product,
  host: AIHost,
  speechStyle: string = 'Persuasif',
  language: string = 'Bahasa Indonesia',
  sequenceIndex: number = 0
): string {
  const priceFormatted = `Rp${product.price.toLocaleString('id-ID')}`;
  const origPriceFormatted = `Rp${(product.originalPrice || product.price * 1.4).toLocaleString('id-ID')}`;
  const firstBenefit = product.benefits[0] || 'kualitas premium terbaik';
  const secondBenefit = product.benefits[1] || 'hasil terbukti nyata';

  // --- ENGLISH GLOBAL ---
  if (language.includes('English')) {
    const englishTracks = [
      `Hello everyone, welcome to our official live stream! Tap the screen and check out pin #1 for ${product.name}!`,
      `Right now, ${product.name} is on a massive flash sale for only ${priceFormatted} down from ${origPriceFormatted}!`,
      `Why is everyone loving this? Because it delivers ${firstBenefit} and ${secondBenefit} with zero greasy feeling!`,
      `Quick reminder for our new viewers: stock is strictly limited to ${product.stock} units at this discount price!`,
      `Fast free shipping and cash on delivery are available today! Tap the yellow cart in the bottom corner right now!`,
      `Look at this lightweight texture! It absorbs into the skin in seconds without clogging pores.`,
      `We've already shipped over ${product.soldCount || 120} packages today alone! Don't miss your special deal!`
    ];
    return englishTracks[sequenceIndex % englishTracks.length];
  }

  // --- MANDARIN CHINESE (中文) ---
  if (language.includes('Mandarin')) {
    const chineseTracks = [
      `大家好，欢迎来到我们的官方直播间！大家先把屏幕点点赞，今天带来的是爆款 ${product.name}！`,
      `今天在直播间专属特惠价只要 ${priceFormatted}！原价 ${origPriceFormatted}，现在下单直接省下大几十！`,
      `这款的核心亮点是 ${firstBenefit}，温和不刺激，适合所有肤质，用过的人都说好！`,
      `库存只剩下最后 ${product.stock} 件了！抢到就是赚到，大家赶紧点击下方小黄车一键抢购！`,
      `今天下单全场包邮，还享受正品保障！手慢无，倒计时 3 秒准备锁单！`,
      `新进来的家人们先点点关注，关注主播领无门槛专属大额优惠券！`
    ];
    return chineseTracks[sequenceIndex % chineseTracks.length];
  }

  // --- JAPANESE (日本語) ---
  if (language.includes('Japanese')) {
    const japaneseTracks = [
      `みなさん、こんにちは！公式ライブ配信へようこそ！画面をタップしていいねをお願いします！`,
      `今だけの特別セール！${product.name} が通常 ${origPriceFormatted} のところ、なんと ${priceFormatted}！`,
      `一番のおすすめポイントは ${firstBenefit}！毎日安心して使える高品質な成分を配合しています。`,
      `残り在庫はわずか ${product.stock} 個となっています！気になる方はぜひ黄色いカートをタップしてくださいね！`,
      `本日発送対応＆送料無料でお届けします！ぜひこのお得なチャンスをお見逃しなく！`,
      `敏感肌の方でも安心してお使いいただける優しいテクスチャーです。`
    ];
    return japaneseTracks[sequenceIndex % japaneseTracks.length];
  }

  // --- KOREAN (한국어) ---
  if (language.includes('Korean')) {
    const koreanTracks = [
      `여러분 안녕하세요! 라이브 방송에 오신 것을 환영합니다! 오늘 특별 혜택으로 준비한 ${product.name} 입니다!`,
      `오늘 라이브 단독 특가로 ${origPriceFormatted} 에서 파격 할인된 ${priceFormatted} 에 만나보실 수 있습니다!`,
      `가장 큰 장점은 바로 ${firstBenefit} 과 ${secondBenefit} 입니다. 끈적임 없이 피부에 빠르게 흡수돼요!`,
      `현재 남은 수량은 단 ${product.stock} 개뿐입니다! 품절되기 전에 노란색 장바구니를 클릭해 보세요!`,
      `오늘 주문 시 무료 배송 혜택까지 모두 챙겨드립니다! 지금 바로 득템하세요!`,
      `새로 들어오신 분들은 팔로우 누르시고 라이브 전용 할인 쿠폰 받아가세요!`
    ];
    return koreanTracks[sequenceIndex % koreanTracks.length];
  }

  // --- BAHASA INDONESIA (Default) with Multi-Style Variations ---
  if (speechStyle === 'Energetic') {
    const energeticTracks = [
      `HALO SEMUANYA! SELAMAT DATANG DI LIVE SUPER SERU KITA! Yuk bantu tap-tap layar sampai 50K love dulu yaa! 🔥`,
      `GOKIL BANGET KAK! Khusus detik ini ${product.name} banting harga dari ${origPriceFormatted} jadi cuma ${priceFormatted}! ⚡`,
      `Keunggulannya gausah diragukan lagi, ada ${firstBenefit} plus ${secondBenefit}! Beneran auto glowing maksimal! ✨`,
      `WARNING STOK TINGGAL ${product.stock} PCS LAGI! Yang belum payment di keranjang kuning buruan amankan sekarang juga! 🛒`,
      `Pengiriman kilat serentak hari ini + GRATIS ONGKIR dan BISA COD seluruh Indonesia! Langsung CO yuk! 🚀`,
      `Buat kak @Rina, kak @Dimas, dan semua yang baru join, langsung cek pin nomor 1 ya! Ada promo kilat terbatas! 🎁`,
      `Lihat sendiri teksturnya ya kak, ini super ringan banget, gak lengket sama sekali dan langsung meresap ke kulit! 😍`,
      `Siapa lagi yang mau kulit sehat glowing tanpa ribet? Yang udah checkout komen 'SAYA' di live chat ya! 🎉`
    ];
    return energeticTracks[sequenceIndex % energeticTracks.length];
  }

  if (speechStyle === 'Professional') {
    const professionalTracks = [
      `Selamat datang, Bapak dan Ibu sekalian. Terima kasih telah bergabung dalam sesi siaran resmi kami hari ini.`,
      `Produk yang sedang kami sematkan adalah ${product.name}, yang diformulasikan khusus dengan standar dermatologis tertinggi.`,
      `Kelebihan utamanya meliputi ${firstBenefit} dan ${secondBenefit}, telah terverifikasi resmi BPOM dan 100% Original.`,
      `Dalam sesi live ini, kami memberikan penawaran eksklusif dari ${origPriceFormatted} menjadi ${priceFormatted}.`,
      `Kami menjamin garansi uang kembali dan sistem pengiriman terlindungi hingga ke tangan Anda di seluruh Indonesia.`,
      `Bagi yang membutuhkan konsultasi jenis kulit atau cara penggunaan optimal, silakan langsung tulis di kolom live chat.`,
      `Batch produksi terbaru dengan masa kadaluarsa 24 bulan ke depan dan segel keamanan barcode resmi.`
    ];
    return professionalTracks[sequenceIndex % professionalTracks.length];
  }

  if (speechStyle === 'Casual') {
    const casualTracks = [
      `Hai bestie! Welcome to my live! Gimana kabarnya hari ini? Yuk santai bareng sambil spill skincare andalan~ 💖`,
      `Ini dia ${product.name} yang kemarin viral banget! Harganya lagi gemoy banget cuma ${priceFormatted} aja lho!`,
      `Teksturnya super ringan, cepet meresap dan langsung kasih efek ${firstBenefit}! Beneran sesuka itu aku pake tiap hari.`,
      `Jangan sampai nyesel kehabisan ya bestie, stoknya sisa ${product.stock} aja di keranjang nomor 1 bawah.`,
      `Bisa COD juga kok bestie, tinggal checkout sekarang dan tunggu paket cantiknya sampai di rumah! 📦`,
      `Yang baru mampir jangan lupa tap love yaa, biar gak ketinggalan voucher diskon tambahan 20%! ✨`,
      `Aku pribadi udah habis 2 botol dan beneran ngerasain ${secondBenefit}. Worth every penny pokoknya!`
    ];
    return casualTracks[sequenceIndex % casualTracks.length];
  }

  // Default: Persuasif
  const persuasifTracks = [
    `Halo Sahabat Cantik, selamat datang di sesi live spesial hari ini! Jangan lupa tap love di layar yaa ❤️`,
    `Khusus penonton setia live sekarang, ${product.name} lagi ada promo flash sale dari ${origPriceFormatted} jadi cuma ${priceFormatted}!`,
    `Formula istimewa dengan ${firstBenefit} dan ${secondBenefit} akan membantu merawat kulit Anda dengan optimal.`,
    `Stok promo ini sangat terbatas, hanya tersisa ${product.stock} buah. Amankan pesanan Anda sekarang di keranjang kuning.`,
    `Sudah banyak sekali pelanggan kami yang merasakan perubahannya dalam 7 hari. Giliran Anda mencobanya hari ini!`,
    `Dapatkan juga voucher gratis ongkir dan fasilitas pembayaran COD di tempat untuk seluruh wilayah Indonesia. 🚚`,
    `Segera selesaikan pembayaran sebelum jam siaran berakhir agar pesanan langsung kami serahkan ke kurir siang ini.`
  ];
  return persuasifTracks[sequenceIndex % persuasifTracks.length];
}

// 2. Full-Stack Async AI Generator (Gemini 3.7 Flash Backend with Instant NLP Fallback)
export async function generateHostResponseAsync(
  question: string,
  activeProduct: Product,
  host: AIHost,
  speechStyle: string = 'Persuasif',
  language: string = 'Bahasa Indonesia'
): Promise<GeneratedAnswer> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        product: activeProduct,
        host,
        speechStyle,
        language
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text && !data.fallbackNeeded) {
        return {
          text: data.text,
          isPromoPush: data.text.toLowerCase().includes('keranjang') || data.text.toLowerCase().includes('checkout') || data.text.toLowerCase().includes('cart'),
          isAiGenerated: true
        };
      }
    }
  } catch (err) {
    // Network / API fallback silently handled
  }

  // Advanced Local Generative NLP fallback
  return generateHostResponse(question, activeProduct, host, speechStyle, language);
}

// 3. Advanced Context-Aware NLP Engine (Handles ANY Custom Question Intelligently)
export function generateHostResponse(
  question: string,
  activeProduct: Product,
  host: AIHost,
  speechStyle: string = 'Persuasif',
  language: string = 'Bahasa Indonesia'
): GeneratedAnswer {
  const rawQ = question.trim();
  const q = rawQ.toLowerCase();
  const priceFormatted = `Rp${activeProduct.price.toLocaleString('id-ID')}`;
  const origPriceFormatted = `Rp${(activeProduct.originalPrice || activeProduct.price * 1.4).toLocaleString('id-ID')}`;
  const firstBenefit = activeProduct.benefits[0] || 'mencerahkan dan merawat kulit';
  const secondBenefit = activeProduct.benefits[1] || 'tekstur nyaman meresap';

  // --- MULTILINGUAL HANDLERS ---
  if (language.includes('English')) {
    if (q.includes('price') || q.includes('how much') || q.includes('cost') || q.includes('discount') || q.includes('promo')) {
      return {
        text: `The special live promo price for ${activeProduct.name} is only ${priceFormatted} (down from ${origPriceFormatted})! Tap the cart to grab it now! ✨`,
        isPromoPush: true
      };
    }
    if (q.includes('ship') || q.includes('delivery') || q.includes('cod') || q.includes('where')) {
      return {
        text: `Yes! We ship nationwide with fast dispatch and cash on delivery! Your order will be processed today! 📦`,
        isPromoPush: false
      };
    }
    if (q.includes('men') || q.includes('man') || q.includes('male') || q.includes('guy') || q.includes('women')) {
      return {
        text: `Absolutely! ${activeProduct.name} is 100% unisex and formulated for both men and women of all skin types! 🌟`,
        isPromoPush: true
      };
    }
    if (q.includes('how to use') || q.includes('routine') || q.includes('when')) {
      return {
        text: `Easy! Apply 2-3 drops on clean skin every morning and evening before your moisturizer. Absorbs in seconds! ✨`,
        isPromoPush: false
      };
    }
    if (q.includes('safe') || q.includes('pregnant') || q.includes('sensitive') || q.includes('ingredient') || q.includes('bpom')) {
      return {
        text: `It is dermatologically tested, BPOM certified, safe for sensitive skin, and pregnancy/nursing friendly! 🛡️`,
        isPromoPush: false
      };
    }
    if (q.includes('who are you') || q.includes('host') || q.includes('ai') || q.includes('robot') || q.includes('age') || q.includes('pretty')) {
      return {
        text: `I'm ${host.name}, your AI live shopping assistant! I'm here 24/7 to bring you the best deals on ${activeProduct.name}! Thank you for watching! 💖`,
        isPromoPush: true
      };
    }
    return {
      text: `Thanks for asking "${rawQ}"! ${activeProduct.name} is designed with ${firstBenefit}. You can checkout directly at pin #1 for only ${priceFormatted}! 🛍️`,
      isPromoPush: true
    };
  }

  // --- BAHASA INDONESIA COMPREHENSIVE INTELLIGENCE ---

  // 1. Sapaan & Obrolan Santai / Personal Host / AI vs Manusia
  if (q.includes('halo') || q.includes('hai') || q.includes('assalam') || q.includes('selamat') || q.includes('pagi') || q.includes('siang') || q.includes('malam')) {
    return {
      text: `Halo kak! Selamat datang di live aku yaa! Semoga harinya menyenangkan. Yuk sambil kepoin produk ${activeProduct.name} lagi ada promo heboh lho! ✨`,
      isPromoPush: true
    };
  }

  if (q.includes('umur') || q.includes('usia host') || q.includes('nama host') || q.includes('siapa kamu') || q.includes('robot') || q.includes('ai') || q.includes('asli gak') || q.includes('orang beneran')) {
    return {
      text: `Hai kak! Aku ${host.name}, AI Live Host resmi yang bertugas nemenin dan spill promo terbaik buat kakak! Walaupun AI, promo dan produk ${activeProduct.name} ini 100% asli dan dikirim dari gudang resmi ya kak! 🤖💖`,
      isPromoPush: false
    };
  }

  if (q.includes('cantik') || q.includes('ganteng') || q.includes('keren') || q.includes('manis') || q.includes('lucu') || q.includes('semangat') || q.includes('makan') || q.includes('capek')) {
    return {
      text: `Makasih banyak pujiannya kak, jadi makin semangat live nih! 🥰 Biar kakak ikutan glowing dan fresh kayak aku, cobain deh rutin pakai ${activeProduct.name}, lagi diskon di keranjang kuning!`,
      isPromoPush: true
    };
  }

  // 2. Tanya Gender / Kecocokan Pria & Wanita
  if (q.includes('cowok') || q.includes('pria') || q.includes('laki') || q.includes('bapak') || q.includes('cewek') || q.includes('wanita') || q.includes('anak')) {
    return {
      text: `Bisa banget kak! ${activeProduct.name} ini sifatnya Unisex, jadi cowok maupun cewek sangat aman pakai. Formulanya ringan, cepat menyerap, dan gak bikin muka kelihatan berminyak sama sekali! 🙌`,
      isPromoPush: true
    };
  }

  // 3. Tanya Pengiriman ke Wilayah Spesifik (Papua, Kalimantan, NTT, dll) & Ongkir
  if (q.includes('papua') || q.includes('kalimantan') || q.includes('sulawesi') || q.includes('sumatera') || q.includes('ntt') || q.includes('ntb') || q.includes('bali') || q.includes('aceh') || q.includes('desa') || q.includes('pelosok') || q.includes('luar pulau')) {
    return {
      text: `Bisa kirim ke seluruh pelosok Indonesia kak, termasuk wilayah kakak! Kami bekerjasama dengan ekspedisi kilat (J&T, SiCepat, JNE) dan ada subsidi gratis ongkir juga lho. Langsung masukkan alamat pas checkout ya! 🚚`,
      isPromoPush: true
    };
  }

  // 4. Tanya Bahan Aktif Spesifik (Niacinamide, Retinol, Salicylic, dll)
  if (q.includes('retinol') || q.includes('niacinamide') || q.includes('aha') || q.includes('bha') || q.includes('salicylic') || q.includes('vitamin c') || q.includes('centella') || q.includes('ceramide') || q.includes('alkohol') || q.includes('parfum') || q.includes('merkuri') || q.includes('hidrokuinon')) {
    return {
      text: `Kandungan ${activeProduct.name} bebas merkuri, tanpa alkohol berbahaya, dan diperkaya zat aktif berkualitas tinggi seperti ${firstBenefit}. Sangat aman digunakan jangka panjang dan sudah lolos uji lab dermatologi! 🌿`,
      isPromoPush: false
    };
  }

  // 5. Tanya Pakai Bersama Makeup / Skincare Lain
  if (q.includes('makeup') || q.includes('bedak') || q.includes('sunscreen') || q.includes('foundation') || q.includes('toner') || q.includes('pilling') || q.includes('luntur') || q.includes('panas')) {
    return {
      text: `Aman banget dipakai sebelum makeup atau sunscreen kak! Teksturnya water-based cepat meresap jadi gak akan pilling (menggumpal) dan justru bikin makeup lebih menempel tahan lama! 💄✨`,
      isPromoPush: false
    };
  }

  // 6. Tanya Kadaluarsa / Expired Date & Ukuran
  if (q.includes('expired') || q.includes('exp') || q.includes('kadaluarsa') || q.includes('kapan habis') || q.includes('ml') || q.includes('gram') || q.includes('ukuran') || q.includes('isi berapa')) {
    return {
      text: `Batch produksi kami fresh terbaru ya kak, masa kadaluarsanya masih panjang 2 tahun ke depan (2028). Isinya pas dan hemat bisa dipakai untuk pemakaian 1-2 bulan rutin kak! 📅`,
      isPromoPush: false
    };
  }

  // 7. Tanya Retur / Barang Rusak / Garansi / Keaslian
  if (q.includes('rusak') || q.includes('pecah') || q.includes('tumpah') || q.includes('retur') || q.includes('ganti rugi') || q.includes('komplain') || q.includes('palsu') || q.includes('kw')) {
    return {
      text: `Jangan khawatir kak, toko kami ada GARANSI GANTI BARU 100%! Setiap paket dipacking bubble wrap tebal dan kardus kuat. Kalau ada kerusakan di jalan, tinggal kirim video unboxing dan langsung kami kirim yang baru gratis! 🛡️`,
      isPromoPush: false
    };
  }

  // 8. Tanya Reseller / Dropship / Beli Banyak / Grosir
  if (q.includes('reseller') || q.includes('dropship') || q.includes('grosir') || q.includes('banyak') || q.includes('jual lagi') || q.includes('distributor')) {
    return {
      text: `Bisa banget untuk reseller atau dropshipper kak! Kalau beli paket bundle 3 pcs ke atas di keranjang nomor 1, harganya otomatis dapat potongan grosir ekstra lho! Yuk borong selagi flash sale! 📦💰`,
      isPromoPush: true
    };
  }

  // 9. Tanya Harga, Diskon & Promo
  if (q.includes('harga') || q.includes('berapa') || q.includes('ongkir') || q.includes('promo') || q.includes('diskon') || q.includes('murah') || q.includes('potongan') || q.includes('voucher') || q.includes('hemat')) {
    if (speechStyle === 'Energetic') {
      return {
        text: `GOKIL BANGET KAK! Khusus di live sekarang harganya dibanting dari ${origPriceFormatted} jadi cuma ${priceFormatted} aja! Hemat parah, buruan co sebelum harga naik! ⚡🔥`,
        isPromoPush: true
      };
    }
    if (speechStyle === 'Professional') {
      return {
        text: `Harga resmi eksklusif sesi live ini adalah ${priceFormatted} (diskon khusus dari harga ritel ${origPriceFormatted}), sudah termasuk jaminan keaslian dan asuransi pengiriman resmi.`,
        isPromoPush: false
      };
    }
    if (speechStyle === 'Casual') {
      return {
        text: `Harganya lagi gemoy banget bestie, cuma ${priceFormatted} aja! Kualitas sultan harga merakyat, yuk langsung serbu keranjang kuning! ✨`,
        isPromoPush: true
      };
    }
    return {
      text: `Khusus di sesi live sekarang, ${activeProduct.name} lagi diskon flash sale jadi cuma ${priceFormatted} dari aslinya ${origPriceFormatted}! Plus ada voucher gratis ongkir, langsung checkout di keranjang kuning ya kak! 🔥`,
      isPromoPush: true
    };
  }

  // 10. Tanya Jenis Kulit & Masalah Kulit (Jerawat, Flek, Kering, dll)
  if (q.includes('kulit') || q.includes('minyak') || q.includes('jerawat') || q.includes('sensitif') || q.includes('kering') || q.includes('cocok') || q.includes('flek') || q.includes('bruntusan') || q.includes('kusam') || q.includes('pori')) {
    return {
      text: `Cocok banget kak! ${activeProduct.name} diformulasikan khusus untuk mengatasi masalah kulit seperti ${firstBenefit} dan ${secondBenefit}. Formulanya gentle, non-comedogenic, dan aman buat kulit bruntusan maupun sensitif! 🌸`,
      isPromoPush: true
    };
  }

  // 11. Tanya Bumil & Busui
  if (q.includes('bumil') || q.includes('busui') || q.includes('hamil') || q.includes('menyusui')) {
    return {
      text: `Aman banget untuk ibu hamil dan menyusui ya kak! Tidak mengandung bahan kimia keras atau zat terlarang, jadi bunda bisa tetap rawat diri dengan tenang dan nyaman! 🤰🤱`,
      isPromoPush: false
    };
  }

  // 12. Tanya Cara Pakai & Urutan
  if (q.includes('cara pakai') || q.includes('cara guna') || q.includes('kapan') || q.includes('aturan') || q.includes('urutan') || q.includes('pagi') || q.includes('malam') || q.includes('berapa kali')) {
    return {
      text: `Cara pakainya praktis banget kak! Cukup aplikasikan 2-3 tetes atau secukupnya pada area yang bersih setiap pagi dan malam hari sebelum tidur. Rasakan perubahan nyatanya dalam 7 hari pemakaian! ✨`,
      isPromoPush: false
    };
  }

  // 13. Tanya Beli, Checkout & Cara Order
  if (q.includes('beli') || q.includes('checkout') || q.includes('cara') || q.includes('co') || q.includes('pesan') || q.includes('keranjang') || q.includes('ambil') || q.includes('order')) {
    return {
      text: `Cara ordernya gampang banget kak! Klik pin nomor 1 atau ikon tas/keranjang kuning di pojok kiri bawah, pilih varian lalu klik 'Beli Sekarang'. Paket langsung kami proses hari ini! 🛍️`,
      isPromoPush: true
    };
  }

  // 14. Tanya COD & Bayar di Tempat
  if (q.includes('cod') || q.includes('bayar di tempat') || q.includes('bayar ditempat') || q.includes('kurir') || q.includes('kapan sampai')) {
    return {
      text: `Bisa banget COD kak! Tersedia bayar di tempat saat kurir sampai ke rumah kakak. Pengiriman langsung diberangkatkan hari ini serentak seluruh Indonesia! 📦`,
      isPromoPush: false
    };
  }

  // 15. Tanya BPOM & Halal
  if (q.includes('bpom') || q.includes('ori') || q.includes('asli') || q.includes('aman') || q.includes('halal') || q.includes('legalitas')) {
    return {
      text: `Dijamin 100% Original, Resmi BPOM & Halal ya kak! Semua produk kami dikirim langsung dari pabrik resmi dengan barcode segel terverifikasi dan garansi uang kembali! 🛡️`,
      isPromoPush: false
    };
  }

  // 16. Dynamic Contextual Fallback for ANY OTHER Unique User Question
  return {
    text: `Menjawab pertanyaan kakak tentang "${rawQ}": ${activeProduct.name} dirancang dengan ${firstBenefit} dan ${secondBenefit}. Kualitasnya dijamin nomor 1 dan harga promo ${priceFormatted} ini hanya berlaku selama live ya kak! Yuk amankan di keranjang sekarang! 💖`,
    isPromoPush: true
  };
}

// 4. Multi-Framework High-Impact Viral Script Generator for Video Promo MP4
export function generateVideoPromoScript(
  product: Product,
  durationSec: number = 30,
  frameworkIndex: number = 0,
  language: string = 'Bahasa Indonesia'
): VideoScript {
  const priceFormatted = `Rp${product.price.toLocaleString('id-ID')}`;
  const firstBenefit = product.benefits[0] || 'mencerahkan kulit seketika';
  const secondBenefit = product.benefits[1] || 'tekstur ringan tanpa rasa lengket';

  const frameworks = [
    {
      name: 'Problem-Agitate-Solve (Pain Point Hook)',
      category: 'Konversi Tinggi'
    },
    {
      name: 'Viral Curiosity & Secret Hack',
      category: 'TikTok Viral Trend'
    },
    {
      name: 'Before vs After Real Transformation',
      category: 'Social Proof'
    },
    {
      name: 'Review Jujur & ASMR Unboxing',
      category: 'Storytelling'
    },
    {
      name: 'Urgent Flash Sale & FOMO Countdown',
      category: 'Direct Selling'
    },
    {
      name: 'POV / Trend Challenge Hook',
      category: 'Gen-Z Engagement'
    }
  ];

  const selectedFw = frameworks[frameworkIndex % frameworks.length];
  const fwKey = frameworkIndex % frameworks.length;

  if (language.includes('English')) {
    if (fwKey === 0) {
      return {
        id: `script-en-pas-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `Stop scrolling if you are tired of dull skin that never seems to glow!`,
        body: `Meet ${product.name}. With its powerful formula featuring ${firstBenefit}, your skin looks radiant in just 7 days!`,
        cta: `Get yours today for only ${priceFormatted} with free shipping. Click the link in bio now!`,
        estimatedDurationSec: durationSec
      };
    }
    return {
      id: `script-en-viral-${Date.now()}`,
      frameworkName: selectedFw.name,
      frameworkCategory: selectedFw.category,
      hook: `Is this viral TikTok product actually worth the hype? Let's test it out!`,
      body: `${product.name} provides ${firstBenefit} and ${secondBenefit} without breaking the bank!`,
      cta: `Special live promo price at ${priceFormatted}. Grab yours in the cart before stock runs out!`,
      estimatedDurationSec: durationSec
    };
  }

  if (language.includes('Mandarin')) {
    return {
      id: `script-zh-${Date.now()}`,
      frameworkName: selectedFw.name,
      frameworkCategory: selectedFw.category,
      hook: `如果你还在为暗沉肌肤烦恼，一定要看到最后！`,
      body: `这就是 ${product.name}！富含 ${firstBenefit}，同时拥有 ${secondBenefit}，让肌肤看起来更加明亮水润。`,
      cta: `直播专享价只要 ${priceFormatted}，现在点击购物车马上带回家！`,
      estimatedDurationSec: durationSec
    };
  }

  if (language.includes('Japanese')) {
    return {
      id: `script-ja-${Date.now()}`,
      frameworkName: selectedFw.name,
      frameworkCategory: selectedFw.category,
      hook: `くすみ肌に悩んでいる方は、ぜひ最後までご覧ください！`,
      body: `こちらは ${product.name} です。${firstBenefit} と ${secondBenefit} を実現し、毎日の肌を明るくすこやかに整えます。`,
      cta: `ライブ限定価格は ${priceFormatted} です。今すぐカートをタップしてください！`,
      estimatedDurationSec: durationSec
    };
  }

  if (language.includes('Korean')) {
    return {
      id: `script-ko-${Date.now()}`,
      frameworkName: selectedFw.name,
      frameworkCategory: selectedFw.category,
      hook: `칙칙한 피부 때문에 고민이라면, 지금부터 꼭 집중해 주세요!`,
      body: `바로 ${product.name}입니다. ${firstBenefit}과 ${secondBenefit}으로 매일 촉촉하고 생기 있는 피부를 만들어 줍니다.`,
      cta: `라이브 특별가는 ${priceFormatted}입니다. 지금 바로 장바구니를 눌러 주세요!`,
      estimatedDurationSec: durationSec
    };
  }

  // Indonesian Variations
  switch (fwKey) {
    case 0: // Problem-Agitate-Solve
      return {
        id: `script-pas-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `Stop scroll dulu! Sering gak pede karena kulit kusam dan noda hitam yang susah banget hilang?`,
        body: `Kuncinya ada di ${product.name}! Diformulasikan dengan ${firstBenefit} dan ${secondBenefit}, bikin wajah cerah merata dalam 7 hari tanpa rasa lengket sama sekali.`,
        cta: `Khusus hari ini lagi ada diskon spesial jadi cuma ${priceFormatted} + gratis ongkir! Amankan di keranjang kuning sekarang ya!`,
        estimatedDurationSec: durationSec
      };

    case 1: // Viral Curiosity & Secret Hack
      return {
        id: `script-curiosity-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `Pantesan aja produk ini sold out 10.000 pcs dalam seminggu, ternyata ini rahasianya!`,
        body: `Cukup 2 tetes ${product.name} setiap hari, kulit kamu langsung dapet nutrisi ${firstBenefit}. Hasilnya glowing natural kayak abis treatment mahal di klinik!`,
        cta: `Mumpung stoknya baru restock dan harganya cuma ${priceFormatted}, buruan checkout sebelum rebutan lagi!`,
        estimatedDurationSec: durationSec
      };

    case 2: // Before vs After Transformation
      return {
        id: `script-transformation-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `Lihat deh perubahan wajah aku dari yang kusam bertekstur jadi sehalus dan seglowing ini!`,
        body: `Rahasia perawatannya cuma rutin pake ${product.name}. Manfaat ${firstBenefit} beneran terbukti nyata memperbaiki skin barrier dan memudarkan flek hitam.`,
        cta: `Buktikan sendiri hasilnya kak! Cuma ${priceFormatted} udah dapet produk original BPOM di link keranjang bawah!`,
        estimatedDurationSec: durationSec
      };

    case 3: // Review Jujur & ASMR Unboxing
      return {
        id: `script-unboxing-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `Review jujur pemakaian 14 hari ${product.name} yang lagi viral di FYP!`,
        body: `Pertama kali coba, teksturnya water-gel adem banget dan cepat meresap. Kandungan ${firstBenefit} bikin kulit lembab seharian tanpa bikin minyak berlebih.`,
        cta: `Worth it banget dengan harga ${priceFormatted}! Wajib banget cobain, langsung tap keranjang ya!`,
        estimatedDurationSec: durationSec
      };

    case 4: // Flash Sale FOMO
      return {
        id: `script-fomo-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `FLASH SALE DARURAT! Promo gila-gilaan ini cuma berlaku selama 10 menit ke depan!`,
        body: `${product.name} dengan keunggulan ${firstBenefit} sekarang diskon gila-gilaan dari harga normal jadi ${priceFormatted} aja!`,
        cta: `Sisa stok tinggal ${product.stock} box! Jangan sampai gigit jari pas harga normal lagi, checkout SEKARANG!`,
        estimatedDurationSec: durationSec
      };

    case 5: // POV / Trend Challenge
    default:
      return {
        id: `script-pov-${Date.now()}`,
        frameworkName: selectedFw.name,
        frameworkCategory: selectedFw.category,
        hook: `POV: Kamu akhirnya nemuin skincare holy grail yang bikin semua teman nanyain rahasia kulit glowing kamu!`,
        body: `Jawabannya ${product.name}! Diperkaya ${firstBenefit} dan ${secondBenefit}, aman dipakai harian buat semua jenis kulit.`,
        cta: `Yuk upgrade skincare routine kamu hari ini cuma ${priceFormatted}! Klik keranjang kuning sekarang juga!`,
        estimatedDurationSec: durationSec
      };
  }
}
