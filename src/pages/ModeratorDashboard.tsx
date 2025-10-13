import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { uploadsService } from '@/services/uploads';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, CheckCircle, XCircle, AlertCircle, Star } from 'lucide-react';
import { toast } from 'sonner';

const ModeratorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadUploads();
  }, [user]);

  const loadUploads = async () => {
    try {
      setLoading(true);
      const data = await uploadsService.getPendingUploads();
      setUploads(data || []);
    } catch (error) {
      console.error('Error loading uploads:', error);
      toast.error('Failed to load uploads');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (uploadId: string, decision: 'approved' | 'rejected') => {
    try {
      setReviewing(uploadId);
      await uploadsService.reviewUpload(uploadId, decision, reviewNotes);
      toast.success(`Upload ${decision}`);
      setReviewNotes('');
      loadUploads();
    } catch (error) {
      console.error('Error reviewing upload:', error);
      toast.error('Failed to review upload');
    } finally {
      setReviewing(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getTrustBadge = (score: number) => {
    if (score >= 10) return { label: 'Trusted', variant: 'default' as const };
    if (score >= 5) return { label: 'Verified', variant: 'secondary' as const };
    return { label: 'New', variant: 'outline' as const };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Moderation Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Review and approve user-submitted content
            </p>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({uploads.filter((u) => u.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="needs_review">
                Needs Review ({uploads.filter((u) => u.status === 'needs_review').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {uploads.filter((u) => u.status === 'pending').length > 0 ? (
                uploads
                  .filter((u) => u.status === 'pending')
                  .map((upload) => (
                    <Card key={upload.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={upload.users?.avatar_url} />
                              <AvatarFallback>
                                {getInitials(upload.users?.display_name || 'U')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="mb-1">{upload.title}</CardTitle>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                  by {upload.users?.display_name || 'Anonymous'}
                                </p>
                                <Badge {...getTrustBadge(upload.users?.trust_score || 0)}>
                                  <Star className="w-3 h-3 mr-1" />
                                  {getTrustBadge(upload.users?.trust_score || 0).label}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {upload.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {upload.description && (
                          <p className="text-muted-foreground">{upload.description}</p>
                        )}

                        {upload.media_url && (
                          <div className="rounded-lg overflow-hidden bg-muted">
                            {upload.type === 'testimony' && upload.media_url.includes('video') && (
                              <video controls className="w-full max-h-96">
                                <source src={upload.media_url} type="video/mp4" />
                              </video>
                            )}
                            {upload.type === 'testimony' && upload.media_url.includes('audio') && (
                              <audio controls className="w-full">
                                <source src={upload.media_url} type="audio/mpeg" />
                              </audio>
                            )}
                            {upload.type === 'artifact' && (
                              <img
                                src={upload.media_url}
                                alt={upload.title}
                                className="w-full max-h-96 object-contain"
                              />
                            )}
                          </div>
                        )}

                        {upload.auto_check_flags && upload.auto_check_flags.length > 0 && (
                          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Auto-check Flags</p>
                              <ul className="text-sm text-muted-foreground list-disc list-inside">
                                {upload.auto_check_flags.map((flag: string, i: number) => (
                                  <li key={i}>{flag}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Review Notes</label>
                          <Textarea
                            placeholder="Add notes about this upload..."
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleReview(upload.id, 'approved')}
                            disabled={reviewing === upload.id}
                            className="flex-1"
                          >
                            {reviewing === upload.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleReview(upload.id, 'rejected')}
                            disabled={reviewing === upload.id}
                            className="flex-1"
                          >
                            {reviewing === upload.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-2" />
                            )}
                            Reject
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Uploaded {new Date(upload.created_at).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg">No pending uploads</p>
                    <p className="text-muted-foreground">All caught up!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="needs_review" className="space-y-6">
              {uploads.filter((u) => u.status === 'needs_review').length > 0 ? (
                uploads
                  .filter((u) => u.status === 'needs_review')
                  .map((upload) => (
                    <Card key={upload.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={upload.users?.avatar_url} />
                              <AvatarFallback>
                                {getInitials(upload.users?.display_name || 'U')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="mb-1">{upload.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                by {upload.users?.display_name || 'Anonymous'}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {upload.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {upload.description && (
                          <p className="text-muted-foreground">{upload.description}</p>
                        )}

                        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Flagged for Review</p>
                            <p className="text-sm text-muted-foreground">
                              This content requires manual review
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Review Notes</label>
                          <Textarea
                            placeholder="Add notes about this upload..."
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleReview(upload.id, 'approved')}
                            disabled={reviewing === upload.id}
                            className="flex-1"
                          >
                            {reviewing === upload.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleReview(upload.id, 'rejected')}
                            disabled={reviewing === upload.id}
                            className="flex-1"
                          >
                            {reviewing === upload.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-2" />
                            )}
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg">No uploads need review</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ModeratorDashboard;
