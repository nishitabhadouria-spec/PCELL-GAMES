export const GAMES = [
  {
    id: 'memory',
    title: 'Memory Match',
    codename: 'MEM-07 // SYNAPSE',
    status: 'live',
    accent: 'cyan',
    tag: 'RAM_TEST',
    blurb: 'Diagnostic scan of damaged memory sectors. Reconnect matching hardware glyphs before bus timeout.',
    summary: 'Restore corrupt memory banks by syncing glyph pairs across the hardware matrix.',
    instructions: [
      'Access bank address by tapping a memory tile. Tap a second tile to verify pairing.',
      'Matching sectors lock permanently with phosphor green verification.',
      'Minimize bus cycles (moves) and clearance time to maximize the sync rating.',
    ],
    tips: 'Hard mode allocates 10 high-density memory sectors on a tight bus. Map your flips strategically.',
  },
  {
    id: 'glitch',
    title: 'Find the Glitch',
    codename: 'ERR-13 // CORRUPT',
    status: 'live',
    accent: 'green',
    tag: 'ANOMALY_SCAN',
    blurb: 'System integrity compromised. Isolate the anomalous node in the circuit grid before scan timeout.',
    summary: 'Detect visual anomalies and corrupt signals hidden in the mainframe matrix.',
    instructions: [
      'The optical scan array displays repeating nodes. Tap the single corrupt element.',
      'Anomalies vary: micro-rotation, color frequency shift, missing traces, or pattern displacement.',
      'High-speed detection builds combo multipliers. Misses trigger parity failure and burn CPU lives.',
    ],
    tips: 'Higher security tiers introduce subtle single-trace defects. Scan terminal edges and internal nodes rapidly.',
  },
  {
    id: 'crack',
    title: 'Crack the Code',
    codename: 'DEC-09 // OVERRIDE',
    status: 'live',
    accent: 'amber',
    tag: 'SECURITY_OVERRIDE',
    blurb: 'System node compromised. Decode shifted ciphers, deduce tokens, and solve logic locks to override security.',
    summary: 'Solve 15 cryptographic missions across 3 difficulty tiers to restore mainframe security clearance.',
    instructions: [
      'Select operational difficulty: Easy, Hard, or Extreme (5 missions per mode).',
      'Analyze number patterns, ASCII binary streams, Caesar shift ciphers, and logic matrices.',
      'Request Intel if you get stuck, but beware: 3 strikes lock the core and abort the breach run.',
    ],
    tips: 'Complete missions with over 40% time remaining to earn mainframe high-speed bonuses.',
  },
  {
    id: 'cipher',
    title: 'Coming Soon',
    codename: 'KEY-21 // ENCRYPT',
    status: 'soon',
    accent: 'teal',
    tag: 'STANDBY',
    blurb: 'Next-generation mainframe encryption module. Firmware allocation in progress.',
    summary: 'High-frequency telemetry cipher matrix. Reserved for next terminal cycle.',
  },
]

export function getGame(id) {
  return GAMES.find((game) => game.id === id)
}

