type Item = { type: 'quiz' | 'upload'; payload: unknown }

export default function useOfflineQueue() {
  const key = 'inganzo-offline-queue'
  function enqueue(item: Item) {
    const current = JSON.parse(localStorage.getItem(key) || '[]')
    current.push(item)
    localStorage.setItem(key, JSON.stringify(current))
  }
  function flush() {
    const current = JSON.parse(localStorage.getItem(key) || '[]') as Item[]
    localStorage.setItem(key, '[]')
    return current
  }
  return { enqueue, flush }
}
