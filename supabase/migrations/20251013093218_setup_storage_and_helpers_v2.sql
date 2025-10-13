/*
  # Storage Setup and Helper Functions

  ## Overview
  Sets up storage buckets for uploads and creates helper functions for points management.

  ## 1. Storage Buckets
  - `uploads` - For user-uploaded testimonies, artifacts, and documents

  ## 2. Helper Functions
  - `increment_user_points` - Safely increment user points with atomic operations

  ## 3. Security
  - Storage policies for authenticated uploads and public reads
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can upload files'
  ) THEN
    CREATE POLICY "Authenticated users can upload files"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'uploads');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Anyone can view uploaded files'
  ) THEN
    CREATE POLICY "Anyone can view uploaded files"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'uploads');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can update own uploads'
  ) THEN
    CREATE POLICY "Users can update own uploads"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = (storage.foldername(name))[1])
    WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can delete own uploads'
  ) THEN
    CREATE POLICY "Users can delete own uploads"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION increment_user_points(user_id uuid, points_to_add integer)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET points = points + points_to_add
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
