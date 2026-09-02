import { useCallback, useEffect, useRef, useState } from 'react'
import { generateMaze, canStep } from './maze'

const KEY_TO_DIR = {
  ArrowUp: 'N',
  ArrowDown: 'S',
  ArrowLeft: 'W',
  ArrowRight: 'E',
  w: 'N',
  s: 'S',
  a: 'W',
  d: 'E',
  W: 'N',
  S: 'S',
  A: 'W',
  D: 'E',
}

export function useMazeGame(cols, rows) {
  const goal = { row: rows - 1, col: cols - 1 }
  const [runId, setRunId] = useState(0)
  const [maze, setMaze] = useState(() => generateMaze(cols, rows))
  const [player, setPlayer] = useState({ row: 0, col: 0 })
  const [facing, setFacing] = useState('E')
  const [moves, setMoves] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [won, setWon] = useState(false)
  const startRef = useRef(Date.now())

  useEffect(() => {
    setMaze(generateMaze(cols, rows))
    setPlayer({ row: 0, col: 0 })
    setFacing('E')
    setMoves(0)
    setElapsedMs(0)
    setWon(false)
    startRef.current = Date.now()
  }, [cols, rows, runId])

  useEffect(() => {
    if (won) return
    const id = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current)
    }, 100)
    return () => clearInterval(id)
  }, [won, runId])

  const move = useCallback(
    (dir) => {
      if (won) return
      const next = canStep(maze, player, dir)
      if (!next) return
      setPlayer(next)
      setFacing(dir)
      setMoves((m) => m + 1)
      if (next.row === goal.row && next.col === goal.col) {
        setWon(true)
        setElapsedMs(Date.now() - startRef.current)
      }
    },
    [maze, player, won, goal.row, goal.col],
  )

  useEffect(() => {
    function onKeyDown(event) {
      const dir = KEY_TO_DIR[event.key]
      if (!dir) return
      event.preventDefault()
      move(dir)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  const restart = useCallback(() => setRunId((id) => id + 1), [])

  return { maze, player, facing, moves, elapsedMs, won, goal, move, restart }
}
