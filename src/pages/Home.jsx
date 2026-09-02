import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { DIFFICULTIES, DIFFICULTY_ORDER } from '../game/difficulties'
import { getAllBestTimes } from '../hooks/useBestTimes'
import { formatTime } from '../game/format'
import './Home.css'

export default function Home() {
  const bestTimes = useMemo(() => getAllBestTimes(DIFFICULTY_ORDER), [])

  return (
    <div className="home">
      <div className="home__glow" aria-hidden="true" />

      <header className="home__header">
        <p className="home__kicker">Est. underground, depth unknown</p>
        <h1 className="home__title">
          MAZE
          <br />
          MASTER
        </h1>
        <p className="home__subtitle">
          Three chambers. One exit each. No map, no torches back the way you came —
          just the walls, the amber light, and however many turns it takes you.
        </p>
      </header>

      <div className="home__cards">
        {DIFFICULTY_ORDER.map((key, index) => {
          const difficulty = DIFFICULTIES[key]
          const best = bestTimes[key]
          return (
            <article
              key={key}
              className="home__card"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="home__card-index">{String(index + 1).padStart(2, '0')}</div>
              <h2 className="home__card-title">{difficulty.label}</h2>
              <p className="home__card-tagline">{difficulty.tagline}</p>
              <p className="home__card-dims">
                {difficulty.cols} × {difficulty.rows} chamber
              </p>
              <p className="home__card-best">
                {best ? (
                  <>
                    Best: <strong>{formatTime(best.timeMs)}</strong> · {best.moves} moves
                  </>
                ) : (
                  'No run recorded yet'
                )}
              </p>
              <Link className="home__card-cta" to={`/play/${key}`}>
                Descend
                <span className="home__card-cta-arrow">→</span>
              </Link>
            </article>
          )
        })}
      </div>

      <footer className="home__footer">
        <div className="home__controls">
          <span className="home__controls-label">Controls</span>
          <span className="home__key">↑</span>
          <span className="home__key">↓</span>
          <span className="home__key">←</span>
          <span className="home__key">→</span>
          <span className="home__controls-or">or</span>
          <span className="home__key">W</span>
          <span className="home__key">A</span>
          <span className="home__key">S</span>
          <span className="home__key">D</span>
        </div>
        <Link className="home__vault-link" to="/vault">
          View the Vault of Records
        </Link>
      </footer>
    </div>
  )
}
