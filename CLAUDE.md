# MultiChannelConsult Website — CLAUDE.md

## Projekt-Kontext

Statische Website für **MultiChannelConsult** (multichannelconsult.de) — Unternehmensberatung mit Fokus auf Transformation und Marketingberatung. Ersetzt die bisherige WordPress/GeneratePress-Site. Kein CMS, keine Build-Tools, direktes SFTP-Deploy auf Strato.

**PRD:** `/Users/FRE_1/Documents/projects-2/MCC-Redesign/PRD-MCC-Redesign.md`
**Assets-Quelle:** `/Users/FRE_1/Documents/projects-2/MCC-Redesign/`
**GitHub:** https://github.com/Hank1210/mcc-new
**Live:** https://multichannelconsult.de (noch alt, noch nicht deployed)

---

## Tech Stack

- **Vanilla HTML + CSS + JS** — kein Framework, kein Build-Tool
- **Deployment:** SFTP via VS Code Extension auf Strato
- **Bildgenerierung:** Kie.ai Nano Banana 2 API — Key in `.env` als `KIE_AI_API_Key` (in `/Users/FRE_1/Documents/projects-2/MCC-Redesign/.env`, nicht im Repo)
- **Lokaler Dev-Server:** `python3 -m http.server 8080` im Repo-Root

---

## Design System

### Farben (`assets/css/style.css` → `:root`)

| Variable | Hex | Verwendung |
|---|---|---|
| `--blue` | `#19199c` | Brand-Akzent sparsam (Labels, Icons, Links) |
| `--blue-dark` | `#0d0d6b` | — (Reserve) |
| `--blue-light` | `#37b5ff` | Highlight, Akzentstriche, Hover |
| `--ink` | `#111827` | Alle Headings auf hellem Hintergrund |
| `--gray` | `#464649` | Body-Text |
| `--gray-light` | `#6b7280` | Sekundärer Text, Subtitles |
| `--gray-border` | `#e5e7eb` | Rahmen, Trennlinien |
| `--white` | `#ffffff` | Hintergrund helle Sektionen |
| `--bg` | `#f9fafb` | Leichter Sektion-Alt-Hintergrund |
| `--bg-dark` | `#0f1624` | Dunkle Sektionen + Footer (kein reines Blau!) |

