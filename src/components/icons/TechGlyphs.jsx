const STROKE = 2.1

function Svg({ children, color }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="glyphSheen" x1="8" y1="6" x2="56" y2="58">
          <stop stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  )
}

function Robot({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      {!missing && <path d="M32 8v7" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />}
      {!missing && <circle cx="32" cy="7" r="2.2" fill={color} />}
      <rect x={shape ? 16 : 14} y="16" width={shape ? 32 : 36} height="30" rx={shape ? 14 : 7} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      <rect x="20" y="24" width="24" height="10" rx="3" stroke={color} strokeWidth={STROKE} />
      <circle cx={asym ? 24 : 26} cy="29" r={asym ? 1.4 : 2.1} fill={color} />
      <circle cx="38" cy="29" r="2.1" fill={color} />
      {pattern ? (
        <>
          <path d="M22 40h20M26 44h12" stroke={color} strokeWidth="1.5" />
          <path d="M24 38v8M40 38v8" stroke={color} strokeWidth="1.2" opacity="0.7" />
        </>
      ) : (
        <path d="M24 42h16" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      )}
      <path d="M18 46v8M46 46v8" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      {extra && <circle cx="48" cy="20" r="2.4" fill={color} />}
    </Svg>
  )
}

function Chip({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <rect x={shape ? 18 : 16} y={shape ? 18 : 16} width={shape ? 28 : 32} height={shape ? 28 : 32} rx={shape ? 10 : 4} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {!missing && (
        <>
          <path d="M22 16V10M32 16V10M42 16V10" stroke={color} strokeWidth={STROKE} />
          <path d="M22 48v6M32 48v6M42 48v6" stroke={color} strokeWidth={STROKE} />
          <path d="M16 22H10M16 32H10M16 42H10" stroke={color} strokeWidth={STROKE} />
          <path d="M48 22h6M48 32h6M48 42h6" stroke={color} strokeWidth={STROKE} />
        </>
      )}
      {pattern ? (
        <>
          <rect x="24" y="24" width="16" height="16" stroke={color} strokeWidth="1.4" />
          <path d="M24 32h16M32 24v16" stroke={color} strokeWidth="1.2" />
        </>
      ) : (
        <rect x="24" y="24" width="16" height="16" rx="2" stroke={color} strokeWidth={STROKE} />
      )}
      {extra && <circle cx="32" cy="32" r="2.2" fill={color} />}
      {asym && <path d="M40 22h6" stroke={color} strokeWidth={STROKE} />}
    </Svg>
  )
}

function Lock({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <path
        d={shape ? 'M20 28v-6a12 12 0 0 1 24 0v6' : 'M20 28v-8a12 12 0 0 1 24 0v8'}
        stroke={color}
        strokeWidth={STROKE}
        opacity={missing ? 0 : 1}
      />
      <rect x="16" y="28" width="32" height="24" rx={shape ? 12 : 5} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      <circle cx={asym ? 30 : 32} cy="38" r="3.2" stroke={color} strokeWidth={STROKE} />
      {pattern ? (
        <path d="M20 44h24M24 48h16" stroke={color} strokeWidth="1.3" />
      ) : (
        <path d="M32 41v6" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      )}
      {extra && <circle cx="44" cy="34" r="2" fill={color} />}
    </Svg>
  )
}

function Laptop({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <rect x="14" y="14" width="36" height="24" rx={shape ? 8 : 3} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {pattern ? (
        <path d="M20 20h24M20 26h16M20 32h20" stroke={color} strokeWidth="1.4" />
      ) : (
        <rect x="18" y="18" width="28" height="16" rx="1.5" stroke={color} strokeWidth="1.5" />
      )}
      {!missing && <path d="M10 42h44l4 8H6l4-8Z" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />}
      {missing && <path d="M14 42h36" stroke={color} strokeWidth={STROKE} />}
      {extra && <circle cx="32" cy="46" r="1.8" fill={color} />}
    </Svg>
  )
}

