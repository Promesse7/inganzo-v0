type Props = { level?: 'beginner' | 'intermediate' | 'expert' }

export default function AvatarWithBadge({ level = 'beginner' }: Props) {
  const ring = level === 'beginner' ? 'ring-gray-300' : level === 'intermediate' ? 'ring-blue-400' : 'ring-yellow-400'
  return (
    <div className={`h-20 w-20 rounded-full ring-4 ${ring} flex items-center justify-center bg-gray-100`}>🙂</div>
  )
}
