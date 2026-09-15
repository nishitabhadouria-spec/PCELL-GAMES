import MemoryMatch from './memory/MemoryMatch.jsx'
import FindTheGlitch from './glitch/FindTheGlitch.jsx'
import CrackTheCode from './crack/CrackTheCode.jsx'

export const GAME_COMPONENTS = {
  memory: MemoryMatch,
  glitch: FindTheGlitch,
  crack: CrackTheCode,
}

export function getGameComponent(id) {
  return GAME_COMPONENTS[id] || null
}