### Kritische Design-Entscheidungen
- **Headings auf weißem BG:** immer `--ink` (#111827), NICHT `--blue`
- **Blau nur sparsam:** Labels, Akzentstriche (`::before`), Icon-Hintergründe, Links
- **Dunkle Sektionen:** `--bg-dark` (#0f1624 dunkelnavygrau), nicht reines `--blue`
- **Hero-Höhe:** 72vh (nicht 100vh), Bild-Opacity max 28–45%
- **Nav:** immer weiß sichtbar auf Homepage; transparent→weiß auf Unterseiten via scroll

### Typography

- **Font:** Poppins (Google Fonts CDN) — 300, 400, 500, 600, 700
- **Logo-Font:** HeroLightBolt (nur im Logo-PNG, nicht als Webfont laden)
- **Basis:** 16px, 1.65 line-height

### Sektion-Rhythmus (Homepage-Vorbild)
```
Weißer Nav → Dunkler Hero (~72vh) → Blauer Intro-Strip
→ Weiße Mission-Sektion → Dunkles Video-Band
→ Hellgrauer Grid → Weiße Team-Sektion → Dunkler Footer
```

---

## Dateistruktur

```
mcc-new/
├── index.html                          ← Homepage DE (hat eigene inline Stile im <style>-Tag)
├── leistungen/index.html               ← Leistungen DE
│   └── self-publishing/index.html      ← Sonderleistung, NICHT in Hauptnav
├── automation/index.html               ← Automation DE
├── team/index.html                     ← Team DE
├── impressum/index.html                ← Impressum (Inhalt unverändert!)
├── datenschutz/index.html              ← Datenschutz (Inhalt unverändert!)
├── en/                                 ← EN-Mirror, gleiche Struktur
│   ├── index.html
│   ├── services/index.html
│   │   └── self-publishing/index.html
│   ├── automation/index.html
│   ├── team/index.html
│   ├── legal-notice/index.html
│   └── privacy-policy/index.html
├── assets/
│   ├── css/style.css                   ← EINZIGE globale CSS-Datei
│   ├── js/main.js                      ← Nav-Scroll, Hamburger, Scroll-Animationen
│   ├── images/                         ← Alle Bilder (aus MCC-Redesign/Assets* kopiert)
│   └── video/MCC-Animation.mp4         ← 7.9 MB (ffmpeg nicht verfügbar zum Komprimieren)
├── .htaccess                           ← Caching, Sicherheitsheader, 404
└── CLAUDE.md                           ← diese Datei
```

---

## Navigation

**Hauptnav (DE):** Leistungen | Automation | Team + DE|EN Sprachumschalter
**Self-Publishing:** nicht in Hauptnav — nur via Leistungen-Seite erreichbar
**Sprachumschalter:** jede Seite verlinkt auf ihre EN/DE-Entsprechung

---

## Asset-Mapping

| Datei | Seite/Verwendung |
|---|---|
| `Logo-MCC-Tagline-Final.png` | Nav + Footer auf allen Seiten |
| `MCC_Website_512-512.png` | Favicon (`<link rel="icon">`) |
| `Image_Transformation_1280x630.png` | Hero: Homepage + Team |
| `Image_Zahnräder_1280x630.png` | Hero: Leistungen |
| `Image_Finger_1280x630.png` | Hero: Automation |
| `Image_Ausrufe_1280x630.png` | Hero: Self-Publishing |
| `MCC_Manage/Digital/Transformation.png` | Homepage Mission-Säulen |
| `MCC_Leistung_*.png` | Service-Cards auf Leistungen-Seite |
| `MCC_Buch_*.png` (7 Stück) | Buchgrid auf Self-Publishing |
| `Daniel_Euler_Portrait_02a.jpg` | Team (Alexander Daniel Euler) |
| `Eulerfra-Press-Bus_Office_250808.png` | Team (Frank Rüdiger Euler) |
| `KI-Workflow.jpg` | Automation (Content-Bild) |
| `ChatBot-Case.png` | Automation (Case Study) |
| `MCC-Animation.mp4` | Homepage Video-Band (autoplay muted loop) |

---

## Regeln & Constraints

### Was NIE geändert werden darf
- Inhalt von `impressum/index.html` und `datenschutz/index.html` (rechtlich fixiert)
- Keine CTAs oder Kontaktformulare einfügen
- Keine externen Abhängigkeiten außer Google Fonts CDN

### Pfade
- Alle Asset-Pfade sind **absolut** (`/assets/images/...`) — funktioniert auf Strato und lokal mit Dev-Server
- Kein `../` oder relative Pfade verwenden

### HTML-Muster
- Jede Seite hat Nav + Mobile-Nav + Content + Footer als vollständiges HTML-Dokument
- Homepage (`index.html`) hat zusätzliche `<style>`-Tags für seitenspezifische Overrides
- Andere Seiten verwenden ausschließlich `assets/css/style.css`

### CSS-Klassen-Konventionen
- `.section` — Standard-Padding-Block
- `.section--alt` — Hellgrauer Hintergrund (`--bg`)
- `.section--dark` — Dunkler Hintergrund (`--bg-dark`)
- `.container` — Max-Width + Gutter
- `.fade-up` — Scroll-Animation (via IntersectionObserver in main.js)
- `.label` — Kleines Eyebrow-Label mit blauem AkzentStrich `::before`
- `.nav--scrolled` — wird via JS auf `.nav` gesetzt beim Scrollen

---

## Bildgenerierung (Nano Banana 2)

Für neue Bilder wenn nötig:
```bash
# Step 1: Task erstellen
curl --location 'https://api.kie.ai/api/v1/jobs/createTask' \
  --header 'Authorization: Bearer <KIE_AI_API_Key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "nano-banana-2",
    "input": {
      "prompt": "...",
      "aspect_ratio": "16:9",
      "resolution": "1K",
      "output_format": "png"
    }
  }'
# Gibt taskId zurück → dann Status pollen bis completed
```

---

## Deployment

```bash
# Lokaler Dev-Server starten
cd /Users/FRE_1/Documents/projects-2/mcc-new
python3 -m http.server 8080
# → http://localhost:8080

# Git
git add -A
git commit -m "..."
git push origin main   # → https://github.com/Hank1210/mcc-new

# SFTP auf Strato: via VS Code SFTP Extension
# Ziel: Strato Webhosting Root
```

---

## Bekannte Limitierungen

- **ffmpeg nicht installiert** — Video kann nicht komprimiert werden (aktuell 7.9 MB)
- **Keine Templating-Engine** — Header/Footer wird in jede HTML-Datei copy-paste eingefügt; bei globalen Änderungen alle Dateien aktualisieren
- **EN-Seiten** sind direkte Übersetzungen, kein automatisches i18n
