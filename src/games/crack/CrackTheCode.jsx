import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHALLENGES, MODES, rankCrack } from './crackLogic.js'
import { initAudio, playCrackSfx } from './crackAudio.js'

export default function CrackTheCode({ game: _gameProp }) {
  const [phase, setPhase] = useState('brief') // 'brief' | 'play' | 'result'
  const [modeKey, setModeKey] = useState('EASY')
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(500)
  const [hints, setHints] = useState(3)
  const [strikes, setStrikes] = useState(0)
  const [time, setTime] = useState(420)
  const [selectedOption, setSelectedOption] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [hintActive, setHintActive] = useState(false)
  const [final, setFinal] = useState(null)
  const [showBreachModal, setShowBreachModal] = useState(true)
  const [showIntel, setShowIntel] = useState(false)

  const busyRef = useRef(false)
  const warningPlayedRef = useRef(false)
  const timerRef = useRef(null)

  const currentMode = MODES[modeKey] || MODES.EASY
  const currentChallengeList = CHALLENGES[modeKey] || CHALLENGES.EASY
  const currentChallenge = currentChallengeList[level] || currentChallengeList[0]

  // Play breach alarm sound on initial arrival
  useEffect(() => {
    const timer = setTimeout(() => {
      playCrackSfx('danger')
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const handleFinish = useCallback((win, reason, overrideScore, overrideStrikes, overrideTime, overrideLevel) => {
    if (timerRef.current) clearInterval(timerRef.current)
    busyRef.current = true

    const finalScoreBase = overrideScore !== undefined ? overrideScore : score
    const finalStrikes = overrideStrikes !== undefined ? overrideStrikes : strikes
    const timeRemaining = overrideTime !== undefined ? overrideTime : time
    const initialTime = currentMode.time
    const speedThreshold = Math.floor(initialTime * 0.4)
    const earnedSpeedBonus = win && timeRemaining >= speedThreshold ? currentMode.speed : 0
    const totalScore = finalScoreBase + earnedSpeedBonus
    const currentLvl = overrideLevel !== undefined ? overrideLevel : level

    if (win) {
      playCrackSfx('unlock')
    } else {
      playCrackSfx('alarm')
    }

    const rank = rankCrack({
      score: totalScore,
      modeId: modeKey,
      strikes: finalStrikes,
      win,
    })

    setFinal({
      win,
      reason,
      score: totalScore,
      speedBonus: earnedSpeedBonus,
      rank,
      mode: currentMode.label,
      missionsCleared: win ? 5 : currentLvl,
      totalMissions: 5,
      strikes: finalStrikes,
      timeRemaining,
      timeSpent: initialTime - timeRemaining,
      hintsUsed: currentMode.hints - hints,
    })

    setPhase('result')
  }, [currentMode.hints, currentMode.label, currentMode.speed, currentMode.time, hints, level, modeKey, score, strikes, time])

  // Timer countdown during 'play' phase
  useEffect(() => {
    if (phase !== 'play') {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current)
          handleFinish(false, 'TIME EXPIRED', undefined, undefined, 0, undefined)
          return 0
        }
        if (prevTime === 61 && !warningPlayedRef.current) {
          warningPlayedRef.current = true
          playCrackSfx('warning')
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [handleFinish, phase])

  function start(selectedModeKey = modeKey) {
    initAudio()
    setShowBreachModal(false)
    playCrackSfx('boot')

    const modeObj = MODES[selectedModeKey] || MODES.EASY
    setModeKey(selectedModeKey)
    setLevel(0)
    setScore(modeObj.base * 5)
    setHints(modeObj.hints)
    setStrikes(0)
    setTime(modeObj.time)
    setSelectedOption(null)
    setFeedback(null)
    setHintActive(false)
    setFinal(null)
    setShowIntel(false)
    busyRef.current = false
    warningPlayedRef.current = false

    setPhase('play')
  }

  function handleAnswer(opt) {
    if (phase !== 'play' || busyRef.current || selectedOption !== null) return
    busyRef.current = true
    setSelectedOption(opt)

    const isCorrect = opt === currentChallenge.answer

    if (isCorrect) {
      playCrackSfx('correct')
      const nextScore = score + currentMode.base
      setScore(nextScore)
      setFeedback({
        type: 'correct',
        text: currentChallenge.explanation,
      })

      setTimeout(() => {
        if (level >= 4) {
          // All 5 missions cleared!
          handleFinish(true, 'ALL 5 MISSIONS COMPLETE', nextScore, strikes, time, 5)
        } else {
          setLevel((l) => l + 1)
          setSelectedOption(null)
          setFeedback(null)
          setHintActive(false)
          busyRef.current = false
          playCrackSfx('click')
        }
      }, 900)
    } else {
      playCrackSfx('wrong')
      const nextStrikes = strikes + 1
      const nextScore = Math.max(0, score - Math.round(currentMode.base / 2))
      setStrikes(nextStrikes)
      setScore(nextScore)
      setFeedback({
        type: 'wrong',
        text: 'STRIKE REGISTERED',
      })

      if (nextStrikes >= 3) {
        setTimeout(() => {
          handleFinish(false, 'THREE STRIKES REGISTERED', nextScore, nextStrikes, time, level)
        }, 800)
      } else {
        setTimeout(() => {
          setSelectedOption(null)
          setFeedback(null)
          busyRef.current = false
        }, 750)
      }
    }
  }

  function handleHint() {
    if (phase !== 'play' || busyRef.current || hints <= 0 || hintActive) return

    setHints((h) => Math.max(0, h - 1))
    setScore((s) => Math.max(0, s - 50))
    setHintActive(true)
    playCrackSfx('hint')
  }

  const activeMode = useMemo(() => MODES[modeKey] || MODES.EASY, [modeKey])

  // ==========================================
  // PHASE: BRIEFING & DIFFICULTY SELECTION
  // ==========================================
  if (phase === 'brief') {
    return (
      <>
        {/* Security Breach Danger Overlay */}
        {showBreachModal && (
          <div className="danger-overlay show" role="alertdialog" aria-modal="true">
            <div className="danger-panel">
              <div className="danger-top">⚠ SECURITY BREACH DETECTED ⚠</div>
              <div className="danger-main">P-CELL NODE COMPROMISED</div>
              <div className="danger-sub">UNAUTHORIZED ACCESS // UNKNOWN USER</div>
              <div className="danger-bar" aria-hidden="true">
                <span />
              </div>
              <div className="danger-copy">
                SYSTEM CORE HAS BEEN LOCKED.
                <br />
                SOLVE THE SECURITY PROTOCOL TO CLAIM ACCESS.
              </div>
              <button
                type="button"
                className="tactical-btn btn-red danger-start-btn"
                onClick={() => {
                  initAudio()
                  setShowBreachModal(false)
                  playCrackSfx('click')
                }}
              >
                [ INITIATE SECURITY OVERRIDE ]
              </button>
            </div>
          </div>
        )}

        <div className="crt-screen">
          <div className="screen-header-bar">
            <span>BOOT // SELECT DIFFICULTY</span>
            <span>STANDBY</span>
          </div>

          <div className="screen-body">
            <h1 className="glowing-title">CRACK THE CODE</h1>
            <div className="subtitle-code">PROJECT CELL // FIRST YEAR CHALLENGE</div>

            <div className="unauthorized-warning">
              <span>⚠ UNAUTHORIZED USER DETECTED</span>
            </div>

            <p className="prompt-text">
              {showIntel ? (
                <span>
                  <strong>TACTICAL INTEL:</strong> Analyze pattern progressions, ASCII binary streams, and Caesar shift
                  ciphers. 5 missions per tier. 3 strikes lock the core. Request Intel reveals hints for -50 points.
                </span>
              ) : (
                <>
                  Select your operational difficulty. Every mode contains <strong>5 encryption missions</strong>.
                </>
              )}
            </p>

            <div className="beveled-button-grid cols-2">
              <button
                type="button"
                className={`beveled-btn${modeKey === 'EASY' ? ' is-active' : ''}`}
                onClick={() => setModeKey('EASY')}
              >
                <span className="btn-title">EASY</span>
                <span className="btn-subtitle">420 SEC // 3 HINTS // 1.0X</span>
              </button>

              <button
                type="button"
                className={`beveled-btn${modeKey === 'HARD' ? ' is-active' : ''}`}
                onClick={() => setModeKey('HARD')}
              >
                <span className="btn-title">HARD</span>
                <span className="btn-subtitle">360 SEC // 2 HINTS // 1.5X</span>
              </button>

              <button
                type="button"
                className={`beveled-btn full-width${modeKey === 'EXTREME' ? ' is-active' : ''}`}
                onClick={() => setModeKey('EXTREME')}
              >
                <span className="btn-title">EXTREME</span>
                <span className="btn-subtitle">300 SEC // 1 HINT // 2.0X</span>
              </button>
            </div>
          </div>

          <div className="screen-bottom-bar">
            <span>MODE: SELECTION</span>
            <span>DIFFICULTY: {activeMode.label.toUpperCase()}</span>
          </div>
        </div>

        {/* 4-Box HUD Stat Display */}
        <div className="hud-panel-row">
          <div className="hud-panel-box">
            <span className="hud-box-label">MISSION</span>
            <span className="hud-box-value">00 / 05</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">TIME</span>
            <span className="hud-box-value">{formatTime(activeMode.time)}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">HINTS</span>
            <span className="hud-box-value">{activeMode.hints}</span>
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
            [?] {showIntel ? 'HIDE INTEL' : 'REQUEST INTEL'}
          </button>
          <button
            type="button"
            className="tactical-btn btn-red"
            onClick={() => start(modeKey)}
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
  // PHASE: RESULT SCREEN (WIN OR DEFEAT)
  // ==========================================
  if (phase === 'result' && final) {
    return (
      <>
        <div className="crt-screen">
          <div className="screen-header-bar">
            <span>BOOT // {final.win ? 'SYSTEM UNLOCKED' : 'CORE LOCKDOWN'}</span>
            <span>STATUS: {final.win ? 'SUCCESS' : 'FAILED'}</span>
          </div>

          <div className="screen-body">
            <h1
              className="glowing-title"
              style={{ color: final.win ? 'var(--green-term)' : 'var(--red-term)' }}
            >
              {final.win ? 'SYSTEM UNLOCKED' : 'ACCESS DENIED'}
            </h1>
            <div className="subtitle-code">
              {final.win ? `RATING // ${final.rank}` : `STATUS // ${final.reason}`}
            </div>

            <div className="result-stats-table">
              <div className="result-stat-row">
                <span>TOTAL OVERRIDE SCORE</span>
                <strong>{final.score} PTS</strong>
              </div>
              <div className="result-stat-row">
                <span>DIFFICULTY TIER</span>
                <strong>{final.mode.toUpperCase()}</strong>
              </div>
              <div className="result-stat-row">
                <span>MISSIONS SOLVED</span>
                <strong>
                  {final.missionsCleared} / {final.totalMissions}
                </strong>
              </div>
              <div className="result-stat-row">
                <span>TIME REMAINING</span>
                <strong>{formatTime(final.timeRemaining)}</strong>
              </div>
              {final.speedBonus > 0 && (
                <div className="result-stat-row">
                  <span>SPEED BONUS</span>
                  <strong style={{ color: 'var(--amber-term)' }}>+{final.speedBonus} PTS</strong>
                </div>
              )}
              <div className="result-stat-row">
                <span>STRIKES REGISTERED</span>
                <strong style={{ color: final.strikes > 0 ? 'var(--red-term)' : 'var(--green-term)' }}>
                  {final.strikes} / 3
                </strong>
              </div>
            </div>
          </div>

          <div className="screen-bottom-bar">
            <span>STATUS: {final.win ? 'OVERRIDE_COMPLETE' : 'BREACH_FAILED'}</span>
            <span>SCORE: {final.score}</span>
          </div>
        </div>

        {/* 4-Box HUD Stat Display */}
        <div className="hud-panel-row">
          <div className="hud-panel-box">
            <span className="hud-box-label">MISSION</span>
            <span className="hud-box-value">
              {String(final.missionsCleared).padStart(2, '0')} / 05
            </span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">SCORE</span>
            <span className="hud-box-value">{final.score}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">TIME</span>
            <span className="hud-box-value">{formatTime(final.timeRemaining)}</span>
          </div>
          <div className="hud-panel-box">
            <span className="hud-box-label">STRIKES</span>
            <span className="hud-box-value">{final.strikes} / 3</span>
          </div>
        </div>

        {/* Tactical Action Buttons */}
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
            onClick={() => start(modeKey)}
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
  // PHASE: IN-GAME MISSION PLAY
  // ==========================================
  return (
    <>
      <div className="crt-screen">
        <div className="screen-header-bar">
          <span>
            MISSION {level + 1} // {currentChallenge.cat}
          </span>
          <span style={{ color: time <= 60 ? 'var(--red-term)' : 'var(--green-term)' }}>
            ACTIVE
          </span>
        </div>

        <div className="screen-body crack-play-body">
          <h2 className="crack-mission-title">{currentChallenge.title}</h2>

          <div className="crack-stream-code">{currentChallenge.streamText}</div>

          {currentChallenge.cipherText && (
            <div className="crack-cipher-block">
              <span className="crack-cipher-text">{currentChallenge.cipherText}</span>
            </div>
          )}

          {currentChallenge.metaInfo && (
            <div className="crack-meta-info">{currentChallenge.metaInfo}</div>
          )}

          {currentChallenge.hintBox && (
            <div className="crack-hintbox">
              {currentChallenge.hintBox.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          <div className="crack-subprompt">{currentChallenge.subPrompt}</div>

          {/* 4 Options Grid */}
          <div className="crack-options-grid">
            {currentChallenge.options.map((opt) => {
              const isSelected = selectedOption === opt
              let statusClass = ''
              if (selectedOption !== null) {
                if (isSelected) {
                  statusClass = opt === currentChallenge.answer ? ' is-correct' : ' is-wrong'
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  className={`crack-choice-btn${statusClass}`}
                  disabled={selectedOption !== null}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Real-time Feedback Bar */}
          {feedback && (
            <div className={`crack-feedback-banner ${feedback.type}`}>
              <div className="feedback-head">
                {feedback.type === 'correct' ? '✓ ACCESS GRANTED' : '✕ ACCESS DENIED'}
              </div>
              <div className="feedback-body">{feedback.text}</div>
            </div>
          )}

          {/* Intel Hint Display */}
          {hintActive && !feedback && (
            <div className="crack-feedback-banner hint">
              <div className="feedback-head">💡 TACTICAL INTEL</div>
              <div className="feedback-body">{currentChallenge.hint}</div>
            </div>
          )}
        </div>

        <div className="screen-bottom-bar">
          <span>MODE: {modeKey}</span>
          <span>SCORE: {String(Math.max(0, score)).padStart(4, '0')}</span>
        </div>
      </div>

      {/* 4-Box HUD Stat Display */}
      <div className="hud-panel-row">
        <div className="hud-panel-box">
          <span className="hud-box-label">MISSION</span>
          <span className="hud-box-value">0{level + 1} / 05</span>
        </div>
        <div className={`hud-panel-box${time <= 60 ? ' is-warn' : ''}`}>
          <span className="hud-box-label">TIME</span>
          <span className="hud-box-value">{formatTime(time)}</span>
        </div>
        <div className="hud-panel-box">
          <span className="hud-box-label">HINTS</span>
          <span className="hud-box-value">{hints}</span>
        </div>
        <div className={`hud-panel-box${strikes > 0 ? ' is-warn' : ''}`}>
          <span className="hud-box-label">STRIKES</span>
          <span className="hud-box-value">{strikes} / 3</span>
        </div>
      </div>

      {/* Tactical Action Buttons */}
      <div className="tactical-actions-row">
        <button
          type="button"
          className="tactical-btn btn-amber"
          disabled={hints <= 0 || hintActive || selectedOption !== null}
          onClick={handleHint}
          style={{ opacity: hints <= 0 || hintActive ? 0.6 : 1 }}
        >
          [?] {hintActive ? 'INTEL ACTIVE' : `REQUEST INTEL (${hints})`}
        </button>
        <button
          type="button"
          className="tactical-btn btn-red"
          onClick={() => start(modeKey)}
        >
          [ CORE ] RESET MISSION
        </button>
        <Link to="/games" className="tactical-btn btn-blue">
          [0] ABORT / DECK
        </Link>
      </div>
    </>
  )
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
