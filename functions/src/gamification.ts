import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

if (!admin.apps.length) admin.initializeApp()

const db = getFirestore()

export async function onQuizAttempt(data: any, context: any) {
  // This is a legacy function - use submitQuizAttempt from api.ts instead
  const score = 10
  return { score, pointsAwarded: 10, badgesUnlocked: [] }
}

export async function dailyChallengeJob() {
  // Create weekly challenges and publish to daily.challenge.published
  // TODO: Implement challenge creation logic
  console.log('Daily challenge job running')
  return null
}
