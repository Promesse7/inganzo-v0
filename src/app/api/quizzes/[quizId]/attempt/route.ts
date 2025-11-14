export async function POST(req: Request, { params }: { params: { quizId: string } }) {
  const body = await req.json()
  return Response.json({ score: 10, pointsAwarded: 10, badgesUnlocked: [] })
}
