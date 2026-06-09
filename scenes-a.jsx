// Scenes 1-3 — Hook, Tibok intro, Cadre légal

// ═══════════════════════════════════════════════════════════════════
// SCENE 1 — HOOK : Le silence du corps  (0–25s)
// ═══════════════════════════════════════════════════════════════════

function Scene1() {
  return (
    <Sprite start={0} end={25}>
      <Backdrop color={PAL.navyDeep} gradient={`radial-gradient(ellipse at 50% 40%, #1A1F45 0%, ${PAL.navyDeep} 65%, #07091B 100%)`} />

      {/* subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '120px 120px',
      }} />

      {/* atmospheric particles */}
      <SubSprite start={0} end={25}>
        <Particles count={40} color="rgba(225,29,72,0.35)" speed={0.5} seed={1} />
      </SubSprite>

      {/* faint pulse */}
      <SubSprite start={0} end={25}>
        {({ localTime }) => {
          const pulse = 0.5 + 0.5 * Math.sin(localTime * 1.3);
          return (
            <div style={{
              position: 'absolute', left: W/2 - 240, top: H/2 - 240,
              width: 480, height: 480, borderRadius: '50%',
              background: `radial-gradient(circle, rgba(225,29,72,${0.05 + 0.05*pulse}) 0%, transparent 60%)`,
              opacity: localTime < 2 ? localTime/2 : (localTime > 22 ? (25-localTime)/3 : 1),
            }} />
          );
        }}
      </SubSprite>

      {/* Line 1 + crowd visualization */}
      <SubSprite start={1.5} end={7}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 220,
          textAlign: 'center', fontFamily: FONTS.display, fontWeight: 400,
          fontSize: 76, color: PAL.cream, letterSpacing: '-0.02em',
        }}>
          <FadeIn dur={0.8} ty={24}>
            À Maurice, <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>un adulte sur cinq</em><br/>est diabétique.
          </FadeIn>
        </div>
        {/* Crowd of 20 people — every 5th in alert color */}
        <SubSprite start={1.5} end={5.5}>
          {({ localTime }) => {
            const prog = clamp(localTime / 2.2, 0, 1);
            return (
              <div style={{
                position: 'absolute', left: 0, right: 0, top: 520,
                display: 'flex', justifyContent: 'center',
              }}>
                <CrowdRow count={20} highlightEvery={5} size={72} animateProgress={prog} />
              </div>
            );
          }}
        </SubSprite>
      </SubSprite>

      {/* Line 2 */}
      <SubSprite start={7} end={12.5}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 340,
          textAlign: 'center', fontFamily: FONTS.display,
          fontSize: 72, color: PAL.cream, letterSpacing: '-0.02em',
        }}>
          <FadeIn dur={0.7} ty={24}>
            Près d'un sur trois<br/>
            <span style={{ color: PAL.rose, fontStyle: 'italic' }}>ne le sait pas encore.</span>
          </FadeIn>
        </div>
        {/* Crowd of 30 — every 3rd is hidden behind a "?" */}
        <SubSprite start={0.6} end={5}>
          <FadeIn dur={0.6}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 680,
              display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
              maxWidth: 1400, margin: '0 auto', padding: '0 200px',
            }}>
              {Array.from({length: 30}, (_, i) => {
                const unknown = i % 3 === 0;
                return (
                  <div key={i} style={{ position: 'relative', color: unknown ? PAL.rose : 'rgba(247,244,238,0.18)' }}>
                    <HumanFigure size={56} variant="standing" />
                    {unknown && (
                      <div style={{
                        position: 'absolute', top: -8, right: -4,
                        fontFamily: FONTS.display, fontWeight: 700, fontSize: 22,
                        color: PAL.rose,
                      }}>?</div>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </SubSprite>
      </SubSprite>

      {/* Big stat */}
      <SubSprite start={12.5} end={19}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <FadeIn dur={0.6} ty={30}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 220,
              textAlign: 'center',
              fontFamily: FONTS.display, fontSize: 36, color: 'rgba(247,244,238,0.6)',
              letterSpacing: '0.04em',
            }}>En 2024, à Maurice</div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.9} ty={40}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 300,
              textAlign: 'center',
              fontFamily: FONTS.body, fontWeight: 800,
              fontSize: 280, color: PAL.cream, letterSpacing: '-0.06em',
              lineHeight: 0.9,
            }}>
              <CountUp from={0} to={2709} start={0.4} dur={1.6} />
            </div>
          </FadeIn>
          <FadeIn from={1.6} dur={0.7}>
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 620,
              textAlign: 'center',
              fontFamily: FONTS.display, fontSize: 44, color: PAL.cream,
              fontStyle: 'italic',
            }}>décès liés au diabète — <span style={{ color: PAL.rose }}>près d'un sur quatre.</span></div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Closing thought */}
      <SubSprite start={19} end={25}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 380,
          textAlign: 'center',
          fontFamily: FONTS.display, fontWeight: 300,
          fontSize: 76, color: PAL.cream, letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>
          <FadeIn dur={0.8} ty={26}>
            Pendant que le corps se tait,<br/>
            <em style={{ color: PAL.tealLight }}>la médecine arrive trop tard.</em>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={1} label="L'ENJEU" accent={PAL.rose} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 2 — TIBOK, LA PLATEFORME  (25–80s)
