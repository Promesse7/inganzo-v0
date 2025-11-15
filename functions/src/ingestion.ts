import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

if (!admin.apps.length) admin.initializeApp()

const db = getFirestore()
const storage = getStorage()

export async function onUploadCreated(snap: admin.firestore.DocumentSnapshot) {
  const data = snap.data()
  if (!data) return
  
  const storagePath = data.storagePath
  if (!storagePath) return
  
  try {
    // Download file from Storage
    const bucket = storage.bucket()
    const file = bucket.file(storagePath)
    const [fileBuffer] = await file.download()
    
    // TODO: Run STT (Speech-to-Text)
    // Options:
    // 1. Use OpenAI Whisper API
    // 2. Use Google Cloud Speech-to-Text
    // 3. Use Firebase Extensions for STT
    const transcript = '' // Placeholder - implement STT here
    
    // TODO: Run content-safety checks
    // Options:
    // 1. Use Google Cloud Content Moderation
    // 2. Use OpenAI Moderation API
    // 3. Custom keyword filtering
    const flags: string[] = []
    
    // Update upload document
    await snap.ref.update({
      transcript,
      flags,
      status: flags.length > 0 ? 'flagged' : 'pending',
      processedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    
    // Publish upload.processed event (if using Pub/Sub)
    // TODO: Implement Pub/Sub publishing if needed
    
  } catch (error) {
    console.error('Error processing upload:', error)
    await snap.ref.update({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