function Phone({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <rect x={shape ? 18 : 20} y="8" width={shape ? 28 : 24} height="48" rx={shape ? 12 : 6} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {!missing && <path d="M28 12h8" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />}
      {pattern ? (
        <>
          <path d="M26 22h12M26 28h12M26 34h8" stroke={color} strokeWidth="1.4" />
          <rect x="26" y="40" width="12" height="6" stroke={color} strokeWidth="1.2" />
        </>
      ) : (
        <rect x="24" y="18" width="16" height="26" rx="1.5" stroke={color} strokeWidth="1.5" />
      )}
      {!missing && <circle cx={asym ? 30 : 32} cy="50" r="1.8" fill={color} />}
      {extra && <circle cx="40" cy="16" r="2" fill={color} />}
    </Svg>
  )
}

function Brain({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <path
        d={
          shape
            ? 'M18 30c0-10 8-16 14-16s14 6 14 16-6 18-14 18-14-8-14-18Z'
            : 'M20 28c-6-2-8-12 0-16 4-8 20-8 24 0 8 3 8 14 2 17 2 8-6 17-14 17s-16-8-12-18Z'
        }
        stroke={color}
        strokeWidth={STROKE}
        fill="url(#glyphSheen)"
      />
      {!missing && <path d="M32 14v34" stroke={color} strokeWidth={STROKE} />}
      {pattern ? (
        <>
          <path d="M22 24h8M34 24h8M22 32h8M34 32h8" stroke={color} strokeWidth="1.3" />
        </>
      ) : (
        <path d="M22 26c4 2 8-2 10 2M32 28c4 2 8-2 10 3M22 36c5 1 8-3 10 1" stroke={color} strokeWidth="1.5" />
      )}
      {extra && <circle cx="44" cy="20" r="2.2" fill={color} />}
    </Svg>
  )
}

function Controller({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <path
        d={shape ? 'M12 28h40v16a10 10 0 0 1-10 10H22A10 10 0 0 1 12 44V28Z' : 'M10 30c0-6 6-10 12-10h20c6 0 12 4 12 10 0 8-4 18-12 18h-4l-4-6h-4l-4 6h-4c-8 0-12-10-12-18Z'}
        stroke={color}
        strokeWidth={STROKE}
        fill="url(#glyphSheen)"
      />
      <circle cx="22" cy="34" r="3" stroke={color} strokeWidth={STROKE} />
      <circle cx={asym ? 44 : 42} cy="34" r="3" stroke={color} strokeWidth={STROKE} />
      {!missing && (
        <>
          <path d="M22 31v6M19 34h6" stroke={color} strokeWidth="1.5" />
          <circle cx="40" cy="31" r="1.3" fill={color} />
          <circle cx="44" cy="36" r="1.3" fill={color} />
        </>
      )}
      {pattern && <path d="M28 40h8" stroke={color} strokeWidth="1.4" />}
      {extra && <rect x="30" y="22" width="4" height="6" rx="1" fill={color} />}
    </Svg>
  )
}

function Vr({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <path
        d={shape ? 'M10 24h44v18a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V24Z' : 'M8 26h48v16c0 6-6 10-12 10h-6l-6-6-6 6h-6c-6 0-12-4-12-10V26Z'}
        stroke={color}
        strokeWidth={STROKE}
        fill="url(#glyphSheen)"
      />
      {!missing && <path d="M20 18h24" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />}
      {pattern ? (
        <path d="M16 34h12M36 34h12M22 40h20" stroke={color} strokeWidth="1.4" />
      ) : (
        <>
          <rect x="14" y="30" width="14" height="10" rx="3" stroke={color} strokeWidth={STROKE} />
          <rect x="36" y="30" width="14" height="10" rx="3" stroke={color} strokeWidth={STROKE} />
        </>
      )}
      {extra && <circle cx="32" cy="34" r="2" fill={color} />}
    </Svg>
  )
}