// ═══════════════════════════════════════════════════════════════════

function Scene2() {
  return (
    <Sprite start={25} end={80}>
      <Backdrop color={PAL.paper} />

      {/* soft teal halo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 70% 30%, ${PAL.tealMist} 0%, transparent 50%)`,
      }} />

      {/* Logo reveal */}
      <SubSprite start={0} end={11}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 380,
          display: 'flex', justifyContent: 'center',
        }}>
          <FadeIn dur={1.0} ty={30}>
            <TibokMark size={260} />
          </FadeIn>
        </div>
        <SubSprite start={1.6} end={11}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 660,
            textAlign: 'center', fontFamily: FONTS.display, fontStyle: 'italic',
            fontSize: 48, color: PAL.graphite,
          }}>
            <FadeIn dur={0.8}>la plateforme de <span style={{color: PAL.teal, fontWeight: 600}}>Medical Intelligence</span> de Maurice</FadeIn>
          </div>
        </SubSprite>
      </SubSprite>

      {/* Sub-scene: 4 key stats */}
      <SubSprite start={11} end={26}>
        <div style={{ position: 'absolute', inset: 0, padding: '180px 100px 0' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 64, color: PAL.ink,
              textAlign: 'center', letterSpacing: '-0.02em',
            }}>
              Première plateforme mauricienne<br/>de <em style={{color: PAL.teal}}>télémédecine grand public</em>
            </div>
          </FadeIn>
          <FadeIn from={1.0} dur={0.6}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
              marginTop: 140,
            }}>
              {[
                { v: '20+', l: 'médecins agréés', sub: 'Medical Council MU' },
                { v: '7/7', l: 'consultations vidéo', sub: 'sans rendez-vous' },
                { v: '3', l: 'langues', sub: 'FR · EN · Kreol' },
                { v: 'Rs 800', l: 'standard', sub: 'facturé par les médecins' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: PAL.white,
                  border: `1px solid ${PAL.line}`,
                  padding: '36px 32px',
                  borderRadius: 14,
                  boxShadow: '0 8px 32px rgba(14,124,123,0.06)',
                }}>
                  <div style={{
                    fontFamily: FONTS.display, fontWeight: 600,
                    fontSize: 88, color: PAL.teal, letterSpacing: '-0.04em', lineHeight: 0.9,
                  }}>{s.v}</div>
                  <div style={{
                    marginTop: 18, fontFamily: FONTS.body, fontWeight: 600,
                    fontSize: 26, color: PAL.ink,
                  }}>{s.l}</div>
                  <div style={{
                    marginTop: 4, fontFamily: FONTS.body, fontSize: 20, color: PAL.graphite,
                  }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Sub-scene: not just an app */}
      <SubSprite start={26} end={45}>
        <div style={{ position: 'absolute', inset: 0, padding: '160px 110px 0' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 76, color: PAL.ink,
              letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 1400,
            }}>
              Mais Tibok n'est pas <span style={{color: PAL.slate}}>une simple application<br/>de consultation.</span>
            </div>
          </FadeIn>
          <FadeIn from={1.2} dur={0.7}>
            <div style={{
              marginTop: 64,
              fontFamily: FONTS.display, fontWeight: 600,
              fontSize: 120, color: PAL.teal,
              letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              C'est un écosystème<br/>
              <span style={{ fontStyle: 'italic', color: PAL.violet }}>de Medical Intelligence.</span>
            </div>
          </FadeIn>
          <FadeIn from={3.0} dur={0.6}>
            <div style={{
              marginTop: 60,
              fontFamily: FONTS.body, fontSize: 30, color: PAL.graphite,
              maxWidth: 1300, lineHeight: 1.5,
            }}>
              Une chaîne complète : la consultation, l'ordonnance, la pharmacie, les analyses,<br/>
              le suivi des maladies chroniques, le second avis, la prévention — et la validation assurance.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Sub-scene: founder card */}
      <SubSprite start={45} end={55}>
        <div style={{ position: 'absolute', inset: 0, padding: '120px 110px 0', display: 'flex', alignItems: 'center', gap: 80 }}>
          <FadeIn dur={0.8}>
            <div style={{
              width: 480, height: 640, borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(14,124,123,0.18)',
              transform: 'rotate(-1.5deg)',
            }}>
              <img src="assets/dr-bach.png" alt="Dr Bach"
                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.7}>
            <div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.18em', color: PAL.teal, textTransform: 'uppercase' }}>
                Fondateur · CEO
              </div>
              <div style={{
                marginTop: 18, fontFamily: FONTS.display, fontSize: 96, color: PAL.ink,
                letterSpacing: '-0.025em', lineHeight: 1,
              }}>
                Dr Stéphane Bach
              </div>
              <div style={{ marginTop: 28, fontFamily: FONTS.body, fontSize: 30, color: PAL.graphite, lineHeight: 1.45, maxWidth: 720 }}>
                Médecin <strong style={{color: PAL.ink}}>spécialiste en santé publique</strong><br/>
                Prévention cardiovasculaire · médecine numérique<br/>
                Digital Data Solutions Ltd · Flic en Flac, Maurice.
              </div>
              <div style={{ marginTop: 36, display: 'flex', gap: 14 }}>
                {['Medical Council MU', 'tibok.mu', 'digital-data-solutions.net'].map((t,i)=>(
                  <div key={i} style={{
                    padding: '10px 18px', border: `1px solid ${PAL.line}`, borderRadius: 999,
                    fontFamily: FONTS.mono, fontSize: 18, color: PAL.inkSoft, background: PAL.white,
                  }}>{t}</div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={2} label="LA PLATEFORME" accent={PAL.teal} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 3 — CADRE LÉGAL  (80–150s)
// ═══════════════════════════════════════════════════════════════════

function Scene3() {
  return (
    <Sprite start={80} end={150}>
      <Backdrop color={PAL.ink} gradient={`linear-gradient(180deg, ${PAL.navyDeep} 0%, ${PAL.ink} 100%)`} />

      <SubSprite start={0} end={70}>
        <GridLayer color="rgba(20,184,166,0.04)" size={100} speed={2} perspective={15} />
        <Particles count={30} color="rgba(20,184,166,0.3)" speed={0.3} seed={3} />
      </SubSprite>

      {/* Sub: opener line */}
      <SubSprite start={0} end={8}>
        <div style={{ position: 'absolute', inset: 0, padding: '380px 130px 0' }}>
          <FadeIn dur={0.8}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 96, color: PAL.cream,
              letterSpacing: '-0.025em', lineHeight: 1.1,
            }}>
              La téléconsultation<br/>
              <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>n'est pas un débat juridique.</em>
            </div>
          </FadeIn>
          <FadeIn from={2.5} dur={0.7}>
            <div style={{
              marginTop: 40,
              fontFamily: FONTS.display, fontSize: 60, color: 'rgba(247,244,238,0.7)',
              fontStyle: 'italic',
            }}>
              C'est un fait accompli — depuis bientôt trente ans.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Sub: timeline of country adoption */}
      <SubSprite start={8} end={36}>
        <div style={{ position: 'absolute', inset: 0, padding: '120px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em',
              color: PAL.tealLight, textTransform: 'uppercase',
            }}>Standard international — chronologie</div>
            <div style={{
              marginTop: 14, fontFamily: FONTS.display, fontSize: 72, color: PAL.cream,
              letterSpacing: '-0.02em',
            }}>Reconnue, encadrée, remboursée.</div>
          </FadeIn>

          {/* Horizontal timeline */}
          <div style={{ marginTop: 100, position: 'relative' }}>
            <FadeIn from={0.8} dur={0.5}>
              <div style={{ height: 2, background: 'rgba(247,244,238,0.18)', position: 'relative' }}>
                {/* moving cursor */}
                <SubSprite start={1} end={28}>
                  {({ localTime }) => {
                    const p = clamp(localTime / 12, 0, 1);
                    return (
                      <div style={{
                        position: 'absolute', left: `${p*100}%`, top: -7, width: 14, height: 14,
                        background: PAL.tealLight, borderRadius: 7,
                        boxShadow: `0 0 0 6px rgba(20,184,166,0.2)`,
                      }} />
                    );
                  }}
                </SubSprite>
              </div>
            </FadeIn>

            {[
              { year: '1997', label: 'OMS', sub: 'Définition mondiale', t: 1.6 },
              { year: '1999', label: 'Maurice', sub: 'Medical Council Act — aucune restriction', t: 3.0 },
              { year: '2018', label: 'France', sub: 'Avenant 6 · remboursement intégral', t: 4.6 },
              { year: '2020', label: 'États-Unis', sub: 'Medicare étendu aux 50 États', t: 6.2 },
              { year: '2024', label: 'Washington State', sub: 'Uniform Telemedicine Act', t: 7.8 },
              { year: '2026', label: 'Maurice', sub: 'HSSP 2030 — axe prioritaire', t: 9.4 },
            ].map((it, i) => (
              <SubSprite key={i} start={it.t} end={28}>
                <FadeIn dur={0.5} ty={20}>
                  <div style={{
                    position: 'absolute',
                    left: `${(i / 5) * 100}%`,
                    top: i % 2 ? 30 : -180,
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                  }}>
                    {i % 2 === 0 && (
                      <div style={{ marginBottom: 22, paddingBottom: 28, borderBottom: `2px dashed rgba(247,244,238,0.18)`, width: 1, margin: '0 auto 22px' }} />
                    )}
                    <div style={{
                      fontFamily: FONTS.display, fontSize: 56, fontWeight: 600,
                      color: PAL.tealLight, letterSpacing: '-0.02em', lineHeight: 1,
                    }}>{it.year}</div>
                    <div style={{
                      marginTop: 8, fontFamily: FONTS.body, fontWeight: 700,
                      fontSize: 26, color: PAL.cream,
                    }}>{it.label}</div>
                    <div style={{
                      marginTop: 4, fontFamily: FONTS.body, fontSize: 18,
                      color: 'rgba(247,244,238,0.55)', maxWidth: 220, margin: '4px auto 0',
                    }}>{it.sub}</div>
                  </div>
                </FadeIn>
              </SubSprite>
            ))}
          </div>
        </div>
      </SubSprite>

      {/* Sub: the principle */}
      <SubSprite start={36} end={52}>
        <div style={{ position: 'absolute', inset: 0, padding: '120px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em',
              color: PAL.tealLight, textTransform: 'uppercase',
            }}>À Maurice — Medical Council Act 1999</div>
          </FadeIn>
          <FadeIn from={0.5} dur={0.7}>
            <div style={{
              marginTop: 36, fontFamily: FONTS.display, fontSize: 80,
              color: PAL.cream, letterSpacing: '-0.02em', lineHeight: 1.15,
              maxWidth: 1500,
            }}>
              L'acte médical se définit par<br/>
              <em style={{color: PAL.tealLight}}>la qualité de son auteur</em><span style={{color: PAL.slate}}> — </span>
              <span style={{color: PAL.cream}}>pas par le canal technique.</span>
            </div>
          </FadeIn>
          <FadeIn from={3.5} dur={0.6}>
            <div style={{
              marginTop: 90,
              padding: '36px 44px',
              background: 'rgba(20,184,166,0.08)',
              borderLeft: `4px solid ${PAL.tealLight}`,
              maxWidth: 1500,
              fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 42, color: PAL.cream, lineHeight: 1.35,
            }}>
              « Ce qui n'est pas interdit est permis. »<br/>
              <span style={{ fontSize: 24, fontStyle: 'normal', color: PAL.slate, fontFamily: FONTS.mono, letterSpacing: '0.04em' }}>
                — principe directeur du droit mauricien
              </span>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Sub: 3 pillars */}
      <SubSprite start={52} end={70}>
        <div style={{ position: 'absolute', inset: 0, padding: '180px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              textAlign: 'center', fontFamily: FONTS.display, fontSize: 64,
              color: PAL.cream, letterSpacing: '-0.02em',
            }}>La téléconsultation Tibok est…</div>
          </FadeIn>
          <div style={{
            marginTop: 110, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40,
          }}>
            {[
              { word: 'Légale', sub: 'Medical Council Act 1999\nMédecins inscrits, identifiés' },
              { word: 'Opposable', sub: 'Insurance Act 2005\nDevoir de bonne foi contractuelle' },
              { word: 'Remboursable', sub: 'OMS · NHS · Medicare · CNAM\nde droit commun' },
            ].map((p, i) => (
              <SubSprite key={i} start={1 + i * 0.5} end={18}>
                <FadeIn dur={0.6} ty={30}>
                  <div style={{
                    padding: '60px 40px', borderRadius: 18,
                    background: 'rgba(247,244,238,0.04)',
                    border: '1px solid rgba(247,244,238,0.1)',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: FONTS.display, fontWeight: 600,
                      fontSize: 92, color: PAL.tealLight,
                      letterSpacing: '-0.03em', lineHeight: 1,
                    }}>{p.word}</div>
                    <div style={{
                      marginTop: 28, fontFamily: FONTS.body, fontSize: 22,
                      color: 'rgba(247,244,238,0.7)', whiteSpace: 'pre-line', lineHeight: 1.5,
                    }}>{p.sub}</div>
                  </div>
                </FadeIn>
              </SubSprite>
            ))}
          </div>
        </div>
      </SubSprite>

      <Chrome scene={3} label="CADRE LÉGAL" accent={PAL.tealLight} />
    </Sprite>
  );
}

Object.assign(window, { Scene1, Scene2, Scene3 });
