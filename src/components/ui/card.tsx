import { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
  return <div className="p-4 rounded-xl border bg-white">{children}</div>
}
