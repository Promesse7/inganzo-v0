export const lessons = [
  { id: 'l1', title: 'Precolonial Societies', era: 'Precolonial', summary: 'Overview of precolonial life', mediaRefs: [], transcriptRef: '', quizId: 'q1', tags: ['people','events'], published: true },
  { id: 'l2', title: 'Colonial Administration', era: 'Colonial', summary: 'Colonial period changes', mediaRefs: [], transcriptRef: '', quizId: 'q2', tags: ['policy'], published: true }
]

export const quizzes = {
  q1: {
    lessonId: 'l1',
    questions: [
      { id: 'q1-1', type: 'mcq', prompt: 'Primary era for kingdoms?', options: ['Precolonial','Colonial'], correct: 'Precolonial', points: 10 }
    ]
  }
}
