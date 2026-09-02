import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DIFFICULTIES, DIFFICULTY_ORDER } from '../game/difficulties'
import { getAllBestTimes, clearBestTimes } from '../hooks/useBestTimes'
import { formatTime } from '../game/format'
import './Vault.css'

export default function Vault() {
  const [bestTimes, setBestTimes] = useState(() => getAllBestTimes(DIFFICULTY_ORDER))
  const hasAnyRecord = DIFFICULTY_ORDER.some((key) => bestTimes[key])

  function handleClear() {
    clearBestTimes(DIFFICULTY_ORDER)
    setBestTimes(getAllBestTimes(DIFFICULTY_ORDER))
  }

  return (
    <div className="vault">
      <header className="vault__header">
        <Link to="/" className="vault__back">
          ← Menu
        </Link>
        <h1 className="vault__title">The Vault</h1>
        <p className="vault__subtitle">Every fastest escape, kept in stone until you beat it.</p>
      </header>

      <div className="vault__list">
        {DIFFICULTY_ORDER.map((key) => {
          const difficulty = DIFFICULTIES[key]
          const best = bestTimes[key]
          return (
            <div className="vault__row" key={key}>
              <div className="vault__row-name">
                <span className="vault__row-label">{difficulty.label}</span>
                <span className="vault__row-dims">
                  {difficulty.cols} × {difficulty.rows}
                </span>
              </div>
              {best ? (
                <div className="vault__row-record">
                  <span className="vault__row-time">{formatTime(best.timeMs)}</span>
                  <span className="vault__row-moves">{best.moves} moves</span>
                </div>
              ) : (
                <span className="vault__row-empty">Unclaimed</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="vault__footer">
        <Link className="vault__play-link" to={`/play/${DIFFICULTY_ORDER[0]}`}>
          Enter a chamber
        </Link>
        <button type="button" className="vault__clear" onClick={handleClear} disabled={!hasAnyRecord}>
          Erase all records
        </button>
      </div>
    </div>
  )
}
