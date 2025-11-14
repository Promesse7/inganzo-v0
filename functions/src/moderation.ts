import * as admin from 'firebase-admin'
if (!admin.apps.length) admin.initializeApp()

export async function onUploadApproved(change: admin.firestore.DocumentSnapshot) {
  const before = change.ref
  const after = change.ref
  return { before, after }
}
