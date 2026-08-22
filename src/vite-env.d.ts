interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SUPABASE_LIVE_SESSION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
