import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

function pcmToWav(pcm: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const byteRate = sampleRate * channels * bitsPerSample / 8;
  const blockAlign = channels * bitsPerSample / 8;

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);

  return Buffer.concat([header, pcm]);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Neural TTS endpoint shared by Live Studio and Video Promo.
  app.post('/api/speech', async (req, res) => {
    try {
      const {
        text,
        gender = 'Wanita',
        language = 'Bahasa Indonesia',
        speechStyle = 'Persuasif'
      } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return res.status(503).json({ error: 'GEMINI_API_KEY is not configured' });

      const voiceName = gender === 'Pria' ? 'Puck' : 'Kore';
      const languageKey = String(language).toLowerCase();
      const speakerLanguage = languageKey.includes('english')
        ? 'English'
        : languageKey.includes('mandarin')
        ? 'Mandarin Chinese'
        : languageKey.includes('japanese')
        ? 'Japanese'
        : languageKey.includes('korean')
        ? 'Korean'
        : 'Indonesian';
      const accent = languageKey.includes('indonesia')
        ? 'Indonesian native accent, natural Indonesian pronunciation'
        : `native ${language} pronunciation`;
      const pace = speechStyle === 'Energetic'
        ? 'lively and energetic, but still clear'
        : speechStyle === 'Professional'
        ? 'calm, polished, and measured'
        : speechStyle === 'Casual'
        ? 'warm, relaxed, and conversational'
        : 'persuasive, warm, confident, and conversational';
      const prompt = `Synthesize ONLY the transcript below as natural voice audio. Do not read these instructions aloud.
Speaker: ${gender === 'Wanita' ? `a friendly ${speakerLanguage} woman` : `a confident ${speakerLanguage} man`}.
Delivery: ${pace}. Accent: ${accent}. Use natural breathing, short pauses at commas and sentence endings, smooth intonation, and clear articulation. Avoid robotic timing, foreign accent, exaggerated pitch, and clipped words.
Transcript:
${text}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } }
            }
          })
        }
      );

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Gemini TTS ${response.status}: ${details.slice(0, 300)}`);
      }

      const data = await response.json() as any;
      const inlineData = data.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData)?.inlineData;
      if (!inlineData?.data) throw new Error('Gemini TTS returned no audio');

      const audio = pcmToWav(Buffer.from(inlineData.data, 'base64'));
      res.type('audio/wav').send(audio);
    } catch (err: any) {
      console.error('Neural TTS error:', err?.message || err);
      res.status(503).json({ error: 'Neural TTS unavailable' });
    }
  });

  // Real-time AI Host Question & Answer endpoint powered by Gemini 3.7 Flash
  app.post('/api/chat', async (req, res) => {
    try {
      const {
        question,
        product,
        host,
        speechStyle = 'Persuasif',
        language = 'Bahasa Indonesia',
      } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const ai = getGeminiAI();

      if (ai) {
        const prompt = `Anda adalah host live streaming e-commerce AI bernama "${host?.name || 'Luna'}" (${host?.voiceGender || 'Wanita'}, gaya bicara: "${speechStyle}").
Anda sedang siaran langsung menjual produk:
- Nama Produk: ${product?.name || 'Produk Eksklusif'}
- Kategori: ${product?.category || 'Beauty & Skincare'}
- Harga Promo Live: Rp${(product?.price || 99000).toLocaleString('id-ID')}
- Harga Normal: Rp${((product?.originalPrice || (product?.price || 99000) * 1.4)).toLocaleString('id-ID')}
- Keunggulan/Manfaat: ${product?.benefits ? product.benefits.join(', ') : 'Kualitas premium teruji, hasil nyata'}
- Sisa Stok: ${product?.stock || 25} pcs
- Bahasa yang digunakan: ${language}

Seorang penonton live baru saja bertanya di kolom komentar live chat:
"${question}"

Instruksi Response:
1. Jawab pertanyaan penonton secara LANGSUNG, SPESIFIK, FLEKSIBEL, dan ALAMI sesuai dengan apa yang ditanyakan (jangan memberikan jawaban kaku atau generic).
2. Jika penonton menanyakan hal di luar produk (misal: sapaan, umur host, lelucon, pertanyaan pribadi, kecocokan gender, pengiriman ke daerah terpencil, bahan spesifik seperti niacinamide/retinol, kadaluarsa/expired, cara pakai dengan makeup, dll), jawab dengan ramah, cerdas, sedikit humor jika cocok, lalu selipkan ajakan manis untuk cek keranjang produk.
3. Gaya bicara harus hidup seperti host TikTok LIVE / Shopee Live Indonesia (gunakan kata sapaan seperti 'kak', 'bestie', 'sayang', atau 'Bapak/Ibu' sesuai style ${speechStyle}).
4. Panjang jawaban maksimal 2 - 3 kalimat padat, to the point, dan sangat enak didengar saat dibacakan suara audio.
5. Gunakan bahasa ${language}.

Keluarkan HANYA teks jawaban host untuk langsung dibacakan.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
        });

        const answerText = response.text?.trim() || '';
        if (answerText) {
          return res.json({
            text: answerText,
            isAiGenerated: true,
            source: 'gemini-3.7-flash',
          });
        }
      }

      // If no API key or empty response, indicate fallback to advanced local NLP
      return res.json({
        fallbackNeeded: true,
        source: 'local-engine',
      });
    } catch (err: any) {
      console.error('Gemini API Error in /api/chat:', err?.message || err);
      return res.json({
        fallbackNeeded: true,
        source: 'local-engine',
      });
    }
  });

  // Dynamic Video Script Generation with Gemini 3.7 Flash
  app.post('/api/generate-script', async (req, res) => {
    try {
      const {
        product,
        duration = 30,
        framework = 'Problem-Agitate-Solve',
        language = 'Bahasa Indonesia',
      } = req.body;

      const ai = getGeminiAI();

      if (ai && product) {
        const prompt = `Buatlah skrip video promosi vertikal 9:16 (TikTok/Reels/Shopee Video) berdurasi ${duration} detik untuk produk berikut:
- Nama: ${product.name}
- Harga: Rp${product.price.toLocaleString('id-ID')}
- Manfaat: ${product.benefits?.join(', ')}
- Framework Copywriting: ${framework}
- Bahasa: ${language}

Format JSON persis:
{
  "hook": "Kalimat pembuka 0-5 detik yang sangat memancing rasa penasaran / menghentikan scroll",
  "body": "Penjelasan inti 5-20 detik tentang problem dan solusi produk dengan manfaat nyata",
  "cta": "Kalimat penutup 20-30 detik ajakan mendesak untuk checkout di keranjang"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json({
            ...parsed,
            frameworkName: framework,
            isAiGenerated: true,
          });
        }
      }

      return res.json({ fallbackNeeded: true });
    } catch (err: any) {
      console.error('Error generating script:', err?.message || err);
      return res.json({ fallbackNeeded: true });
    }
  });

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LiveStreamerAI server running on http://localhost:${PORT}`);
  });
}

startServer();
