export async function POST() {
  return Response.json({ uploadId: 'u1', signedUrl: 'https://example.com/upload' })
}