function Drone({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <circle cx="16" cy="16" r="7" stroke={color} strokeWidth={STROKE} />
      <circle cx="48" cy="16" r="7" stroke={color} strokeWidth={STROKE} />
      <circle cx="16" cy="48" r="7" stroke={color} strokeWidth={STROKE} />
      <circle cx={asym ? 46 : 48} cy="48" r={asym ? 5 : 7} stroke={color} strokeWidth={STROKE} />
      <rect x={shape ? 24 : 22} y={shape ? 24 : 22} width={shape ? 16 : 20} height={shape ? 16 : 20} rx={shape ? 8 : 4} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {!missing && (
        <>
          <path d="M22 26L16 16M42 26L48 16M22 38L16 48M42 38L48 48" stroke={color} strokeWidth={STROKE} />
        </>
      )}
      {pattern ? <path d="M28 32h8M32 28v8" stroke={color} strokeWidth="1.4" /> : <circle cx="32" cy="32" r="3" fill={color} />}
      {extra && <circle cx="32" cy="12" r="2" fill={color} />}
    </Svg>
  )
}

function Camera({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <rect x="10" y="22" width="44" height="28" rx={shape ? 14 : 6} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {!missing && <path d="M22 22l4-8h12l4 8" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />}
      <circle cx="32" cy="36" r="9" stroke={color} strokeWidth={STROKE} />
      {pattern ? (
        <>
          <circle cx="32" cy="36" r="4" stroke={color} strokeWidth="1.3" />
          <path d="M32 28v16M24 36h16" stroke={color} strokeWidth="1.1" />
        </>
      ) : (
        <circle cx="32" cy="36" r="3.5" fill={color} />
      )}
      {extra && <rect x="44" y="28" width="5" height="4" rx="1" fill={color} />}
    </Svg>
  )
}

function Headphones({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <path d="M14 34c0-12 8-20 18-20s18 8 18 20" stroke={color} strokeWidth={STROKE} />
      <rect x="10" y="32" width="10" height={shape ? 22 : 18} rx="4" stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      <rect x="44" y="32" width="10" height={asym ? 14 : shape ? 22 : 18} rx="4" stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {!missing && <path d="M20 50c4 6 20 6 24 0" stroke={color} strokeWidth={STROKE} />}
      {pattern && <path d="M14 40h6M44 40h6" stroke={color} strokeWidth="1.3" />}
      {extra && <circle cx="32" cy="14" r="2" fill={color} />}
    </Svg>
  )
}

function Satellite({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <rect x={shape ? 26 : 24} y={shape ? 26 : 24} width={shape ? 12 : 16} height={shape ? 12 : 16} rx={shape ? 6 : 3} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" transform="rotate(45 32 32)" />
      {!missing && (
        <>
          <path d="M14 18l12 12M38 38l12 12" stroke={color} strokeWidth={STROKE} />
          <rect x="8" y="12" width="12" height="12" stroke={color} strokeWidth={STROKE} />
          <rect x="44" y="40" width="12" height="12" stroke={color} strokeWidth={STROKE} />
        </>
      )}
      {pattern ? <path d="M32 20v8M32 36v8" stroke={color} strokeWidth="1.4" /> : <circle cx="32" cy="32" r="2.4" fill={color} />}
      {extra && <path d="M32 12v8" stroke={color} strokeWidth={STROKE} />}
    </Svg>
  )
}

function Wifi({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <path d="M16 28c8-10 24-10 32 0" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      {!missing && <path d="M22 34c6-7 14-7 20 0" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />}
      <path d="M27 40c3-4 7-4 10 0" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      {pattern ? (
        <rect x="29" y="46" width="6" height="6" stroke={color} strokeWidth="1.5" />
      ) : (
        <circle cx="32" cy="48" r={shape ? 4 : 3} fill={color} />
      )}
      {extra && <path d="M10 22c12-14 32-14 44 0" stroke={color} strokeWidth="1.5" opacity="0.8" />}
    </Svg>
  )
}

