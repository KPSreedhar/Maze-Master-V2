const STORAGE_PREFIX = 'mazemaster:best:'

function readBest(difficultyKey) {
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${difficultyKey}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function getAllBestTimes(difficultyKeys) {
  const result = {}
  for (const key of difficultyKeys) {
    result[key] = readBest(key)
  }
  return result
}

export function recordResult(difficultyKey, { timeMs, moves }) {
  const current = readBest(difficultyKey)
  if (current && current.timeMs <= timeMs) return { improved: false, best: current }

  const best = { timeMs, moves, date: new Date().toISOString() }
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${difficultyKey}`, JSON.stringify(best))
  } catch {
    // localStorage unavailable (private mode, quota) — best time simply won't persist
  }
  return { improved: true, best }
}

export function clearBestTimes(difficultyKeys) {
  for (const key of difficultyKeys) {
    try {
      window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
    } catch {
      // ignore
    }
  }
}
