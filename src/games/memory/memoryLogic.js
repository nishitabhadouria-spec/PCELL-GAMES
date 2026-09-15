import { GLYPH_KEYS } from '../../components/icons/TechGlyphs.jsx'
import { shuffle } from '../../utils/random.js'

export const MEMORY_DIFFICULTIES = [
  { id: 'easy', label: 'Easy', pairs: 6, cols: 3, bonus: 1 },
  { id: 'medium', label: 'Medium', pairs: 8, cols: 4, bonus: 1.35 },
  { id: 'hard', label: 'Hard', pairs: 10, cols: 4, bonus: 1.75 },
]

const PAIR_COLORS = [
  '#00f0ff', // Electric Cyan
  '#00ff66', // Phosphor Matrix Green
  '#ffb703', // Industrial Amber
  '#38bdf8', // Cyber Sky Blue
  '#ff4d00', // Safety Orange
  '#10e88a', // Terminal Emerald
  '#ff2a4b', // Crimson Core
  '#00e5ff', // Laser Blue
  '#ffd000', // Warning Gold
  '#2dd4bf', // Tech Teal
]


export function createMemoryDeck(difficultyId = 'medium') {
  const difficulty = MEMORY_DIFFICULTIES.find((item) => item.id === difficultyId) || MEMORY_DIFFICULTIES[1]
  const glyphs = shuffle(GLYPH_KEYS).slice(0, difficulty.pairs)
  const cards = glyphs.flatMap((glyph, index) => {
    const color = PAIR_COLORS[index % PAIR_COLORS.length]
    return [0, 1].map((copy) => ({
      id: `${glyph}-${copy}-${index}`,
      glyph,
      color,
      flipped: false,
      matched: false,
    }))
  })
  return {
    difficulty,
    cards: shuffle(cards),
  }
}

export function scoreMemory({ pairs, moves, seconds, bonus }) {
  const timeBonus = Math.max(0, 220 - seconds) * 3
  const movePenalty = Math.max(0, moves - pairs) * 9
  const raw = pairs * 140 + timeBonus - movePenalty
  const perfect = moves === pairs ? 420 : 0
  return Math.max(0, Math.round((raw + perfect) * bonus))
}

export function rankMemory(score, difficultyId) {
  const bar = difficultyId === 'hard' ? 1800 : difficultyId === 'medium' ? 1400 : 1000
  if (score >= bar) return 'SYNC LOCKED'
  if (score >= bar * 0.65) return 'LINK ESTABLISHED'
  return 'SIGNAL FRAGMENTED'
}
