// Scenes 4-7 — Écosystème, Medical Intelligence + RAG, SilentCheck, Second Avis

// ═══════════════════════════════════════════════════════════════════
// SCENE 4 — L'ÉCOSYSTÈME (150–240s) — radial Medical Intelligence
// ═══════════════════════════════════════════════════════════════════

const ECOSYSTEM = [
  { kind:'video',    title:'Téléconsultation',    color: PAL.teal,    bg: PAL.tealMist },
  { kind:'doc',      title:'Ordonnance',          color: '#2563EB',   bg: '#E0EBFE' },
  { kind:'pill',     title:'Pharmacie',           color: '#F97316',   bg: '#FEEAD7' },
  { kind:'flask',    title:'Analyses',            color: '#7C3AED',   bg: '#F0E6FE' },
  { kind:'pulse',    title:'Suivi chronique',     color: '#0EA5E9',   bg: '#DAF1FD' },
  { kind:'family',   title:'Famille',             color: '#EAB308',   bg: '#FBF5D7' },
  { kind:'heart',    title:'SilentCheck',         color: PAL.rose,    bg: '#FDDDE6' },
  { kind:'stetho',   title:'Second avis',         color: '#0E7C7B',   bg: PAL.tealMist },
  { kind:'shield',   title:'Validation assureur', color: PAL.violet,  bg: PAL.violetMist },
  { kind:'calendar', title:'RDV à venir',         color: '#10B981',   bg: '#DCFAEE' },
];

