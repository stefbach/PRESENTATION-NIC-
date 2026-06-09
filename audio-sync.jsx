// Audio sync + timeline rescaling for the narration MP3

// ── AudioSync: keeps an <audio> element in sync with the Stage timeline.
// `startDelay` (in real Stage seconds) postpones audio playback until the
// Stage reaches that time. Before then the audio sits silent at 0.
function AudioSync({ src, startDelay = 0, muted = false }) {
  const { time, playing } = useTimeline();
  const audioRef = React.useRef(null);
  const targetT = Math.max(0, time - startDelay);
  const shouldPlay = playing && time >= startDelay && !muted;

  // play/pause
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (shouldPlay) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [shouldPlay]);

  // sync currentTime when drift is large (seek / loop / manual)
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const drift = Math.abs(a.currentTime - targetT);
    if (drift > 0.4) {
      a.currentTime = targetT;
    }
  }, [targetT]);

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}

// ── ScaledTimeline: provides a re-scaled timeline context to children.
function ScaledTimeline({ scale, offsetSeconds = 0, children }) {
  const parent = useTimeline();
  const value = React.useMemo(() => ({
    ...parent,
    time: parent.time * scale + offsetSeconds,
    duration: parent.duration * scale,
    setTime: parent.setTime
      ? (t) => parent.setTime((t - offsetSeconds) / scale)
      : undefined,
  }), [parent.time, parent.duration, scale, offsetSeconds]);
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

// ── OffsetScaledTimeline: subtracts `startOffset` (real seconds) from
// the parent stage time, then multiplies the result by `scale`.
// Used to play the scenes (authored on 605s, scaled to audio length)
// starting AFTER the intro.
function OffsetScaledTimeline({ startOffset = 0, scale = 1, extraOffsetSeconds = 0, children }) {
  const parent = useTimeline();
  const value = React.useMemo(() => {
    const t = Math.max(0, parent.time - startOffset);
    return {
      ...parent,
      time: t * scale + extraOffsetSeconds,
      duration: Math.max(0, parent.duration - startOffset) * scale,
      setTime: parent.setTime
        ? (target) => parent.setTime((target - extraOffsetSeconds) / scale + startOffset)
        : undefined,
    };
  }, [parent.time, parent.duration, startOffset, scale, extraOffsetSeconds]);
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

Object.assign(window, { AudioSync, ScaledTimeline, OffsetScaledTimeline });
