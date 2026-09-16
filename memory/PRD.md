# PRD — Raghu M Digital Business Card (GISEC 2026)

## Original Problem Statement
Build a modern, mobile-first digital business card / personal networking page for Raghu Narayanan Mohan to use at GISEC. Professional, premium, minimal, technology-focused (Enterprise Infrastructure, Cybersecurity, AI, Government-sector solution architecture). Single-page, smartphone-optimized, with vCard save, locally-generated QR codes, LinkedIn/WhatsApp/Email actions, interest-based networking, a GISEC event mode, and a full-screen QR mode. No analytics, cookies, trackers, login, or database.

## Architecture
- Pure static frontend (React / CRA template, custom CSS + framer-motion for subtle reveals). No backend calls, no database, no auth.
- Central config: `/app/frontend/src/config.js` (PROFILE, EVENT_MODE, EVENT, WHATSAPP, EMAIL, INTERESTS).
- `src/lib/vcard.js` — vCard 3.0 builder + Blob download, WhatsApp/Email link builders, card URL resolver, canvas→PNG download.
- Components: `Avatar`, `ConnectSection` (interest chips), `QrSection` (dual QR tabs + PNG download), `FullScreenQr` (one-tap full-screen scan mode).
- QR generated locally with open-source `qrcode.react` (v4.2.0). Card-link QR auto-adapts to the hosting domain; vCard QR encodes the contact file itself.
- Deployable as a static build to Vercel / Netlify / Cloudflare Pages / any static host (see `/app/frontend/README.md`).

## User Personas
- **Raghu (owner)**: wants instant, one-tap contact exchange at GISEC; edits details in one config file.
- **Executive connections (senior gov/enterprise/vendor)**: scan a QR or tap save; expect a boardroom-safe, premium look.

## Core Requirements (static)
1. First screen: Raghu M, title, company, focus areas, avatar placeholder (initials "RM"), Save Contact, LinkedIn, WhatsApp, Email.
2. vCard: full name, org, title, mobile, email, LinkedIn — works on Android & iPhone.
3. Permanent local QR ("Scan to Connect") + second QR option that saves the contact directly; PNG download.
4. LinkedIn URL in one central config location.
5. WhatsApp +971509915272 prefilled "Hi Raghu, we connected at GISEC."
6. "Let's Connect" interest chips injecting selected topics into the WhatsApp message.
7. EVENT_MODE config flag (default ON) → GISEC 2026 badge + tagline; OFF = plain card.
8. Full-screen QR mode ("Show My QR") in one tap.
9. No analytics/trackers/login/database (platform template analytics removed from index.html).
10. Deployment + self-service config instructions.

## Implemented (2026-09-16)
- All of the above. Verified: vCard download content exact; WhatsApp/Email prefills; interest injection & clear; QR render + PNG downloads (inline 600px, full-screen 1080px); full-screen mode open/close; zero console errors; mobile 390px and desktop 1440px visual checks clean.

## Implemented (2026-09-16, iteration 2 — light NationLabs theme)
- **White background + NationLabs logo** (customer attachment): logo at public/nationlabs-logo.png shown at card top, in full-screen QR mode and as favicon; palette switched to navy #1E2A55 (brand-derived) with cyan/teal accents on white.
- **EN / عربي toggle**: full UI translation (src/i18n.js), RTL layout, Arabic profile fields in config.js (fullNameAr etc.), Arabic interest labels (INTEREST_LABELS_AR), Arabic WhatsApp/Email prefills, IBM Plex Sans Arabic font.
- **Lock-screen QR**: "Save as Lock Screen" in full-screen mode composes a 1170×2532 phone-wallpaper PNG (white, navy name, QR tile, caption) locally via canvas.
- **Bug fix**: QR canvas overflowed the viewport (~667px) since v1 — qrcode.react sets inline width/height styles that beat the stylesheet; fixed with !important CSS. Verified zero horizontal overflow in EN and AR at 390px.
- **Bug fix (iteration 3)**: the wrong attachment had been used as the logo — the top of the card showed a BOQ table crop. Replaced with the real NationLabs logo (fingerprint-N + wordmark, public/nationlabs-logo.png), regenerated the favicon from the N mark, and resized brand-logo (132px) and fsqr-logo (96px) for the square format. Verified: correct logo renders on mobile + desktop, no BOQ table anywhere, no overflow, no page errors.
- Verified: vCard fields, AR WhatsApp prefill encoding, wallpaper dimensions (1170×2532, ~730KB), QR pixel rendering (32-35% dark density), no page errors, mobile + desktop screenshots clean.

## Backlog / Next
- P1: ~~Real profile photo~~ DONE (2026-09-16, iteration 3): customer headshot installed at public/profile.jpg (600×600, 55KB), avatar shows photo — verified loaded, centered, initials removed, no overflow/errors.
- P2: ~~Optional persisted language choice~~ DONE (2026-09-16, iteration 4): language saved in on-device localStorage, Arabic phone-locale auto-defaults to Arabic on first visit. Also added Android PWA manifest + NationLabs icons (192/512) so the card installs as a home-screen app ("Add to Home screen") — the Android-native replacement for the iOS-only Wallet idea.
- P2: Apple Wallet pass — NOT applicable (customer's phone is an Honor Magic V5 Android; Google Wallet does not support personal passes of this type). NFC tag pairing recommended instead (write the card URL with any NFC Tools app).
- P2: Scan analytics — declined, contradicts the customer's explicit no-tracking requirement.
