export default function NavBar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="font-semibold">INGANZO</span>
        </div>
        <nav className="hidden sm:flex gap-6 text-sm">
          <a href="/lessons" className="hover:text-primary">Lessons</a>
          <a href="/profile" className="hover:text-primary">Profile</a>
          <a href="/upload" className="hover:text-primary">Upload</a>
        </nav>
        <a href="/profile" className="sm:hidden text-sm">Profile</a>
      </div>
    </header>
  )
}