function Cloud({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <path
        d={
          shape
            ? 'M18 40h28a10 10 0 0 0 2-20 12 12 0 0 0-22-4A12 12 0 0 0 18 40Z'
            : 'M16 42h32a12 12 0 0 0 1-18 14 14 0 0 0-26-3A13 13 0 0 0 16 42Z'
        }
        stroke={color}
        strokeWidth={STROKE}
        fill="url(#glyphSheen)"
      />
      {!missing && (
        <>
          <path d="M24 48v6M32 48v8M40 48v5" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
        </>
      )}
      {pattern && <path d="M22 32h20M26 36h12" stroke={color} strokeWidth="1.3" />}
      {extra && <circle cx="46" cy="22" r="2.2" fill={color} />}
    </Svg>
  )
}

function Watch({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      {!missing && (
        <>
          <path d="M24 12h16v8H24zM24 44h16v8H24z" stroke={color} strokeWidth={STROKE} />
        </>
      )}
      <rect x="16" y="18" width="32" height="28" rx={shape ? 14 : 8} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {pattern ? (
        <path d="M24 28h16M24 34h10" stroke={color} strokeWidth="1.4" />
      ) : (
        <>
          <path d="M32 26v8l6 3" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
          <circle cx={asym ? 28 : 32} cy="32" r="1.6" fill={color} />
        </>
      )}
      {extra && <circle cx="44" cy="24" r="2" fill={color} />}
    </Svg>
  )
}

function Usb({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <rect x="22" y="8" width="20" height="16" rx={shape ? 6 : 2} stroke={color} strokeWidth={STROKE} />
      {!missing && (
        <>
          <path d="M28 12v8M36 12v8" stroke={color} strokeWidth={STROKE} />
        </>
      )}
      <rect x="18" y="22" width="28" height="30" rx={shape ? 10 : 4} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {pattern ? <path d="M26 32h12M26 38h12M26 44h8" stroke={color} strokeWidth="1.4" /> : <circle cx="32" cy="38" r="4" stroke={color} strokeWidth={STROKE} />}
      {extra && <path d="M32 52v6" stroke={color} strokeWidth={STROKE} />}
    </Svg>
  )
}

function Circuit({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <rect x="10" y="10" width="44" height="44" rx={shape ? 16 : 4} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      <path d="M18 18h12v10h16" stroke={color} strokeWidth={STROKE} />
      {!missing && <path d="M18 46h10v-12h18" stroke={color} strokeWidth={STROKE} />}
      <circle cx="18" cy="18" r="2.2" fill={color} />
      <circle cx="46" cy="28" r="2.2" fill={color} />
      <circle cx="46" cy="34" r="2.2" fill={color} />
      {pattern ? (
        <>
          <path d="M22 22h20M22 32h20M22 42h12" stroke={color} strokeWidth="1.2" />
        </>
      ) : (
        <rect x="26" y="26" width="12" height="12" stroke={color} strokeWidth="1.5" />
      )}
      {extra && <circle cx="32" cy="18" r="2" fill={color} />}
    </Svg>
  )
}

