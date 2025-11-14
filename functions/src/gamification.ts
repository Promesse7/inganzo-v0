import * as admin from 'firebase-admin'
if (!admin.apps.length) admin.initializeApp()

export async function onQuizAttempt(data: any, context: any) {
  const score = 10
  return { score, pointsAwarded: 10, badgesUnlocked: [] }
}

export async function dailyChallengeJob() {
  return null
}
