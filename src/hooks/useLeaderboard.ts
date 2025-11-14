import { useEffect, useState } from 'react'

export default function useLeaderboard() {
  const [leaders, setLeaders] = useState<{ name: string; points: number }[]>([])
  useEffect(() => {
    setLeaders([
      { name: 'Aline', points: 120 },
      { name: 'Musa', points: 95 },
      { name: 'Jean', points: 80 }
    ])
  }, [])
  return { leaders }
}
