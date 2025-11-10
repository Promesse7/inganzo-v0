import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/v2/https";

type AttemptPayload = {
  userId: string;
  quizId: string;
  answers: { id: string; given: string; correct: boolean; ms: number; points: number }[];
  timestamps?: { startedAt?: number; finishedAt?: number };
};

const calcPoints = (answers: AttemptPayload["answers"]) => {
  return answers.reduce((s, a) => s + Math.round(a.points || 0), 0);
};

export async function onQuizAttempt(req: any): Promise<{ score: number; pointsAwarded: number; badgesUnlocked: string[] }> {
  const data = req.data as AttemptPayload;
  if (!data?.userId || !data?.quizId || !Array.isArray(data?.answers)) {
    throw new HttpsError("invalid-argument", "Missing fields");
  }
  const points = calcPoints(data.answers);
  const sessionRef = admin.firestore().collection("gameSessions").doc();
  await sessionRef.set({
    userId: data.userId,
    quizId: data.quizId,
    score: points,
    pointsAwarded: points,
    answers: data.answers,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    synced: true,
  });
  await admin.firestore().doc(`users/${data.userId}`).set(
    { points: admin.firestore.FieldValue.increment(points) },
    { merge: true }
  );
  return { score: points, pointsAwarded: points, badgesUnlocked: [] };
}

export async function dailyChallengeJob() {
  await admin.firestore().collection("leaderboards").doc("weekly").set(
    {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return null;
}


