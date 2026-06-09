// Scenes 8-10 — Validation Assurance, Offre SWAN, Closing

// ═══════════════════════════════════════════════════════════════════
// SCENE 8 — VALIDATION ASSURANCE  (440–500s)
// ═══════════════════════════════════════════════════════════════════

function Scene8() {
  return (
    <Sprite start={440} end={500}>
      <Backdrop color={PAL.paper}
        gradient={`linear-gradient(135deg, ${PAL.violetMist} 0%, ${PAL.paper} 60%)`} />

      <SubSprite start={0} end={60}>
        <Particles count={24} color="rgba(124,58,237,0.22)" speed={0.35} seed={8} />
      </SubSprite>

      {/* Title */}
      <SubSprite start={0} end={12}>
        <div style={{ position: 'absolute', inset: 0, padding: '320px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em', color: PAL.violet, textTransform: 'uppercase' }}>
              08 · Le module clé pour NIC
            </div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.9}>
            <div style={{
              marginTop: 24, fontFamily: FONTS.display, fontSize: 140,
              color: PAL.ink, letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              Validation<br/>
              <em style={{ color: PAL.violet, fontStyle: 'italic' }}>Assurance.</em>
            </div>
          </FadeIn>
          <FadeIn from={2.5} dur={0.7}>
            <div style={{
              marginTop: 30, fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 44, color: PAL.graphite, maxWidth: 1500,
            }}>
              Le contrôle en temps réel des prescriptions, des examens et des interventions.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Flow diagram: prescription → real-time review */}
      <SubSprite start={12} end={36}>
        <div style={{ position: 'absolute', inset: 0, padding: '140px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 52, color: PAL.ink,
              letterSpacing: '-0.02em', maxWidth: 1600, lineHeight: 1.2,
            }}>
              Chaque acte de votre assuré transite par la plateforme.<br/>
              <span style={{color: PAL.violet, fontStyle:'italic'}}>Vous validez avant l'engagement.</span>
            </div>
          </FadeIn>

          {/* Two-column flow */}
          <div style={{
            marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 30,
            alignItems: 'stretch',
          }}>
            {/* Left: incoming */}
            <SubSprite start={1.5} end={24}>
              <FadeIn dur={0.6} ty={20}>
                <div style={{
                  background: PAL.white, border: `1px solid ${PAL.line}`,
                  borderRadius: 18, padding: '32px 32px',
                  boxShadow: '0 12px 40px rgba(15,23,42,0.06)',
                  height: '100%',
                }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.2em', color: PAL.teal, textTransform: 'uppercase' }}>
                    Côté patient
                  </div>
                  <div style={{ marginTop: 14, fontFamily: FONTS.display, fontSize: 36, color: PAL.ink, fontWeight: 600 }}>
                    Consultation Tibok
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      ['Ordonnance', 'Amoxicilline 500 mg · 7 j'],
                      ['Examen', 'Bilan lipidique complet'],
                      ['Imagerie', 'Échographie abdominale'],
                      ['Intervention', 'Spécialiste cardiologie'],
                    ].map(([k,v],i)=>(
                      <div key={i} style={{
                        display:'flex', justifyContent:'space-between', alignItems:'center',
                        padding: '14px 18px', background: PAL.tealMist, borderRadius: 10,
                      }}>
                        <span style={{ fontFamily: FONTS.mono, fontSize: 14, color: PAL.tealDeep, letterSpacing: '0.1em', textTransform:'uppercase' }}>{k}</span>
                        <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 18, color: PAL.ink }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </SubSprite>

            {/* Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SubSprite start={3} end={24}>
                {({ localTime }) => {
                  const pulse = 0.5 + 0.5 * Math.sin(localTime * 3);
                  return (
                    <div style={{
                      fontFamily: FONTS.body, color: PAL.violet,
                      transform: `translateX(${pulse * 6}px)`,
                    }}>
                      <svg width={80} height={50} viewBox="0 0 80 50">
                        <path d="M0 25 L60 25 M50 12 L60 25 L50 38" stroke={PAL.violet} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div style={{ marginTop: 4, fontSize: 12, fontFamily: FONTS.mono, textAlign: 'center', letterSpacing: '0.1em' }}>TEMPS RÉEL</div>
                    </div>
                  );
                }}
              </SubSprite>
            </div>

            {/* Right: insurer dashboard */}
            <SubSprite start={4} end={24}>
              <FadeIn dur={0.6} ty={20}>
                <div style={{
                  background: PAL.navyDeep,
                  borderRadius: 18, padding: '32px 32px',
                  boxShadow: '0 20px 60px rgba(45,50,88,0.3)',
                  height: '100%', color: PAL.cream,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', display: 'flex' }}>
                      <img src="assets/nic-logo.png" alt="NIC" style={{ width: 78, height: 'auto', objectFit: 'contain' }}/>
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.2em', color: 'rgba(247,244,238,0.55)', textTransform: 'uppercase' }}>
                      Tableau Assureur · live
                    </div>
                  </div>
                  <div style={{ marginTop: 14, fontFamily: FONTS.display, fontSize: 36, fontWeight: 600 }}>
                    Validation en attente
                  </div>
                  <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { l: 'Pertinence clinique', v: 'Conforme', c: '#10B981', dt: 1.5 },
                      { l: 'Justification RAG', v: 'OK · ESC 2023', c: '#10B981', dt: 2.5 },
                      { l: 'Coût estimé', v: 'Rs 4 200', c: '#FBBF24', dt: 3.5 },
                      { l: 'Risque fraude', v: 'Faible', c: '#10B981', dt: 4.5 },
                    ].map((r, i) => (
                      <SubSprite key={i} start={r.dt} end={24}>
                        <FadeIn dur={0.4} ty={8}>
                          <div style={{
                            display:'flex', justifyContent:'space-between', alignItems:'center',
                            padding: '14px 18px', background: 'rgba(247,244,238,0.06)', borderRadius: 10,
                            border: '1px solid rgba(247,244,238,0.1)',
                          }}>
                            <span style={{ fontFamily: FONTS.body, fontSize: 18, color: 'rgba(247,244,238,0.8)' }}>{r.l}</span>
                            <span style={{ display:'flex', alignItems:'center', gap: 8 }}>
                              <span style={{ width: 8, height: 8, borderRadius: 4, background: r.c }} />
                              <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 18, color: PAL.cream }}>{r.v}</span>
                            </span>
                          </div>
                        </FadeIn>
                      </SubSprite>
                    ))}
                  </div>
                  <SubSprite start={6} end={24}>
                    <FadeIn dur={0.5}>
                      <div style={{ marginTop: 22, display: 'flex', gap: 12 }}>
                        <div style={{
                          flex: 1, padding: '16px 20px', background: '#10B981',
                          borderRadius: 10, textAlign: 'center', fontFamily: FONTS.body, fontWeight: 700, fontSize: 22, color: 'white',
                        }}>✓ Valider</div>
                        <div style={{
                          flex: 1, padding: '16px 20px', background: 'rgba(247,244,238,0.08)',
                          borderRadius: 10, textAlign: 'center', fontFamily: FONTS.body, fontSize: 20, color: 'rgba(247,244,238,0.7)',
                          border: '1px solid rgba(247,244,238,0.18)',
                        }}>Complément</div>
                      </div>
                    </FadeIn>
                  </SubSprite>
                </div>
              </FadeIn>
            </SubSprite>
          </div>
        </div>
      </SubSprite>

      {/* Three benefits */}
      <SubSprite start={36} end={60}>
        <div style={{ position: 'absolute', inset: 0, padding: '200px 130px 0' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 64, color: PAL.ink,
              letterSpacing: '-0.02em', maxWidth: 1500, lineHeight: 1.1, textAlign: 'center',
            }}>
              Trois leviers structurels pour <em style={{color: PAL.violet}}>NIC.</em>
            </div>
          </FadeIn>
          <div style={{ marginTop: 110, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
            {[
              { n: '01', t: 'Fin de la sur-prescription', s: 'Chaque examen est confronté aux référentiels avant validation. La prescription opportuniste devient visible.' },
              { n: '02', t: 'Lutte structurée contre la fraude', s: 'Horodatage, signature électronique, vidéo. Traçabilité supérieure à la consultation présentielle.' },
              { n: '03', t: 'Maîtrise du ratio S / P', s: 'Détection précoce, parcours coordonné, indicateurs anonymisés pour le pilotage actuariel.' },
            ].map((p,i)=>(
              <SubSprite key={i} start={1 + i*0.5} end={24}>
                <FadeIn dur={0.6} ty={30}>
                  <div style={{
                    background: PAL.white,
                    border: `1px solid ${PAL.line}`,
                    borderRadius: 18, padding: '40px 36px',
                    height: '100%', boxShadow: '0 12px 32px rgba(124,58,237,0.06)',
                  }}>
                    <div style={{
                      fontFamily: FONTS.mono, fontSize: 48, fontWeight: 700,
                      color: PAL.violet, letterSpacing: '-0.02em',
                    }}>{p.n}</div>
                    <div style={{
                      marginTop: 12, fontFamily: FONTS.display, fontSize: 36,
                      color: PAL.ink, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15,
                    }}>{p.t}</div>
                    <div style={{
                      marginTop: 18, fontFamily: FONTS.body, fontSize: 20,
                      color: PAL.graphite, lineHeight: 1.5,
                    }}>{p.s}</div>
                  </div>
                </FadeIn>
              </SubSprite>
            ))}
          </div>
        </div>
      </SubSprite>

      <Chrome scene={8} label="VALIDATION ASSURANCE" accent={PAL.violet} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 9 — L'OFFRE SWAN  (500–570s) — pricing CORRIGÉ
// ═══════════════════════════════════════════════════════════════════

function Scene9() {
  return (
    <Sprite start={500} end={570}>
      <Backdrop color={PAL.navyDeep}
        gradient={`linear-gradient(135deg, ${PAL.navyDeep} 0%, #0F1428 100%)`} />

      <SubSprite start={0} end={70}>
        <GridLayer color="rgba(20,184,166,0.03)" size={120} speed={3} perspective={20} />
        <Particles count={30} color="rgba(20,184,166,0.3)" speed={0.4} seed={9} />
      </SubSprite>

      {/* Title */}
      <SubSprite start={0} end={9}>
        <div style={{ position: 'absolute', inset: 0, padding: '300px 130px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.2em', color: PAL.tealLight, textTransform: 'uppercase' }}>
              09 · L'offre Tibok × NIC
            </div>
          </FadeIn>
          <FadeIn from={0.4} dur={0.9}>
            <div style={{
              marginTop: 24, fontFamily: FONTS.display, fontSize: 130,
              color: PAL.cream, letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              Un partenariat<br/>
              <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>convergent.</em>
            </div>
          </FadeIn>
          <FadeIn from={3} dur={0.7}>
            <div style={{
              marginTop: 36, fontFamily: FONTS.display, fontStyle: 'italic',
              fontSize: 42, color: 'rgba(247,244,238,0.65)', maxWidth: 1500,
            }}>
              Une qualité médicale unique en Afrique — accessible à tous vos assurés.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* THREE COLUMN PRICING */}
      <SubSprite start={9} end={48}>
        <div style={{ position: 'absolute', inset: 0, padding: '90px 100px 0' }}>
          <FadeIn dur={0.6}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 16, letterSpacing: '0.22em', color: PAL.tealLight, textTransform: 'uppercase' }}>
                Tarification
              </div>
              <div style={{
                marginTop: 12, fontFamily: FONTS.display, fontSize: 60,
                color: PAL.cream, letterSpacing: '-0.02em',
              }}>
                Trois prix. <em style={{color: PAL.tealLight}}>Un seul standard.</em>
              </div>
            </div>
          </FadeIn>

          <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>

            {/* Column 1 : Grand public */}
            <SubSprite start={1} end={38}>
              <FadeIn dur={0.6} ty={26}>
                <Drift amplitude={4} freq={0.18}>
                  <div style={{
                    padding: '40px 36px', borderRadius: 22,
                    background: 'rgba(247,244,238,0.04)',
                    border: '1px solid rgba(247,244,238,0.14)',
                    height: 660,
                    display: 'flex', flexDirection: 'column',
                  }}>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 13, letterSpacing: '0.2em', color: 'rgba(247,244,238,0.5)', textTransform: 'uppercase' }}>
                      Grand public
                    </div>
                    <div style={{
                      marginTop: 10, fontFamily: FONTS.display, fontSize: 40,
                      color: PAL.cream, fontWeight: 600,
                    }}>Pay as you go</div>
                    <div style={{
                      marginTop: 36, fontFamily: FONTS.display, fontSize: 110,
                      color: PAL.cream, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.9,
                    }}>
                      Rs 800
                    </div>
                    <div style={{
                      marginTop: 8, fontFamily: FONTS.body, fontSize: 18, color: 'rgba(247,244,238,0.55)',
                    }}>la consultation · facturée par les médecins</div>
                    <div style={{
                      marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(247,244,238,0.1)',
                      display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
                    }}>
                      {['Consultation vidéo 7j/7','Ordonnance numérique','Suivi chronique Rs 200/mois','Second avis Rs 600/analyse'].map(t => (
                        <div key={t} style={{ display:'flex', gap: 10, alignItems:'center', fontFamily: FONTS.body, fontSize: 18, color: 'rgba(247,244,238,0.7)' }}>
                          <span style={{ width: 5, height: 5, borderRadius: 3, background: 'rgba(247,244,238,0.4)' }} />{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </Drift>
              </FadeIn>
            </SubSprite>

            {/* Column 2 : SWAN ENTREPRISE — Rs 50/mois/assuré (PLATFORM ACCESS) */}
            <SubSprite start={2.2} end={38}>
              <FadeIn dur={0.6} ty={26}>
                <Drift amplitude={5} freq={0.22} phase={1.2}>
                  <div style={{
                    padding: '40px 36px', borderRadius: 22,
                    background: `linear-gradient(135deg, rgba(124,58,237,0.22), rgba(124,58,237,0.04))`,
                    border: `2px solid ${PAL.violet}`,
                    height: 660,
                    position: 'relative',
                    display: 'flex', flexDirection: 'column',
                    boxShadow: `0 30px 80px rgba(124,58,237,0.18)`,
                  }}>
                    <div style={{
                      position: 'absolute', top: -16, left: 32,
                      padding: '8px 16px', background: PAL.violet,
                      color: PAL.cream, fontFamily: FONTS.mono, fontWeight: 700,
                      fontSize: 13, letterSpacing: '0.18em', borderRadius: 6,
                    }}>POUR NIC · ENTREPRISE</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                      <div style={{ background: '#fff', borderRadius: 7, padding: '7px 10px', display: 'flex' }}>
                        <img src="assets/nic-logo.png" alt="NIC" style={{ width: 70, height: 'auto', objectFit: 'contain' }}/>
                      </div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 13, letterSpacing: '0.2em', color: '#C4B5FD', textTransform: 'uppercase' }}>
                        Accès plateforme
                      </div>
                    </div>
                    <div style={{
                      marginTop: 18, fontFamily: FONTS.display, fontSize: 40,
                      color: PAL.cream, fontWeight: 600, lineHeight: 1.05,
                    }}>
                      Medical Intelligence
                    </div>
                    <div style={{
                      marginTop: 24, fontFamily: FONTS.display, fontSize: 110,
                      color: '#C4B5FD', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.9,
                    }}>
                      Rs 50
                    </div>
                    <div style={{
                      marginTop: 8, fontFamily: FONTS.body, fontSize: 19, color: PAL.cream,
                    }}><strong>par mois</strong> · par assuré couvert</div>
                    <div style={{
                      marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(124,58,237,0.3)',
                      display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
                    }}>
                      {[
                        'Accès complet Medical Intelligence',
                        'Tableau de bord assureur · live',
                        'Validation prescriptions & examens',
                        'Analytique anonymisée actuarielle',
                        'Agents IA dédiés NIC',
                      ].map(t => (
                        <div key={t} style={{ display:'flex', gap: 10, alignItems:'center', fontFamily: FONTS.body, fontSize: 18, color: PAL.cream }}>
                          <span style={{ color: '#C4B5FD', fontSize: 16 }}>✓</span>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </Drift>
              </FadeIn>
            </SubSprite>

            {/* Column 3 : SWAN'S INSURED — Rs 500/consultation (PREFERENTIAL) */}
            <SubSprite start={3.4} end={38}>
              <FadeIn dur={0.6} ty={26}>
                <Drift amplitude={5} freq={0.22} phase={2.4}>
                  <div style={{
                    padding: '40px 36px', borderRadius: 22,
                    background: `linear-gradient(135deg, rgba(20,184,166,0.2), rgba(20,184,166,0.04))`,
                    border: `2px solid ${PAL.tealLight}`,
                    height: 660,
                    position: 'relative',
                    display: 'flex', flexDirection: 'column',
                    boxShadow: `0 30px 80px rgba(20,184,166,0.18)`,
                  }}>
                    <div style={{
                      position: 'absolute', top: -16, left: 32,
                      padding: '8px 16px', background: PAL.tealLight,
                      color: PAL.navyDeep, fontFamily: FONTS.mono, fontWeight: 700,
                      fontSize: 13, letterSpacing: '0.18em', borderRadius: 6,
                    }}>POUR LES ASSURÉS NIC</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                      <div style={{ background: '#fff', borderRadius: 7, padding: '7px 10px', display: 'flex' }}>
                        <img src="assets/nic-logo.png" alt="NIC" style={{ width: 70, height: 'auto', objectFit: 'contain' }}/>
                      </div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 13, letterSpacing: '0.2em', color: PAL.tealLight, textTransform: 'uppercase' }}>
                        Tarif préférentiel
                      </div>
                    </div>
                    <div style={{
                      marginTop: 18, fontFamily: FONTS.display, fontSize: 40,
                      color: PAL.cream, fontWeight: 600, lineHeight: 1.05,
                    }}>
                      Consultation
                    </div>
                    <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 16 }}>
                      <div style={{
                        fontFamily: FONTS.display, fontSize: 110,
                        color: PAL.tealLight, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.9,
                      }}>Rs 500</div>
                      <div style={{
                        fontFamily: FONTS.body, fontSize: 28, color: 'rgba(247,244,238,0.4)',
                        textDecoration: 'line-through',
                      }}>Rs 800</div>
                    </div>
                    <div style={{
                      marginTop: 8, fontFamily: FONTS.body, fontSize: 19, color: PAL.cream,
                    }}>par consultation · facturée par les médecins</div>
                    <div style={{
                      marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(20,184,166,0.3)',
                      display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
                    }}>
                      {[
                        ['Suivi maladies chroniques', 'offert'],
                        ['Second avis médical', 'offert'],
                        ['SilentCheck — prévention', 'inclus'],
                        ['Validation assurance', 'sans paperasse'],
                      ].map(([t, v]) => (
                        <div key={t} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap: 12, fontFamily: FONTS.body, fontSize: 18, color: PAL.cream }}>
                          <span style={{display:'flex', gap: 10, alignItems:'center'}}>
                            <span style={{ color: PAL.tealLight }}>✓</span>{t}
                          </span>
                          <span style={{ fontFamily: FONTS.mono, fontSize: 14, color: PAL.tealLight, letterSpacing: '0.04em' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Drift>
              </FadeIn>
            </SubSprite>
          </div>
        </div>
      </SubSprite>

      {/* Closing tagline */}
      <SubSprite start={48} end={70}>
        <div style={{ position: 'absolute', inset: 0, padding: '180px 130px 0' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 80, color: PAL.cream,
              letterSpacing: '-0.025em', lineHeight: 1.1, textAlign: 'center', maxWidth: 1600, margin: '0 auto',
            }}>
              Aucun standard de cette qualité<br/>
              <em style={{color: PAL.tealLight}}>n'existe sur le continent africain.</em>
            </div>
          </FadeIn>

          <FadeIn from={3} dur={0.6}>
            <div style={{ marginTop: 90, display: 'flex', justifyContent: 'center', gap: 40 }}>
              {[
                { v: '60 000+', l: 'références sociétés savantes' },
                { v: '4 M+', l: 'patients dans la base scientifique' },
                { v: 'LLM + RAG', l: 'verrouillage clinique' },
                { v: '20+', l: 'médecins Medical Council MU' },
              ].map((s,i)=>(
                <SubSprite key={i} start={3 + i*0.3} end={22}>
                  <FadeIn dur={0.4} ty={14}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 56, color: PAL.tealLight, letterSpacing: '-0.02em' }}>{s.v}</div>
                      <div style={{ marginTop: 8, fontFamily: FONTS.body, fontSize: 18, color: 'rgba(247,244,238,0.6)' }}>{s.l}</div>
                    </div>
                  </FadeIn>
                </SubSprite>
              ))}
            </div>
          </FadeIn>

          <FadeIn from={7} dur={0.6}>
            <div style={{
              marginTop: 90, padding: '32px 44px',
              background: 'rgba(20,184,166,0.1)',
              borderLeft: `4px solid ${PAL.tealLight}`,
              fontFamily: FONTS.display, fontSize: 34, color: PAL.cream, lineHeight: 1.4, maxWidth: 1500, margin: '90px auto 0',
            }}>
              <strong style={{color: PAL.tealLight}}>Un partenariat. Trois bénéfices.</strong><br/>
              Une expérience moderne pour vos assurés. Une maîtrise structurelle de vos coûts. Un produit aligné sur les meilleurs standards internationaux.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={9} label="L'OFFRE NIC" accent={PAL.tealLight} />
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 10 — CLOSING  (570–555s) — corrected: 555–600s ≈ 9'15"
// ═══════════════════════════════════════════════════════════════════

function Scene10() {
  return (
    <Sprite start={570} end={605}>
      <Backdrop color={PAL.ink}
        gradient={`radial-gradient(ellipse at 50% 60%, #1A1F45 0%, ${PAL.ink} 75%)`} />

      <SubSprite start={0} end={35}>
        <Particles count={40} color="rgba(20,184,166,0.35)" speed={0.4} seed={10} />
      </SubSprite>

      {/* Opener line */}
      <SubSprite start={0} end={10}>
        <div style={{ position: 'absolute', inset: 0, padding: '380px 130px 0' }}>
          <FadeIn dur={0.7}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 84, color: PAL.cream,
              letterSpacing: '-0.025em', lineHeight: 1.15, textAlign: 'center',
            }}>
              Le marché mauricien de l'assurance santé<br/>
              <em style={{color: PAL.tealLight}}>est à un tournant.</em>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Both logos together */}
      <SubSprite start={10} end={26}>
        <div style={{ position: 'absolute', inset: 0, padding: '260px 130px 0' }}>
          <FadeIn dur={0.7}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80,
            }}>
              <div style={{ padding: '34px 44px', background: '#fff', borderRadius: 14, display: 'flex' }}>
                <img src="assets/nic-logo.png" alt="NIC" style={{ width: 320, height: 'auto', objectFit: 'contain' }}/>
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 88, color: PAL.tealLight, fontWeight: 200, letterSpacing: '-0.02em' }}>×</div>
              <div style={{ padding: '40px 50px', background: PAL.cream, borderRadius: 14 }}>
                <TibokMark size={140} />
              </div>
            </div>
          </FadeIn>
          <FadeIn from={1.5} dur={0.7}>
            <div style={{ marginTop: 80, textAlign: 'center' }}>
              {/* NIC 5Rs */}
              <div style={{
                display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap',
                marginBottom: 34,
              }}>
                {['Respect', 'Relation', 'Responsabilité', 'Rigueur', 'Résultats'].map(r => (
                  <div key={r} style={{
                    padding: '9px 20px',
                    border: '1px solid rgba(20,184,166,0.4)',
                    borderRadius: 999,
                    fontFamily: FONTS.mono, fontSize: 18, letterSpacing: '0.08em',
                    color: PAL.tealLight,
                  }}>{r}</div>
                ))}
              </div>
              <div style={{
                fontFamily: FONTS.display, fontSize: 72,
                color: PAL.cream, letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>
                Servir. Protéger. <em style={{ color: PAL.tealLight, fontStyle: 'italic' }}>Donner les moyens d'agir.</em>
              </div>
              <div style={{
                marginTop: 24,
                fontFamily: FONTS.display, fontStyle: 'italic', fontSize: 44,
                color: 'rgba(247,244,238,0.7)', letterSpacing: '-0.01em',
              }}>
                La mission de NIC, désormais portée par la Medical Intelligence de Tibok.
              </div>
            </div>
          </FadeIn>
          <FadeIn from={4.5} dur={0.7}>
            <div style={{
              marginTop: 56, textAlign: 'center',
              fontFamily: FONTS.display, fontSize: 60, color: PAL.cream,
              fontStyle: 'italic', letterSpacing: '-0.02em',
            }}>
              Bâtissons ensemble le standard de demain.
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      {/* Sign-off */}
      <SubSprite start={26} end={35}>
        <div style={{ position: 'absolute', inset: 0, padding: '360px 130px 0' }}>
          <FadeIn dur={0.8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: FONTS.display, fontSize: 96, color: PAL.cream,
                letterSpacing: '-0.025em', lineHeight: 1,
              }}>
                Dr Stéphane Bach
              </div>
              <div style={{
                marginTop: 22, fontFamily: FONTS.body, fontSize: 28,
                color: 'rgba(247,244,238,0.7)', letterSpacing: '0.04em',
              }}>
                Fondateur & CEO · Digital Data Solutions Ltd
              </div>
              <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center', gap: 40 }}>
                {['tibok.mu', 'digital-data-solutions.net', 'sbach@tibok.mu'].map(t => (
                  <div key={t} style={{
                    fontFamily: FONTS.mono, fontSize: 22, letterSpacing: '0.1em',
                    color: PAL.tealLight,
                  }}>{t}</div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </SubSprite>

      <Chrome scene={10} label="FERMETURE" accent={PAL.tealLight} />
    </Sprite>
  );
}

Object.assign(window, { Scene8, Scene9, Scene10 });
