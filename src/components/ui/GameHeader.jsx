import { Link } from 'react-router-dom'
import HudStat from './HudStat.jsx'

export default function GameHeader({ title, code, stats, onExit, extra }) {
  return (
    <header className="game-header">
      <div className="game-header-top">
        <Link className="ghost-link" to="/games">
          ← Deck
        </Link>
        <div className="game-header-title">
          <p className="eyebrow">{code}</p>
          <h1>{title}</h1>
        </div>
        {onExit ? (
          <button type="button" className="ghost-link" onClick={onExit}>
            Exit
          </button>
        ) : (
          <span className="ghost-link spacer" />
        )}
      </div>
      {stats?.length ? (
        <div className="hud-row">
          {stats.map((stat) => (
            <HudStat key={stat.label} {...stat} />
          ))}
        </div>
      ) : null}
      {extra}
    </header>
  )
}
