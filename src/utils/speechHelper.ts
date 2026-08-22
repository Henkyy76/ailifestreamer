// Comprehensive Speech Synthesizer Helper for Multilingual AI Hosts with Gender, Style, & Pitch distinction

export interface SpeechConfig {
  gender?: 'Wanita' | 'Pria';
  language?: string;
  speechStyle?: 'Persuasif' | 'Casual' | 'Professional' | 'Energetic' | string;
  voiceCharacter?: string;
  onStart?: () => void;
}

const LANGUAGE_CODE_MAP: Record<string, string> = {
  'Bahasa Indonesia': 'id-ID',
  'English Global': 'en-US',
  'English': 'en-US',
  'Mandarin Chinese': 'zh-CN',
  'Japanese': 'ja-JP',
  'Korean': 'ko-KR'
};

let cachedVoices: SpeechSynthesisVoice[] | null = null;
let activeAudio: HTMLAudioElement | null = null;
let audioRequestId = 0;
let neuralTtsBlockedUntil = 0;
const audioCache = new Map<string, Blob>();

export function getLanguageCode(languageName: string = 'Bahasa Indonesia'): string {
  const normalizedLanguage = languageName.trim().toLowerCase();
  const languageEntry = Object.entries(LANGUAGE_CODE_MAP).find(([name]) =>
    normalizedLanguage.includes(name.toLowerCase()) || name.toLowerCase().includes(normalizedLanguage)
  );

  return languageEntry?.[1] || 'id-ID';
}

function getSpeechVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }

  const speechSynthesis = window.speechSynthesis;
  if (cachedVoices?.length) return Promise.resolve(cachedVoices);

  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
    return Promise.resolve(voices);
  }

  return new Promise(resolve => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      speechSynthesis.removeEventListener('voiceschanged', finish);
      cachedVoices = speechSynthesis.getVoices();
      resolve(cachedVoices);
    };

    speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    window.setTimeout(finish, 1000);
  });
}

function prepareSpeechText(text: string): string {
  return text
    .replace(/[🔥⚡✨🛒🚀🎁😍🎉💖📦🛍️🤖🥰❤️]/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/!+/g, '!')
    .replace(/,{2,}/g, ',')
    .trim();
}

export function speakText(
  text: string,
  configOrGender: SpeechConfig | 'Wanita' | 'Pria' = 'Wanita'
): Promise<void> {
  const config: SpeechConfig = typeof configOrGender === 'string'
    ? { gender: configOrGender }
    : configOrGender;

  stopSpeaking();

  if (typeof window !== 'undefined') {
    const requestId = ++audioRequestId;
    const speechText = prepareSpeechText(text);
    const cacheKey = JSON.stringify({ text: speechText, ...config, onStart: undefined });
    const neuralSpeech = new Promise<void>((resolve, reject) => {
      const useBrowserFallback = Date.now() < neuralTtsBlockedUntil;
      const responsePromise = useBrowserFallback
        ? Promise.reject(new Error('Neural TTS quota cooldown'))
        : audioCache.has(cacheKey)
        ? Promise.resolve(new Response(audioCache.get(cacheKey)))
        : fetch('/api/speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: speechText, ...config })
        }).then(response => {
          if (response.ok) return response;
          if (response.status === 429) {
            neuralTtsBlockedUntil = Date.now() + 60_000;
            return response;
          }
          return new Promise<Response>((resolve, reject) => {
            window.setTimeout(() => {
              fetch('/api/speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: speechText, ...config })
              }).then(resolve).catch(reject);
            }, 250);
          });
        });

      responsePromise
        .then(response => {
          if (!response.ok) throw new Error('Neural TTS request failed');
          return response.blob();
        })
        .then(blob => {
          if (requestId !== audioRequestId) return resolve();
          audioCache.set(cacheKey, blob);
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          activeAudio = audio;
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            if (activeAudio === audio) activeAudio = null;
            resolve();
          };
          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            if (activeAudio === audio) activeAudio = null;
            reject(new Error('Neural TTS audio failed'));
          };
          audio.play()
            .then(() => config.onStart?.())
            .catch(reject);
        })
        .catch(reject);
    });

    return neuralSpeech.catch(() =>
      requestId === audioRequestId ? speakWithBrowser(text, config) : Promise.resolve()
    );
  }

  return Promise.resolve();
}

