import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

if (!admin.apps.length) admin.initializeApp()

const db = getFirestore()

export async function onUploadCreated(snap: admin.firestore.DocumentSnapshot) {
  const data = snap.data()
  if (!data) return
  
  // TODO: Download file from Storage, run STT (Whisper/Cloud STT), generate transcript
  // TODO: Run content-safety checks, auto-flag if issues
  const flags: string[] = []
  
  await snap.ref.update({ 
    flags, 
    status: 'pending',
    processedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  
  // Publish upload.processed event (if using Pub/Sub)
  // TODO: Implement event publishing
}

export async function onUploadApproved(change: admin.firestore.Change<admin.firestore.DocumentSnapshot>) {
  const before = change.before.data()
  const after = change.after.data()
  
  // Only process if status changed to approved
  if (before?.status !== 'approved' && after?.status === 'approved') {
    const uploaderId = after.uploaderId
    
    // Award contributor points
    if (uploaderId) {
      const userRef = db.collection('users').doc(uploaderId)
      await userRef.set({
        points: admin.firestore.FieldValue.increment(50) // Award 50 points for contribution
      }, { merge: true })
    }
    
    // TODO: Index content into search (Algolia/Meilisearch)
    // TODO: Publish upload.approved event
  }
  
  return null
}

export async function getModerationQueue(data: any, context: any) {
  // Moved to api.ts
  return []
}

export async function reviewUpload(data: any, context: any) {
  // Moved to api.ts
  return { success: true }
}
