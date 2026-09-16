# Raghu M — Digital Business Card

A fast, single-page digital business card built for GISEC 2026 networking.
Static frontend only — no backend, no database, no analytics, no cookies.

## Update your details (one file only)

Everything lives in **`src/config.js`**:

| What | Where in `src/config.js` |
|---|---|
| LinkedIn URL | `PROFILE.linkedin` |
| Phone / WhatsApp number | `PROFILE.phoneDisplay`, `PROFILE.phoneRaw`, `PROFILE.whatsappNumber` (digits only, with country code) |
| Email | `PROFILE.email` |
| Name / title / company | `PROFILE.fullName`, `PROFILE.displayName`, `PROFILE.designation`, `PROFILE.company` |
| Professional focus | `PROFILE.focus` (+ `PROFILE.focusShort` for the full-screen QR view) |
| Photo | `PROFILE.photo` — put `profile.jpg` in `public/` and set `photo: "/profile.jpg"`; leave `""` to show the RM initials |
| GISEC badge on/off | `EVENT_MODE` — `true` shows "GISEC 2026" + event greeting, `false` is the plain business card |
| Event badge text | `EVENT.badge`, `EVENT.tagline` |
| WhatsApp / Email pre-filled text | `WHATSAPP.greetingEvent`, `WHATSAPP.greeting`, `EMAIL.subjectEvent`, `EMAIL.subject` |
| Interest buttons | `INTERESTS` |

## Run locally

```bash
yarn install
yarn start        # opens http://localhost:3000
```

## Build for production

```bash
yarn build        # outputs a static site into build/
```

## Deploy (any static host — no server needed)

**Vercel** — push to GitHub → "Import Project" → it auto-detects Create React App. Or:
```bash
npx vercel --prod
```

**Netlify** — drag the `build/` folder onto https://app.netlify.com/drop, or set
build command `yarn build`, publish directory `build`.

**Cloudflare Pages** — "Create a project" → connect the repo → build command
`yarn build`, output directory `build`.

**Any other host** — upload the contents of `build/` and serve them as static files.

## How it works

- **Save Contact** downloads a vCard 3.0 `.vcf` generated in the browser —
  Android and iPhone both offer "Add to Contacts" when it opens.
- **QR codes are generated locally** with the open-source `qrcode.react`
  library. No external QR service, no expiry, no redirects.
  - *Card Link* QR → opens this page (auto-adapts to whatever domain it is
    deployed on).
  - *Add Contact* QR → encodes the vCard itself, so scanning it offers to save
    the contact directly.
- **Download PNG** saves a high-resolution QR (great for a lock-screen
  wallpaper) — the full-screen "Show My QR" mode downloads a 1080 px version.
- **WhatsApp / Email** links are pre-filled, and any selected "Let's Connect"
  interest is injected into the message, e.g. *"Hi Raghu, we connected at
  GISEC. Interested in Cybersecurity."*
