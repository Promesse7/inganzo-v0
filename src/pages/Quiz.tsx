import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { quizzesService } from '@/services/quizzes';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, Trophy, Target, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadQuiz();
  }, [quizId, user]);

  const loadQuiz = async () => {
    if (!quizId) return;

    try {
      setLoading(true);
      const data = await quizzesService.getByLessonId(quizId);
      setQuiz(data);
      setStartTime(Date.now());
      setQuestionStartTime(Date.now());
    } catch (error) {
      console.error('Error loading quiz:', error);
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error('Please select an answer');
      return;
    }

    const timeMs = Date.now() - questionStartTime;
    const newAnswers = [
      ...answers,
      {
        questionId: quiz.questions[currentQuestion].id,
        answer: selectedAnswer,
        timeMs,
      },
    ];

    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: any[]) => {
    if (!user) return;

    try {
      setSubmitting(true);
      const result = await quizzesService.submitAttempt(quizId!, {
        userId: user.id,
        answers: finalAnswers,
      });
      setResult(result);
      toast.success('Quiz completed!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
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

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
          <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
                <CardDescription>Great job! Here are your results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Target className="w-5 h-5" />
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="text-3xl font-bold">{result.score}%</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-5 h-5" />
                      <div className="text-sm text-muted-foreground">Points</div>
                    </div>
                    <div className="text-3xl font-bold">{result.pointsAwarded}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </div>
                    <div className="text-3xl font-bold">
                      {result.correctAnswers}/{result.totalQuestions}
                    </div>
                  </div>
                </div>

                {result.streak > 1 && (
                  <Badge className="text-lg py-2 px-4">
                    🔥 {result.streak} question streak!
                  </Badge>
                )}

                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/lessons')}>Browse Lessons</Button>
                  <Button variant="outline" onClick={() => navigate('/leaderboard')}>
                    View Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <Badge variant="secondary">{quiz.difficulty}</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{question.question_text}</CardTitle>
              {question.points && (
                <CardDescription>{question.points} points</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {question.question_type === 'multiple_choice' && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {question.options?.map((option: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.question_type === 'true_false' && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true" className="flex-1 cursor-pointer">
                      True
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false" className="flex-1 cursor-pointer">
                      False
                    </Label>
                  </div>
                </RadioGroup>
              )}

              <div className="flex justify-end gap-4 pt-4">
                {currentQuestion > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer || submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : currentQuestion === quiz.questions.length - 1 ? (
                    'Submit Quiz'
                  ) : (
                    'Next Question'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
