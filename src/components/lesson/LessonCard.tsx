type Lesson = { id: string; title: string; era: string; duration: string; difficulty: string; points: number }

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <a href={`/lessons/${lesson.id}`} className="p-4 rounded-xl border bg-white hover:border-primary">
      <div className="text-sm text-gray-500">{lesson.era}</div>
      <div className="mt-1 font-semibold">{lesson.title}</div>
      <div className="mt-2 text-sm text-gray-600">{lesson.duration} • {lesson.difficulty} • +{lesson.points} pts</div>
    </a>
  )
}
