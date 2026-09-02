import './StatBadge.css'

export default function StatBadge({ label, value, accent = 'amber' }) {
  return (
    <div className={`stat-badge stat-badge--${accent}`}>
      <span className="stat-badge__label">{label}</span>
      <span className="stat-badge__value">{value}</span>
    </div>
  )
}
