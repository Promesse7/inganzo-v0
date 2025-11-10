import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { onUploadCreated } from "./ingestion";
import { onUploadApproved } from "./moderation";
import { onQuizAttempt, dailyChallengeJob } from "./gamification";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const uploadCreated = functions.firestore
  .document("uploads/{uploadId}")
  .onCreate((snap, context) => onUploadCreated(snap, context));

export const uploadApproved = functions.firestore
  .document("uploads/{uploadId}")
  .onUpdate((change, context) => onUploadApproved(change, context));

export const quizAttempt = functions.https.onCall(onQuizAttempt);

export const weeklyChallenge = functions.pubsub
  .schedule("every monday 09:00")
  .timeZone("Africa/Kigali")
  .onRun(dailyChallengeJob);


