import { supabase } from './supabase';
import { AIHost, Product } from '../types';

interface ProductRow {
  id: string;
  name: string;
  category: string | null;
  price: number | null;
  discount_price: number | null;
  stock: number | null;
  image_url: string | null;
  selling_points: string | null;
  is_active: boolean | null;
}

interface AvatarRow {
  id: string;
  name: string;
  role: string | null;
  gender: string | null;
  voice_id: string | null;
  avatar_url: string | null;
  persona_style: string | null;
  system_prompt: string | null;
  languages?: string[] | null;
}

const hostStyles: AIHost['style'][] = ['Friendly', 'Energetic', 'Professional', 'Casual', 'Glamour'];

function mapProduct(row: ProductRow): Product {
  const originalPrice = Number(row.price || 0);
  const discountPrice = Number(row.discount_price || 0);
  return {
    id: row.id,
    name: row.name,
    category: row.category || 'General',
    price: discountPrice > 0 ? discountPrice : originalPrice,
    originalPrice: discountPrice > 0 && discountPrice < originalPrice ? originalPrice : undefined,
    stock: Number(row.stock || 0),
    soldCount: 0,
    image: row.image_url || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    description: row.selling_points || 'Produk unggulan dengan kualitas terbaik.',
    benefits: row.selling_points ? [row.selling_points] : [],
    promoText: discountPrice > 0 && discountPrice < originalPrice ? 'Promo khusus sesi live!' : undefined,
    selected: Boolean(row.is_active),
  };
}

function mapHost(row: AvatarRow): AIHost {
  const normalizedGender = String(row.gender || '').toLowerCase();
  const voiceGender: AIHost['voiceGender'] = normalizedGender === 'male' || normalizedGender === 'pria' ? 'Pria' : 'Wanita';
  const style = hostStyles.find(item => item.toLowerCase() === String(row.persona_style || '').toLowerCase()) || 'Friendly';
  return {
    id: row.id,
    name: row.name,
    style,
    type: '3D',
    avatarUrl: row.avatar_url || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    voiceGender,
    voiceTone: row.voice_id || `${voiceGender} natural voice`,
    languages: row.languages?.length ? row.languages : ['Bahasa Indonesia'],
    description: row.system_prompt || row.role || 'AI Host untuk live shopping.',
    sampleAudioText: 'Halo semuanya, selamat datang di live shopping kami!',
  };
}

export async function loadSupabaseCatalog(): Promise<{ products: Product[]; hosts: AIHost[] } | null> {
  if (!supabase) return null;

  const [productsResult, hostsResult] = await Promise.all([
    supabase
      .from('products')
      .select('id,name,category,price,discount_price,stock,image_url,selling_points,is_active')
      .eq('is_active', true)
      .order('created_at', { ascending: true }),
    supabase
      .from('avatars')
      .select('id,name,role,gender,voice_id,avatar_url,persona_style,system_prompt')
      .order('created_at', { ascending: true }),
  ]);

  if (productsResult.error || hostsResult.error) {
    console.warn('Supabase catalog unavailable; using local demo data.', productsResult.error?.message || hostsResult.error?.message);
    return null;
  }

  const products = (productsResult.data || []).map(row => mapProduct(row as ProductRow));
  const hosts = (hostsResult.data || []).map(row => mapHost(row as AvatarRow));
  if (!products.length || !hosts.length) return null;
  return { products, hosts };
}
