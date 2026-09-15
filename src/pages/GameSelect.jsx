import { Link } from 'react-router-dom'
import { GAMES } from '../data/games.js'

export default function GameSelect() {
  const liveGames = GAMES.filter((g) => g.status === 'live')
  const randomGame = liveGames[Math.floor(Math.random() * liveGames.length)]

  return (
    <>
      <div className="crt-screen">
        {/* Screen Header Divider */}
        <div className="screen-header-bar">
          <span>BOOT // SELECT OPERATIONAL MODULE</span>
          <span>STANDBY</span>
        </div>

        {/* Screen Central Content */}
        <div className="screen-body">
          <h1 className="glowing-title">HARDWARE DECK</h1>
          <div className="subtitle-code">SELECT OPERATIONAL MODULE // {liveGames.length} ACTIVE TRIALS</div>

          <p className="prompt-text">
            Choose a live diagnostic module from the chassis matrix. Complete trial runs to record high scores.
          </p>

          <div className="beveled-button-grid cols-2">
            {GAMES.map((game) => (
              <Link
                key={game.id}
                to={`/games/${game.id}`}
                className={`beveled-btn${game.status !== 'live' ? ' is-locked' : ''}`}
              >
                <span className="btn-title">{game.title}</span>
                <span className="btn-subtitle">
                  {game.status === 'live' ? `${game.codename} // READY` : '🔒 ENCRYPTED ROM // SOON'}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Screen Bottom Telemetry Bar */}
        <div className="screen-bottom-bar">
          <span>MODE: MODULE_SELECT</span>
          <span>AVAILABLE: {String(liveGames.length).padStart(2, '0')} / {String(GAMES.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* 4-Box HUD Stat Display */}
      <div className="hud-panel-row">
        <div className="hud-panel-box">
          <span className="hud-box-label">SLOTS</span>
          <span className="hud-box-value">{String(GAMES.length).padStart(2, '0')}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">ACTIVE</span>
          <span className="hud-box-value">{String(liveGames.length).padStart(2, '0')}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">LOCKED</span>
          <span className="hud-box-value">{String(GAMES.length - liveGames.length).padStart(2, '0')}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">CLEARANCE</span>
          <span className="hud-box-value">ALPHA</span>
        </div>
      </div>

      {/* Tactical Action Buttons */}
      <div className="tactical-actions-row">
        <Link to="/" className="tactical-btn btn-blue">
          [0] HOME TERMINAL
        </Link>
        <Link to={`/games/${randomGame.id}`} className="tactical-btn btn-red">
          [ CORE ] QUICK LAUNCH
        </Link>
        <Link to="/games/memory" className="tactical-btn btn-amber">
          [?] MEMORY MODULE
        </Link>
      </div>
    </>
  )
}
