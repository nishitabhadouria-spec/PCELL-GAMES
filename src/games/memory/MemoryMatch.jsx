import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TechGlyph, GLYPH_META } from '../../components/icons/TechGlyphs.jsx'
import {
  MEMORY_DIFFICULTIES,
  createMemoryDeck,
  rankMemory,
  scoreMemory,
} from './memoryLogic.js'

const FLIP_BACK_MS = 720

export default function MemoryMatch({ game }) {
  const [phase, setPhase] = useState('brief')
  const [difficultyId, setDifficultyId] = useState('medium')
  const [deck, setDeck] = useState([])
  const [difficulty, setDifficulty] = useState(MEMORY_DIFFICULTIES[1])
  const [selected, setSelected] = useState([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [busy, setBusy] = useState(false)
  const [final, setFinal] = useState(null)
  const [showIntel, setShowIntel] = useState(false)
  const lock = useRef(false)

  const matched = deck.filter((card) => card.matched).length / 2
  const pairs = difficulty.pairs
  const complete = deck.length > 0 && deck.every((card) => card.matched)

  useEffect(() => {
    if (phase !== 'play' || complete) return undefined
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [phase, complete])

  useEffect(() => {
    if (phase !== 'play' || !complete) return
    const score = scoreMemory({
      pairs,
      moves,
      seconds,
      bonus: difficulty.bonus,
    })
    setFinal({
      score,
      rank: rankMemory(score, difficulty.id),
      pairs,
      moves,
      seconds,
      difficulty: difficulty.label,
    })
    setPhase('result')
  }, [complete, difficulty, moves, pairs, phase, seconds])

  function start(nextDifficulty = difficultyId) {
    const pack = createMemoryDeck(nextDifficulty)
    setDifficulty(pack.difficulty)
    setDeck(pack.cards)
    setSelected([])
    setMoves(0)
    setSeconds(0)
    setBusy(false)
    setFinal(null)
    setShowIntel(false)
    lock.current = false
    setPhase('play')
  }

  function flip(cardId) {
    if (phase !== 'play' || lock.current || busy) return
    const card = deck.find((item) => item.id === cardId)
    if (!card || card.flipped || card.matched) return

    const nextDeck = deck.map((item) => (item.id === cardId ? { ...item, flipped: true } : item))
    const nextSelected = [...selected, cardId]
    setDeck(nextDeck)
    setSelected(nextSelected)

    if (nextSelected.length < 2) return

    setMoves((n) => n + 1)
    const [aId, bId] = nextSelected
    const a = nextDeck.find((item) => item.id === aId)
    const b = nextDeck.find((item) => item.id === bId)
    lock.current = true
    setBusy(true)

    if (a.glyph === b.glyph) {
      window.setTimeout(() => {
        setDeck((current) =>
          current.map((item) => (item.glyph === a.glyph ? { ...item, matched: true, flipped: true } : item)),
        )
        setSelected([])
        lock.current = false
        setBusy(false)
      }, 260)
      return
    }

    window.setTimeout(() => {
      setDeck((current) =>
        current.map((item) => (item.id === aId || item.id === bId ? { ...item, flipped: false } : item)),
      )
      setSelected([])
      lock.current = false
      setBusy(false)
    }, FLIP_BACK_MS)
  }

  const activeDifficulty = useMemo(
    () => MEMORY_DIFFICULTIES.find((d) => d.id === difficultyId) || MEMORY_DIFFICULTIES[1],
    [difficultyId],
  )

  // ==========================================
  // PHASE: BRIEFING (REFERENCE MATCHED LAYOUT)
  // ==========================================
  if (phase === 'brief') {
    return (
      <>
        <div className="crt-screen">
          <div className="screen-header-bar">
            <span>BOOT // SELECT DIFFICULTY</span>
            <span>STANDBY</span>
          </div>

          <div className="screen-body">
            <h1 className="glowing-title">MEMORY MATCH</h1>
            <div className="subtitle-code">PROJECT CELL // FIRST YEAR CHALLENGE</div>

            <div className="unauthorized-warning">
              <span>⚠ UNAUTHORIZED USER DETECTED</span>
            </div>

            <p className="prompt-text">
              {showIntel ? (
                <span>
                  <strong>TACTICAL INTEL:</strong> Flip memory tiles to find matching glyph pairs. Synchronized pairs
                  lock with green phosphor verification. Faster clears earn higher sync rating.
                </span>
              ) : (
                <>
                  Select your operational difficulty. Every mode contains custom memory sectors.
                </>
              )}
            </p>

            <div className="beveled-button-grid cols-2">
              <button
                type="button"
                className={`beveled-btn${difficultyId === 'easy' ? ' is-active' : ''}`}
                onClick={() => setDifficultyId('easy')}
              >
                <span className="btn-title">EASY</span>
                <span className="btn-subtitle">6 PAIRS // 1.0X MULTIPLIER</span>
              </button>

              <button
                type="button"
                className={`beveled-btn${difficultyId === 'hard' ? ' is-active' : ''}`}
                onClick={() => setDifficultyId('hard')}
              >
                <span className="btn-title">HARD</span>
                <span className="btn-subtitle">10 PAIRS // 1.75X MULTIPLIER</span>
              </button>

              <button
                type="button"
                className={`beveled-btn full-width${difficultyId === 'medium' ? ' is-active' : ''}`}
                onClick={() => setDifficultyId('medium')}
              >
                <span className="btn-title">EXTREME (STANDARD)</span>
                <span className="btn-subtitle">8 PAIRS // 1.35X MULTIPLIER</span>
              </button>
            </div>
          </div>

          <div className="screen-bottom-bar">
            <span>MODE: SELECTION</span>
            <span>DIFFICULTY: {activeDifficulty.label.toUpperCase()}</span>
          </div>
        </div>

        {/* 4-Box HUD Stat Display */}
        <div className="hud-panel-row">
          <div className="hud-panel-box">
            <span className="hud-box-label">MISSION</span>
            <span className="hud-box-value">01 / 01</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">PAIRS</span>
            <span className="hud-box-value">{activeDifficulty.pairs}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">MULTIPLIER</span>
            <span className="hud-box-value">{activeDifficulty.bonus}x</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">STATUS</span>
            <span className="hud-box-value">READY</span>
          </div>
        </div>

        {/* Tactical Action Buttons */}
        <div className="tactical-actions-row">
          <button
            type="button"
            className="tactical-btn btn-amber"
            onClick={() => setShowIntel((prev) => !prev)}
          >
            [?] REQUEST INTEL
          </button>
          <button
            type="button"
            className="tactical-btn btn-red"
            onClick={() => start(difficultyId)}
          >
            [ CORE ] EXECUTE
          </button>
          <Link to="/games" className="tactical-btn btn-blue">
            [0] ABORT / RESET
          </Link>
        </div>
      </>
    )
  }

  // ==========================================
  // PHASE: RESULT SCREEN
  // ==========================================
  if (phase === 'result' && final) {
    return (
      <>
        <div className="crt-screen">
          <div className="screen-header-bar">
            <span>BOOT // MISSION COMPLETE</span>
            <span>CLEARANCE: GRANTED</span>
          </div>

          <div className="screen-body">
            <h1 className="glowing-title">MISSION COMPLETE</h1>
            <div className="subtitle-code">RATING // {final.rank}</div>

            <div className="result-stats-table">
              <div className="result-stat-row">
                <span>TOTAL SCORE</span>
                <strong>{final.score} PTS</strong>
              </div>
              <div className="result-stat-row">
                <span>DIFFICULTY TIER</span>
                <strong>{final.difficulty}</strong>
              </div>
              <div className="result-stat-row">
                <span>BUS CYCLES</span>
                <strong>{final.moves} MOVES</strong>
              </div>
              <div className="result-stat-row">
                <span>ELAPSED TIME</span>
                <strong>{formatTime(final.seconds)}</strong>
              </div>
              <div className="result-stat-row">
                <span>SECTORS SYNCED</span>
                <strong>{final.pairs} / {final.pairs}</strong>
              </div>
            </div>
          </div>

          <div className="screen-bottom-bar">
            <span>STATUS: SYNC_LOCKED</span>
            <span>SCORE: {final.score}</span>
          </div>
        </div>

        <div className="hud-panel-row">
          <div className="hud-panel-box">
            <span className="hud-box-label">MISSION</span>
            <span className="hud-box-value">01 / 01</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">TIME</span>
            <span className="hud-box-value">{formatTime(final.seconds)}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">CYCLES</span>
            <span className="hud-box-value">{final.moves}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">RATING</span>
            <span className="hud-box-value" style={{ fontSize: '13px' }}>{final.rank.split(' ')[0]}</span>
          </div>
        </div>

        <div className="tactical-actions-row">
          <button
            type="button"
            className="tactical-btn btn-amber"
            onClick={() => {
              setPhase('brief')
              setFinal(null)
            }}
          >
            [?] CHANGE MODE
          </button>
          <button
            type="button"
            className="tactical-btn btn-red"
            onClick={() => start(difficulty.id)}
          >
            [ CORE ] RE-EXECUTE
          </button>
          <Link to="/games" className="tactical-btn btn-blue">
            [0] RETURN TO DECK
          </Link>
        </div>
      </>
    )
  }

  // ==========================================
  // PHASE: IN-GAME ACTIVE RUN
  // ==========================================
  return (
    <>
      <div className="crt-screen">
        <div className="screen-header-bar">
          <span>RUN // MEMORY SECTOR SCAN</span>
          <span>TIME: {formatTime(seconds)}</span>
        </div>

        <div className="screen-body" style={{ minHeight: '340px' }}>
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${difficulty.cols}, minmax(0, 1fr))` }}
          >
            {deck.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`mem-card${card.flipped || card.matched ? ' is-flipped' : ''}${card.matched ? ' is-matched' : ''}`}
                onClick={() => flip(card.id)}
                aria-label={card.flipped || card.matched ? GLYPH_META[card.glyph].label : 'Hidden memory tile'}
              >
                <span className="mem-inner">
                  <span className="mem-face mem-back">
                    <span className="mem-back-core" />
                  </span>
                  <span className="mem-face mem-front" style={{ '--pair': card.color }}>
                    <TechGlyph name={card.glyph} color={card.color} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="screen-bottom-bar">
          <span>DIFFICULTY: {difficulty.label.toUpperCase()}</span>
          <span>MOVES: {moves}</span>
        </div>
      </div>

      {/* 4-Box HUD Stat Display */}
      <div className="hud-panel-row">
        <div className="hud-panel-box">
          <span className="hud-box-label">MISSION</span>
          <span className="hud-box-value">01 / 01</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">TIME</span>
          <span className="hud-box-value">{formatTime(seconds)}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">CYCLES</span>
          <span className="hud-box-value">{String(moves).padStart(2, '0')}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">SECTORS</span>
          <span className="hud-box-value">{matched} / {pairs}</span>
        </div>
      </div>

      {/* Tactical Action Buttons */}
      <div className="tactical-actions-row">
        <button
          type="button"
          className="tactical-btn btn-amber"
          onClick={() => {
            setPhase('brief')
          }}
        >
          [?] CHANGE DIFFICULTY
        </button>
        <button
          type="button"
          className="tactical-btn btn-red"
          onClick={() => start(difficulty.id)}
        >
          [ CORE ] RESET BUS
        </button>
        <Link to="/games" className="tactical-btn btn-blue">
          [0] ABORT / DECK
        </Link>
      </div>
    </>
  )
}

function formatTime(total) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
