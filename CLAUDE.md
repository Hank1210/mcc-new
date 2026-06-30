# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt-Kontext

Statische Website für **MultiChannelConsult** (multichannelconsult.de) — Unternehmensberatung mit Fokus auf Transformation und Marketingberatung. Ersetzt die bisherige WordPress/GeneratePress-Site. Kein CMS, keine Build-Tools, direktes SFTP-Deploy auf Strato.

**PRD:** `/Users/FRE_1/Documents/projects-2/MCC-Redesign/PRD-MCC-Redesign.md`
**Assets-Quelle:** `/Users/FRE_1/Documents/projects-2/MCC-Redesign/AssetsHeader/` (Quell-Bilder vor Kopie nach `assets/images/`)
**GitHub:** https://github.com/Hank1210/mcc-new
**Live:** https://multichannelconsult.de

---

## Tech Stack

- **Vanilla HTML + CSS + JS** — kein Framework, kein Build-Tool
- **Deployment:** SFTP via VS Code Extension auf Strato
- **Bildgenerierung:** Kie.ai Nano Banana 2 API — Key in `.env` als `KIE_AI_API_Key` (in `/Users/FRE_1/Documents/projects-2/MCC-Redesign/.env`, **nicht im Repo**)
- **Lokaler Dev-Server:** `python3 -m http.server 8080` im Repo-Root → http://localhost:8080

---

## Design System

### Farben (`assets/css/style.css` → `:root`)

| Variable | Hex | Verwendung |
|---|---|---|
| `--blue` | `#19199c` | Brand-Akzent sparsam (Labels, Icons, Links) |
| `--blue-light` | `#37b5ff` | Highlight, Akzentstriche, Hover |
| `--ink` | `#111827` | Alle Headings auf hellem Hintergrund |
| `--gray` | `#464649` | Body-Text |
| `--gray-light` | `#6b7280` | Sekundärer Text, Subtitles |
| `--gray-border` | `#e5e7eb` | Rahmen, Trennlinien |
| `--bg` | `#f9fafb` | Leichter Sektion-Alt-Hintergrund |
| `--bg-dark` | `#0f1624` | Dunkle Sektionen + Footer |

### Kritische Design-Regeln
- **Headings auf weißem BG:** immer `--ink`, NICHT `--blue`
- **Blau nur sparsam:** Labels, `::before`-Akzentstriche, Icon-Hintergründe, Links
- **Dunkle Sektionen:** `--bg-dark` (dunkelnavygrau), nicht reines `--blue`
- **Hero-Bilder:** `opacity: 0.92` auf `.hero__bg`, Overlay-Gradient `105deg rgba(15,22,36,0.82)→0.45→0.05`
- **Homepage-Hero:** Video-Hintergrund, `opacity: 0.62`, stärkerer Overlay

### Typography
- **Font:** Poppins (Google Fonts CDN, alle Seiten im `<head>`) — 300, 400, 500, 600, 700
- **Basis:** 16px, 1.65 line-height

---

## Dateistruktur

```
mcc-new/
├── index.html                          ← Homepage DE
├── leistungen/index.html               ← Leistungen DE
│   └── self-publishing/index.html
├── automation/index.html
├── team/index.html
├── impressum/index.html                ← Inhalt NIEMALS ändern (rechtlich)
├── datenschutz/index.html              ← Inhalt NIEMALS ändern (rechtlich)
├── en/                                 ← EN-Mirror, identische Layouts
│   ├── index.html
│   ├── services/index.html
│   │   └── self-publishing/index.html
│   ├── automation/index.html
│   ├── team/index.html
│   ├── legal-notice/index.html
│   └── privacy-policy/index.html
├── assets/
│   ├── css/style.css                   ← EINZIGE globale CSS-Datei
│   ├── js/main.js                      ← Nav-Scroll, Hamburger, fade-up Animationen
│   ├── images/
│   └── video/MCC-Animation.mp4
└── .htaccess
```

---

## Seitenstruktur & CSS-Patterns

### Jede Seite enthält
1. `<link>` auf Poppins Google Font
2. `<link>` auf `/assets/css/style.css`
3. Seitenspezifische `<style>`-Block mit page-level Overrides (inkl. `.label`-Definition)
4. Nav (desktop) + `nav__mobile` (mobile) + Content-Sektionen + Footer
5. `<script src="/assets/js/main.js">`

### Navigation (DE)
```
Über uns | Leistungen | Automation | Team  +  DE | EN
```
Aktive Seite erhält `nav__link--active`. Auf der Homepage bleibt die Nav **immer weiß** (kein scroll-transparenz). CSS-Spezifität beachten: `.nav .nav__link--active` (0,2,0) muss nach `.nav .nav__link` stehen.

### Homepage-spezifische Layouts (`index.html`)

| CSS-Klasse | Beschreibung |
|---|---|
| `.home-hero` + `.home-hero__bg` (video) | 72vh Hero mit Video-Hintergrund (opacity 0.62) |
| `.home-hero__tag` | Eyebrow mit `::before`-Linie |
| `.intro-strip` | Blauer Banner unter Hero mit Kompetenzfeldern |
| `.mission-head` + `.pillars-grid` / `.pillar-col` | 3-spaltige Mission-Karten mit Ghost-Zahlen (4.5rem, opacity 0.06) |
| `.pillar-col:hover` | Hover: hellgrauer BG + blauer Top-Balken via `::after` |
| `.mc-split` | Dunkle Section: Text links + Bild rechts |
| `.diff-grid` | 3×2 Grid „Was uns auszeichnet" |
| `.team-list` | 2-spaltige Team-Karten (400px Bildhöhe) |

