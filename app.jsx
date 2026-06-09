// Main app — composes intro + all 10 scenes inside one Stage
// Timeline layout (REAL stage seconds):
//   0   → 7   : Intro (silent, 3D logos + tagline)
//   7   → 459 : Audio narration plays + scenes
//
// Scenes were authored against a 605s reference. We scale them by
// AUDIO_DURATION / 605 so they fit the actual narration length.

const INTRO_DURATION = 7;
const AUDIO_DURATION = 452;
const TOTAL_DURATION = INTRO_DURATION + AUDIO_DURATION;
const ANIM_REFERENCE = 605;
const TIME_SCALE = ANIM_REFERENCE / AUDIO_DURATION;

function App() {
  const [subsOn, setSubsOn] = React.useState(() => {
    try { return localStorage.getItem('tibok-swan:subs') !== '0'; } catch { return true; }
  });
  const [subOffset, setSubOffset] = React.useState(() => {
    try { return parseFloat(localStorage.getItem('tibok-swan:suboff') || '0') || 0; } catch { return 0; }
  });
  const toggle = () => {
    setSubsOn(v => {
      try { localStorage.setItem('tibok-swan:subs', v ? '0' : '1'); } catch {}
      return !v;
    });
  };
  const updateOffset = (v) => {
    setSubOffset(v);
    try { localStorage.setItem('tibok-swan:suboff', String(v)); } catch {}
  };
  return (
    <Stage width={W} height={H} duration={TOTAL_DURATION}
           background="#000" persistKey="tibok-swan"
           autoplay={false} loop={false}>
      <AudioSync src="assets/narration.mp3" startDelay={INTRO_DURATION} muted={true} />

      {/* Intro reads RAW stage time, plays during 0–7s */}
      <Intro duration={INTRO_DURATION} />

      {/* Scenes + subtitles run from t=INTRO_DURATION onwards, time-scaled */}
      <OffsetScaledTimeline startOffset={INTRO_DURATION} scale={TIME_SCALE}>
        <SceneClock />
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 />
        <Scene6 />
        <Scene7 />
        <Scene8 />
        <Scene9 />
        <Scene10 />
      </OffsetScaledTimeline>

      <OffsetScaledTimeline startOffset={INTRO_DURATION} scale={TIME_SCALE}
                            extraOffsetSeconds={subOffset * TIME_SCALE}>
        <Subtitles enabled={subsOn} />
      </OffsetScaledTimeline>

      <SubtitleToggle enabled={subsOn} onToggle={toggle} />
      <SubtitleOffsetControl value={subOffset} onChange={updateOffset} visible={subsOn} />
    </Stage>
  );
}

// Updates the data-screen-label every second with timestamp
function SceneClock() {
  const { time } = useTimeline();
  const sec = Math.floor(time);
  React.useEffect(() => {
    const root = document.getElementById('app-root');
    if (root) {
      const m = Math.floor(sec/60), s = sec%60;
      root.dataset.screenLabel = `t=${String(m)}:${String(s).padStart(2,'0')}`;
    }
  }, [sec]);
  return null;
}

const root = ReactDOM.createRoot(document.getElementById('app-root'));
root.render(<App />);
