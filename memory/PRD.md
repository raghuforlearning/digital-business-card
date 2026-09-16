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

## Backlog / Next
- P2: Real profile photo drop-in (`PROFILE.photo`).
- P2: Apple Wallet pass or NFC-ready short link (needs external service).
- P2: Optional page language toggle (English/Arabic) if wanted for local events.
