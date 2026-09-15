import Button from './Button.jsx'
import Panel from './Panel.jsx'

export default function ResultScreen({
  title,
  rank,
  stats,
  accent = 'cyan',
  onAgain,
  gamesTo = '/games',
}) {
  return (
    <div className="result-wrap">
      <Panel accent={accent} className="result-panel">
        <p className="eyebrow">DIAGNOSTIC REPORT // RUN_COMPLETE</p>
        <h2>{title}</h2>
        <div className="rank-chip">CLEARANCE RATING: {rank}</div>
        <ul className="result-stats">
          {stats.map((stat) => (
            <li key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </li>
          ))}
        </ul>
        <div className="result-actions">
          <Button full onClick={onAgain} variant="primary">
            ↺ Re-run Module
          </Button>
          <Button full variant="ghost" to={gamesTo}>
            ← Return to Hardware Deck
          </Button>
        </div>
      </Panel>
    </div>
  )
}

