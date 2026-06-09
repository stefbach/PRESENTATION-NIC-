# Tibok × NIC — Présentation animée

Présentation vidéo animée (≈ 7 min 39) présentant **Tibok**, la plateforme de
*Medical Intelligence*, et son offre destinée à **NIC — National Insurance
Company**.

Le rendu est une application React autonome (compilée dans le navigateur via
Babel Standalone) qui joue une timeline de 10 scènes avec sous-titres,
intro 3D, et synchronisation audio.

## Lancer la présentation

Les fichiers `.jsx` sont chargés dynamiquement (`<script type="text/babel"
src="…">`), il faut donc servir le dossier via HTTP — l'ouverture directe en
`file://` ne fonctionne pas (CORS).

```bash
# Depuis la racine du dépôt
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000/Tibok%20x%20SWAN.html>.

### Commandes de lecture

- **▶ / barre espace** — lecture / pause
- **← / →** — reculer / avancer dans la timeline
- **Drag du curseur** — scrub libre
- **Sous-titres · ON/OFF** (haut droite) — afficher / masquer les sous-titres
- **Décalage sous-titres** — slider ±15 s pour micro-ajuster la synchro

La position de lecture et les préférences de sous-titres sont mémorisées dans
le `localStorage`.

## Structure

| Fichier | Rôle |
|---|---|
| `Tibok x SWAN.html` | Point d'entrée — charge React, Babel et les modules |
| `app.jsx` | Composition principale : intro + 10 scènes + sous-titres |
| `intro.jsx` | Écran d'accueil 3D (logos NIC × Tibok, tagline) |
| `scenes-a.jsx` · `scenes-b.jsx` · `scenes-c.jsx` | Les 10 scènes |
| `animations.jsx` | Moteur de timeline / Stage et primitives d'animation |
| `shared.jsx` | Tokens (palette, dimensions) et composants partagés |
| `fx.jsx` | Effets : particules, grilles en perspective, halos |
| `subtitles.jsx` | Sous-titres FR intégrés, calés sur la timeline des scènes |
| `audio-sync.jsx` | Synchronisation de l'`<audio>` sur la timeline |
| `assets/` | Logos NIC / Swan, photo Dr Bach, narration MP3 |
| `screenshots/` | Captures de référence du rendu attendu |

### Scènes

1. L'enjeu — choc des chiffres diabète
2. Tibok — la plateforme + Dr Stéphane Bach (médecin spécialiste en santé publique)
3. Cadre légal — chronologie internationale + Medical Council Act
4. Écosystème — diagramme radial des 10 outils + agents IA
5. Medical Intelligence — LLM + RAG (60 000 références de sociétés savantes)
6. SilentCheck — score BSD + biomarqueurs
7. Second avis — validation IA + RAG/LLM
8. Validation Assurance — module clé pour NIC
9. Offre NIC — tarification (Rs 50/mois/assuré · Rs 500/consultation)
10. Fermeture — ADN NIC (5R · Servir, Protéger, Donner les moyens d'agir)

## Audio & sous-titres

La voix off est **désactivée** (`muted`) : le MP3 fourni narre encore l'ancienne
version « Swan ». Pour entendre « N.I.C. », il faut réenregistrer une voix à
partir de **`Script audio.md`** (prononciation lettre par lettre : « N. I. C. »),
puis la greffer à la place de `assets/narration.mp3`.

- `Script audio.md` — script de narration propre, scène par scène
- `Script narration.md` — version annotée (timestamps, notes de production)
- `Sous-titres.srt` — sous-titres FR au format SRT, importables dans un éditeur vidéo
