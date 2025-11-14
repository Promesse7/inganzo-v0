import { ReactNode } from 'react'

export default function Modal({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4 p-4 rounded-xl bg-white">{children}</div>
    </div>
  )
}
