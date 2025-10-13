import { supabase, Database } from '@/lib/supabase';

type Quiz = Database['public']['Tables']['quizzes']['Row'];
type Question = Database['public']['Tables']['questions']['Row'];
type GameSession = Database['public']['Tables']['game_sessions']['Row'];

interface QuizAttempt {
  userId: string;
  answers: Array<{
    questionId: string;
    answer: string;
    timeMs: number;
  }>;
}

interface QuizResult {
  score: number;
  pointsAwarded: number;
  streak: number;
  badgesUnlocked: string[];
  correctAnswers: number;
  totalQuestions: number;
}

export const quizzesService = {
  async getByLessonId(lessonId: string) {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (quizError) throw quizError;
    if (!quiz) return null;

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', quiz.id)
      .order('order_index', { ascending: true });

    if (questionsError) throw questionsError;

    return { ...quiz, questions };
  },

  async submitAttempt(quizId: string, attempt: QuizAttempt): Promise<QuizResult> {
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId);

    if (error) throw error;

    let totalPoints = 0;
    let correctAnswers = 0;
    let currentStreak = 0;
    let maxStreak = 0;

    const scoredAnswers = attempt.answers.map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) return { ...answer, correct: false, points: 0 };

      const isCorrect = answer.answer.toLowerCase().trim() === question.correct_answer.toLowerCase().trim();

      let points = 0;
      if (isCorrect) {
        correctAnswers++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);

        const basePoints = question.points || 10;
        let speedBonus = 0;

        if (answer.timeMs < 10000) {
          speedBonus = 5;
        } else if (answer.timeMs < 30000) {
          speedBonus = 2;
        }

        const streakMultiplier = Math.min(1 + 0.1 * (currentStreak - 1), 2.0);
        points = Math.round((basePoints + speedBonus) * streakMultiplier);
        totalPoints += points;
      } else {
        currentStreak = 0;
      }

      return {
        ...answer,
        correct: isCorrect,
        points,
      };
    });

    const score = Math.round((correctAnswers / questions.length) * 100);

    const { error: sessionError } = await supabase
      .from('game_sessions')
      .insert({
        user_id: attempt.userId,
        quiz_id: quizId,
        score,
        total_points: totalPoints,
        duration_seconds: Math.round(
          attempt.answers.reduce((sum, a) => sum + a.timeMs, 0) / 1000
        ),
        answers: scoredAnswers,
        streak_count: maxStreak,
        completed_at: new Date().toISOString(),
      });

    if (sessionError) throw sessionError;

    const { error: updateError } = await supabase.rpc('increment_user_points', {
      user_id: attempt.userId,
      points_to_add: totalPoints,
    });

    if (updateError) {
      await supabase
        .from('users')
        .update({
          points: supabase.raw(`points + ${totalPoints}`)
        })
        .eq('id', attempt.userId);
    }

    return {
      score,
      pointsAwarded: totalPoints,
      streak: maxStreak,
      badgesUnlocked: [],
      correctAnswers,
      totalQuestions: questions.length,
    };
  },

  async getUserSessions(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('game_sessions')
      .select('*, quizzes(title, lesson_id, lessons(title, slug))')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },
};
