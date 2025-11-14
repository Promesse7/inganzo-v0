export default function UploadPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">Submit Testimony</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select className="mt-1 w-full rounded-xl border p-2">
            <option>Text</option>
            <option>Audio</option>
            <option>Video</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input className="mt-1 w-full rounded-xl border p-2" placeholder="Title" />
        </div>
        <div>
          <label className="block text-sm font-medium">Era</label>
          <select className="mt-1 w-full rounded-xl border p-2">
            {['Precolonial','Colonial','Independence','1994','Post1994'].map(e => <option key={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Tags</label>
          <input className="mt-1 w-full rounded-xl border p-2" placeholder="Comma separated" />
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white">Request Upload URL</button>
      </form>
    </section>
  )
}
