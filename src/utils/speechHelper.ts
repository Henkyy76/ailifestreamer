// Comprehensive Speech Synthesizer Helper for Multilingual AI Hosts with Gender, Style, & Pitch distinction

export interface SpeechConfig {
  gender?: 'Wanita' | 'Pria';
  language?: string;
  speechStyle?: 'Persuasif' | 'Casual' | 'Professional' | 'Energetic' | string;
  voiceCharacter?: string;
}

const LANGUAGE_CODE_MAP: Record<string, string> = {
  'Bahasa Indonesia': 'id-ID',
  'English Global': 'en-US',
  'English': 'en-US',
  'Mandarin Chinese': 'zh-CN',
  'Japanese': 'ja-JP',
  'Korean': 'ko-KR'
};

export function getLanguageCode(languageName: string = 'Bahasa Indonesia'): string {
  return LANGUAGE_CODE_MAP[languageName] || 'id-ID';
}

export function speakText(
  text: string,
  configOrGender: SpeechConfig | 'Wanita' | 'Pria' = 'Wanita'
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    const config: SpeechConfig = typeof configOrGender === 'string'
      ? { gender: configOrGender }
      : configOrGender;

    const gender = config.gender || 'Wanita';
    const language = config.language || 'Bahasa Indonesia';
    const style = config.speechStyle || 'Persuasif';
    const character = config.voiceCharacter || '';
    const langCode = getLanguageCode(language);

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;

      // Base Pitch & Rate determination by Gender
      let pitch = gender === 'Wanita' ? 1.25 : 0.82;
      let rate = 1.0;

      // Adjust by Speech Style
      if (style === 'Energetic') {
        rate = 1.18;
        pitch += gender === 'Wanita' ? 0.15 : 0.08;
      } else if (style === 'Professional') {
        rate = 0.92;
        pitch -= 0.12;
      } else if (style === 'Casual') {
        rate = 1.05;
        pitch += 0.05;
      } else if (style === 'Persuasif') {
        rate = 0.98;
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
      utterance.pitch = Math.max(0.5, Math.min(2.0, pitch));
      utterance.rate = Math.max(0.6, Math.min(1.8, rate));

      // Voice selection matching target language and gender
      const allVoices = window.speechSynthesis.getVoices();
      const langVoices = allVoices.filter(v => 
        v.lang.toLowerCase().startsWith(langCode.slice(0, 2).toLowerCase()) ||
        v.lang.toLowerCase().replace('_', '-').includes(langCode.toLowerCase())
      );

      let matchedVoice: SpeechSynthesisVoice | undefined;

      if (langVoices.length > 0) {
        if (gender === 'Wanita') {
          matchedVoice = langVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('female') || name.includes('woman') || name.includes('zira') ||
                   name.includes('jenny') || name.includes('samantha') || name.includes('yuna') ||
                   name.includes('xiaoxiao') || name.includes('kyoko') || name.includes('gadis') ||
                   name.includes('wanita') || name.includes('siri') || name.includes('natural');
          }) || langVoices[0];
        } else {
          matchedVoice = langVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('male') || name.includes('man') || name.includes('david') ||
                   name.includes('george') || name.includes('mark') || name.includes('yunxi') ||
                   name.includes('kangkang') || name.includes('otoya') || name.includes('minho') ||
                   name.includes('pria');
          }) || (langVoices.length > 1 ? langVoices[1] : langVoices[0]);
        }
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
