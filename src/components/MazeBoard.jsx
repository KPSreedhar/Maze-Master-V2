import { useMemo } from 'react'
import './MazeBoard.css'

const MAX_BOARD_WIDTH = 640
const MIN_CELL = 18
const MAX_CELL = 40

export default function MazeBoard({ maze, cols, rows, player, goal, facing, won }) {
  const cellSize = useMemo(() => {
    const fitted = Math.floor(MAX_BOARD_WIDTH / cols)
    return Math.max(MIN_CELL, Math.min(MAX_CELL, fitted))
  }, [cols])

  const boardWidth = cellSize * cols
  const boardHeight = cellSize * rows

  return (
    <div className="maze-board" style={{ width: boardWidth, height: boardHeight }}>
      <div
        className="maze-board__grid"
        style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gridTemplateRows: `repeat(${rows}, ${cellSize}px)` }}
      >
        {maze.map((row) =>
          row.map((cell) => (
            <div
              key={`${cell.row}:${cell.col}`}
              className="maze-board__cell"
              style={{
                borderTopStyle: cell.walls.N ? 'solid' : 'none',
                borderLeftStyle: cell.walls.W ? 'solid' : 'none',
                borderBottomStyle: cell.row === rows - 1 ? (cell.walls.S ? 'solid' : 'none') : 'none',
                borderRightStyle: cell.col === cols - 1 ? (cell.walls.E ? 'solid' : 'none') : 'none',
              }}
            />
          )),
        )}
      </div>

      <div
        className="maze-board__goal"
        style={{
          width: cellSize,
          height: cellSize,
          transform: `translate(${goal.col * cellSize}px, ${goal.row * cellSize}px)`,
        }}
      >
        <svg viewBox="0 0 24 24" className="maze-board__goal-icon">
          <path d="M6 2v20M6 3h12l-3 4 3 4H6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        className={`maze-board__player${won ? ' maze-board__player--won' : ''}`}
        data-facing={facing}
        style={{
          width: cellSize,
          height: cellSize,
          transform: `translate(${player.col * cellSize}px, ${player.row * cellSize}px)`,
        }}
      >
        <span className="maze-board__player-core" />
      </div>
    </div>
  )
}
