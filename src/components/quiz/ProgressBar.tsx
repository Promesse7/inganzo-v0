export default function ProgressBar({ value = 0 }: { value?: number }) {
  return (
    <div className="h-2 rounded bg-amber/20">
      <div className="h-full rounded bg-primary" style={{ width: `${value}%` }} />
    </div>
  )
}
