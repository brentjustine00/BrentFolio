# BrentFolio (Portfolio OS)

Hi, I’m **Brent Justine Barbadillo** — a frontend developer who builds fast, clean, and interactive web experiences with React and Next.js.

This repo is my personal portfolio site, styled like a terminal/CRT “Portfolio OS” with a boot sequence, custom cursor, and glitchy UI details.

## How I Built This System

**Stack**
- Next.js (App Router) + React 18 + TypeScript
- Tailwind CSS for styling
- Google Fonts via `next/font` (Orbitron, Space Mono, Bebas Neue)

**Structure (sections)**
- Main page composition lives in `src/app/page.tsx` and renders: `Hero`, `About`, `Experience`, `Education`, `Projects`, `Skills`, and `Contact`.
- Each section is a component under `src/components/*`.

**UI / interaction layer**
- CRT overlay effect: `src/components/ui/CRTOverlay.tsx`
- Scroll reveal wrapper: `src/components/ui/ScrollReveal.tsx`
- Glitch text effect: `src/components/ui/GlitchText.tsx`
- Boot sequence, custom cursor, and scroll progress bar are implemented in `src/app/page.tsx`.

**Email (contact form)**
- The contact form posts to `POST /api/contact` and sends mail via **Brevo SMTP**.
- API route: `src/app/api/contact/route.ts`
- UI: `src/components/Contact.tsx`

**Favicon / app icon**
- Icon: `src/app/icon.svg` (wired via metadata in `src/app/layout.tsx`)

## Local Setup

**Requirements**
- Node.js 18+ (recommended: 20+)
- npm

Install:

```bash
npm install
```

Run dev:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Contact Form (Brevo SMTP) Setup

Create `.env.local` (recommended) or `.env` at the project root (use `.env.example` as a template):

```bash
BREVO_SMTP_USER=
BREVO_SMTP_PASS=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
CONTACT_FROM_NAME=BrentFolio Contact
```

Notes:
- Use the **SMTP credentials** shown in Brevo (not your Brevo login password).
- `CONTACT_FROM_EMAIL` should be verified/allowed in Brevo.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - lint

## Deploy

Deploy anywhere that supports Next.js (Vercel, Render, etc.). Add the same env vars in your hosting provider.

