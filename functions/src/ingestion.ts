import * as admin from 'firebase-admin'
if (!admin.apps.length) admin.initializeApp()

export async function onUploadCreated(snap: admin.firestore.DocumentSnapshot) {
  const data = snap.data() as any
  const flags = [] as string[]
  await snap.ref.update({ flags, status: 'pending' })
}
