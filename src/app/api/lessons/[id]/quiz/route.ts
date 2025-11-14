export async function GET(_: Request, { params }: { params: { id: string } }) {
  return Response.json({ quizId: 'q-' + params.id })
}
