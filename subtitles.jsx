// Subtitles overlay — times are in REFERENCE seconds (the 605s scene timeline),
// re-anchored to each scene's on-screen beats so they track the visuals.
// Each cue lingers until the next so they read at a comfortable pace.

const SUBTITLES = [
  // ── Scene 1 — L'enjeu (0–25)
  { in:  1.5, out:  7.0, t: "À Maurice, un adulte sur cinq est diabétique." },
  { in:  7.0, out: 13.0, t: "Et près d'un sur trois… ne le sait pas encore." },
  { in: 13.0, out: 17.5, t: "En 2024, le diabète a causé 2 709 décès." },
  { in: 17.5, out: 20.0, t: "Près d'un sur quatre." },
  { in: 20.0, out: 25.0, t: "Pendant que le corps se tait, la médecine arrive trop tard." },

  // ── Scene 2 — Tibok, la plateforme (25–80)
  { in: 26.0, out: 35.0, t: "Tibok est la première plateforme mauricienne de télémédecine grand public." },
  { in: 35.0, out: 44.0, t: "Plus de 20 médecins inscrits au Medical Council prennent en charge les patients en vidéo, 7j/7." },
  { in: 44.0, out: 50.0, t: "Mais Tibok n'est pas une simple application de consultation." },
  { in: 50.0, out: 56.0, t: "C'est un écosystème de Medical Intelligence." },
  { in: 56.0, out: 68.0, t: "Consultation, ordonnance, pharmacie, analyses, suivi chronique, second avis, prévention, validation." },
  { in: 68.0, out: 79.5, t: "Conçu et opéré depuis Maurice par le Dr Stéphane Bach, médecin spécialiste en santé publique." },

  // ── Scene 3 — Cadre légal (80–150)
  { in:  81.0, out:  88.0, t: "La téléconsultation n'est pas un débat juridique." },
  { in:  88.0, out:  96.0, t: "C'est un fait accompli — depuis bientôt 30 ans." },
  { in:  96.0, out: 104.0, t: "Depuis 1997, l'OMS la définit comme un acte médical à part entière." },
  { in: 104.0, out: 111.0, t: "La France la rembourse depuis 2018. Les États-Unis dans les 50 États." },
  { in: 111.0, out: 117.0, t: "Royaume-Uni, Allemagne, Australie, Canada, Suisse — droit commun." },
  { in: 117.0, out: 120.0, t: "Et à Maurice ?" },
  { in: 120.0, out: 129.0, t: "Le Medical Council Act de 1999 n'impose aucune condition de présence physique." },
  { in: 129.0, out: 138.0, t: "L'acte médical se définit par la qualité de son auteur — un médecin inscrit. Pas par le canal technique." },
  { in: 138.0, out: 142.0, t: "Ce qui n'est pas interdit est permis." },
  { in: 142.0, out: 150.0, t: "La téléconsultation Tibok est légale, opposable et remboursable de droit commun." },

  // ── Scene 4 — L'écosystème (150–240)
  { in: 151.0, out: 158.0, t: "Découvrons l'écosystème Tibok." },
  { in: 158.0, out: 166.0, t: "Dix outils — gravitant autour d'une intelligence centrale." },
  { in: 166.0, out: 178.0, t: "Téléconsultation, ordonnance, pharmacie, analyses, suivi, famille, SilentCheck, second avis, validation." },
  { in: 178.0, out: 186.0, t: "Au cœur de tout : la Medical Intelligence." },
  { in: 186.0, out: 196.0, t: "Elle ne se limite pas à un module — elle intervient à tous les niveaux." },
  { in: 196.0, out: 205.0, t: "Autour d'elle, des agents IA qui ne dorment jamais." },
  { in: 205.0, out: 214.0, t: "L'agent de suivi chronique — rappels WhatsApp, alertes médecin." },
  { in: 214.0, out: 223.0, t: "L'agent de prévention — croisement des cohortes avec les référentiels scientifiques." },
  { in: 223.0, out: 231.0, t: "L'agent de validation — analyse chaque ordonnance avant engagement de l'assureur." },
  { in: 231.0, out: 240.0, t: "Une chaîne complète. Pilotée. Tracée. Verrouillée." },

  // ── Scene 5 — Medical Intelligence (240–320)
  { in: 241.0, out: 249.0, t: "Au cœur de Tibok : la Medical Intelligence." },
  { in: 249.0, out: 259.0, t: "Les meilleurs LLM du marché — Claude, GPT, Gemini, Mistral — combinés à un système RAG." },
  { in: 259.0, out: 268.0, t: "Plus de 60 000 références issues des plus grandes sociétés savantes mondiales." },
  { in: 268.0, out: 278.0, t: "OMS, Société européenne de cardiologie, American Heart Association, NICE, INSERM, HAS, FDA." },
  { in: 278.0, out: 288.0, t: "Chaque consultation, chaque ordonnance, chaque rapport est verrouillé par ce socle scientifique." },
  { in: 288.0, out: 293.0, t: "L'IA ne remplace pas le médecin." },
  { in: 293.0, out: 296.0, t: "Elle l'augmente." },
  { in: 296.0, out: 305.0, t: "Elle vérifie. Elle suggère. Elle alerte." },
  { in: 305.0, out: 320.0, t: "Et c'est le médecin qui garde, toujours, la décision finale." },

  // ── Scene 6 — SilentCheck (320–400)
  { in: 321.0, out: 328.0, t: "Notre innovation phare s'appelle SilentCheck." },
  { in: 328.0, out: 337.0, t: "Un outil de stratification du risque cardiovasculaire, basé sur le Score BSD." },
  { in: 337.0, out: 341.0, t: "Bach, Sampol, Dignat-George." },
  { in: 341.0, out: 349.0, t: "Une science fondée sur 4 millions de patients suivis dans 52 pays." },
  { in: 349.0, out: 357.0, t: "53 références scientifiques publiées dans NEJM, Lancet, JACC, Circulation." },
  { in: 357.0, out: 363.0, t: "69 612 individus inclus dans la cohorte de validation." },
  { in: 363.0, out: 369.0, t: "11 profils ethniques, 7 multiplicateurs adaptés à Maurice." },
  { in: 369.0, out: 375.0, t: "15 biomarqueurs. 3 bilans selon le niveau de risque." },
  { in: 375.0, out: 384.0, t: "SilentCheck détecte 5 à 10 ans à l'avance les anomalies que les symptômes ne révèlent pas." },
  { in: 384.0, out: 390.0, t: "80 % des maladies cardiaques se développent sans symptôme pendant une décennie." },
  { in: 390.0, out: 395.0, t: "85 % des complications sont évitables avec une détection précoce." },
  { in: 395.0, out: 400.0, t: "Agir avant la maladie. Pas après." },

  // ── Scene 7 — Second avis (400–440)
  { in: 401.0, out: 408.0, t: "Pour les pathologies complexes, Tibok propose le Second Avis Médical." },
  { in: 408.0, out: 418.0, t: "Le dossier complet — anamnèse, ordonnance, imagerie, biologie — est revérifié par notre dispositif IA et RAG." },
  { in: 418.0, out: 425.0, t: "Les LLM analysent le dossier. Le moteur RAG le confronte à nos 60 000 références." },
  { in: 425.0, out: 430.0, t: "Un médecin Tibok valide le rapport final." },
  { in: 430.0, out: 434.0, t: "Une seconde lecture entièrement scientifiquement sourcée." },
  { in: 434.0, out: 437.0, t: "Pour l'assuré : un dossier revu sans angle mort." },
  { in: 437.0, out: 440.0, t: "Pour l'assureur : un contrôle qualité avant tout acte coûteux." },

  // ── Scene 8 — Validation Assurance (440–500)
  { in: 441.0, out: 449.0, t: "Le module clé pour NIC : la Validation Assurance." },
  { in: 449.0, out: 458.0, t: "Toute ordonnance, toute prescription d'examen, toute intervention transite par la plateforme." },
  { in: 458.0, out: 467.0, t: "L'assureur reçoit en temps réel le document, le contexte clinique, et l'analyse de pertinence." },
  { in: 467.0, out: 474.0, t: "Il peut valider, demander un complément, ou orienter vers un second avis." },
  { in: 474.0, out: 478.0, t: "Trois leviers structurels :" },
  { in: 478.0, out: 483.0, t: "la fin de la sur-prescription ;" },
  { in: 483.0, out: 491.0, t: "la lutte structurée contre la fraude — horodatage, signature, traçabilité vidéo ;" },
  { in: 491.0, out: 500.0, t: "la maîtrise du ratio sinistres sur primes par le pilotage des cohortes." },

  // ── Scene 9 — L'offre NIC (500–570)
  { in: 501.0, out: 508.0, t: "Voici ce que Tibok propose à NIC." },
  { in: 508.0, out: 512.0, t: "Trois prix. Un seul standard." },
  { in: 512.0, out: 521.0, t: "Pour le grand public : 800 roupies la consultation, facturée par les médecins." },
  { in: 521.0, out: 532.0, t: "Pour NIC en tant qu'entreprise : 50 roupies par mois et par assuré — accès complet à la Medical Intelligence." },
  { in: 532.0, out: 540.0, t: "Tableau de bord assureur, validation temps réel, analytique anonymisée, agents IA dédiés." },
  { in: 540.0, out: 550.0, t: "Pour les assurés NIC : tarif préférentiel de 500 roupies la consultation, au lieu de 800." },
  { in: 550.0, out: 557.0, t: "Suivi chronique offert. Second avis offert. SilentCheck inclus. Validation sans paperasse." },
  { in: 557.0, out: 564.0, t: "Aucun standard de cette qualité n'existe aujourd'hui sur le continent africain." },
  { in: 564.0, out: 570.0, t: "Un partenariat. Trois bénéfices." },

  // ── Scene 10 — Fermeture (570–605)
  { in: 571.0, out: 578.0, t: "Le marché mauricien de l'assurance santé est à un tournant." },
  { in: 578.0, out: 586.0, t: "Respect, Relation, Responsabilité, Rigueur, Résultats — l'ADN de NIC." },
  { in: 586.0, out: 593.0, t: "Servir, protéger, donner les moyens d'agir : la mission de NIC, portée par la Medical Intelligence de Tibok." },
  { in: 593.0, out: 599.0, t: "Bâtissons ensemble le standard de demain." },
  { in: 599.0, out: 605.0, t: "Dr Stéphane Bach. Digital Data Solutions. tibok.mu." },
];

