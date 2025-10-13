import { supabase, Database } from '@/lib/supabase';

type Lesson = Database['public']['Tables']['lessons']['Row'];

export const lessonsService = {
  async getAll(filters?: {
    era?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    let query = supabase
      .from('lessons')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters?.era) {
      query = query.eq('era', filters.era);
    }

    if (filters?.tag) {
      query = query.contains('tags', [filters.tag]);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data, count };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) throw error;

    if (data) {
      await supabase
        .from('lessons')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
    }

    return data;
  },

  async create(lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at' | 'view_count'>) {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Lesson>) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
