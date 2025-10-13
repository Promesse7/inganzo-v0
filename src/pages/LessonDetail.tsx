import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { lessonsService } from '@/services/lessons';
import { quizzesService } from '@/services/quizzes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, BookOpen, Video, Headphones, Trophy } from 'lucide-react';

const LessonDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lesson, setLesson] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [slug]);

  const loadLesson = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      const lessonData = await lessonsService.getBySlug(slug);
      setLesson(lessonData);

      if (lessonData?.id) {
        const quizData = await quizzesService.getByLessonId(lessonData.id);
        setQuiz(quizData);
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'audio':
        return <Headphones className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
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

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <Link to="/lessons">
            <Button>Back to Lessons</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/lessons" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">
            ← Back to Lessons
          </Link>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              {getIcon(lesson.type)}
              <Badge variant="secondary">{getEraLabel(lesson.era)}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{lesson.summary}</p>
            <div className="flex flex-wrap gap-2">
              {lesson.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {lesson.thumbnail_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={lesson.thumbnail_url}
                alt={lesson.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {lesson.type === 'video' && lesson.media_url && (
            <div className="mb-8 aspect-video rounded-lg overflow-hidden bg-black">
              <video controls className="w-full h-full">
                <source src={lesson.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {lesson.type === 'audio' && lesson.media_url && (
            <div className="mb-8">
              <audio controls className="w-full">
                <source src={lesson.media_url} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}

          {lesson.content && (
            <Card className="mb-8">
              <CardContent className="pt-6 prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </CardContent>
            </Card>
          )}

          {quiz && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <CardTitle>Test Your Knowledge</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Ready to test what you've learned? Take the quiz and earn points!
                </p>
                <div className="flex gap-4 items-center">
                  <Link to={`/quiz/${quiz.id}`}>
                    <Button size="lg">Start Quiz</Button>
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    {quiz.questions?.length || 0} questions • {quiz.difficulty}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LessonDetail;
