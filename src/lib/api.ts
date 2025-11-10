// Stubbed client API wrappers. For Vite SPA, these should call Firebase Functions or REST when available.

export async function postQuizAttempt(quizId: string, body: any): Promise<{ score: number; pointsAwarded: number; badgesUnlocked: string[] }> {
	// TODO: Replace with Firebase Callable Function or HTTPS endpoint.
	// Simulate server authoritative scoring acceptance.
	return Promise.resolve({ score: body.answers?.reduce((s: number, a: any) => s + (a.points || 0), 0) || 0, pointsAwarded: body.answers?.reduce((s: number, a: any) => s + (a.points || 0), 0) || 0, badgesUnlocked: [] });
}

export async function initUpload(): Promise<{ uploadId: string; signedUrl?: string }> {
	// TODO: Replace with backend signed URL. For now, return a mock id.
	return Promise.resolve({ uploadId: `upl_${Date.now()}`, signedUrl: undefined });
}

export async function submitUploadMetadata(uploadId: string, metadata: { title: string; era?: string; tags?: string[]; type: string }) {
	// TODO: Replace with call to backend to write firestore doc and enqueue ingestion.
	return Promise.resolve({ ok: true, uploadId, metadata });
}


