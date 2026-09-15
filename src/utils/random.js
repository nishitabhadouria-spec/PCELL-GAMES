export function rand(min, max) {
  return Math.random() * (max - min) + min
}

export function randInt(min, max) {
  return Math.floor(rand(min, max + 1))
}

export function pick(list) {
  return list[randInt(0, list.length - 1)]
}

export function pickExcept(list, excluded) {
  const pool = list.filter((item) => item !== excluded)
  return pick(pool.length ? pool : list)
}

export function shuffle(list) {
  const next = [...list]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export function sign() {
  return Math.random() < 0.5 ? -1 : 1
}
