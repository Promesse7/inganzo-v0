/*
  # INGANZO Platform - Core Database Schema

  ## Overview
  Complete database schema for the INGANZO gamified Rwandan history platform.
  This migration creates all core tables with proper relationships, indexes, and security policies.

  ## 1. New Tables

  ### users (extends auth.users)
  - `id` (uuid, primary key, references auth.users)
  - `display_name` (text)
  - `avatar_url` (text)
  - `role` (text) - user, contributor, moderator, admin
  - `points` (integer, default 0)
  - `trust_score` (integer, default 0)
  - `language` (text, default 'rw')
  - `preferences` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### lessons
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `era` (text) - pre_colonial, colonial, genocide, post_genocide, modern
  - `type` (text) - article, video, audio
  - `summary` (text)
  - `content` (text) - for articles
  - `media_url` (text) - for video/audio
  - `thumbnail_url` (text)
  - `transcript_url` (text)
  - `tags` (text[])
  - `author_id` (uuid, references users)
  - `status` (text) - draft, published, archived
  - `view_count` (integer, default 0)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### quizzes
  - `id` (uuid, primary key)
  - `lesson_id` (uuid, references lessons)
  - `title` (text)
  - `difficulty` (text) - easy, medium, hard
  - `time_limit_seconds` (integer)
  - `created_at` (timestamptz)

  ### questions
  - `id` (uuid, primary key)
  - `quiz_id` (uuid, references quizzes)
  - `question_text` (text)
  - `question_type` (text) - multiple_choice, true_false, fill_blank
  - `options` (jsonb) - array of options for multiple choice
  - `correct_answer` (text)
  - `points` (integer, default 10)
  - `order_index` (integer)
  - `explanation` (text)

  ### game_sessions
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users)
  - `quiz_id` (uuid, references quizzes)
  - `score` (integer)
  - `total_points` (integer)
  - `duration_seconds` (integer)
  - `answers` (jsonb) - array of answer objects
  - `streak_count` (integer, default 0)
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)

  ### uploads
  - `id` (uuid, primary key)
  - `uploader_id` (uuid, references users)
  - `title` (text)
  - `description` (text)
  - `type` (text) - testimony, artifact, document
  - `storage_path` (text)
  - `media_url` (text)
  - `transcript_url` (text)
  - `metadata` (jsonb)
  - `status` (text) - pending, processing, needs_review, approved, rejected
  - `auto_check_flags` (jsonb)
  - `review_notes` (text)
  - `reviewed_by` (uuid, references users)
  - `reviewed_at` (timestamptz)
  - `created_at` (timestamptz)

  ### moderation_reports
  - `id` (uuid, primary key)
  - `upload_id` (uuid, references uploads)
  - `reporter_id` (uuid, references users)
  - `reason` (text)
  - `details` (text)
  - `status` (text) - open, under_review, resolved, dismissed
  - `assigned_to` (uuid, references users)
  - `resolution_notes` (text)
  - `created_at` (timestamptz)
  - `resolved_at` (timestamptz)

  ### badges
  - `id` (uuid, primary key)
  - `name` (text, unique)
  - `description` (text)
  - `icon_url` (text)
  - `category` (text) - learning, contribution, social, achievement
  - `criteria` (jsonb) - rules for earning
  - `points_required` (integer)
  - `rarity` (text) - common, rare, epic, legendary

  ### user_badges
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users)
  - `badge_id` (uuid, references badges)
  - `earned_at` (timestamptz)
  - Unique constraint on (user_id, badge_id)

  ### leaderboard_entries
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users)
  - `category` (text) - overall, weekly, monthly, era_specific
  - `points` (integer)
  - `rank` (integer)
  - `period_start` (date)
  - `period_end` (date)
  - `updated_at` (timestamptz)
  - Unique constraint on (user_id, category, period_start)

  ## 2. Security

  - Enable RLS on all tables
  - Users can read published content
  - Users can read/update their own profile
  - Users can create game sessions and uploads
  - Moderators can review uploads and reports
  - Admins have full access

  ## 3. Indexes

  - Lessons: slug, era, status, tags
  - Game sessions: user_id, quiz_id, completed_at
  - Uploads: uploader_id, status
  - Leaderboard: category, points, period
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  role text NOT NULL DEFAULT 'user',
  points integer NOT NULL DEFAULT 0,
  trust_score integer NOT NULL DEFAULT 0,
  language text NOT NULL DEFAULT 'rw',
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('user', 'contributor', 'moderator', 'admin'))
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  era text NOT NULL,
  type text NOT NULL,
  summary text NOT NULL,
  content text,
  media_url text,
  thumbnail_url text,
  transcript_url text,
  tags text[] DEFAULT '{}',
  author_id uuid REFERENCES users(id),
  status text NOT NULL DEFAULT 'draft',
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_era CHECK (era IN ('pre_colonial', 'colonial', 'genocide', 'post_genocide', 'modern')),
  CONSTRAINT valid_type CHECK (type IN ('article', 'video', 'audio')),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_era ON lessons(era);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON lessons(status);
CREATE INDEX IF NOT EXISTS idx_lessons_tags ON lessons USING GIN(tags);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  difficulty text NOT NULL DEFAULT 'medium',
  time_limit_seconds integer DEFAULT 300,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text NOT NULL,
  options jsonb,
  correct_answer text NOT NULL,
  points integer DEFAULT 10,
  order_index integer NOT NULL,
  explanation text,
  CONSTRAINT valid_question_type CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank'))
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_questions_quiz ON questions(quiz_id, order_index);

-- Game sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL,
  total_points integer NOT NULL,
  duration_seconds integer NOT NULL,
  answers jsonb NOT NULL,
  streak_count integer DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_game_sessions_user ON game_sessions(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_sessions_quiz ON game_sessions(quiz_id, completed_at DESC);

-- Uploads table
CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL,
  storage_path text NOT NULL,
  media_url text,
  transcript_url text,
  metadata jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending',
  auto_check_flags jsonb DEFAULT '[]',
  review_notes text,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_upload_type CHECK (type IN ('testimony', 'artifact', 'document')),
  CONSTRAINT valid_upload_status CHECK (status IN ('pending', 'processing', 'needs_review', 'approved', 'rejected'))
);

ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_uploads_uploader ON uploads(uploader_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uploads_status ON uploads(status, created_at DESC);

-- Moderation reports table
CREATE TABLE IF NOT EXISTS moderation_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id uuid REFERENCES uploads(id) ON DELETE CASCADE,
  reporter_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reason text NOT NULL,
  details text,
  status text NOT NULL DEFAULT 'open',
  assigned_to uuid REFERENCES users(id),
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  CONSTRAINT valid_report_status CHECK (status IN ('open', 'under_review', 'resolved', 'dismissed'))
);

ALTER TABLE moderation_reports ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_moderation_reports_status ON moderation_reports(status, created_at DESC);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon_url text,
  category text NOT NULL,
  criteria jsonb NOT NULL,
  points_required integer DEFAULT 0,
  rarity text NOT NULL DEFAULT 'common',
  CONSTRAINT valid_badge_category CHECK (category IN ('learning', 'contribution', 'social', 'achievement')),
  CONSTRAINT valid_rarity CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id, earned_at DESC);

-- Leaderboard entries table
CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  category text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  rank integer,
  period_start date NOT NULL,
  period_end date NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category, period_start),
  CONSTRAINT valid_leaderboard_category CHECK (category IN ('overall', 'weekly', 'monthly', 'era_specific'))
);

ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_leaderboard_category ON leaderboard_entries(category, points DESC, period_start);

-- RLS Policies

-- Users: can read all, update own
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Lessons: anyone can read published, contributors can create
CREATE POLICY "Anyone can view published lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Contributors can create lessons"
  ON lessons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('contributor', 'moderator', 'admin')
    )
  );

CREATE POLICY "Authors can update own lessons"
  ON lessons FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Quizzes and Questions: read access with published lessons
CREATE POLICY "Users can view quizzes for published lessons"
  ON quizzes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      WHERE lessons.id = quizzes.lesson_id
      AND lessons.status = 'published'
    )
  );

CREATE POLICY "Users can view questions for accessible quizzes"
  ON questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quizzes
      JOIN lessons ON lessons.id = quizzes.lesson_id
      WHERE quizzes.id = questions.quiz_id
      AND lessons.status = 'published'
    )
  );

-- Game sessions: users can create and view own
CREATE POLICY "Users can create own game sessions"
  ON game_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own game sessions"
  ON game_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Uploads: users can create and view own, moderators can view all pending
CREATE POLICY "Users can create uploads"
  ON uploads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploader_id);

CREATE POLICY "Users can view own uploads"
  ON uploads FOR SELECT
  TO authenticated
  USING (auth.uid() = uploader_id);

CREATE POLICY "Moderators can view all uploads"
  ON uploads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can update uploads"
  ON uploads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('moderator', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('moderator', 'admin')
    )
  );

-- Moderation reports: users can create, moderators can view/update
CREATE POLICY "Users can create moderation reports"
  ON moderation_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports"
  ON moderation_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = reporter_id);

CREATE POLICY "Moderators can view all reports"
  ON moderation_reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can update reports"
  ON moderation_reports FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('moderator', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('moderator', 'admin')
    )
  );

-- Badges: everyone can read
CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  TO authenticated
  USING (true);

-- User badges: users can view all, system awards them
CREATE POLICY "Anyone can view user badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (true);

-- Leaderboard: everyone can read
CREATE POLICY "Anyone can view leaderboard"
  ON leaderboard_entries FOR SELECT
  TO authenticated
  USING (true);