function speakWithBrowser(
  text: string,
  config: SpeechConfig
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    const gender = config.gender || 'Wanita';
    const language = config.language || 'Bahasa Indonesia';
    const style = config.speechStyle || 'Persuasif';
    const character = config.voiceCharacter || '';
    const langCode = getLanguageCode(language);
    const speechText = prepareSpeechText(text);
    let settled = false;
    let watchdog: number | undefined;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (watchdog) window.clearTimeout(watchdog);
      resolve();
    };

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.onend = finish;
      utterance.onerror = finish;

      // Keep pitch close to the selected voice. Extreme pitch shifts sound synthetic.
      let pitch = gender === 'Wanita' ? 1.08 : 0.92;
      let rate = 0.94;

      if (langCode === 'id-ID') {
        rate = 0.9;
        pitch = gender === 'Wanita' ? 1.06 : 0.9;
      }

      // Adjust by Speech Style
      if (style === 'Energetic') {
        rate += 0.14;
        pitch += gender === 'Wanita' ? 0.06 : 0.03;
      } else if (style === 'Professional') {
        rate -= 0.04;
        pitch -= 0.03;
      } else if (style === 'Casual') {
        rate += 0.02;
        pitch += 0.02;
      } else if (style === 'Persuasif') {
        rate += 0.01;
        pitch += 0.02;
      }

      // Adjust by Voice Character
      if (character.toLowerCase().includes('bass') || character.toLowerCase().includes('maskulin') || character.toLowerCase().includes('dewasa')) {
        pitch -= 0.15;
        rate *= 0.95;
      } else if (character.toLowerCase().includes('muda') || character.toLowerCase().includes('ceria') || character.toLowerCase().includes('gadis')) {
        pitch += 0.12;
        rate *= 1.05;
      }

      // Clamp values
      utterance.pitch = Math.max(0.7, Math.min(1.35, pitch));
      utterance.rate = Math.max(0.75, Math.min(1.3, rate));

      // Voices can load asynchronously, especially on the first browser speech call.
      getSpeechVoices().then(allVoices => {
        const targetLocale = langCode.toLowerCase().replace('_', '-');
        const targetLanguage = targetLocale.slice(0, 2);
        const langVoices = allVoices
          .filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(targetLanguage))
          .sort((a, b) => {
            const aExact = a.lang.toLowerCase().replace('_', '-') === targetLocale ? 0 : 1;
            const bExact = b.lang.toLowerCase().replace('_', '-') === targetLocale ? 0 : 1;
            return aExact - bExact;
          });

        const genderKeywords = gender === 'Wanita'
          ? ['female', 'woman', 'zira', 'aria', 'jenny', 'samantha', 'susan', 'ava', 'sara', 'allison', 'hazel', 'libby', 'sonia', 'yuna', 'xiaoxiao', 'kyoko', 'gadis', 'wanita', 'siri', 'natural']
          : ['male', 'man', 'david', 'george', 'mark', 'guy', 'ryan', 'alex', 'yunxi', 'kangkang', 'otoya', 'minho', 'pria'];
        const genderVoice = (voices: SpeechSynthesisVoice[]) => voices.find(v =>
          genderKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
        );

        // Never fall back to an arbitrary locale voice: Chrome may return a male
        // default voice for a female host when the requested locale has no match.
        const matchedVoice = genderVoice(langVoices) || langVoices[0];

        // Preserve the native locale even when the OS cannot identify voice gender.
        if (gender === 'Wanita' && matchedVoice && !genderVoice(langVoices)) {
          console.warn('No female voice metadata for', langCode, '- using the native locale voice.');
        }

        // Keep the requested locale even when the OS has no matching voice installed.
        utterance.lang = langCode;
        if (matchedVoice) utterance.voice = matchedVoice;

        window.speechSynthesis.resume();
        utterance.text = speechText;
        window.speechSynthesis.speak(utterance);
        config.onStart?.();
        watchdog = window.setTimeout(finish, Math.max(8000, speechText.length * 120));
      });
    } catch {
      finish();
    }
  });
}

export function stopSpeaking() {
  audioRequestId += 1;
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.src = '';
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
