export type Quiz = {
  id: string;
  lessonId: string;
  questions: Array<
    | { id: string; type: "mcq"; prompt: string; options: string[]; correct: string }
    | { id: string; type: "fill"; prompt: string; answer: string }
  >;
};

export const lessons = [
  { id: "lesson_1", title: "Precolonial Societies", era: "Precolonial", summary: "Life and organization before colonial era.", points: 20, durationMin: 8, difficulty: "easy" as const },
  { id: "lesson_2", title: "Colonial Impacts", era: "Colonial", summary: "Changes introduced during colonization.", points: 30, durationMin: 12, difficulty: "medium" as const },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz_1",
    lessonId: "lesson_1",
    questions: [
      { id: "q1", type: "mcq", prompt: "What era is this lesson about?", options: ["Precolonial", "Colonial", "Post1994"], correct: "Precolonial" },
      { id: "q2", type: "fill", prompt: "Name one social structure.", answer: "clan" },
    ],
  },
];

export function getQuizByLessonId(lessonId: string) {
  return quizzes.find((q) => q.lessonId === lessonId);
}


