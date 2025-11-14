import { useState } from 'react'

export default function QuizRunner() {
  const [selected, setSelected] = useState<string | null>(null)
  const question = {
    prompt: 'Which era features precolonial kingdoms?',
    options: ['Precolonial', 'Colonial', 'Independence', 'Post1994']
  }
  return (
    <div className="p-6 rounded-2xl border bg-white">
      <div className="font-semibold">{question.prompt}</div>
      <div className="mt-4 grid gap-3">
        {question.options.map(o => (
          <button key={o} onClick={() => setSelected(o)} className={`w-full px-4 py-3 rounded-xl border ${selected === o ? 'border-primary' : ''}`}>{o}</button>
        ))}
      </div>
    </div>
  )
}