function Server({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  const asym = variant === 'asym'
  return (
    <Svg color={color}>
      <rect x="12" y="10" width="40" height="14" rx={shape ? 7 : 3} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      <rect x="12" y="26" width="40" height="14" rx={shape ? 7 : 3} stroke={color} strokeWidth={STROKE} />
      {!missing && <rect x="12" y="42" width="40" height="12" rx={shape ? 6 : 3} stroke={color} strokeWidth={STROKE} />}
      <circle cx="20" cy="17" r="2" fill={color} />
      <circle cx={asym ? 22 : 20} cy="33" r="2" fill={color} />
      {pattern ? <path d="M28 17h16M28 33h16" stroke={color} strokeWidth="1.4" /> : <path d="M28 17h18M28 33h18" stroke={color} strokeWidth={STROKE} />}
      {extra && <circle cx="48" cy="17" r="2" fill={color} />}
    </Svg>
  )
}

function Keyboard({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <rect x="8" y="18" width="48" height="28" rx={shape ? 12 : 5} stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      {!missing && (
        <>
          <rect x="14" y="24" width="6" height="6" stroke={color} strokeWidth="1.4" />
          <rect x="24" y="24" width="6" height="6" stroke={color} strokeWidth="1.4" />
          <rect x="34" y="24" width="6" height="6" stroke={color} strokeWidth="1.4" />
          <rect x="44" y="24" width="6" height="6" stroke={color} strokeWidth="1.4" />
        </>
      )}
      {pattern ? <path d="M16 38h32" stroke={color} strokeWidth="1.5" /> : <rect x="18" y="36" width="28" height="5" rx="1.5" stroke={color} strokeWidth="1.4" />}
      {extra && <rect x="28" y="12" width="8" height="4" fill={color} />}
    </Svg>
  )
}

function Database({ color, variant }) {
  const missing = variant === 'missing'
  const extra = variant === 'extra'
  const pattern = variant === 'pattern'
  const shape = variant === 'shape'
  return (
    <Svg color={color}>
      <ellipse cx="32" cy="16" rx={shape ? 14 : 16} ry="7" stroke={color} strokeWidth={STROKE} fill="url(#glyphSheen)" />
      <path d="M16 16v24c0 4 7 8 16 8s16-4 16-8V16" stroke={color} strokeWidth={STROKE} />
      {!missing && <path d="M16 28c0 4 7 7 16 7s16-3 16-7" stroke={color} strokeWidth={STROKE} />}
      {pattern && <path d="M22 34h20M24 40h16" stroke={color} strokeWidth="1.3" />}
      {extra && <path d="M32 8v6" stroke={color} strokeWidth={STROKE} />}
    </Svg>
  )
}

const MAP = {
  robot: Robot,
  chip: Chip,
  lock: Lock,
  laptop: Laptop,
  phone: Phone,
  brain: Brain,
  controller: Controller,
  vr: Vr,
  drone: Drone,
  camera: Camera,
  headphones: Headphones,
  satellite: Satellite,
  wifi: Wifi,
  cloud: Cloud,
  watch: Watch,
  usb: Usb,
  circuit: Circuit,
  server: Server,
  keyboard: Keyboard,
  database: Database,
}

export const GLYPH_KEYS = Object.keys(MAP)

export const GLYPH_META = {
  robot: { label: 'AI robot' },
  chip: { label: 'Microchip' },
  lock: { label: 'Cyber lock' },
  laptop: { label: 'Laptop' },
  phone: { label: 'Smartphone' },
  brain: { label: 'AI brain' },
  controller: { label: 'Controller' },
  vr: { label: 'VR headset' },
  drone: { label: 'Drone' },
  camera: { label: 'Camera' },
  headphones: { label: 'Headphones' },
  satellite: { label: 'Satellite' },
  wifi: { label: 'Wi-Fi' },
  cloud: { label: 'Cloud' },
  watch: { label: 'Smartwatch' },
  usb: { label: 'USB' },
  circuit: { label: 'Circuit' },
  server: { label: 'Server' },
  keyboard: { label: 'Keyboard' },
  database: { label: 'Database' },
}

export const SIMILAR_GLYPHS = {
  laptop: 'keyboard',
  keyboard: 'laptop',
  phone: 'watch',
  watch: 'phone',
  wifi: 'satellite',
  satellite: 'wifi',
  server: 'database',
  database: 'server',
  chip: 'circuit',
  circuit: 'chip',
  headphones: 'vr',
  vr: 'headphones',
  drone: 'satellite',
  lock: 'usb',
  usb: 'lock',
  cloud: 'wifi',
}

export function TechGlyph({ name, color = '#7ee8ff', variant = 'normal', className = '' }) {
  const Glyph = MAP[name] || Chip
  return (
    <span className={`tech-glyph ${className}`}>
      <Glyph color={color} variant={variant} />
    </span>
  )
}
