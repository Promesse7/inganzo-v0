import * as functions from 'firebase-functions'
import { onUploadCreated } from './ingestion'
import { onUploadApproved } from './moderation'
import { onQuizAttempt, dailyChallengeJob } from './gamification'

export const uploadCreated = functions.firestore.document('uploads/{id}').onCreate(onUploadCreated)
export const uploadApproved = functions.firestore.document('uploads/{id}').onUpdate(onUploadApproved)
export const quizAttempt = functions.https.onCall(onQuizAttempt)
export const weeklyChallenges = functions.pubsub.schedule('every 24 hours').onRun(dailyChallengeJob)
