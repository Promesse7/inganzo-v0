export default function LessonsPage() {
  const lessons = [
    { id: 'l1', title: 'Precolonial Societies', era: 'Precolonial', duration: '8 min', difficulty: 'Beginner', points: 30 },
    { id: 'l2', title: 'Colonial Administration', era: 'Colonial', duration: '12 min', difficulty: 'Intermediate', points: 45 }
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Lessons</h1>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lessons.map(l => (
          <a key={l.id} href={`/lessons/${l.id}`} className="p-4 rounded-xl border bg-white hover:border-primary">
            <div className="text-sm text-gray-500">{l.era}</div>
            <div className="mt-1 font-semibold">{l.title}</div>
            <div className="mt-2 text-sm text-gray-600">{l.duration} • {l.difficulty} • +{l.points} pts</div>
          </a>
        ))}
      </div>
    </section>
  )
}
