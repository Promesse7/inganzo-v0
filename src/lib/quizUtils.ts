// Quiz scoring and gamification utilities

export type QuizAnswer = {
  questionId: string;
  answer: any;
  isCorrect: boolean;
  timeTaken: number; // milliseconds
  timestamp: number;
};

export type QuizSession = {
  userId: string;
  quizId: string;
  answers: QuizAnswer[];
  streak: number;
  maxStreak: number;
  heartsLost: number;
  totalXP: number;
  startTime: number;
  endTime?: number;
};

// Calculate XP for a single answer
export function calculateAnswerXP(
  isCorrect: boolean,
  timeTaken: number,
  streak: number
): number {
  if (!isCorrect) return 0;

  let xp = 10; // Base XP

  // Speed bonus
  if (timeTaken < 10000) {
    xp += 5; // < 10 seconds
  } else if (timeTaken < 30000) {
    xp += 2; // < 30 seconds
  }

  // Streak bonus
  if (streak > 1) {
    xp += Math.min(Math.floor(streak / 2) * 2, 10); // +2 per streak, max +10
  }

  return xp;
}

// Calculate total XP for a quiz session
export function calculateTotalXP(session: QuizSession): number {
  let totalXP = 0;
  let currentStreak = 0;

  session.answers.forEach((answer, index) => {
    if (answer.isCorrect) {
      currentStreak++;
      totalXP += calculateAnswerXP(true, answer.timeTaken, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  // Perfect run multiplier
  const perfectRun = session.answers.every(a => a.isCorrect);
  if (perfectRun && session.answers.length >= 5) {
    totalXP = Math.floor(totalXP * 1.5); // 50% bonus
  }

  return totalXP;
}

// Evaluate badges earned
export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold';
};

export function evaluateBadges(session: QuizSession): Badge[] {
  const badges: Badge[] = [];

  // Perfect score badge
  const perfectScore = session.answers.every(a => a.isCorrect);
  if (perfectScore) {
    badges.push({
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Got all questions correct!',
      icon: '⭐',
      rarity: 'gold'
    });
  }

  // Streak badge
  if (session.maxStreak >= 10) {
    badges.push({
      id: 'streak-master',
      name: 'Streak Master',
      description: `Achieved a ${session.maxStreak} question streak!`,
      icon: '🔥',
      rarity: 'gold'
    });
  } else if (session.maxStreak >= 5) {
    badges.push({
      id: 'streak-hero',
      name: 'Streak Hero',
      description: `Achieved a ${session.maxStreak} question streak!`,
      icon: '🔥',
      rarity: 'silver'
    });
  }

  // Speed badge
  const avgTime = session.answers.reduce((sum, a) => sum + a.timeTaken, 0) / session.answers.length;
  if (avgTime < 5000 && session.answers.length >= 5) {
    badges.push({
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Answered questions in under 5 seconds on average!',
      icon: '⚡',
      rarity: 'gold'
    });
  }

  // Survivor badge (completed with low hearts)
  if (session.heartsLost >= 3 && session.answers.some(a => a.isCorrect)) {
    badges.push({
      id: 'survivor',
      name: 'Survivor',
      description: 'Completed quiz with only 1-2 hearts remaining!',
      icon: '💪',
      rarity: 'silver'
    });
  }

  return badges;
}

// Calculate level from total XP
export function calculateLevel(totalXP: number): { level: number; currentLevelXP: number; nextLevelXP: number } {
  const baseXP = 100;
  let level = 1;
  let xpForCurrentLevel = totalXP;

  while (xpForCurrentLevel >= baseXP * level) {
    xpForCurrentLevel -= baseXP * level;
    level++;
  }

  const nextLevelXP = baseXP * level;

  return {
    level,
    currentLevelXP: xpForCurrentLevel,
    nextLevelXP
  };
}

