// Intro — 7s cinematic 3D opener
// Stage time 0 → 7s (RAW, before AUDIO_DELAY kicks in)
// Components: rotating sphere of particles, SWAN × TIBOK logo lockup,
// tagline reveal "Le monde de demain est déjà là."

// ── 3D sphere of teal particles, rotating
function ParticleSphere({ size = 380, count = 140, color = '#14B8A6' }) {
  const { time } = useTimeline();

  // Fibonacci sphere points (once)
  const points = React.useMemo(() => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
    }
    return pts;
  }, [count]);

  const cx = W / 2, cy = H / 2;
  const rotY = time * 0.55;
  const rotX = 0.35 + Math.sin(time * 0.2) * 0.05;
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  // depth-of-field-ish: scale particle size by z
  const focal = 1300;

  // entry/exit blanket
  const entry = clamp(time / 0.8, 0, 1);
  const exitOpacity = clamp((7.0 - time) / 0.6, 0, 1);

  // expansion: sphere radius grows out of nothing
  const grow = entry * exitOpacity;
  const R = size * grow;

  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(20,184,166,0.35)" />
          <stop offset="60%" stopColor="rgba(20,184,166,0.06)" />
          <stop offset="100%" stopColor="rgba(20,184,166,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R * 1.4} fill="url(#sphereGlow)" />
      {points.map(([x, y, z], i) => {
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const sc = focal / (focal + z2 * R);
        const px = cx + x1 * R * sc;
        const py = cy + y1 * R * sc;
        const size2 = 2.6 * sc;
        const op = (0.25 + 0.65 * sc) * exitOpacity;
        return <circle key={i} cx={px} cy={py} r={size2} fill={color} opacity={op} />;
      })}
    </svg>
  );
}

// ── NIC × TIBOK logo lockup — comes together in 3D
function LogoLockup() {
  const { time } = useTimeline();
  const exit = clamp((7.0 - time) / 0.6, 0, 1);

  // NIC enters from left
  const swanIn = clamp((time - 0.6) / 1.0, 0, 1);
  const swanE = Easing.easeOutCubic(swanIn);
  const swanX = (1 - swanE) * -380;
  const swanRot = (1 - swanE) * -22; // 3D Y rotation
  const swanOp = swanIn;

  // TIBOK enters from right
  const tibokIn = clamp((time - 0.9) / 1.0, 0, 1);
  const tibokE = Easing.easeOutCubic(tibokIn);
  const tibokX = (1 - tibokE) * 380;
  const tibokRot = (1 - tibokE) * 22;
  const tibokOp = tibokIn;

  // × scales up
  const xIn = clamp((time - 1.6) / 0.6, 0, 1);
  const xE = Easing.easeOutBack(xIn);
  const xScale = 0.3 + 0.7 * xE;

  // Subtle idle float after entry
  const idle = Math.sin(time * 0.6) * 6;
  const idle2 = Math.sin(time * 0.6 + Math.PI) * 6;

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 360,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 60,
      perspective: 1400,
      opacity: exit,
    }}>
      {/* NIC card */}
      <div style={{
        transform: `translate3d(${swanX}px, ${idle}px, 0) rotateY(${swanRot}deg)`,
        opacity: swanOp,
        transformStyle: 'preserve-3d',
        transition: 'none',
      }}>
        <div style={{
          padding: '40px 50px',
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F0F4FF 100%)',
          borderRadius: 18,
          boxShadow: '0 20px 60px rgba(45,50,88,0.45), 0 0 80px rgba(20,184,166,0.18)',
        }}>
          <img src="assets/nic-logo.png" alt="NIC"
               style={{ width: 280, height: 'auto', display: 'block' }} />
        </div>
      </div>

      {/* × */}
      <div style={{
        transform: `scale(${xScale})`,
        opacity: xIn,
        fontFamily: FONTS.display, fontWeight: 200, fontStyle: 'italic',
        fontSize: 92, color: '#5EEAD4',
        letterSpacing: '-0.02em',
        textShadow: '0 0 40px rgba(20,184,166,0.6)',
      }}>×</div>

      {/* TIBOK card */}
      <div style={{
        transform: `translate3d(${tibokX}px, ${idle2}px, 0) rotateY(${tibokRot}deg)`,
        opacity: tibokOp,
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          padding: '38px 56px',
          background: 'linear-gradient(145deg, #FFFFFF 0%, #E6F4F3 100%)',
          borderRadius: 18,
          boxShadow: '0 20px 60px rgba(14,124,123,0.5), 0 0 80px rgba(20,184,166,0.22)',
        }}>
          <TibokMark size={120} />
        </div>
      </div>
    </div>
  );
}