function Scene4() {
  return (
    <Sprite start={150} end={240}>
      <Backdrop color={PAL.ink}
        gradient={`radial-gradient(ellipse at 50% 50%, #14193A 0%, ${PAL.ink} 70%, #050714 100%)`} />

      {/* atmospheric layers */}
      <SubSprite start={0} end={90}>
        <GridLayer color="rgba(20,184,166,0.04)" size={120} speed={4} />
        <Particles count={50} color="rgba(20,184,166,0.4)" speed={0.6} seed={4} />
      </SubSprite>

      {/* ───── PHASE A: title + radial reveal (0–50s) ───── */}
      <SubSprite start={0} end={50}>
        {/* Title */}
        <SubSprite start={0} end={50}>
          <div style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
            <FadeIn dur={0.7}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.22em', color: PAL.tealLight, textTransform: 'uppercase' }}>
                04 · L'écosystème
              </div>
              <div style={{
                marginTop: 14, fontFamily: FONTS.display, fontSize: 86, color: PAL.cream,
                letterSpacing: '-0.02em', lineHeight: 1.05,
              }}>
                Dix outils. <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>Une intelligence centrale.</em>
              </div>
            </FadeIn>
          </div>
        </SubSprite>

        {/* Radial diagram */}
        <SubSprite start={1.5} end={50}>
          {({ localTime }) => {
            const cx = W / 2, cy = 620;
            const R = 360;             // tool orbit radius
            const idleRot = localTime * 4; // slow rotation in degrees
            const ANG0 = -90;          // first tool at top

            return (
              <div style={{
                position: 'absolute',
                left: cx - 700, top: cy - 460,
                width: 1400, height: 920,
                transform: `perspective(1600px) rotateX(8deg)`,
                transformOrigin: 'center center',
              }}>
                {/* SVG layer for connecting lines + halos */}
                <svg width={1400} height={920} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(20,184,166,0.5)" />
                      <stop offset="60%" stopColor="rgba(20,184,166,0.1)" />
                      <stop offset="100%" stopColor="rgba(20,184,166,0)" />
                    </radialGradient>
                  </defs>
                  {/* glow */}
                  <circle cx={700} cy={460} r={360} fill="url(#coreGlow)" />
                  {/* orbit ring */}
                  <circle cx={700} cy={460} r={R} stroke="rgba(20,184,166,0.18)" strokeWidth="1" fill="none" strokeDasharray="2 8" />
                  <circle cx={700} cy={460} r={R + 30} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />

                  {/* connecting lines core ↔ tools */}
                  {ECOSYSTEM.map((tool, i) => {
                    const start = i * 0.18 + 0.3;
                    if (localTime < start) return null;
                    const angDeg = ANG0 + i * 36 + idleRot;
                    const ang = angDeg * Math.PI / 180;
                    const x2 = 700 + Math.cos(ang) * R;
                    const y2 = 460 + Math.sin(ang) * R;
                    // pulsing dot along the line
                    const pt = ((localTime - start) * 0.35 + i * 0.07) % 1;
                    const px = 700 + Math.cos(ang) * R * pt;
                    const py = 460 + Math.sin(ang) * R * pt;
                    return (
                      <g key={i} opacity={clamp((localTime - start) * 2, 0, 1)}>
                        <line x1={700} y1={460} x2={x2} y2={y2}
                              stroke={tool.color} strokeOpacity="0.32" strokeWidth="1.2"
                              strokeDasharray="3 6" />
                        <circle cx={px} cy={py} r={3} fill={tool.color} opacity={0.85} />
                      </g>
                    );
                  })}
                </svg>

                {/* spinning rings */}
                <div style={{ position: 'absolute', left: 700, top: 460 }}>
                  <SpinningRing size={760} dur={60} color="rgba(124,58,237,0.16)" dash="2 10" />
                  <SpinningRing size={620} dur={45} reverse color="rgba(20,184,166,0.18)" dash="3 16" />
                  <PulseRing size={460} color="rgba(20,184,166,0.28)" count={3} dur={4.5} />
                </div>

                {/* CENTRAL CORE */}
                <SubSprite start={0} end={48.5}>
                  <FadeIn dur={0.8} ty={0}>
                    <Drift amplitude={6} freq={0.25}>
                      <div style={{
                        position: 'absolute', left: 700 - 200, top: 460 - 200,
                        width: 400, height: 400,
                      }}>
                        <div style={{
                          width: '100%', height: '100%', borderRadius: '50%',
                          background: `radial-gradient(circle at 30% 30%, #14B8A6 0%, #0E7C7B 50%, #0A4A48 100%)`,
                          boxShadow: '0 0 80px rgba(20,184,166,0.55), inset 0 -40px 80px rgba(0,0,0,0.25), inset 0 30px 50px rgba(255,255,255,0.18)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          color: PAL.cream, textAlign: 'center', padding: 40,
                        }}>
                          <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.24em', opacity: 0.7, textTransform: 'uppercase' }}>
                            au cœur
                          </div>
                          <div style={{
                            marginTop: 12, fontFamily: FONTS.display, fontWeight: 600,
                            fontSize: 54, letterSpacing: '-0.02em', lineHeight: 1,
                          }}>Medical<br/>Intelligence</div>
                          <div style={{
                            marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center',
                          }}>
                            {['LLM', 'RAG · 60 000', 'Agents IA'].map(t => (
                              <div key={t} style={{
                                padding: '6px 12px', background: 'rgba(255,255,255,0.18)',
                                borderRadius: 999, fontFamily: FONTS.mono, fontSize: 13, letterSpacing: '0.08em',
                              }}>{t}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Drift>
                  </FadeIn>
                </SubSprite>

                {/* TOOL SATELLITES */}
                {ECOSYSTEM.map((tool, i) => {
                  const angDeg = ANG0 + i * 36 + idleRot;
                  const ang = angDeg * Math.PI / 180;
                  const x = 700 + Math.cos(ang) * R;
                  const y = 460 + Math.sin(ang) * R;
                  const start = i * 0.18 + 0.4;
                  return (
                    <SubSprite key={i} start={start} end={48.5}>
                      <FadeIn dur={0.5} ty={20} ease={Easing.easeOutBack}>
                        <div style={{
                          position: 'absolute', left: x - 80, top: y - 80,
                          width: 160, height: 160,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(247,244,238,0.06)',
                          border: `1px solid ${tool.color}66`,
                          backdropFilter: 'blur(4px)',
                          borderRadius: 18,
                          boxShadow: `0 12px 28px rgba(0,0,0,0.3), 0 0 24px ${tool.color}33`,
                        }}>
                          <ServiceIcon kind={tool.kind} size={52} color={tool.color}
                                       bg={`${tool.color}22`} />
                          <div style={{
                            marginTop: 10, fontFamily: FONTS.body, fontWeight: 600,
                            fontSize: 16, color: PAL.cream, textAlign: 'center', lineHeight: 1.1,
                            padding: '0 8px',
                          }}>{tool.title}</div>
                        </div>
                      </FadeIn>
                    </SubSprite>
                  );
                })}
              </div>
            );
          }}
        </SubSprite>

        {/* legend / explainer (appears late in phase A) */}
        <SubSprite start={10} end={50}>
          <FadeIn dur={0.7}>
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 80,
              textAlign: 'center',
              fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 36, color: 'rgba(247,244,238,0.75)',
            }}>
              La Medical Intelligence intervient <em style={{ color: PAL.tealLight, fontStyle:'normal', fontWeight: 600 }}>à tous les niveaux.</em>
            </div>
          </FadeIn>
        </SubSprite>
      </SubSprite>

      {/* ───── PHASE B: AI Agents in action (50–90s) ───── */}
      <SubSprite start={50} end={90}>
        {/* Title */}
        <div style={{ position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center' }}>
          <FadeIn dur={0.6}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.22em', color: PAL.violet, textTransform: 'uppercase' }}>
              04b · Les agents IA Tibok
            </div>
            <div style={{
              marginTop: 14, fontFamily: FONTS.display, fontSize: 78, color: PAL.cream,
              letterSpacing: '-0.02em', lineHeight: 1.05,
            }}>
              Ils ne dorment jamais.<br/>
              <em style={{ color: PAL.violet, fontStyle: 'italic' }}>Ils veillent sur vos assurés.</em>
            </div>
          </FadeIn>
        </div>

        {/* Three agent panels */}
        <div style={{
          position: 'absolute', top: 380, left: 120, right: 120,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30,
        }}>
          {[
            {
              t: 'Agent Suivi Chronique',
              icon: 'pulse',
              color: '#0EA5E9',
              log: [
                ['08:00', 'Ping WhatsApp · prendre tension'],
                ['08:14', 'Réponse patient : 168/102'],
                ['08:14', '⚠ Alerte médecin'],
                ['08:22', 'RDV proposé · 14h00'],
              ],
            },
            {
              t: 'Agent Prévention',
              icon: 'heart',
              color: PAL.rose,
              log: [
                ['—', 'Cohorte HbA1c > 7%'],
                ['—', 'Croisement RAG · ESC 2023'],
                ['—', 'Score BSD recalculé'],
                ['—', 'Bilan adapté proposé'],
              ],
            },
            {
              t: 'Agent Validation',
              icon: 'shield',
              color: PAL.violet,
              log: [
                ['10:31', 'Ordonnance reçue'],
                ['10:31', 'Justification RAG · OK'],
                ['10:31', 'Coût · Rs 4 200'],
                ['10:31', '✓ Validé pour NIC'],
              ],
            },
          ].map((agent, i) => (
            <SubSprite key={i} start={1.5 + i * 0.4} end={40}>
              <FadeIn dur={0.6} ty={28}>
                <Drift amplitude={5} freq={0.3} phase={i * 1.7}>
                  <div style={{
                    background: 'rgba(247,244,238,0.05)',
                    border: `1px solid ${agent.color}44`,
                    backdropFilter: 'blur(6px)',
                    borderRadius: 18,
                    padding: '28px 26px',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 24px ${agent.color}22`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <ServiceIcon kind={agent.icon} size={48} color={agent.color} bg={`${agent.color}22`} />
                      <div>
                        <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.18em', color: 'rgba(247,244,238,0.5)', textTransform: 'uppercase' }}>
                          IA · live
                        </div>
                        <div style={{ marginTop: 2, fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, color: PAL.cream }}>
                          {agent.t}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {agent.log.map(([when, msg], j) => (
                        <SubSprite key={j} start={1 + j * 0.5} end={36}>
                          <FadeIn dur={0.4} ty={8}>
                            <div style={{
                              display: 'grid', gridTemplateColumns: '56px 1fr', gap: 12,
                              padding: '10px 12px', background: 'rgba(0,0,0,0.25)',
                              borderLeft: `2px solid ${agent.color}88`, borderRadius: 6,
                            }}>
                              <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: 'rgba(247,244,238,0.5)' }}>{when}</span>
                              <span style={{ fontFamily: FONTS.body, fontSize: 16, color: PAL.cream, lineHeight: 1.35 }}>{msg}</span>
                            </div>
                          </FadeIn>
                        </SubSprite>
                      ))}
                    </div>
                  </div>
                </Drift>
              </FadeIn>
            </SubSprite>
          ))}
        </div>

        {/* Closing tag */}
        <SubSprite start={12} end={40}>
          <FadeIn dur={0.7}>
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 70,
              textAlign: 'center', fontFamily: FONTS.display, fontSize: 38,
              color: PAL.cream, letterSpacing: '-0.01em',
            }}>
              <em style={{color: PAL.tealLight}}>Une chaîne complète.</em> Pilotée. Tracée. Verrouillée.
            </div>
          </FadeIn>
        </SubSprite>
      </SubSprite>

      <Chrome scene={4} label="ÉCOSYSTÈME" accent={PAL.tealLight} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 5 — MEDICAL INTELLIGENCE + RAG (240–320s)
// ═══════════════════════════════════════════════════════════════════

function Scene5() {
  return (
    <Sprite start={240} end={320}>
      <Backdrop color={PAL.ink} gradient={`linear-gradient(180deg, #0F1428 0%, ${PAL.ink} 100%)`} />

      {/* moving dots background */}
      <SubSprite start={0} end={80}>
        {({ localTime }) => (
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`translate(${(localTime*8)%40}, 0)`}>
                <circle cx="20" cy="20" r="1.2" fill={PAL.tealLight} />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#dots)" />
          </svg>
        )}
      </SubSprite>

      {/* Title */}
      <SubSprite start={0} end={10}>
        <div style={{ position: 'absolute', inset: 0, padding: '340px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em', color: PAL.tealLight, textTransform: 'uppercase' }}>
              05 · La signature Tibok
            </div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.8} ty={28}>
            <div style={{
              marginTop: 24, fontFamily: FONTS.display, fontSize: 120,
              color: PAL.cream, letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              Medical<br/>
              <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>Intelligence.</em>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Architecture */}
      <SubSprite start={10} end={45}>
        <div style={{ position: 'absolute', inset: 0, padding: '120px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 56, color: PAL.cream,
              letterSpacing: '-0.02em', maxWidth: 1500, lineHeight: 1.2,
            }}>
              Les meilleurs LLM du marché<br/>
              <span style={{ color: PAL.slate }}>croisés avec un système RAG<br/>
              adossé à </span><em style={{ color: PAL.tealLight }}>60 000 références.</em>
            </div>
          </FadeIn>

          {/* Pipeline diagram */}
          <div style={{
            marginTop: 100, display: 'flex', alignItems: 'center', gap: 22,
          }}>
            {/* LLM */}
            <SubSprite start={1.5} end={35}>
              <FadeIn dur={0.5}>
                <div style={{
                  padding: '36px 32px', minWidth: 320,
                  border: `1px solid rgba(247,244,238,0.18)`,
                  borderRadius: 16, background: 'rgba(20,184,166,0.06)',
                }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.18em', color: PAL.tealLight, textTransform: 'uppercase' }}>Modèles</div>
                  <div style={{ marginTop: 12, fontFamily: FONTS.display, fontWeight: 600, fontSize: 36, color: PAL.cream }}>LLM frontière</div>
                  <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Claude · Anthropic','GPT · OpenAI','Gemini · Google','Mistral'].map(m => (
                      <div key={m} style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(247,244,238,0.75)' }}>{m}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </SubSprite>

            {/* Plus */}
            <SubSprite start={2.5} end={35}>
              <FadeIn dur={0.4}>
                <div style={{ fontFamily: FONTS.display, fontSize: 80, color: PAL.tealLight, fontWeight: 300 }}>+</div>
              </FadeIn>
            </SubSprite>

            {/* RAG */}
            <SubSprite start={3.5} end={35}>
              <FadeIn dur={0.5}>
                <div style={{
                  padding: '36px 32px', minWidth: 380,
                  border: `1px solid rgba(124,58,237,0.4)`,
                  borderRadius: 16, background: 'rgba(124,58,237,0.1)',
                }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.18em', color: '#A78BFA', textTransform: 'uppercase' }}>RAG médical</div>
                  <div style={{ marginTop: 12, fontFamily: FONTS.display, fontWeight: 600, fontSize: 36, color: PAL.cream }}>60 000+ références</div>
                  <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Sociétés savantes mondiales','OMS · ESC · AHA · NICE','HAS · INSERM · FDA','Guidelines opposables'].map(m => (
                      <div key={m} style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(247,244,238,0.75)' }}>{m}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </SubSprite>

            {/* Arrow */}
            <SubSprite start={5} end={35}>
              <FadeIn dur={0.4}>
                <svg width={120} height={40} viewBox="0 0 120 40">
                  <path d="M0 20 L100 20 M85 8 L100 20 L85 32" stroke={PAL.tealLight} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </FadeIn>
            </SubSprite>

            {/* Output */}
            <SubSprite start={6} end={35}>
              <FadeIn dur={0.5}>
                <div style={{
                  padding: '36px 32px', minWidth: 320,
                  border: `2px solid ${PAL.tealLight}`,
                  borderRadius: 16, background: `linear-gradient(135deg, rgba(20,184,166,0.18), rgba(20,184,166,0.05))`,
                }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.18em', color: PAL.tealLight, textTransform: 'uppercase' }}>Sortie</div>
                  <div style={{ marginTop: 12, fontFamily: FONTS.display, fontWeight: 600, fontSize: 36, color: PAL.cream }}>Acte verrouillé</div>
                  <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Diagnostic vérifié','Ordonnance sourcée','Examens justifiés','Décision tracée'].map(m => (
                      <div key={m} style={{ fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(247,244,238,0.75)' }}>{m}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </SubSprite>
          </div>
        </div>
      </SubSprite>

      {/* The key principle */}
      <SubSprite start={45} end={80}>
        <div style={{ position: 'absolute', inset: 0, padding: '300px 130px 0', textAlign: 'center' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 96, color: PAL.cream,
              letterSpacing: '-0.025em', lineHeight: 1.1,
            }}>
              L'IA ne remplace pas <em style={{ color: PAL.tealLight }}>le médecin.</em>
            </div>
          </FadeIn>
          <FadeIn from={1.5} dur={0.7}>
            <div style={{
              marginTop: 36,
              fontFamily: FONTS.display, fontSize: 96, color: PAL.tealLight,
              letterSpacing: '-0.025em', fontWeight: 600, fontStyle: 'italic',
            }}>Elle l'augmente.</div>
          </FadeIn>
          <FadeIn from={3.5} dur={0.6}>
            <div style={{
              marginTop: 80, display: 'flex', justifyContent: 'center', gap: 60,
              fontFamily: FONTS.display, fontSize: 40, color: 'rgba(247,244,238,0.6)',
            }}>
              <span>Elle vérifie.</span>
              <span style={{color: PAL.slate}}>·</span>
              <span>Elle suggère.</span>
              <span style={{color: PAL.slate}}>·</span>
              <span>Elle alerte.</span>
            </div>
          </FadeIn>
          <FadeIn from={5} dur={0.6}>
            <div style={{
              marginTop: 36, fontFamily: FONTS.display, fontSize: 48,
              color: PAL.cream, fontStyle: 'italic',
            }}>
              Le médecin garde la décision.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={5} label="MEDICAL INTELLIGENCE" accent={PAL.tealLight} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 6 — SILENTCHECK / Prévention  (320–400s)
// ═══════════════════════════════════════════════════════════════════

function Scene6() {
  return (
    <Sprite start={320} end={400}>
      <Backdrop color={PAL.paper} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 80% 20%, ${PAL.tealMist} 0%, transparent 55%)`,
      }} />

      <SubSprite start={0} end={80}>
        <Particles count={22} color="rgba(225,29,72,0.18)" speed={0.3} seed={6} />
      </SubSprite>

      {/* Title */}
      <SubSprite start={0} end={12}>
        <div style={{ position: 'absolute', inset: 0, padding: '320px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em', color: PAL.teal, textTransform: 'uppercase' }}>
              06 · L'innovation Tibok
            </div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.9} ty={36}>
            <div style={{
              marginTop: 24, fontFamily: FONTS.display, fontSize: 200,
              color: PAL.ink, letterSpacing: '-0.04em', lineHeight: 0.95,
            }}>
              Silent<span style={{color: PAL.teal}}>Check</span><span style={{color: PAL.rose}}>.</span>
            </div>
          </FadeIn>
          <FadeIn from={2.0} dur={0.7}>
            <div style={{
              marginTop: 28, fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 48, color: PAL.graphite,
            }}>
              Le silence du corps n'est plus une fatalité.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Score BSD origin */}
      <SubSprite start={12} end={32}>
        <div style={{ position: 'absolute', inset: 0, padding: '120px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 64, color: PAL.ink,
              letterSpacing: '-0.02em', maxWidth: 1400, lineHeight: 1.1,
            }}>
              Stratification du risque cardiovasculaire,<br/>
              <em style={{color: PAL.teal}}>powered by Score BSD.</em>
            </div>
          </FadeIn>

          <FadeIn from={1.5} dur={0.6}>
            <div style={{ marginTop: 60, display: 'flex', gap: 32 }}>
              {[
                { v: '4M+', l: 'patients suivis', sub: '52 pays · NHANES, JUPITER, MESA, ARIC' },
                { v: '53', l: 'références scientifiques', sub: 'NEJM · Lancet · JACC · Circulation' },
                { v: '69 612', l: 'individus inclus', sub: 'cohorte de validation' },
                { v: '11', l: 'profils ethniques', sub: '7 multiplicateurs · Maurice-aware' },
              ].map((s,i)=>(
                <SubSprite key={i} start={1 + i*0.4} end={20}>
                  <FadeIn dur={0.5} ty={20}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 80, color: PAL.teal, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                        {s.v}
                      </div>
                      <div style={{ marginTop: 14, fontFamily: FONTS.body, fontWeight: 600, fontSize: 22, color: PAL.ink }}>{s.l}</div>
                      <div style={{ marginTop: 4, fontFamily: FONTS.body, fontSize: 17, color: PAL.graphite, lineHeight: 1.4 }}>{s.sub}</div>
                    </div>
                  </FadeIn>
                </SubSprite>
              ))}
            </div>
          </FadeIn>

          {/* Authors */}
          <FadeIn from={6} dur={0.6}>
            <div style={{
              marginTop: 80, padding: 32, background: PAL.white,
              border: `1px solid ${PAL.line}`, borderRadius: 16,
              display: 'flex', gap: 24, alignItems: 'center',
            }}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.2em', color: PAL.teal, textTransform: 'uppercase' }}>
                BSD ·
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 32, color: PAL.ink }}>
                Dr <strong>Bach</strong> · Pr <strong>Sampol</strong> · Pr <strong>Dignat-George</strong>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ fontFamily: FONTS.body, fontSize: 18, color: PAL.graphite }}>
                Hématologie · médecine vasculaire · prévention CV
              </div>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* 15 biomarkers */}
      <SubSprite start={32} end={52}>
        <div style={{ position: 'absolute', inset: 0, padding: '110px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 64, color: PAL.ink,
              letterSpacing: '-0.02em', maxWidth: 1500, lineHeight: 1.1,
            }}>
              <em style={{color: PAL.teal}}>15 biomarqueurs.</em><br/>
              Trois bilans selon le risque.
            </div>
          </FadeIn>

          <div style={{
            marginTop: 70, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14,
          }}>
            {[
              'HbA1c','Glycémie','LDL','HDL','hs-CRP',
              'Triglycérides','ApoB','Lp(a)','ACR urinaire','eGFR',
              'Acide urique','NT-proBNP','Troponine hs','ASAT/ALAT','GGT',
            ].map((b, i) => (
              <SubSprite key={i} start={1.2 + i*0.15} end={20}>
                <FadeIn dur={0.4} ty={16}>
                  <div style={{
                    padding: '24px 16px', background: PAL.white,
                    border: `1px solid ${PAL.line}`, borderRadius: 12,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: PAL.tealMist,
                      color: PAL.teal, fontFamily: FONTS.mono, fontWeight: 700, fontSize: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{String(i+1).padStart(2,'0')}</div>
                    <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 19, color: PAL.ink }}>{b}</div>
                  </div>
                </FadeIn>
              </SubSprite>
            ))}
          </div>

          <FadeIn from={6} dur={0.6}>
            <div style={{
              marginTop: 70,
              padding: '32px 40px',
              background: PAL.tealMist, borderRadius: 14,
              fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 36, color: PAL.tealDeep, lineHeight: 1.3,
            }}>
              Détecter <strong style={{ fontStyle: 'normal' }}>5 à 10 ans à l'avance</strong> les anomalies<br/>
              que les symptômes ne révèlent pas encore.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Closing punch */}
      <SubSprite start={52} end={80}>
        <div style={{ position: 'absolute', inset: 0, padding: '300px 130px 0', textAlign: 'center' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 88, color: PAL.ink,
              letterSpacing: '-0.025em', lineHeight: 1.1,
            }}>
              <strong style={{color: PAL.rose}}>85 %</strong> des complications<br/>
              sont évitables avec une détection précoce.
            </div>
          </FadeIn>
          <FadeIn from={2} dur={0.6}>
            <div style={{
              marginTop: 60,
              fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 56, color: PAL.teal,
            }}>
              Agir <strong style={{fontStyle:'normal'}}>avant</strong> la maladie.<br/>
              <span style={{ color: PAL.graphite }}>Pas après.</span>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={6} label="SILENTCHECK" accent={PAL.teal} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 7 — SECOND AVIS MÉDICAL (400–440s) — IA + RAG validation
// ═══════════════════════════════════════════════════════════════════

function Scene7() {
  return (
    <Sprite start={400} end={440}>
      <Backdrop color={PAL.tealDeep} gradient={`linear-gradient(180deg, ${PAL.tealDeep} 0%, ${PAL.navyDeep} 100%)`} />

      <SubSprite start={0} end={40}>
        <GridLayer color="rgba(20,184,166,0.04)" size={100} speed={3} />
        <Particles count={30} color="rgba(20,184,166,0.35)" speed={0.5} seed={7} />
      </SubSprite>

      {/* Title */}
      <SubSprite start={0} end={8}>
        <div style={{ position: 'absolute', inset: 0, padding: '360px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em', color: PAL.tealLight, textTransform: 'uppercase' }}>
              07 · Le contrôle qualité
            </div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.9}>
            <div style={{
              marginTop: 24, fontFamily: FONTS.display, fontSize: 140,
              color: PAL.cream, letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              Second Avis<br/>
              <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>Médical.</em>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Document flow: dossier → IA + RAG → rapport */}
      <SubSprite start={8} end={40}>
        <div style={{ position: 'absolute', inset: 0, padding: '140px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 52, color: PAL.cream,
              letterSpacing: '-0.02em', maxWidth: 1600, lineHeight: 1.2,
            }}>
              Le dossier patient, intégralement revérifié<br/>
              <span style={{color: 'rgba(247,244,238,0.55)'}}>par notre dispositif <em style={{color: PAL.tealLight}}>IA + RAG médical.</em></span>
            </div>
          </FadeIn>

          {/* 4-step flow */}
          <div style={{
            marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto',
            gridTemplateAreas: '"a arrow1 b arrow2 c"',
            gap: 18, alignItems: 'stretch',
          }}>
            {[
              { icon: 'doc',    t: 'Dossier patient',           s: 'Anamnèse · ordonnance · imagerie · biologie · antécédents' },
              { icon: 'brain',  t: 'Analyse LLM',               s: 'Modèles frontière croisent l\'ensemble du dossier' },
              { icon: 'shield', t: 'Vérification RAG',          s: '60 000 références sociétés savantes · guidelines opposables' },
              { icon: 'stetho', t: 'Rapport second avis',        s: 'Synthèse structurée · validée par médecin Tibok' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                <SubSprite start={1 + i * 1.0} end={32}>
                  <FadeIn dur={0.5} ty={20}>
                    <Drift amplitude={4} freq={0.3} phase={i*0.7}>
                      <div style={{
                        width: '100%', padding: '32px 26px',
                        background: 'rgba(247,244,238,0.06)',
                        border: `1px solid ${i===3 ? PAL.tealLight : 'rgba(247,244,238,0.18)'}`,
                        borderRadius: 16,
                        boxShadow: i===3 ? `0 20px 50px rgba(20,184,166,0.18)` : 'none',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <ServiceIcon kind={step.icon} size={48}
                                       color={i===3 ? PAL.tealLight : PAL.cream}
                                       bg={i===3 ? 'rgba(20,184,166,0.18)' : 'rgba(247,244,238,0.08)'} />
                          <div style={{
                            width: 36, height: 36, borderRadius: 10, background: PAL.tealLight,
                            color: PAL.navyDeep, fontFamily: FONTS.mono, fontWeight: 800, fontSize: 18,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>{i+1}</div>
                        </div>
                        <div style={{ marginTop: 22, fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, color: PAL.cream, lineHeight: 1.15 }}>{step.t}</div>
                        <div style={{ marginTop: 8, fontFamily: FONTS.body, fontSize: 17, color: 'rgba(247,244,238,0.65)', lineHeight: 1.4 }}>{step.s}</div>
                      </div>
                    </Drift>
                  </FadeIn>
                </SubSprite>
                {i < 3 && (
                  <SubSprite start={1.6 + i * 1.0} end={32}>
                    <FadeIn dur={0.3}>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: PAL.tealLight, fontSize: 36, height: '100%',
                      }}>→</div>
                    </FadeIn>
                  </SubSprite>
                )}
              </React.Fragment>
            ))}
          </div>

          <FadeIn from={6} dur={0.6}>
            <div style={{
              marginTop: 80, padding: '32px 40px',
              background: 'rgba(20,184,166,0.1)',
              borderLeft: `4px solid ${PAL.tealLight}`,
              fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 32, color: PAL.cream, lineHeight: 1.4, maxWidth: 1700,
            }}>
              <strong style={{color: PAL.tealLight, fontStyle: 'normal'}}>Pour l'assuré :</strong> une seconde lecture rassurante, scientifiquement sourcée.<br/>
              <strong style={{color: PAL.tealLight, fontStyle: 'normal'}}>Pour l'assureur :</strong> un contrôle qualité automatisé avant tout acte coûteux.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={7} label="SECOND AVIS" accent={PAL.tealLight} />
    </Sprite>
  );
}

Object.assign(window, { Scene4, Scene5, Scene6, Scene7 });
