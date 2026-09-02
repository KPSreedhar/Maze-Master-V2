import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import MazeBoard from '../components/MazeBoard'
import StatBadge from '../components/StatBadge'
import { DIFFICULTIES } from '../game/difficulties'
import { useMazeGame } from '../game/useMazeGame'
import { formatTime } from '../game/format'
import { recordResult } from '../hooks/useBestTimes'
import './Play.css'

export default function Play() {
  const { difficultyKey } = useParams()
  const difficulty = DIFFICULTIES[difficultyKey]

  if (!difficulty) {
    return <Navigate to="/" replace />
  }

  return <PlaySession key={difficultyKey} difficulty={difficulty} />
}

function PlaySession({ difficulty }) {
  const game = useMazeGame(difficulty.cols, difficulty.rows)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!game.won) return
    setResult(recordResult(difficulty.key, { timeMs: game.elapsedMs, moves: game.moves }))
    // Only fires once per run — `won` flips true exactly once before a restart resets it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.won])

  function handleRestart() {
    setResult(null)
    game.restart()
  }

  return (
    <div className="play">
      <header className="play__header">
        <Link to="/" className="play__back">
          ← Menu
        </Link>
        <h1 className="play__title">{difficulty.label} Chamber</h1>
        <span className="play__dims">
          {difficulty.cols} × {difficulty.rows}
        </span>
      </header>

      <div className="play__stats">
        <StatBadge label="Time" value={formatTime(game.elapsedMs)} />
        <StatBadge label="Moves" value={game.moves} accent="ember" />
        <StatBadge
          label="Best"
          value={result?.best ? formatTime(result.best.timeMs) : '—'}
          accent="exit"
        />
      </div>

      <div className="play__board-wrap">
        <MazeBoard
          maze={game.maze}
          cols={difficulty.cols}
          rows={difficulty.rows}
          player={game.player}
          goal={game.goal}
          facing={game.facing}
          won={game.won}
        />

        {game.won && (
          <div className="play__overlay">
            <div className="play__overlay-card">
              <p className="play__overlay-kicker">
                {result?.improved ? 'New personal best' : 'Chamber cleared'}
              </p>
              <h2 className="play__overlay-title">Out of the dark</h2>
              <div className="play__overlay-stats">
                <div>
                  <span className="play__overlay-label">Time</span>
                  <span className="play__overlay-value">{formatTime(game.elapsedMs)}</span>
                </div>
                <div>
                  <span className="play__overlay-label">Moves</span>
                  <span className="play__overlay-value">{game.moves}</span>
                </div>
              </div>
              <div className="play__overlay-actions">
                <button type="button" className="play__button play__button--primary" onClick={handleRestart}>
                  New Chamber
                </button>
                <Link to="/" className="play__button">
                  Back to Menu
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="play__hint">Move with the arrow keys or WASD.</p>
    </div>
  )
}
