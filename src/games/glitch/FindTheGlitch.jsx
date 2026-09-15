import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TechGlyph } from '../../components/icons/TechGlyphs.jsx'
import { createGlitchRound, rankGlitch, scoreGlitchHit } from './glitchLogic.js'

const TOTAL_ROUNDS = 10
const LIVES = 3

export default function FindTheGlitch({ game }) {
  const [phase, setPhase] = useState('brief')
  const [round, setRound] = useState(1)
  const [board, setBoard] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [lives, setLives] = useState(LIVES)
  const [hits, setHits] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [left, setLeft] = useState(12)
  const [flash, setFlash] = useState(null)
  const [final, setFinal] = useState(null)
  const [showIntel, setShowIntel] = useState(false)
  const locked = useRef(false)
  const live = useRef(false)
  const leftRef = useRef(12)
  const snapshot = useRef({})

  snapshot.current = { score, streak, bestStreak, lives, hits, attempts, round, board }

  function deal(nextRound) {
    const pack = createGlitchRound(nextRound, window.innerWidth)
    locked.current = true
    live.current = false
    leftRef.current = pack.seconds
    setBoard(pack)
    setLeft(pack.seconds)
    setFlash(null)
    window.setTimeout(() => {
      live.current = true
      locked.current = false
    }, 80)
  }

  function begin() {
    locked.current = true
    live.current = false
    leftRef.current = 12
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setLives(LIVES)
    setHits(0)
    setAttempts(0)
    setRound(1)
    setFinal(null)
    setLeft(12)
    setBoard(null)
    setShowIntel(false)
    setPhase('play')
    deal(1)
  }

  function endRun({ nextScore, nextHits, nextAttempts, nextBest, nextLives, nextRound }) {
    const accuracy = nextAttempts ? Math.round((nextHits / nextAttempts) * 100) : 0
    const roundsCompleted = nextLives <= 0 ? Math.max(0, nextRound - 1) : TOTAL_ROUNDS
    setFinal({
      score: nextScore,
      accuracy,
      bestStreak: nextBest,
      hits: nextHits,
      attempts: nextAttempts,
      rounds: roundsCompleted,
      rank: rankGlitch({ score: nextScore, accuracy, bestStreak: nextBest }),
    })
    setPhase('result')
  }

  useEffect(() => {
    if (phase !== 'play' || !board) return undefined
    const id = window.setInterval(() => {
      if (locked.current || !live.current) return
      setLeft((current) => {
        if (current <= 0) return 0
        const next = Math.max(0, +(current - 0.1).toFixed(1))
        leftRef.current = next
        if (next === 0) {
          locked.current = true
          live.current = false
          window.setTimeout(() => resolve(false), 0)
        }
        return next
      })
    }, 100)
    return () => window.clearInterval(id)
  }, [phase, board, round])

  function resolve(success) {
    const s = snapshot.current
    const nextAttempts = s.attempts + 1
    let nextScore = s.score
    let nextStreak = s.streak
    let nextBest = s.bestStreak
    let nextHits = s.hits
    let nextLives = s.lives

    if (success) {
      nextScore += scoreGlitchHit({
        round: s.round,
        secondsLeft: leftRef.current,
        seconds: s.board.seconds,
        streak: s.streak + 1,
      })
      nextStreak = s.streak + 1
      nextBest = Math.max(s.bestStreak, nextStreak)
      nextHits = s.hits + 1
      setFlash('hit')
    } else {
      nextScore = Math.max(0, s.score - 25)
      nextStreak = 0
      nextLives = s.lives - 1
      setFlash('miss')
    }

    setAttempts(nextAttempts)
    setScore(nextScore)
    setStreak(nextStreak)
    setBestStreak(nextBest)
    setHits(nextHits)
    setLives(nextLives)

    window.setTimeout(() => {
      if (nextLives <= 0) {
        endRun({
          nextScore,
          nextHits,
          nextAttempts,
          nextBest,
          nextLives,
          nextRound: s.round,
        })
        return
      }
      if (s.round >= TOTAL_ROUNDS) {
        endRun({
          nextScore,
          nextHits,
          nextAttempts,
          nextBest,
          nextLives,
          nextRound: TOTAL_ROUNDS,
        })
        return
      }
      const nxt = s.round + 1
      setRound(nxt)
      deal(nxt)
    }, success ? 280 : 420)
  }

  function tap(index) {
    if (phase !== 'play' || locked.current || !live.current || !board) return
    locked.current = true
    live.current = false
    resolve(index === board.oddIndex)
  }

  const strikes = LIVES - lives

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
            <h1 className="glowing-title">FIND THE GLITCH</h1>
            <div className="subtitle-code">PROJECT CELL // FIRST YEAR CHALLENGE</div>

            <div className="unauthorized-warning">
              <span>⚠ UNAUTHORIZED USER DETECTED</span>
            </div>

            <p className="prompt-text">
              {showIntel ? (
                <span>
                  <strong>TACTICAL INTEL:</strong> One glyph in the optical array is corrupted by rotation, color shift,
                  size delta, or missing traces. Rapid isolation stacks multipliers. 3 strikes will burn CPU core.
                </span>
              ) : (
                <>
                  Select your operational difficulty. Every mode contains <strong>10 anomaly missions</strong>.
                </>
              )}
            </p>

            <div className="beveled-button-grid cols-2">
              <button
                type="button"
                className="beveled-btn is-active"
                onClick={begin}
              >
                <span className="btn-title">STANDARD SCAN</span>
                <span className="btn-subtitle">10 MISSIONS // 3 STRIKES MAX</span>
              </button>

              <button
                type="button"
                className="beveled-btn"
                onClick={begin}
              >
                <span className="btn-title">HIGH SENSITIVITY</span>
                <span className="btn-subtitle">SPEED BONUS // COMBO MULTIPLIER</span>
              </button>

              <button
                type="button"
                className="beveled-btn full-width"
                onClick={begin}
              >
                <span className="btn-title">FULL MATRIX PURGE</span>
                <span className="btn-subtitle">INITIALIZE ALL 10 ANOMALY STAGES</span>
              </button>
            </div>
          </div>

          <div className="screen-bottom-bar">
            <span>MODE: SELECTION</span>
            <span>SCORE: 0000</span>
          </div>
        </div>

        {/* 4-Box HUD Stat Display */}
        <div className="hud-panel-row">
          <div className="hud-panel-box">
            <span className="hud-box-label">MISSION</span>
            <span className="hud-box-value">01 / 10</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">TIME</span>
            <span className="hud-box-value">12:00</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">HINTS</span>
            <span className="hud-box-value">03</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">STRIKES</span>
            <span className="hud-box-value">0 / 3</span>
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
            onClick={begin}
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
            <span>BOOT // ANOMALY SCAN REPORT</span>
            <span>STATUS: COMPLETE</span>
          </div>

          <div className="screen-body">
            <h1 className="glowing-title">SCAN COMPLETE</h1>
            <div className="subtitle-code">RATING // {final.rank}</div>

            <div className="result-stats-table">
              <div className="result-stat-row">
                <span>FINAL INTEGRITY SCORE</span>
                <strong>{final.score} PTS</strong>
              </div>
              <div className="result-stat-row">
                <span>STAGES CLEARED</span>
                <strong>{final.rounds} / {TOTAL_ROUNDS}</strong>
              </div>
              <div className="result-stat-row">
                <span>PEAK STREAK MULTIPLIER</span>
                <strong>x{final.bestStreak}</strong>
              </div>
              <div className="result-stat-row">
                <span>OPTICAL SCAN ACCURACY</span>
                <strong>{final.accuracy}%</strong>
              </div>
              <div className="result-stat-row">
                <span>PARITY HITS</span>
                <strong>{final.hits} / {final.attempts}</strong>
              </div>
            </div>
          </div>

          <div className="screen-bottom-bar">
            <span>STATUS: EVALUATION_COMPLETE</span>
            <span>SCORE: {final.score}</span>
          </div>
        </div>

        <div className="hud-panel-row">
          <div className="hud-panel-box">
            <span className="hud-box-label">MISSION</span>
            <span className="hud-box-value">{final.rounds} / {TOTAL_ROUNDS}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">SCORE</span>
            <span className="hud-box-value">{final.score}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">ACCURACY</span>
            <span className="hud-box-value">{final.accuracy}%</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">STRIKES</span>
            <span className="hud-box-value">{strikes} / {LIVES}</span>
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
            [?] VIEW BRIEFING
          </button>
          <button
            type="button"
            className="tactical-btn btn-red"
            onClick={begin}
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

  if (!board) return null

  // ==========================================
  // PHASE: ACTIVE GAME RUN
  // ==========================================
  return (
    <>
      <div className={`crt-screen flash-${flash || 'idle'}`}>
        <div className="screen-header-bar">
          <span>SCAN // ANOMALY MATRIX STAGE {round}</span>
          <span>WINDOW: {left.toFixed(1)}S</span>
        </div>

        <div className="screen-body" style={{ minHeight: '340px' }}>
          <div className="game-timer-strip" aria-hidden="true">
            <span style={{ width: `${(left / board.seconds) * 100}%` }} />
          </div>

          <div
            className="glitch-grid"
            style={{ gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
          >
            {board.cells.map((cell) => (
              <button
                key={`${round}-${cell.index}`}
                type="button"
                className="glitch-cell"
                onClick={() => tap(cell.index)}
                aria-label="Grid node"
              >
                <span
                  className="glitch-item"
                  style={{
                    transform: `translate(${cell.dx}px, ${cell.dy}px) rotate(${cell.rotate}deg) scale(${cell.scale})`,
                  }}
                >
                  <TechGlyph name={cell.glyph} color={cell.color} variant={cell.variant} />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="screen-bottom-bar">
          <span>STREAK: x{streak}</span>
          <span>SCORE: {score}</span>
        </div>
      </div>

      {/* 4-Box HUD Stat Display (EXACT MATCH TO REFERENCE) */}
      <div className="hud-panel-row">
        <div className="hud-panel-box">
          <span className="hud-box-label">MISSION</span>
          <span className="hud-box-value">{String(round).padStart(2, '0')} / {TOTAL_ROUNDS}</span>
        </div>
        <div className={`hud-panel-box${left <= 2.5 ? ' is-warn' : ''}`}>
          <span className="hud-box-label">TIME</span>
          <span className="hud-box-value">{left.toFixed(1)}s</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">SCORE</span>
          <span className="hud-box-value">{score}</span>
        </div>
        <div className={`hud-panel-box${strikes > 0 ? ' is-warn' : ''}`}>
          <span className="hud-box-label">STRIKES</span>
          <span className="hud-box-value">{strikes} / {LIVES}</span>
        </div>
      </div>

      {/* Tactical Action Buttons */}
      <div className="tactical-actions-row">
        <button
          type="button"
          className="tactical-btn btn-amber"
          onClick={() => setShowIntel((prev) => !prev)}
        >
          [?] {showIntel ? 'ANOMALY: FIND ODD' : 'REQUEST INTEL'}
        </button>
        <button
          type="button"
          className="tactical-btn btn-red"
          onClick={begin}
        >
          [ CORE ] RESET ARRAY
        </button>
        <Link to="/games" className="tactical-btn btn-blue">
          [0] ABORT / DECK
        </Link>
      </div>
    </>
  )
}
