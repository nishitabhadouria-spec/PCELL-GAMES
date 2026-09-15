import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function AppShell() {
  const [time, setTime] = useState(getFormattedTime())
  const [sfxOn, setSfxOn] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getFormattedTime())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="console-casing">
      {/* Top Capsule Status Bar */}
      <div className="top-capsule-bar">
        <div className="top-left-status">
          <span className="status-dot" />
          <span>NEXUS // SECURITY PROTOCOL READY</span>
        </div>
        <button
          type="button"
          className="sfx-pill"
          onClick={() => setSfxOn((prev) => !prev)}
          title="Toggle SFX telemetry"
        >
          SPX: {sfxOn ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Secondary Telemetry Strip */}
      <div className="telemetry-strip">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>LINK: NEXUS MAINFRAME</span>
        </Link>
        <span className="time-readout">{time}</span>
        <span>SEC-LVL: ALPHA</span>
      </div>

      {/* Main CRT Content Area */}
      <Outlet />

      {/* Bottom Hazard Warning Stripe Bar */}
      <div className="hazard-stripe-bar" aria-hidden="true" />
    </div>
  )
}

function getFormattedTime() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}
