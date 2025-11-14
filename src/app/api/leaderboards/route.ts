export async function GET() {
  return Response.json({ leaders: [{ name: 'Aline', points: 120 }] })
}
