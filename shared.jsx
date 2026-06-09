// Shared design tokens + helpers for the TIBOK x SWAN video
// All scene files reference these via window.*

const PAL = {
  // Tibok teal
  teal:      '#0E7C7B',
  tealDeep:  '#0A5957',
  tealLight: '#14B8A6',
  tealMist:  '#E6F4F3',
  // SWAN navy
  navy:      '#2D3258',
  navyDeep:  '#1A1E3D',
  navyLight: '#3F4675',
  // Accents
  violet:    '#7C3AED',
  violetDeep:'#5B21B6',
  violetMist:'#F3EAFE',
  amber:     '#F59E0B',
  rose:      '#E11D48',
  // Neutrals
  ink:       '#0C0F14',
  inkSoft:   '#1F2937',
  graphite:  '#475569',
  slate:     '#94A3B8',
  cream:     '#F7F4EE',
  paper:     '#FBFAF6',
  white:     '#FFFFFF',
  line:      '#E5E7EB',
};

const FONTS = {
  display: '"Fraunces", "Times New Roman", serif',
  body:    '"Inter", -apple-system, system-ui, sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, monospace',
};

// Stage geometry
const W = 1920;
const H = 1080;

// ── Sub-Sprite: gives nested entry/exit timing inside a parent Sprite.
// localStart / localEnd are seconds from the parent sprite's start.
function SubSprite({ start = 0, end = Infinity, children }) {
  const parent = useSprite();
  const localTime = parent.localTime - start;
  const duration = end - start;
  if (parent.localTime < start || parent.localTime > end) return null;
  const value = {
    localTime,
    duration,
    progress: duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0,
    visible: true,
  };
  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── FadeIn: wraps children with simple fade + translate-y on entry.
function FadeIn({ from = 0, dur = 0.6, ty = 20, ease = Easing.easeOutCubic, exitDur = 0.4, children, style }) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1, translateY = 0;
  if (localTime < from) { opacity = 0; translateY = ty; }
  else if (localTime < from + dur) {
    const t = ease(clamp((localTime - from) / dur, 0, 1));
    opacity = t;
    translateY = (1 - t) * ty;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    translateY = -t * 8;
  }
  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, willChange: 'transform, opacity', ...style }}>
      {children}
    </div>
  );
}

// ── Big background rect filling the stage with a color
function Backdrop({ color = PAL.cream, gradient = null }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: gradient || color,
    }} />
  );
}

// ── Stage chrome: scene label top-left + tibok corner watermark
function Chrome({ scene, total = 10, label, accent = PAL.teal }) {
  return (
    <>
      {/* top-left scene tag */}
      <div style={{
        position: 'absolute', left: 64, top: 56,
        display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: FONTS.mono, fontSize: 18,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ width: 22, height: 1, background: 'currentColor' }} />
        <span>{String(scene).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
        {label ? <span style={{ color: accent, opacity: 0.85 }}>· {label}</span> : null}
      </div>
      {/* bottom-right tibok mark */}
      <div style={{
        position: 'absolute', right: 64, bottom: 48,
        fontFamily: FONTS.mono, fontSize: 16,
        letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.35)',
        whiteSpace: 'nowrap',
      }}>
        TIBOK · NIC — 2026
      </div>
    </>
  );
}

// ── Tibok logotype rendered as text (with two T's eye motif)
function TibokMark({ size = 120, color = PAL.teal, color2 = PAL.tealLight }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'baseline',
      fontFamily: FONTS.body, fontWeight: 800,
      fontSize: size, letterSpacing: '-0.04em', color,
      lineHeight: 0.9,
    }}>
      <span>TIB</span>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size * 0.78, height: size * 0.78,
        background: color2, borderRadius: size * 0.18,
        marginLeft: size * 0.04, marginRight: size * 0.04,
        position: 'relative', top: size * -0.08,
      }}>
        <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="3.2" fill="#fff"/>
          <path d="M5.5 19c.6-3.2 3.3-5.5 6.5-5.5s5.9 2.3 6.5 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </span>
      <span>K</span>
    </div>
  );
}

// ── Animated count-up number
function CountUp({ from = 0, to = 100, start = 0, dur = 1.2, suffix = '', prefix = '', ease = Easing.easeOutCubic, format }) {
  const { localTime } = useSprite();
  let v;
  if (localTime < start) v = from;
  else if (localTime > start + dur) v = to;
  else v = from + (to - from) * ease(clamp((localTime - start) / dur, 0, 1));
  const display = format ? format(v) : Math.round(v).toLocaleString('fr-FR');
  return <span>{prefix}{display}{suffix}</span>;
}

// ── Reveal underline animation
function Underline({ from = 0, dur = 0.5, color = PAL.tealLight, thickness = 4, width = '100%' }) {
  const { localTime } = useSprite();
  const t = clamp((localTime - from) / dur, 0, 1);
  const eased = Easing.easeOutQuart(t);
  return (
    <div style={{
      width: typeof width === 'number' ? width : width,
      height: thickness, background: color,
      transform: `scaleX(${eased})`, transformOrigin: 'left center',
      transition: 'none',
    }} />
  );
}

// Tibok service icons (SVG)
function ServiceIcon({ kind, size = 56, color = PAL.teal, bg = PAL.tealMist }) {
  const icons = {
    video: <path d="M3 7c0-1.1.9-2 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm14 1.5 4-2.5v12l-4-2.5v-7z" />,
    pill:  <path d="M10.5 3.5a5 5 0 0 1 7 7L13 15a5 5 0 1 1-7-7l4.5-4.5zm-1 5.5 5 5"/>,
    flask: <path d="M9 3h6M10 3v6.5L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3"/>,
    heart: <path d="M12 21s-7-4.5-9.5-9.5C.8 7.7 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6.2 3.7 4.5 7.5C19 16.5 12 21 12 21z"/>,
    pulse: <path d="M3 12h4l2-6 4 12 2-6h6"/>,
    shield:<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/>,
    stetho:<path d="M6 4v6a4 4 0 0 0 8 0V4M10 14v3a4 4 0 0 0 8 0v-3M18 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>,
    user:  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9c0-3.9 3.1-7 7-7s7 3.1 7 7"/>,
    family:<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5m0 0c0-2.5 2.5-4.5 6-4.5"/>,
    doc:   <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 0v5h5M9 13h8M9 17h6"/>,
    brain: <path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3 0zm6 0a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-6 0"/>,
    clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-14v5l3 2"/>,
    calendar: <path d="M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm3-3v4m8-4v4M4 10h16"/>,
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.26,
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24"
           fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icons[kind] || icons.doc}
      </svg>
    </div>
  );
}

// SWAN logotype
function SwanMark({ size = 80, color = '#FFFFFF' }) {
  return (
    <div style={{
      fontFamily: FONTS.body, fontWeight: 800,
      fontSize: size, color, letterSpacing: '0.08em',
      lineHeight: 1,
    }}>SWAN</div>
  );
}

Object.assign(window, {
  PAL, FONTS, W, H,
  SubSprite, FadeIn, Backdrop, Chrome, TibokMark, CountUp, Underline, ServiceIcon, SwanMark,
});
