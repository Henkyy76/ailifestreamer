-- Persist live configuration so dashboard and OBS output share the same state.
alter table public.live_sessions
  add column if not exists speech_style text not null default 'Persuasif',
  add column if not exists language text not null default 'Bahasa Indonesia';
