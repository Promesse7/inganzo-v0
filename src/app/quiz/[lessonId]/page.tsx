type Props = { params: { lessonId: string } }

export default function QuizRunnerPage({ params }: Props) {
  const { lessonId } = params
  const question = {
    prompt: 'Which era features precolonial kingdoms?',
    options: ['Precolonial', 'Colonial', 'Independence', 'Post1994']
  }
  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <div className="p-6 rounded-2xl border bg-white">
        <div className="text-sm text-gray-500">Quiz for lesson {lessonId}</div>
        <div className="mt-2 font-semibold">{question.prompt}</div>
        <div className="mt-4 grid gap-3">
          {question.options.map(o => (
            <button key={o} className="w-full px-4 py-3 rounded-xl border hover:border-primary">
              {o}
            </button>
          ))}
        </div>
        <div className="mt-6 h-2 rounded bg-amber/20">
          <div className="h-full w-1/3 rounded bg-primary" />
        </div>
      </div>
    </section>
  )
}
