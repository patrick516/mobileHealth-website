# MobileHealth Malawi — Marketing Website

A standalone marketing/informational website for **MobileHealth Malawi**, a
digital health platform built for Community Health Workers (CHWs) and Health
Surveillance Assistants (HSAs) in Malawi.

> **Note:** This is the MobileHealth
> Malawi mobile app and admin dashboard. It does **not** share a database,
> backend, or codebase with the health platform itself. This website exists
> purely to present the project publicly and capture contact/demo requests
> from potential pilot partners (district health offices, NGOs, etc.).

---

## Project Structure

This repository contains three independent applications:

```
mobilehealthwebsite/
├── website/    → Public marketing site (Next.js) — THIS is the live public site
├── frontend/   → Internal admin panel (Vite + React) — manages website content
├── backend/    → API for the website + admin panel (Node/Express + MongoDB)
└── admin/      → Older/parallel admin panel scaffold (status TBD — see note below)
```

> **Open question:** `admin/` and `frontend/` currently appear to overlap in
> purpose (both have Dashboard/Users/Login-style pages). This needs to be
> clarified and one of them deprecated or merged before going further —
> see "Known Issues" below.

### `website/` — Public Site (Next.js)

The actual public-facing marketing site. Built with:

- **Next.js** (App Router)
- **TailwindCSS**
- **Framer Motion** (animations)
- **lucide-react** (icons)

Pages:
| Route | Purpose | Status |
|---|---|---|
| `/` | Home — hero, problem statement, features, how it works, honest "current stage" section, CTA | ✅ Built |
| `/features` | Full feature breakdown by audience (CHW / Nurse / Admin) | ✅ Built |
| `/how-it-works` | 5-step workflow: registration → visit → tracking → sync → nurse follow-up | ✅ Built |
| `/about` | Real developer bio (Patrick Lingstone Kulinji), mission/vision | ✅ Built |
| `/contact` | Contact form → MongoDB backend | 🔲 Not yet built |
| `/blog` | Blog listing | 🔲 Component exists, content pending |
| `/download` | App download page | ⚠️ Exists but **not currently linked from CTAs** — app is not yet publicly released, all CTAs point to `/contact` instead |

### `backend/` — Website API (Node/Express + MongoDB)

Handles content management and form submissions for the website only.
**This is NOT the MobileHealth Malawi platform backend** — that's a separate
Node/Express + PostgreSQL/Prisma project.

Existing controllers/models suggest support for:

- Contact form submissions (`Contact` model/controller/routes)
- Blog posts (`Blog` model/controller/routes)
- FAQs (`FAQ` model/controller/routes)
- Testimonials (`Testimonial` model/controller/routes)
- Newsletter signups (`Newsletter` model/controller/routes)
- Admin auth (`Admin` model, `authController`)
- Site settings (`Setting` model/controller/routes)
- Analytics (`Analytics` model/controller/routes)
- File uploads (`uploadController`, `uploads/` folder)

### `frontend/` and `admin/` — Internal Admin Panel(s)

Intended for managing website content (blog posts, testimonials, contact
submissions, settings) without editing code directly. **Needs clarification
on which one is the active panel** — see Known Issues.

---

## Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Public website | Next.js (App Router), TailwindCSS, Framer Motion |
| Admin panel    | Vite + React + TypeScript                        |
| Backend API    | Node.js + Express                                |
| Database       | MongoDB                                          |

---

## Branding

- Uses the **same logo** as the MobileHealth Malawi mobile app and admin
  dashboard (`public/images/logo.png` in both `website/` and `frontend/`).
- Primary color palette: green-based (`primary`, `primary-dark`,
  `primary-light`, `primary-lighter`), matching the health platform's
  identity.

---

## Honesty & Accuracy Guidelines (Important)

This site represents a **real, working, but not-yet-piloted** system. To
keep the public-facing content consistent with what's actually true (and
consistent with what's been told to journalists and prospective NGO/DHO
contacts), the following rules apply to all content on this site:

1. **No fabricated statistics.** Do not display invented numbers (CHW
   counts, household counts, visit counts) unless they reflect real,
   verifiable data. If no real numbers exist yet, use honest framing like
   "Built and tested — seeking pilot partners" instead of fake metrics.
2. **No fabricated team members.** This is currently a solo developer
   project. The `/about` page must reflect that accurately — no invented
   names, titles, or roles.
3. **No claims of capabilities that don't exist.** E.g., do not claim
   "end-to-end encryption" unless implemented; do not claim public app store
   availability if the app isn't publicly released.
4. **CTAs should reflect reality.** Since the app is not yet publicly
   downloadable, all calls-to-action point to `/contact` (request a demo /
   discuss a pilot) rather than `/download`.
5. **Contact details must be real.** Phone numbers, emails, and social links
   either go to real, monitored channels or are removed/omitted.

---

## Known Issues / Open Questions

- [ ] **`admin/` vs `frontend/` overlap** — both appear to serve as admin
      panels for the website. Needs a decision on which is canonical before
      further work, or whether one should be removed.
- [ ] **`/contact` page is empty** — needs to be built and wired to the
      existing `contactController.js` / `Contact` model on the backend.
- [ ] **`/blog` page** — component scaffold exists but no real content yet.
- [ ] **`/download` page** — exists in routing but intentionally not linked
      from any CTA, since the app has no public release yet. Revisit once a
      pilot is underway.
- [ ] **Social media links** — currently point to placeholder `#` in the
      footer. Need either real social profile URLs or removal until they exist.

---

## Local Development

### Website (Next.js)

```bash
cd website
npm install
npm run dev
```

### Backend (Express + MongoDB)

```bash
cd backend
npm install
npm run dev   # or: node src/server.js
```

Requires a running MongoDB instance and appropriate environment variables
(see `backend/src/config/env.js` for required variables).

### Admin Panel (Vite + React)

```bash
cd frontend   # or admin/, pending clarification above
npm install
npm run dev
```

---

## Relationship to the MobileHealth Malawi Platform

|               | This Website                      | MobileHealth Malawi Platform                                  |
| ------------- | --------------------------------- | ------------------------------------------------------------- |
| Purpose       | Public marketing / pilot outreach | The actual health data system                                 |
| Backend       | Node/Express + MongoDB            | Node/Express + PostgreSQL (Prisma)                            |
| Frontend      | Next.js                           | Mobile app (React Native/Expo) + Admin dashboard (React/Vite) |
| Data          | Contact forms, blog, testimonials | Households, visits, referrals, immunisations, etc.            |
| Shared assets | Logo, color branding              | Logo, color branding                                          |

These two projects are intentionally kept separate and should never share a
database or be conflated in conversation with stakeholders — this site is
the "front door," the platform is the actual product.

---

**Built by Patrick Lingstone Kulinji** — Blantyre, Malawi
