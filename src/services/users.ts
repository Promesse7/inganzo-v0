import { supabase, Database } from '@/lib/supabase';

type User = Database['public']['Tables']['users']['Row'];

export const usersService = {
  async getProfile(userId: string) {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (userError) throw userError;
    if (!user) return null;

    const { data: badges, error: badgesError } = await supabase
      .from('user_badges')
      .select('*, badges(*)')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (badgesError) throw badgesError;

    const { data: sessions, error: sessionsError } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(5);

    if (sessionsError) throw sessionsError;

    return {
      ...user,
      badges: badges || [],
      recentSessions: sessions || [],
    };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getLeaderboard(category = 'overall', limit = 50) {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select('*, users(display_name, avatar_url)')
      .eq('category', category)
      .gte('period_start', periodStart.toISOString().split('T')[0])
      .lte('period_end', periodEnd.toISOString().split('T')[0])
      .order('points', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async awardBadge(userId: string, badgeId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badgeId,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return null;
      }
      throw error;
    }

    return data;
  },
};