// ── Tagline reveal
function Tagline() {
  const { time } = useTimeline();
  const exit = clamp((7.0 - time) / 0.6, 0, 1);

  // Line 1: "Le monde de demain" — words pop in
  const line1Words = ['Le', 'monde', 'de', 'demain'];
  const line1Start = 2.4;
  // Line 2: "est déjà là." — appears together
  const line2Start = 4.0;
  const line2In = clamp((time - line2Start) / 0.8, 0, 1);
  const line2E = Easing.easeOutCubic(line2In);

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 700,
      textAlign: 'center', opacity: exit,
    }}>
      <div style={{
        fontFamily: FONTS.display, fontWeight: 300,
        fontSize: 72, color: '#FFFFFF', letterSpacing: '-0.02em',
        lineHeight: 1.15,
      }}>
        {line1Words.map((w, i) => {
          const wIn = clamp((time - (line1Start + i * 0.18)) / 0.5, 0, 1);
          const wE = Easing.easeOutCubic(wIn);
          return (
            <span key={i} style={{
              display: 'inline-block',
              opacity: wE,
              transform: `translateY(${(1 - wE) * 24}px)`,
              marginRight: 14,
            }}>{w}</span>
          );
        })}
      </div>
      <div style={{
        marginTop: 12,
        fontFamily: FONTS.display, fontWeight: 600, fontStyle: 'italic',
        fontSize: 96, color: '#5EEAD4', letterSpacing: '-0.025em',
        opacity: line2E,
        transform: `translateY(${(1 - line2E) * 32}px) scale(${0.94 + 0.06 * line2E})`,
        textShadow: '0 0 50px rgba(20,184,166,0.45)',
      }}>
        est déjà là.
      </div>
    </div>
  );
}

// ── Soft horizon line + light beam
function IntroAmbience() {
  const { time } = useTimeline();
  const exit = clamp((7.0 - time) / 0.6, 0, 1);
  const opening = clamp(time / 0.6, 0, 1);

  return (
    <>
      {/* Vignette gradient backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 35%, #1A1F45 0%, #07091B 60%, #000 100%),
          linear-gradient(180deg, transparent 60%, rgba(20,184,166,0.06) 90%, transparent 100%)
        `,
        opacity: exit * opening,
      }} />
      {/* Faint horizon glow */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 320,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.25) 0%, transparent 70%)',
        opacity: exit,
      }} />
      {/* sweeping light beam */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '100%',
        background: `linear-gradient(110deg,
          transparent ${Math.min(40 + time * 14, 100)}%,
          rgba(20,184,166,0.18) ${Math.min(48 + time * 14, 100)}%,
          transparent ${Math.min(56 + time * 14, 100)}%)`,
        mixBlendMode: 'screen',
        opacity: clamp(1 - time / 5, 0, 0.6),
      }} />
    </>
  );
}

// ── Wrapper Intro
function Intro({ duration = 7 }) {
  const { time } = useTimeline();
  if (time > duration + 0.7) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      <IntroAmbience />
      <ParticleSphere />
      <LogoLockup />
      <Tagline />
    </div>
  );
}

Object.assign(window, { Intro, ParticleSphere, LogoLockup, Tagline, IntroAmbience });
