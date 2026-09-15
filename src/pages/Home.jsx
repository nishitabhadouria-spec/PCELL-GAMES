import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div className="crt-screen">
        {/* Screen Header Divider */}
        <div className="screen-header-bar">
          <span>BOOT // SELECT OPERATIONAL TRIAL</span>
          <span>STANDBY</span>
        </div>

        {/* Screen Central Content */}
        <div className="screen-body">
          <h1 className="glowing-title">NEXUS ARCADE</h1>
          <div className="subtitle-code">PROJECT NEXUS // FIRST YEAR CHALLENGE</div>

          <div className="unauthorized-warning">
            <span>⚠ UNAUTHORIZED USER DETECTED</span>
          </div>

          <p className="prompt-text">
            Select your operational trial. All modules run client-side in browser. Complete challenges to establish clearance.
          </p>

          <div className="beveled-button-grid cols-2">
            <Link to="/games/memory" className="beveled-btn">
              <span className="btn-title">MEMORY MATCH</span>
              <span className="btn-subtitle">RAM RECOVERY // 3 TIERS</span>
            </Link>

            <Link to="/games/glitch" className="beveled-btn">
              <span className="btn-title">FIND THE GLITCH</span>
              <span className="btn-subtitle">ANOMALY SCAN // 10 STAGES</span>
            </Link>

            <Link to="/games/crack" className="beveled-btn">
              <span className="btn-title">CRACK THE CODE</span>
              <span className="btn-subtitle">SECURITY BREACH // 15 MISSIONS</span>
            </Link>

            <Link to="/games" className="beveled-btn">
              <span className="btn-title">HARDWARE DECK</span>
              <span className="btn-subtitle">VIEW ALL ARCADE MODULES</span>
            </Link>
          </div>
        </div>

        {/* Screen Bottom Telemetry Bar */}
        <div className="screen-bottom-bar">
          <span>MODE: SELECTION</span>
          <span>SYS.VER: 2026.04</span>
        </div>
      </div>

      {/* 4-Box HUD Stat Display */}
      <div className="hud-panel-row">
        <div className="hud-panel-box">
          <span className="hud-box-label">MODULES</span>
          <span className="hud-box-value">03 / 04</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">SECURITY</span>
          <span className="hud-box-value">ALPHA</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">NETWORK</span>
          <span className="hud-box-value">LOCAL</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">SYSTEM</span>
          <span className="hud-box-value">ONLINE</span>
        </div>
      </div>

      {/* Tactical Action Buttons */}
      <div className="tactical-actions-row">
        <Link to="/games" className="tactical-btn btn-amber">
          [?] VIEW PROTOCOL
        </Link>
        <Link to="/games" className="tactical-btn btn-red">
          [ CORE ] ENTER DECK
        </Link>
        <Link to="/games" className="tactical-btn btn-blue">
          [0] ALL MODULES
        </Link>
      </div>
    </>
  )
}
