export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border bg-white">
          <div className="h-20 w-20 rounded-full bg-gray-200" />
          <div className="mt-3 font-semibold">Guest User</div>
          <div className="text-sm text-gray-600">Login to sync your progress.</div>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <div className="font-semibold">Stats</div>
          <div className="mt-2 text-sm text-gray-600">Points, quizzes completed, badges will appear here.</div>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <div className="font-semibold">Actions</div>
          <div className="mt-2 text-sm text-gray-600">Copy profile link or logout.</div>
        </div>
      </div>
    </section>
  )
}
