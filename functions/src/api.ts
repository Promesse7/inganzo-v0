import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'

if (!admin.apps.length) admin.initializeApp()

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

// Auth
export async function validateSession(data: { token: string }, context: functions.https.CallableContext) {
  try {
    const decodedToken = await auth.verifyIdToken(data.token)
    const userDoc = await db.collection('users').doc(decodedToken.uid).get()
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      profile: userDoc.exists ? userDoc.data() : null
    }
  } catch (error) {
    throw new functions.https.HttpsError('unauthenticated', 'Invalid token')
  }
}

// Lessons
export async function listLessons(data: { era?: string; tag?: string; q?: string; page?: number }, context: functions.https.CallableContext) {
  let query = db.collection('lessons').where('published', '==', true)
  if (data.era) query = query.where('era', '==', data.era) as any
  const snapshot = await query.get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getLesson(data: { id: string }, context: functions.https.CallableContext) {
  const doc = await db.collection('lessons').doc(data.id).get()
  if (!doc.exists) throw new functions.https.HttpsError('not-found', 'Lesson not found')
  return { id: doc.id, ...doc.data() }
}

export async function getLessonQuiz(data: { lessonId: string }, context: functions.https.CallableContext) {
  const lessonDoc = await db.collection('lessons').doc(data.lessonId).get()
  if (!lessonDoc.exists) throw new functions.https.HttpsError('not-found', 'Lesson not found')
  const lesson = lessonDoc.data()
  if (!lesson?.quizId) throw new functions.https.HttpsError('not-found', 'Quiz not found for lesson')
  const quizDoc = await db.collection('quizzes').doc(lesson.quizId).get()
  if (!quizDoc.exists) throw new functions.https.HttpsError('not-found', 'Quiz not found')
  return { id: quizDoc.id, ...quizDoc.data() }
}

// Quizzes
export async function submitQuizAttempt(data: { quizId: string; userId: string; answers: any[]; timestamps: number[] }, context: functions.https.CallableContext) {
  // Verify user
  const userId = context.auth?.uid || data.userId
  if (!userId) throw new functions.https.HttpsError('unauthenticated', 'User not authenticated')
  
  // Get quiz
  const quizDoc = await db.collection('quizzes').doc(data.quizId).get()
  if (!quizDoc.exists) throw new functions.https.HttpsError('not-found', 'Quiz not found')
  const quiz = quizDoc.data()
  
  // Compute score (authoritative server-side)
  let totalPoints = 0
  let correctCount = 0
  let streak = 0
  const maxStreak = 0
  
  data.answers.forEach((answer, idx) => {
    const question = quiz?.questions?.[idx]
    if (!question) return
    
    const isCorrect = answer === question.correct
    if (isCorrect) {
      correctCount++
      streak++
    } else {
      streak = 0
    }
    
    // Base points
    let points = isCorrect ? 10 : 0
    
    // Speed bonus
    const timeTaken = data.timestamps[idx] - (idx > 0 ? data.timestamps[idx - 1] : data.timestamps[0])
    if (isCorrect) {
      if (timeTaken < 10000) points += 5
      else if (timeTaken < 30000) points += 2
    }
    
    // Streak multiplier
    const multiplier = Math.min(1 + 0.1 * (streak - 1), 2.0)
    points = Math.round(points * multiplier)
    
    totalPoints += points
  })
  
  const score = Math.round((correctCount / (quiz?.questions?.length || 1)) * 100)
  
  // Save game session
  const sessionRef = db.collection('gameSessions').doc()
  await sessionRef.set({
    userId,
    quizId: data.quizId,
    score,
    pointsAwarded: totalPoints,
    answers: data.answers,
    createdAt: new Date(),
    synced: true
  })
  
  // Update user points
  const userRef = db.collection('users').doc(userId)
  await userRef.set({
    points: admin.firestore.FieldValue.increment(totalPoints)
  }, { merge: true })
  
  return {
    score,
    pointsAwarded: totalPoints,
    badgesUnlocked: [] // TODO: evaluate badges
  }
}

// Uploads
export async function initUpload(data: { type: string; filename: string }, context: functions.https.CallableContext) {
  const userId = context.auth?.uid
  if (!userId) throw new functions.https.HttpsError('unauthenticated', 'User not authenticated')
  
  const uploadId = db.collection('uploads').doc().id
  const path = `uploads/testimonies/${uploadId}/${data.filename}`
  const bucket = storage.bucket()
  const file = bucket.file(path)
  
  const [signedUrl] = await file.getSignedUrl({
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: data.type === 'video' ? 'video/*' : data.type === 'audio' ? 'audio/*' : 'text/plain'
  })
  
  return { uploadId, signedUrl }
}

export async function submitUploadMetadata(data: { uploadId: string; metadata: any }, context: functions.https.CallableContext) {
  const userId = context.auth?.uid
  if (!userId) throw new functions.https.HttpsError('unauthenticated', 'User not authenticated')
  
  await db.collection('uploads').doc(data.uploadId).set({
    uploaderId: userId,
    ...data.metadata,
    status: 'pending',
    createdAt: new Date()
  })
  
  return { success: true }
}

// Moderation
export async function getModerationQueue(data: any, context: functions.https.CallableContext) {
  const userId = context.auth?.uid
  if (!userId) throw new functions.https.HttpsError('unauthenticated', 'User not authenticated')
  
  // TODO: Check if user is moderator
  const snapshot = await db.collection('uploads').where('status', '==', 'pending').get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function reviewUpload(data: { uploadId: string; action: 'approve' | 'reject' }, context: functions.https.CallableContext) {
  const userId = context.auth?.uid
  if (!userId) throw new functions.https.HttpsError('unauthenticated', 'User not authenticated')
  
  // TODO: Check if user is moderator
  await db.collection('uploads').doc(data.uploadId).update({
    status: data.action === 'approve' ? 'approved' : 'rejected',
    reviewedBy: userId,
    reviewedAt: new Date()
  })
  
  return { success: true }
}

// Users
export async function getUserProfile(data: { id: string }, context: functions.https.CallableContext) {
  const userId = data.id || context.auth?.uid
  if (!userId) throw new functions.https.HttpsError('unauthenticated', 'User not authenticated')
  
  const userDoc = await db.collection('users').doc(userId).get()
  if (!userDoc.exists) throw new functions.https.HttpsError('not-found', 'User not found')
  
  // Get stats
  const sessionsSnapshot = await db.collection('gameSessions').where('userId', '==', userId).get()
  const quizzesCompleted = sessionsSnapshot.size
  const totalPoints = sessionsSnapshot.docs.reduce((sum, d) => sum + (d.data().pointsAwarded || 0), 0)
  
  return {
    ...userDoc.data(),
    stats: {
      points: totalPoints,
      quizzesCompleted
    }
  }
}

// Leaderboards
export async function getLeaderboard(data: { category?: string; limit?: number }, context: functions.https.CallableContext) {
  const limitNum = data.limit || 10
  const snapshot = await db.collection('users')
    .orderBy('points', 'desc')
    .limit(limitNum)
    .get()
  
  return snapshot.docs.map((d, idx) => ({
    rank: idx + 1,
    userId: d.id,
    name: d.data().name || 'Anonymous',
    points: d.data().points || 0
  }))
}

