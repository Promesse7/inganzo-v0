export default function UploadForm() {
  return (
    <form className="space-y-4">
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
      <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white">Submit</button>
    </form>
  )
}
