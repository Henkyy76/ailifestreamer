-- MVP-only policies for the public demo session.
-- Replace these with auth.uid()-scoped policies before production.

alter table public.live_sessions enable row level security;
alter table public.chat_messages enable row level security;

drop policy if exists "mvp read live sessions" on public.live_sessions;
create policy "mvp read live sessions"
on public.live_sessions
for select
to anon, authenticated
using (true);

drop policy if exists "mvp update live sessions" on public.live_sessions;
create policy "mvp update live sessions"
on public.live_sessions
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "mvp read chat messages" on public.chat_messages;
create policy "mvp read chat messages"
on public.chat_messages
for select
to anon, authenticated
using (true);

drop policy if exists "mvp insert chat messages" on public.chat_messages;
create policy "mvp insert chat messages"
on public.chat_messages
for insert
to anon, authenticated
with check (true);
