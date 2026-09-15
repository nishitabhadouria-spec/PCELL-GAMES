import { GLYPH_KEYS, SIMILAR_GLYPHS } from '../../components/icons/TechGlyphs.jsx'
import { pick, pickExcept, rand, randInt, sign } from '../../utils/random.js'

// Cyberpunk retro terminal hue spectrum (cyans, blues, emeralds, ambers, oranges, crimsons)
const HUES = [188, 208, 150, 135, 42, 22, 355, 172, 222]


export function roundSettings(round, viewportWidth) {
  let size = 3
  let seconds = 12
  let intensity = 1
  if (round <= 2) {
    size = 3
    seconds = 12
    intensity = 1
  } else if (round <= 4) {
    size = 4
    seconds = 10
    intensity = 2
  } else if (round <= 6) {
    size = 5
    seconds = 8
    intensity = 3
  } else {
    size = viewportWidth < 480 ? 5 : 6
    seconds = 7
    intensity = 4
  }
  return { size, seconds, intensity, count: size * size }
}

function typesFor(intensity) {
  if (intensity === 1) return ['color', 'icon', 'rotation', 'orientation']
  if (intensity === 2) return ['shade', 'rotation', 'size', 'missing', 'icon-similar', 'extra']
  if (intensity === 3) return ['shade', 'pattern', 'missing', 'extra', 'shape', 'asymmetry', 'rotation', 'size']
  return ['shade', 'pattern', 'displacement', 'missing', 'asymmetry', 'shape', 'size', 'rotation']
}

function hsl(h, s, l) {
  return `hsl(${h} ${s}% ${l}%)`
}

function baseSwatch() {
  const h = pick(HUES)
  const s = randInt(62, 78)
  const l = randInt(58, 68)
  return { h, s, l, css: hsl(h, s, l) }
}

function shadeOf(swatch, intensity) {
  const delta = intensity === 2 ? rand(10, 16) : intensity === 3 ? rand(6, 10) : rand(3.5, 6.5)
  const h = (swatch.h + delta * sign() + 360) % 360
  const s = Math.max(40, Math.min(86, swatch.s + rand(-6, 6)))
  const l = Math.max(48, Math.min(74, swatch.l + rand(-5, 5) * (intensity >= 3 ? 0.6 : 1)))
  return hsl(h, s, l)
}

function farColor(swatch) {
  const h = (swatch.h + pick([48, 70, 110, 150]) * sign() + 360) % 360
  return hsl(h, swatch.s, swatch.l)
}

export function createGlitchRound(round, viewportWidth) {
  const settings = roundSettings(round, viewportWidth)
  const type = pick(typesFor(settings.intensity))
  const swatch = baseSwatch()
  const glyph = pick(GLYPH_KEYS)
  const oddIndex = randInt(0, settings.count - 1)
  const mag = { 1: 1, 2: 0.58, 3: 0.3, 4: 0.13 }[settings.intensity]

  const base = {
    glyph,
    color: swatch.css,
    rotate: 0,
    scale: 1,
    dx: 0,
    dy: 0,
    variant: 'normal',
  }

  const odd = { ...base }

  switch (type) {
    case 'color':
      odd.color = farColor(swatch)
      break
    case 'shade':
      odd.color = shadeOf(swatch, settings.intensity)
      break
    case 'icon':
      odd.glyph = pickExcept(GLYPH_KEYS, glyph)
      break
    case 'icon-similar':
      odd.glyph = SIMILAR_GLYPHS[glyph] || pickExcept(GLYPH_KEYS, glyph)
      break
    case 'rotation':
      odd.rotate = (7 + mag * 24) * sign()
      break
    case 'orientation':
      odd.rotate = pick([90, -90, 180])
      break
    case 'size':
      odd.scale = 1 + (0.05 + mag * 0.16) * sign()
      break
    case 'missing':
      odd.variant = 'missing'
      break
    case 'extra':
      odd.variant = 'extra'
      break
    case 'pattern':
      odd.variant = 'pattern'
      break
    case 'shape':
      odd.variant = 'shape'
      break
    case 'asymmetry':
      odd.variant = 'asym'
      odd.rotate = mag * 3.4 * sign()
      break
    case 'displacement':
      odd.dx = (1.2 + mag * 5.5) * sign()
      odd.dy = (1.2 + mag * 5.5) * sign()
      break
    default:
      odd.color = shadeOf(swatch, settings.intensity)
  }

  const cells = Array.from({ length: settings.count }, (_, index) => ({
    index,
    ...(index === oddIndex ? odd : base),
    odd: index === oddIndex,
  }))

  return {
    ...settings,
    type,
    oddIndex,
    cells,
    palette: swatch.css,
  }
}

export function scoreGlitchHit({ round, secondsLeft, seconds, streak }) {
  const base = 90 + round * 28
  const speed = Math.round((secondsLeft / seconds) * (70 + round * 6))
  const combo = 1 + Math.min(streak, 8) * 0.16
  return Math.round((base + speed) * combo)
}

export function rankGlitch({ score, accuracy, bestStreak }) {
  if (accuracy >= 80 && bestStreak >= 5) return 'EYE OF THE GRID'
  if (score >= 1400 || accuracy >= 65) return 'SIGNAL LOCK'
  return 'STATIC DETECTED'
}
