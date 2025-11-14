export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} INGANZO</span>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
