import * as admin from "firebase-admin";
import { Change, EventContext, QueryDocumentSnapshot } from "firebase-functions/v1";

export async function onUploadCreated(snap: QueryDocumentSnapshot, _context: EventContext) {
  const data = snap.data();
  // Placeholder: simulate STT + safety flags
  const flags: string[] = [];
  await snap.ref.update({ flags, status: "pending" });
}


