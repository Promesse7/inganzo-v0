export default function BadgeList({ badges = [] as string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.length === 0 ? <span className="text-sm text-gray-500">No badges yet</span> : badges.map(b => (
        <span key={b} className="px-2 py-1 rounded-full bg-amber/20 border text-xs">{b}</span>
      ))}
    </div>
  )
}
