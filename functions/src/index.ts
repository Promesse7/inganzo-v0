import * as functions from 'firebase-functions'
import { onUploadCreated } from './ingestion'
import { onUploadApproved } from './moderation'
import { onQuizAttempt, dailyChallengeJob } from './gamification'
import { 
  validateSession, 
  listLessons, 
  getLesson, 
  getLessonQuiz, 
  submitQuizAttempt, 
  initUpload, 
  submitUploadMetadata, 
  getModerationQueue,
  reviewUpload,
  getUserProfile, 
  getLeaderboard 
} from './api'

// Background triggers
export const uploadCreated = functions.firestore.document('uploads/{id}').onCreate(onUploadCreated)
export const uploadApproved = functions.firestore.document('uploads/{id}').onUpdate(onUploadApproved)
export const weeklyChallenges = functions.pubsub.schedule('every 24 hours').onRun(dailyChallengeJob)

// Callable functions (API endpoints)
export const validateSessionFn = functions.https.onCall(validateSession)
export const listLessonsFn = functions.https.onCall(listLessons)
export const getLessonFn = functions.https.onCall(getLesson)
export const getLessonQuizFn = functions.https.onCall(getLessonQuiz)
export const submitQuizAttemptFn = functions.https.onCall(submitQuizAttempt)
export const initUploadFn = functions.https.onCall(initUpload)
export const submitUploadMetadataFn = functions.https.onCall(submitUploadMetadata)
export const getModerationQueueFn = functions.https.onCall(getModerationQueue)
export const reviewUploadFn = functions.https.onCall(reviewUpload)
export const getUserProfileFn = functions.https.onCall(getUserProfile)
export const getLeaderboardFn = functions.https.onCall(getLeaderboard)

// Legacy quiz attempt (kept for backward compatibility)
export const quizAttempt = functions.https.onCall(onQuizAttempt)
