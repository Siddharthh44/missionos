const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface SupabaseEnv {
  key: string;
  url: string;
}

export function getSupabaseEnv(): SupabaseEnv | null {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return {
    url: supabaseUrl,
    key: supabaseKey,
  };
}

export function hasSupabaseEnv() {
  return getSupabaseEnv() !== null;
}
