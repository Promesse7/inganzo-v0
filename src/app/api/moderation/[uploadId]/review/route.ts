export async function POST(req: Request, { params }: { params: { uploadId: string } }) {
  const body = await req.json()
  return Response.json({ status: 'approved', id: params.uploadId })
}
