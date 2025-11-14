export async function getJson(path: string) {
  const res = await fetch(path, { cache: 'no-store' })
  return res.json()
}

export async function postJson(path: string, body: unknown) {
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  return res.json()
}
