export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Learn Rwanda’s History</h1>
          <p className="mt-4 text-gray-600">Explore eras, take interactive quizzes, and share testimonies.</p>
          <div className="mt-6 flex gap-3">
            <a href="/lessons" className="px-5 py-3 rounded-2xl bg-primary text-white">Start Learning</a>
            <a href="/upload" className="px-5 py-3 rounded-2xl border">Submit Testimony</a>
          </div>
        </div>
        <div className="h-56 md:h-72 rounded-3xl bg-amber/20 border" />
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Featured Eras</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Precolonial","Colonial","Independence"].map((era) => (
            <div key={era} className="p-4 rounded-xl border bg-white">
              <div className="h-24 rounded-lg bg-amber/10" />
              <div className="mt-3 font-medium">{era}</div>
              <div className="text-sm text-gray-600">Discover lessons from the {era} era.</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
