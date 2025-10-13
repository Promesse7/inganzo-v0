import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { lessonsService } from '@/services/lessons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Video, Headphones } from 'lucide-react';

const Lessons = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [era, setEra] = useState<string>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadLessons();
  }, [era, page]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const filters: any = { page, limit: 12 };
      if (era !== 'all') filters.era = era;
      if (search) filters.search = search;

      const { data } = await lessonsService.getAll(filters);
      setLessons(data || []);
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadLessons();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Headphones className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getEraLabel = (eraValue: string) => {
    const labels: Record<string, string> = {
      pre_colonial: 'Pre-Colonial',
      colonial: 'Colonial Era',
      genocide: 'Genocide',
      post_genocide: 'Post-Genocide',
      modern: 'Modern Rwanda',
    };
    return labels[eraValue] || eraValue;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Explore Lessons</h1>
            <p className="text-lg text-muted-foreground">
              Discover Rwanda's rich history through articles, videos, and audio stories
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search lessons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select value={era} onValueChange={setEra}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by era" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Eras</SelectItem>
                <SelectItem value="pre_colonial">Pre-Colonial</SelectItem>
                <SelectItem value="colonial">Colonial Era</SelectItem>
                <SelectItem value="genocide">Genocide</SelectItem>
                <SelectItem value="post_genocide">Post-Genocide</SelectItem>
                <SelectItem value="modern">Modern Rwanda</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <Link key={lesson.id} to={`/lessons/${lesson.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {lesson.thumbnail_url && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={lesson.thumbnail_url}
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {getIcon(lesson.type)}
                          <Badge variant="secondary">{getEraLabel(lesson.era)}</Badge>
                        </div>
                        <CardTitle className="line-clamp-2">{lesson.title}</CardTitle>
                        <CardDescription className="line-clamp-3">
                          {lesson.summary}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {lesson.tags?.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {lessons.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">No lessons found</p>
                </div>
              )}

              {lessons.length > 0 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={lessons.length < 12}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lessons;
