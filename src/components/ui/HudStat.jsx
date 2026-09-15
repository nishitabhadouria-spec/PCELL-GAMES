export default function HudStat({ label, value, warn = false }) {
  return (
    <div className={`hud-stat${warn ? ' is-warn' : ''}`}>
      <span className="hud-stat-label">{label}</span>
      <span className="hud-stat-value">{value}</span>
    </div>
  )
}
