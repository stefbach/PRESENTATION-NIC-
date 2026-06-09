// FX layer — particles, parallax, idle motion, human silhouettes

// ── Floating particle field (ambient depth)
function Particles({ count = 60, color = 'rgba(20,184,166,0.35)', speed = 1, seed = 1 }) {
  const { localTime } = useSprite();
  const dots = React.useMemo(() => {
    let s = seed * 1000;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: count }, () => ({
      x: rand() * W,
      y: rand() * H,
      r: 1 + rand() * 2.5,
      vy: 8 + rand() * 24,
      drift: rand() * 30,
      phase: rand() * Math.PI * 2,
    }));
  }, [count, seed]);
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {dots.map((d, i) => {
        const t = localTime * speed;
        const y = (d.y - t * d.vy) % H;
        const yy = y < 0 ? y + H : y;
        const x = d.x + Math.sin(t * 0.5 + d.phase) * d.drift;
        const opacity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t + d.phase));
        return <circle key={i} cx={x} cy={yy} r={d.r} fill={color} opacity={opacity} />;
      })}
    </svg>
  );
}

// ── Slow grid drift (atmospheric depth)
function GridLayer({ color = 'rgba(255,255,255,0.04)', size = 80, speed = 6, perspective = 0 }) {
  const { localTime } = useSprite();
  const offset = (localTime * speed) % size;
  return (
    <div style={{
      position: 'absolute', inset: perspective > 0 ? '-20%' : 0,
      backgroundImage:
        `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
      backgroundPosition: `${-offset}px ${-offset}px`,
      transform: perspective > 0 ? `perspective(800px) rotateX(${perspective}deg)` : 'none',
      transformOrigin: 'center top',
      maskImage: perspective > 0 ? 'linear-gradient(180deg, black 0%, transparent 90%)' : null,
    }} />
  );
}

// ── Idle drift wrapper: gentle floating motion
function Drift({ amplitude = 8, freq = 0.4, phase = 0, children, style }) {
  const { localTime } = useSprite();
  const ty = Math.sin(localTime * freq * Math.PI + phase) * amplitude;
  return (
    <div style={{ transform: `translateY(${ty}px)`, willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}

// ── Pulse ring (radiating concentric circles)
function PulseRing({ size = 200, color = 'rgba(20,184,166,0.4)', count = 3, dur = 3, delay = 0 }) {
  const { localTime } = useSprite();
  return (
    <div style={{
      position: 'absolute', width: size, height: size,
      left: -size/2, top: -size/2, pointerEvents: 'none',
    }}>
      {Array.from({ length: count }, (_, i) => {
        const t = ((localTime - delay - i * (dur/count)) % dur + dur) % dur / dur;
        if (localTime < delay) return null;
        const r = size/2 * (0.3 + 0.7 * t);
        const opacity = (1 - t) * 0.45;
        return (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: '50%',
            width: r*2, height: r*2, marginLeft: -r, marginTop: -r,
            border: `2px solid ${color}`, borderRadius: '50%',
            opacity,
          }} />
        );
      })}
    </div>
  );
}

// ── Spinning ring with dashed border (high-tech feel)
function SpinningRing({ size = 480, dur = 30, color = 'rgba(20,184,166,0.3)', dash = '4 12', reverse = false, thickness = 1 }) {
  const { localTime } = useSprite();
  const angle = (localTime / dur) * 360 * (reverse ? -1 : 1);
  return (
    <svg width={size} height={size} style={{
      position: 'absolute', left: -size/2, top: -size/2,
      transform: `rotate(${angle}deg)`, pointerEvents: 'none',
    }}>
      <circle cx={size/2} cy={size/2} r={size/2 - thickness}
              fill="none" stroke={color} strokeWidth={thickness}
              strokeDasharray={dash} />
    </svg>
  );
}

// ── Animated connecting line (with traveling pulse)
function ConnectingLine({ x1, y1, x2, y2, color = 'rgba(20,184,166,0.4)', dash = '4 8', pulseColor = '#14B8A6' }) {
  const { localTime } = useSprite();
  const len = Math.hypot(x2-x1, y2-y1);
  const t = (localTime * 0.6) % 1;
  const px = x1 + (x2 - x1) * t;
  const py = y1 + (y2 - y1) * t;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.2} strokeDasharray={dash} />
      <circle cx={px} cy={py} r={3.5} fill={pulseColor} opacity={Math.sin(t * Math.PI)} />
    </>
  );
}

// ── Human silhouettes (SVG)
// Renders a friendly figure outline — generic patient/citizen
function HumanFigure({ size = 120, color = 'currentColor', variant = 'standing' }) {
  const paths = {
    standing: <>
      <circle cx="50" cy="22" r="11" />
      <path d="M50 33 c -14 0 -24 10 -24 24 v 16 h 48 v -16 c 0 -14 -10 -24 -24 -24 z" />
      <path d="M37 73 v 22 M63 73 v 22" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    </>,
    doctor: <>
      <circle cx="50" cy="22" r="11" />
      <path d="M50 33 c -14 0 -24 10 -24 24 v 16 h 48 v -16 c 0 -14 -10 -24 -24 -24 z" />
      {/* white coat collar */}
      <path d="M50 33 l -6 12 M50 33 l 6 12" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* stethoscope */}
      <path d="M44 58 c 0 6 6 8 6 14 M56 58 c 0 6 -6 8 -6 14" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M37 73 v 22 M63 73 v 22" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    </>,
    family: <>
      {/* adult */}
      <g transform="translate(-12,0)">
        <circle cx="50" cy="22" r="10" />
        <path d="M50 32 c -12 0 -20 8 -20 20 v 14 h 40 v -14 c 0 -12 -8 -20 -20 -20 z" />
      </g>
      {/* child */}
      <g transform="translate(20,28) scale(0.65)">
        <circle cx="50" cy="22" r="11" />
        <path d="M50 33 c -14 0 -24 10 -24 24 v 16 h 48 v -16 c 0 -14 -10 -24 -24 -24 z" />
      </g>
    </>,
    elder: <>
      <circle cx="50" cy="22" r="11" />
      <path d="M50 33 c -14 0 -24 10 -24 24 v 16 h 48 v -16 c 0 -14 -10 -24 -24 -24 z" />
      {/* cane */}
      <path d="M72 50 v 45" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M37 73 v 22 M63 73 v 22" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    </>,
    pregnant: <>
      <circle cx="50" cy="22" r="11" />
      <path d="M50 33 c -14 0 -24 10 -24 24 v 16 h 48 v -16 c 0 -14 -10 -24 -24 -24 z" />
      <circle cx="62" cy="58" r="10" fill={color} opacity="0.4" />
      <path d="M37 73 v 22 M63 73 v 22" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    </>,
  };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}
         style={{ display: 'block', overflow: 'visible' }}>
      <g fill={color}>{paths[variant] || paths.standing}</g>
    </svg>
  );
}

// ── Crowd row — many small humans, used as "population"
function CrowdRow({ count = 20, highlightEvery = 5, baseColor = 'rgba(247,244,238,0.18)', highlightColor = '#E11D48', size = 60, animateProgress = 0 }) {
  return (
    <div style={{ display: 'flex', gap: size * 0.18, alignItems: 'flex-end' }}>
      {Array.from({ length: count }, (_, i) => {
        const highlighted = (i % highlightEvery) === 0;
        const shouldShow = i / count <= animateProgress;
        return (
          <div key={i} style={{
            opacity: shouldShow ? 1 : 0,
            transition: 'opacity 0.3s',
            color: highlighted ? highlightColor : baseColor,
            transform: `translateY(${shouldShow ? 0 : 12}px)`,
          }}>
            <HumanFigure size={size} variant="standing" />
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  Particles, GridLayer, Drift, PulseRing, SpinningRing, ConnectingLine,
  HumanFigure, CrowdRow,
});
