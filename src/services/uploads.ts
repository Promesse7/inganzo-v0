import { supabase, Database } from '@/lib/supabase';

type Upload = Database['public']['Tables']['uploads']['Row'];

export const uploadsService = {
  async initUpload(file: File, metadata: { title: string; description?: string; type: string }) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    const { data: upload, error: insertError } = await supabase
      .from('uploads')
      .insert({
        uploader_id: user.id,
        title: metadata.title,
        description: metadata.description || null,
        type: metadata.type as 'testimony' | 'artifact' | 'document',
        storage_path: fileName,
        media_url: publicUrlData.publicUrl,
        status: 'pending',
        metadata: {
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
        },
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return upload;
  },

  async getUploadsByUser(userId: string) {
    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .eq('uploader_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPendingUploads() {
    const { data, error } = await supabase
      .from('uploads')
      .select('*, users(display_name, avatar_url, trust_score)')
      .in('status', ['pending', 'needs_review'])
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async reviewUpload(uploadId: string, decision: 'approved' | 'rejected', notes?: string) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('uploads')
      .update({
        status: decision,
        review_notes: notes || null,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', uploadId)
      .select()
      .single();

    if (error) throw error;

    if (decision === 'approved') {
      const { data: upload } = await supabase
        .from('uploads')
        .select('uploader_id')
        .eq('id', uploadId)
        .single();

      if (upload) {
        await supabase
          .from('users')
          .update({
            points: supabase.raw('points + 50'),
            trust_score: supabase.raw('trust_score + 1'),
          })
          .eq('id', upload.uploader_id);
      }
    }

    return data;
  },

  async reportUpload(uploadId: string, reason: string, details?: string) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('moderation_reports')
      .insert({
        upload_id: uploadId,
        reporter_id: user.id,
        reason,
        details: details || null,
        status: 'open',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
