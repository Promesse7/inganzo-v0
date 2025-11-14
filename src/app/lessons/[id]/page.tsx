import Link from 'next/link'
type Props = { params: { id: string } }

export default function LessonDetailPage({ params }: Props) {
  const { id } = params
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">Lesson {id}</h1>
          <div className="mt-4 space-y-4">
            <div className="aspect-video rounded-xl bg-amber/20 border" />
            <article className="prose max-w-none">
              <p>Lesson content placeholder. Article text, embedded media, and transcript will appear here.</p>
            </article>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="p-4 rounded-xl border bg-white">
            <div className="font-semibold">Ready to test your knowledge?</div>
            <Link href={`/quiz/${id}`} className="mt-3 inline-block px-4 py-2 rounded-xl bg-primary text-white">Take Quiz</Link>
          </div>
          <div className="p-4 rounded-xl border bg-white">
            <div className="font-semibold">Progress</div>
            <div className="text-sm text-gray-600">Signed-in users will see progress here.</div>
          </div>
        </aside>
      </div>
    </section>
  )
}
