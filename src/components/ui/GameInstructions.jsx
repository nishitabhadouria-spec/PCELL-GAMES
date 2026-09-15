import Button from './Button.jsx'
import Panel from './Panel.jsx'

export default function GameInstructions({ game, children, onStart, startLabel = 'Initialize Module' }) {
  return (
    <div className="instruct-wrap">
      <Panel accent={game.accent} className="instruct-panel">
        <p className="eyebrow">{game.codename} // MISSION_BRIEFING</p>
        <h2>{game.title}</h2>
        <p className="lede">{game.summary}</p>
        <ol className="instruct-list">
          {game.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
        {game.tips ? <p className="tip"><strong>OPERATOR ADVISORY:</strong> {game.tips}</p> : null}
        {children}
        <div className="instruct-actions">
          <Button full onClick={onStart} variant="primary">
            ▶ {startLabel}
          </Button>
          <Button full variant="ghost" to="/games">
            ← Abort to Game Deck
          </Button>
        </div>
      </Panel>
    </div>
  )
}

