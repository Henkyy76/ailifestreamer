import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { LiveComment } from '../types';

export interface LiveSessionUpdate {
  id: string;
  status?: 'draft' | 'running' | 'stopped' | 'ended' | string;
  current_product_id?: string | null;
  avatar_id?: string | null;
  viewers_count?: number;
  likes_count?: number;
  gmv_total?: number;
  speech_style?: string;
  language?: string;
}

export interface LiveChatEvent {
  id: string;
  senderName: string;
  message: string;
  isHost: boolean;
  createdAt?: string;
}

export function getConfiguredLiveSessionId(): string | null {
  const sessionId = import.meta.env.VITE_SUPABASE_LIVE_SESSION_ID as string | undefined;
  return sessionId?.trim() || null;
}

export function subscribeToLiveSession(
  sessionId: string,
  onUpdate: (session: LiveSessionUpdate) => void,
): RealtimeChannel | null {
  if (!supabase) return null;

  const channel = supabase
    .channel(`live-session-${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'live_sessions',
        filter: `id=eq.${sessionId}`,
      },
      payload => {
        if (payload.new && typeof payload.new === 'object') {
          onUpdate(payload.new as LiveSessionUpdate);
        }
      },
    )
    .subscribe();

  return channel;
}

export async function getLiveSession(sessionId: string): Promise<LiveSessionUpdate | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('live_sessions')
    .select('id,status,current_product_id,avatar_id,viewers_count,likes_count,gmv_total,speech_style,language')
    .eq('id', sessionId)
    .maybeSingle();
  if (error) {
    console.warn('Supabase live session load failed:', error.message);
    return null;
  }
  return data as LiveSessionUpdate | null;
}

export async function updateLiveSession(
  sessionId: string,
  changes: Partial<LiveSessionUpdate>,
): Promise<boolean> {
  if (!supabase) return false;
  const cleanChanges = Object.fromEntries(
    Object.entries(changes).filter(([, value]) => value !== undefined),
  );
  const { data, error } = await supabase
    .from('live_sessions')
    .update(cleanChanges)
    .eq('id', sessionId)
    .select('id,status,current_product_id')
    .maybeSingle();
  if (error) {
    console.error('Supabase live session update failed:', error.message, error.details, error.hint);
    return false;
  }
  if (!data) {
    console.warn('Supabase live session update matched no row. Check UUID and UPDATE RLS policy.');
    return false;
  }
  return true;
}

export function subscribeToChatMessages(
  sessionId: string,
  onMessage: (message: LiveChatEvent) => void,
): RealtimeChannel | null {
  if (!supabase) return null;

  return supabase
    .channel(`live-chat-${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `live_session_id=eq.${sessionId}`,
      },
      payload => {
        const row = payload.new as {
          id?: string;
          sender_name?: string;
          message?: string;
          is_host?: boolean;
          created_at?: string;
        };
        if (!row.id || !row.message || !row.sender_name) return;
        onMessage({
          id: row.id,
          senderName: row.sender_name,
          message: row.message,
          isHost: Boolean(row.is_host),
          createdAt: row.created_at,
        });
      },
    )
    .subscribe();
}

export async function getChatMessages(sessionId: string): Promise<LiveChatEvent[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('chat_messages')
    .select('id,sender_name,message,is_host,created_at')
    .eq('live_session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(30);
  if (error) {
    console.warn('Supabase chat load failed:', error.message);
    return [];
  }
  return (data || []).map(row => ({
    id: row.id,
    senderName: row.sender_name,
    message: row.message,
    isHost: Boolean(row.is_host),
    createdAt: row.created_at,
  }));
}

export async function insertChatMessage(
  sessionId: string,
  message: { senderName: string; text: string; isHost?: boolean },
): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('chat_messages').insert({
    live_session_id: sessionId,
    sender_name: message.senderName,
    message: message.text,
    is_host: Boolean(message.isHost),
  });
  if (error) {
    console.warn('Supabase chat insert failed:', error.message);
    return false;
  }
  return true;
}
