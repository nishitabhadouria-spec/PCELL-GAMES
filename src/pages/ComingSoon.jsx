import { Link } from 'react-router-dom'

export default function ComingSoon({ game }) {
  return (
    <>
      <div className="crt-screen">
        <div className="screen-header-bar">
          <span>BOOT // ENCRYPTED MODULE ACCESS</span>
          <span style={{ color: 'var(--amber-term)' }}>LOCKED</span>
        </div>

        <div className="screen-body">
          <h1 className="glowing-title">{game.title}</h1>
          <div className="subtitle-code">{game.codename} // ENCRYPTED ROM</div>

          <div className="unauthorized-warning">
            <span>⚠ ENCRYPTED HARDWARE SECTOR</span>
          </div>

          <p className="prompt-text">
            {game.summary}
            <br />
            <span style={{ color: 'var(--amber-term)', fontSize: '12px' }}>
              This module is scheduled for decryption in the next event firmware release.
            </span>
          </p>

          <div className="beveled-button-grid cols-2">
            <Link to="/games/memory" className="beveled-btn">
              <span className="btn-title">MEMORY MATCH</span>
              <span className="btn-subtitle">PLAY LIVE TRIAL // 3 TIERS</span>
            </Link>
            <Link to="/games/glitch" className="beveled-btn">
              <span className="btn-title">FIND THE GLITCH</span>
              <span className="btn-subtitle">PLAY LIVE TRIAL // 10 STAGES</span>
            </Link>
          </div>
        </div>

        <div className="screen-bottom-bar">
          <span>STATUS: ROM_LOCKED</span>
          <span>AUTH: RESTRICTED</span>
        </div>
      </div>

      <div className="hud-panel-row">
        <div className="hud-panel-box">
          <span className="hud-box-label">MODULE</span>
          <span className="hud-box-value">{game.tag}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">STATUS</span>
          <span className="hud-box-value" style={{ color: 'var(--amber-term)' }}>SOON</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">SECURITY</span>
          <span className="hud-box-value">TIER-2</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">CLEARANCE</span>
          <span className="hud-box-value" style={{ color: 'var(--red-term)' }}>DENIED</span>
        </div>
      </div>

      <div className="tactical-actions-row">
        <Link to="/games" className="tactical-btn btn-blue">
          [0] RETURN TO DECK
        </Link>
        <Link to="/games/memory" className="tactical-btn btn-green">
          [ CORE ] PLAY MEMORY MATCH
        </Link>
        <Link to="/" className="tactical-btn btn-amber">
          [?] HOME TERMINAL
        </Link>
      </div>
    </>
  )
}
