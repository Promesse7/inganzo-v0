import '../styles/globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'INGANZO',
  description: 'Learn Rwanda’s history with lessons, quizzes, and testimonies',
  themeColor: '#0b6b45',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="font-semibold">INGANZO</span>
            </div>
            <nav className="hidden sm:flex gap-6 text-sm">
              <Link href="/lessons" className="hover:text-primary">Lessons</Link>
              <Link href="/profile" className="hover:text-primary">Profile</Link>
              <Link href="/upload" className="hover:text-primary">Upload</Link>
            </nav>
            <Link href="/profile" className="sm:hidden text-sm">Profile</Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <nav className="fixed bottom-0 inset-x-0 z-30 border-t bg-white sm:hidden">
          <div className="mx-auto max-w-sm px-4 py-2 grid grid-cols-3 text-sm">
            <Link href="/" className="text-center py-2">Home</Link>
            <Link href="/lessons" className="text-center py-2">Lessons</Link>
            <Link href="/profile" className="text-center py-2">Profile</Link>
          </div>
        </nav>
        <footer className="hidden sm:block border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            <div className="flex items-center justify-between">
              <span>© {new Date().getFullYear()} INGANZO</span>
              <div className="flex gap-4">
                <Link href="#">Privacy</Link>
                <Link href="#">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
