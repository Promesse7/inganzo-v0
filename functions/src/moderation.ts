import * as admin from "firebase-admin";
import { Change, EventContext } from "firebase-functions";

export async function onUploadApproved(change: Change<FirebaseFirestore.DocumentSnapshot>, _context: EventContext) {
  const before = change.before.data();
  const after = change.after.data();
  if (!before || !after) return;
  if (before.status !== "approved" && after.status === "approved") {
    // Award contributor points, index content (mock)
    const uploaderId = after.uploaderId as string | undefined;
    if (uploaderId) {
      await admin.firestore().doc(`users/${uploaderId}`).set(
        { points: admin.firestore.FieldValue.increment(20) },
        { merge: true }
      );
    }
  }
}


