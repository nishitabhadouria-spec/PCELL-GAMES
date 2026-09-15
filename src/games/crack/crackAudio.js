let audioCtx = null

export function initAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    if (!audioCtx) {
      audioCtx = new AudioContextClass()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  } catch {
    // ignore audio initialization error
  }
}

export function playTone(freq, dur, type = 'square', vol = 0.045) {
  try {
    initAudio()
    if (!audioCtx) return
    const o = audioCtx.createOscillator()
    const g = audioCtx.createGain()

    o.type = type
    o.frequency.setValueAtTime(freq, audioCtx.currentTime)

    g.gain.setValueAtTime(vol, audioCtx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur)

    o.connect(g)
    g.connect(audioCtx.destination)

    o.start()
    o.stop(audioCtx.currentTime + dur)
  } catch {
    // audio context safety catch
  }
}

export function playCrackSfx(name, enabled = true) {
  if (!enabled) return

  if (name === 'boot') {
    playTone(180, 0.12, 'sawtooth', 0.05)
    setTimeout(() => playTone(300, 0.1, 'square', 0.045), 140)
    setTimeout(() => playTone(620, 0.12, 'square', 0.05), 280)
    setTimeout(() => playTone(950, 0.18, 'triangle', 0.055), 430)
  } else if (name === 'danger') {
    playTone(90, 0.22, 'sawtooth', 0.06)
    setTimeout(() => playTone(150, 0.16, 'square', 0.05), 180)
    setTimeout(() => playTone(70, 0.28, 'sawtooth', 0.055), 340)
    setTimeout(() => playTone(420, 0.07, 'square', 0.045), 680)
    setTimeout(() => playTone(240, 0.1, 'square', 0.045), 800)
    setTimeout(() => playTone(520, 0.14, 'square', 0.05), 940)
  } else if (name === 'click') {
    playTone(720, 0.045, 'square', 0.04)
  } else if (name === 'correct') {
    playTone(620, 0.06, 'triangle', 0.05)
    setTimeout(() => playTone(900, 0.07, 'triangle', 0.05), 80)
    setTimeout(() => playTone(1250, 0.12, 'triangle', 0.055), 170)
  } else if (name === 'wrong') {
    playTone(180, 0.18, 'sawtooth', 0.06)
    setTimeout(() => playTone(110, 0.2, 'sawtooth', 0.05), 100)
  } else if (name === 'hint') {
    playTone(440, 0.06, 'square', 0.04)
    setTimeout(() => playTone(660, 0.1, 'square', 0.04), 80)
  } else if (name === 'warning') {
    playTone(800, 0.08, 'square', 0.05)
    setTimeout(() => playTone(430, 0.08, 'square', 0.05), 130)
  } else if (name === 'unlock') {
    ;[420, 560, 720, 900, 1150, 1500].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.11, 'triangle', 0.055), i * 90)
    })
  } else if (name === 'alarm') {
    playTone(130, 0.18, 'sawtooth', 0.06)
    setTimeout(() => playTone(95, 0.2, 'sawtooth', 0.06), 150)
  }
}
