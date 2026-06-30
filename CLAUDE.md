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
├── impressum/index.html                ← Rechtstext nur aus offizieller Quelle ändern (nicht frei umformulieren)
├── datenschutz/index.html              ← Rechtstext = Quelle Datenschutzerklärung.docx (1:1); nur aus offizieller Quelle ändern
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
│   ├── js/consent.js                   ← Cookie-Consent + GA4 (consent-gated)
│   ├── images/
│   └── video/MCC-Animation.mp4
├── lab/                                ← Deeplink-Unterbereich (eigenständig, siehe „Lab")
│   ├── index.html                      ← DE
│   └── en/index.html                   ← EN
├── 404.html                            ← Fehlerseite (root-absolute Pfade, noindex)
├── robots.txt                          ← Allow /, Disallow /lab/, Sitemap-Verweis
├── sitemap.xml                         ← 14 URLs mit hreflang-Alternates
└── .htaccess                           ← inkl. 301 http→https, www→non-www, /lab→/lab/
```

---

## Seitenstruktur & CSS-Patterns

### Jede Seite enthält
1. `<title>` (einzigartig) + `<meta name="description">`
2. `<link>` auf Poppins Google Font
3. `<link>` auf `style.css` (relativer Pfad je Verzeichnistiefe, z. B. `../assets/css/style.css`)
4. **SEO-Block** (vor `</head>`, siehe Abschnitt „SEO"): canonical, hreflang (de/en/x-default), Open Graph + Twitter Cards; Startseiten + Team-Seiten zusätzlich JSON-LD
5. Seitenspezifische `<style>`-Block mit page-level Overrides (inkl. `.label`-Definition)
6. Nav (desktop) + `nav__mobile` (mobile) + Content-Sektionen + Footer
7. `<script src="...assets/js/main.js">` (relativ; 404.html ausgenommen)
8. `<script src="...assets/js/consent.js" defer>` — Cookie-Consent + Google Analytics

**Google Analytics (GA4 `G-YJ3FMM6R6Y`):** consent-gated über `assets/js/consent.js`. GA lädt **erst nach aktiver Einwilligung** über das Cookie-Banner (DSGVO-konform, passt zur Datenschutzerklärung). Auswahl in `localStorage` (`mcc-consent` = `granted`/`denied`). Banner ist zweisprachig (per `<html lang>`), Styles in `style.css` (`.cookie-consent*`). Mess-ID nur in `consent.js`.

### Navigation (DE)
```
Über uns | Leistungen | Automation | Team  +  DE | EN
```
Aktive Seite erhält `nav__link--active`. Auf der Homepage bleibt die Nav **immer weiß** (kein scroll-transparenz). CSS-Spezifität beachten: `.nav .nav__link--active` (0,2,0) muss nach `.nav .nav__link` stehen.

**Footer-Nav:** beginnt mit „Über uns" / „About us" (→ Startseite), danach Leistungen/Automation/Team/Impressum/Datenschutz. In allen 14 Seiten gespiegelt.

**Legal-Seiten ohne Hero (Impressum/Datenschutz/EN-Pendants):** `main.js` entfernt bei `scrollY ≤ 60` die Klasse `nav--scrolled`, sonst fallen die Nav-Links auf weiß (`.nav__link` default) zurück → unsichtbar auf weißem BG. Deshalb tragen dort **alle** Desktop-Nav-Links inline `style="color:var(--gray);"` (inkl. „Über uns").

### Homepage-spezifische Layouts (`index.html`)

| CSS-Klasse | Beschreibung |
|---|---|
| `.home-hero` + `.home-hero__bg` (video) | 72vh Hero mit Video-Hintergrund (opacity 0.62) |
| `.home-hero__tag` | Eyebrow mit `::before`-Linie |
| `.intro-strip` | Blauer Banner unter Hero mit Kompetenzfeldern |
| `.mission-head` + `.pillars-grid` / `.pillar-col` | 3-spaltige Mission-Karten mit Ghost-Zahlen (4.5rem, opacity 0.06). **Mobil (≤860px):** 1-spaltig, Inhalt zentriert, Bild mittig 150px |
| `.pillar-col:hover` | Hover: hellgrauer BG + blauer Top-Balken via `::after` |
| `.mc-split` | Dunkle Section: Text links + Bild rechts |
| `.diff-grid` | 3×2 Grid „Was uns auszeichnet" |
| `.team-list` / `.team-card` | Horizontale Team-Karten: `grid-template-columns: 220px 1fr` (Bild links 220px / Text rechts), Karten untereinander. **Mobil (≤600px):** gestapelt (Bild oben, 260px hoch). Keyword-Pillen `.team-card__tag` im blauen Stil der Team-Seite (`.tag`) |

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
| `Kontakt-MCC.png` | Kontaktdaten als Bild (Spam-Schutz): Impressum + Datenschutz „verantwortliche Stelle" (DE + EN) |
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

## SEO

- **Kanonische Domain:** `https://multichannelconsult.de` (**ohne www**). www + http werden per `.htaccess` 301 dorthin geleitet. Alle absoluten SEO-URLs (canonical, hreflang, OG, sitemap) nutzen diese Form.
- **Pro Seite im `<head>` (vor `</head>`):** `canonical`, `hreflang` (de/en/x-default), Open Graph (`og:*`) + Twitter Cards. OG-Bild: `Image_Transformation_1280x630.png` (Automation: `Image_KI_1280x630.png`), 1280×630.
- **JSON-LD:** `ProfessionalService` auf den Startseiten (`/`, `/en/`), `Person` (×2) auf den Team-Seiten.
- **hreflang-/canonical-Mapping DE↔EN** (clean URLs mit Trailing Slash, x-default = DE):

  | DE | EN |
  |---|---|
  | `/` | `/en/` |
  | `/leistungen/` | `/en/services/` |
  | `/leistungen/self-publishing/` | `/en/services/self-publishing/` |
  | `/automation/` | `/en/automation/` |
  | `/team/` | `/en/team/` |
  | `/impressum/` | `/en/legal-notice/` |
  | `/datenschutz/` | `/en/privacy-policy/` |

- **`robots.txt`:** erlaubt alles, `Disallow: /lab/` (Deeplink-Bereich nicht indexieren, siehe „Lab"), verweist auf `sitemap.xml`.
- **`sitemap.xml`:** 14 URLs mit `xhtml:link`-hreflang-Alternates.
- **Bei neuer Seite / URL-Änderung:** canonical + hreflang-Paar im `<head>` setzen UND `sitemap.xml` ergänzen.
- **`.htaccess` nur ins Domain-Root** hochladen, **nicht** nach `/lab/…` (Redirects + `ErrorDocument 404 /index.html` passen nur fürs Root).
- **404-Seite:** `404.html` (eigenständig, dunkel, `noindex`, **root-absolute Pfade** `/assets/…` weil ErrorDocument für beliebige URL-Tiefen ausgeliefert wird — bewusste Ausnahme von der Relativ-Regel). `.htaccess`: `ErrorDocument 404 /404.html`.
- **CLS:** alle `<img>` haben `width`/`height` (intrinsische WebP-Maße) → reservierter Platz vor dem Laden.
- **Performance erledigt:** Bilder → WebP (26 MB → 0,9 MB), Hero-Video H.264 CRF 30 + faststart ohne Audio (7,9 MB → 0,6 MB).

---

## Lab-Unterbereich (`/lab`)

Eigenständiger **Deeplink-Bereich** unter `multichannelconsult.de/lab` — nur über direkten Link erreichbar, **nicht** in der Hauptnav, **noindex**.

- **Erreichbar via** `.htaccess`-Redirect `^lab/?$ → /lab/` (case-insensitiv `[NC]`, inkl. Trailing-Slash; `RewriteCond !^/lab/$` verhindert Loop). Crawling per `robots.txt → Disallow: /lab/` ausgeschlossen.
- **Self-contained:** `lab/index.html` (DE) + `lab/en/index.html` (EN) bringen **eigene Inline-Styles** mit (kein Bezug auf `/assets/css/style.css`), eigene lokale Assets (`mcc_lab_mod.jpg` Banner u. a.). Optisch ans MCC-Design angeglichen (Poppins, Farbtokens, Hero mit Overlay, Cards, Label-Eyebrows).
- **Nav:** nur **Logo + DE/EN-Schalter** (keine weiteren Punkte, kein Link zur Hauptseite). Verhalten wie die Unterseiten: `position:fixed` transparent über dem Hero, wird beim Scrollen weiß (`nav--scrolled` via kleinem Inline-Script, `--nav-h:68px`). Logo = **absolutes WebP** `https://multichannelconsult.de/assets/images/Logo-MCC-Tagline-Final.webp` (44px; lädt nur online, nicht via `file://`).
- **Sprachpaar:** DE `lab/index.html` ↔ EN `lab/en/index.html` (EN-Pfade via `../`). Alle Seiten tragen die `noindex`-Metas.
- **Inhalt** sind kuratierte Testlinks (Dummies). Enthält auch eine große Doku-Datei (`1-2-3 TrauDich Design System.html`, ~16 MB) — bewusst dabei. Unterprojekte: `lab/trau/`, `lab/lingarda/`.
- **SFTP-Hygiene:** `.vscode/sftp.json` `ignore` schließt u. a. `**/CLAUDE.md` und `*.code-workspace` aus, damit Dev-Dateien aus `lab/` nicht hochgeladen werden.

---

## Regeln

- **Alle Pfade RELATIV** (kein führender `/`): Asset- und interne Link-Pfade relativ zur jeweiligen Datei. Präfix nach Verzeichnistiefe: Root (`index.html`) → `assets/...`, 1 tief (`leistungen/`) → `../assets/...`, 2 tief (`en/services/`) → `../../assets/...`, 3 tief (`en/services/self-publishing/`) → `../../../assets/...`. Interne Links zeigen auf die konkrete Datei inkl. `index.html` (z. B. `../leistungen/index.html`).
  - **Grund:** Absolute Pfade (`/assets/...`) brechen beim direkten Öffnen via `file://` (Browser-Doppelklick) und bei Strato-Upload in einen Unterordner. Relative Pfade funktionieren überall: Doppelklick, lokaler Server und Strato (egal welcher Ordner).
- **Bildformat WebP:** Alle `<img>` referenzieren `.webp` (per Pillow erzeugt, auf Anzeigegröße herunterskaliert; ~96 % kleiner als die PNG-Originale). **Ausnahmen bleiben PNG:** Favicon (`MCC_Website_512-512.png`, via `href`), OG-/JSON-LD-Bilder (`Image_Transformation_1280x630.png`, `Image_KI_1280x630.png`, `Logo-MCC-Tagline-Final.png`) — für Social-Scraper-Kompatibilität.
- **Neue Bilder:** aus `MCC-Redesign/AssetsHeader/` nach `assets/images/` kopieren, zu `.webp` konvertieren (Pillow, `quality=82`, große Grafiken downscalen), dann mit korrektem `../`-Präfix als `.webp` referenzieren
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
- **Hero-Video komprimiert** — `MCC-Animation.mp4` 0,6 MB (H.264 CRF 30, faststart, ohne Audio; ffmpeg vorhanden). Neue Videos analog komprimieren.
- **EN-Seiten:** manuelle Übersetzung, kein i18n