### Unterseiten-Layouts

| Seite | Key-Layouts |
|---|---|
| `leistungen/` | `.svc-grid` (3-col) + `.svc-cell--wide` (volle Breite) + `.sp-frame` (SP-Teaser) |
| `automation/` | `.intro-split` (1fr 1.4fr) + `.stufen-grid` + `.vorteile-grid` (dark) + `.case-split` |
| `team/` | `.team-grid` (2-col) + `.team-card__schwerpunkte` (Bullet-Liste) + `.team-card__links` |
| `leistungen/self-publishing/` | `.pub-grid` (4-col) + `.sp-section` + `.svc-list` + `.notice-box` |

---

## Asset-Mapping (aktuell)

| Datei | Verwendung |
|---|---|
| `Logo-MCC-Tagline-Final.png` | Nav + Footer, alle Seiten |
| `MCC_Website_512-512.png` | Favicon |
| `Image-Together.png` | Homepage mc-split (DE + EN) |
| `Image_Finger-N.png` | Hero: Team (DE + EN) |
| `Image_KI_1280x630.png` | Hero: Automation |
| `Image_Zahnräder_1280x630.png` | Hero: Leistungen/Services |
| `Image_Buch_mod.png` | Hero: Self-Publishing |
| `Image_Transformation_1280x630.png` | Homepage Video-Poster-Fallback |
| `Daniel_Euler_Square.jpg` | Team-Foto Homepage (759×759px) |
| `Eulerfra-Press_Square.png` | Team-Foto Homepage (500×500px) |
| `Daniel_Euler_Portrait_02a.jpg` | Team-Foto Teamseite (Hochformat) |
| `Eulerfra-Press-Bus_Office_250808.png` | Team-Foto Teamseite (Hochformat) |
| `MCC_Manage/Digital/Transformation.png` | Pillars-Grid Homepage |
| `MCC_Leistung_*.png` | Service-Zellen Leistungen |
| `MCC_Automation_KI.png` | Wide-Cell Leistungen (verlinkt auf Automation) |
| `MCC_Buch_*.png` (7 Stück) | Buchgrid Self-Publishing + sp-frame |
| `KI-Workflow.jpg` | Automation Intro-Split |
| `ChatBot-Case.png` | Automation Case Study |

---

## Globale CSS-Klassen (style.css)

| Klasse | Bedeutung |
|---|---|
| `.section` | Standard-Padding-Block |
| `.section--alt` | Hellgrauer Hintergrund (`--bg`) |
| `.section--dark` | Dunkler Hintergrund (`--bg-dark`) |
| `.container` | Max-Width + Gutter |
| `.fade-up` | Scroll-Animation via IntersectionObserver |
| `.label` | Eyebrow-Label mit blauem `::before`-Strich — muss auf jeder Seite im `<style>`-Block definiert werden |
| `.hero.hero--sub` | Standard Unterseiten-Hero |
| `.nav--scrolled` | Wird via JS gesetzt beim Scrollen (Unterseiten) |

---

## Regeln

- **Alle Pfade RELATIV** (kein führender `/`): Asset- und interne Link-Pfade relativ zur jeweiligen Datei. Präfix nach Verzeichnistiefe: Root (`index.html`) → `assets/...`, 1 tief (`leistungen/`) → `../assets/...`, 2 tief (`en/services/`) → `../../assets/...`, 3 tief (`en/services/self-publishing/`) → `../../../assets/...`. Interne Links zeigen auf die konkrete Datei inkl. `index.html` (z. B. `../leistungen/index.html`).
  - **Grund:** Absolute Pfade (`/assets/...`) brechen beim direkten Öffnen via `file://` (Browser-Doppelklick) und bei Strato-Upload in einen Unterordner. Relative Pfade funktionieren überall: Doppelklick, lokaler Server und Strato (egal welcher Ordner).
- **Neue Bilder:** aus `MCC-Redesign/AssetsHeader/` nach `assets/images/` kopieren, dann mit korrektem `../`-Präfix referenzieren
- **Globale Nav-Änderungen** müssen in allen 14 HTML-Dateien durchgeführt werden (kein Templating)
- **EN-Seiten** sind strukturell identisch mit DE — gleiche CSS-Klassen, gleiche Layouts, nur Texte übersetzt
- **Self-Publishing** ist nicht in der Hauptnavigation — nur via Leistungen-Seite erreichbar
- `.env` mit API-Keys darf **niemals** committet werden

---

## Deployment

```bash
# Lokaler Dev-Server
cd /Users/FRE_1/Documents/projects-2/mcc-new
python3 -m http.server 8080

# Git
git add <files>
git commit -m "..."
git push origin main

# SFTP auf Strato: via VS Code SFTP Extension
```

---

## Bekannte Limitierungen

- **Kein Templating** — Header/Footer wird in jede HTML-Datei eingefügt; bei globalen Änderungen alle 14 Dateien aktualisieren
- **ffmpeg nicht installiert** — Video kann nicht komprimiert werden (7.9 MB)
- **EN-Seiten:** manuelle Übersetzung, kein i18n
