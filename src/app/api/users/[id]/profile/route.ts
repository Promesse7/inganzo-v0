export async function GET(_: Request, { params }: { params: { id: string } }) {
  return Response.json({ id: params.id, points: 0, badges: [] })
}
