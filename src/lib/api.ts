import { httpsCallable } from 'firebase/functions'
import { functions } from './firebaseClient'
import { db } from './firebaseClient'
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore'

// Firebase Callable Functions
export const api = {
  // Auth
  validateSession: httpsCallable(functions, 'validateSession'),
  
  // Lessons
  listLessons: httpsCallable(functions, 'listLessons'),
  getLesson: httpsCallable(functions, 'getLesson'),
  getLessonQuiz: httpsCallable(functions, 'getLessonQuiz'),
  
  // Quizzes
  submitQuizAttempt: httpsCallable(functions, 'submitQuizAttempt'),
  
  // Uploads
  initUpload: httpsCallable(functions, 'initUpload'),
  submitUploadMetadata: httpsCallable(functions, 'submitUploadMetadata'),
  
  // Moderation
  getModerationQueue: httpsCallable(functions, 'getModerationQueue'),
  reviewUpload: httpsCallable(functions, 'reviewUpload'),
  
  // Users
  getUserProfile: httpsCallable(functions, 'getUserProfile'),
  
  // Leaderboards
  getLeaderboard: httpsCallable(functions, 'getLeaderboard'),
}

// Direct Firestore queries (for client-side caching)
export const firestoreApi = {
  async getLesson(id: string) {
    const docRef = doc(db, 'lessons', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) throw new Error('Lesson not found')
    return { id: docSnap.id, ...docSnap.data() }
  },
  
  async listLessons(filters?: { era?: string; tag?: string; q?: string; page?: number }) {
    let q = query(collection(db, 'lessons'), where('published', '==', true))
    if (filters?.era) q = query(q, where('era', '==', filters.era))
    if (filters?.tag) q = query(q, where('tags', 'array-contains', filters.tag))
    q = query(q, orderBy('createdAt', 'desc'), limit(20))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  },
  
  async getQuiz(quizId: string) {
    const docRef = doc(db, 'quizzes', quizId)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) throw new Error('Quiz not found')
    return { id: docSnap.id, ...docSnap.data() }
  },
}

// Legacy fetch helpers (for non-Firebase endpoints if needed)
export async function getJson(path: string) {
  const res = await fetch(path, { cache: 'no-store' })
  return res.json()
}

export async function postJson(path: string, body: unknown) {
  const res = await fetch(path, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify(body) 
  })
  return res.json()
}