// Find the active cue for a given time
function findCue(t) {
  for (let i = 0; i < SUBTITLES.length; i++) {
    const s = SUBTITLES[i];
    if (t >= s.in && t <= s.out) return s;
  }
  return null;
}

function Subtitles({ enabled = true }) {
  const { time } = useTimeline();
  if (!enabled) return null;
  const cue = findCue(time);
  const opacity = cue ? 1 : 0;

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 80,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1500,
        padding: '20px 36px',
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(8px)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        opacity,
        transition: 'opacity 200ms ease',
        textAlign: 'center',
        fontFamily: FONTS.body, fontWeight: 500,
        fontSize: 34, lineHeight: 1.35,
        color: '#FFFFFF',
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        letterSpacing: '-0.005em',
      }}>
        {cue ? cue.t : '\u00A0'}
      </div>
    </div>
  );
}

// Toggle button for the subtitle overlay (top-right)
function SubtitleToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: 'absolute', top: 56, right: 64,
        zIndex: 200,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px',
        background: enabled ? 'rgba(20,184,166,0.18)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${enabled ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: 10,
        color: enabled ? '#5EEAD4' : 'rgba(255,255,255,0.55)',
        fontFamily: FONTS.mono, fontSize: 14, letterSpacing: '0.16em',
        textTransform: 'uppercase', cursor: 'pointer',
        backdropFilter: 'blur(6px)',
        transition: 'all 160ms',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M7 15h3M13 15h4M7 11h2M11 11h6" />
      </svg>
      <span>Sous-titres · {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}

// Offset slider (below the toggle) — nudge subtitle timing in real seconds.
function SubtitleOffsetControl({ value, onChange, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'absolute', top: 110, right: 64, zIndex: 200,
      padding: '14px 18px',
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 10,
      width: 280,
      color: '#FFFFFF',
      fontFamily: FONTS.mono,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.65)', marginBottom: 8,
      }}>
        <span>Décalage sous-titres</span>
        <span style={{ color: '#5EEAD4', fontWeight: 700 }}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}s
        </span>
      </div>
      <input
        type="range"
        min="-15" max="15" step="0.25"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#14B8A6', cursor: 'pointer' }}
      />
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: 6,
        fontSize: 10, color: 'rgba(255,255,255,0.4)',
      }}>
        <span>plus tôt</span>
        <button
          onClick={() => onChange(0)}
          style={{
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)',
            fontFamily: FONTS.mono, fontSize: 10, cursor: 'pointer',
            textTransform: 'uppercase', letterSpacing: '0.12em',
          }}
        >reset</button>
        <span>plus tard</span>
      </div>
    </div>
  );
}

Object.assign(window, { Subtitles, SubtitleToggle, SubtitleOffsetControl, SUBTITLES });
