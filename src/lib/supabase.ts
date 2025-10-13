import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'contributor' | 'moderator' | 'admin';
          points: number;
          trust_score: number;
          language: string;
          preferences: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          title: string;
          slug: string;
          era: 'pre_colonial' | 'colonial' | 'genocide' | 'post_genocide' | 'modern';
          type: 'article' | 'video' | 'audio';
          summary: string;
          content: string | null;
          media_url: string | null;
          thumbnail_url: string | null;
          transcript_url: string | null;
          tags: string[];
          author_id: string | null;
          status: 'draft' | 'published' | 'archived';
          view_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          lesson_id: string | null;
          title: string;
          difficulty: 'easy' | 'medium' | 'hard';
          time_limit_seconds: number | null;
          created_at: string;
        };
      };
      questions: {
        Row: {
          id: string;
          quiz_id: string | null;
          question_text: string;
          question_type: 'multiple_choice' | 'true_false' | 'fill_blank';
          options: Record<string, any> | null;
          correct_answer: string;
          points: number;
          order_index: number;
          explanation: string | null;
        };
      };
      game_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          quiz_id: string | null;
          score: number;
          total_points: number;
          duration_seconds: number;
          answers: Record<string, any>;
          streak_count: number;
          completed_at: string;
          created_at: string;
        };
      };
      uploads: {
        Row: {
          id: string;
          uploader_id: string | null;
          title: string;
          description: string | null;
          type: 'testimony' | 'artifact' | 'document';
          storage_path: string;
          media_url: string | null;
          transcript_url: string | null;
          metadata: Record<string, any>;
          status: 'pending' | 'processing' | 'needs_review' | 'approved' | 'rejected';
          auto_check_flags: Record<string, any>;
          review_notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon_url: string | null;
          category: 'learning' | 'contribution' | 'social' | 'achievement';
          criteria: Record<string, any>;
          points_required: number;
          rarity: 'common' | 'rare' | 'epic' | 'legendary';
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string | null;
          badge_id: string | null;
          earned_at: string;
        };
      };
      leaderboard_entries: {
        Row: {
          id: string;
          user_id: string | null;
          category: 'overall' | 'weekly' | 'monthly' | 'era_specific';
          points: number;
          rank: number | null;
          period_start: string;
          period_end: string;
          updated_at: string;
        };
      };
    };
  };
};
