# Homestead — Real Estate Listing Platform

A full-stack real estate listing platform built as a learning project. Browse, search, filter, save, and inquire about properties. Admin users can create, edit, and delete listings.

## Tech stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: PostgreSQL (Neon) + Prisma 6
- **Auth**: NextAuth.js v5 (credentials provider)
- **Forms / validation**: React Hook Form + Zod
- **Images**: Cloudinary (next-cloudinary)
- **Maps**: Leaflet + OpenStreetMap

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — Postgres connection string (free at [neon.tech](https://neon.tech))
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` — from [cloudinary.com](https://cloudinary.com)

### 3. Run database migrations + seed

```bash
npm run db:migrate
npm run db:seed
```

This creates two demo accounts:

- **Admin** — `admin@homestead.dev` / `admin1234`
- **Demo user** — `demo@homestead.dev` / `password`

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cloudinary setup (for image uploads)

The admin "New listing" / "Edit listing" forms include a Cloudinary upload button. To enable it:

1. Sign up at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy **Cloud name**, **API Key**, **API Secret** into `.env`.
3. Go to **Settings → Upload → Upload presets → Add upload preset**.
   - Set **Signing Mode** to **Unsigned**.
   - Save and copy the preset name into `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

If you skip Cloudinary, you can still paste image URLs directly in the listing form.

## Project structure

```
src/
├── app/
│   ├── admin/             # Admin dashboard (protected)
│   ├── api/auth/          # NextAuth routes + register endpoint
│   ├── listings/          # Public browse + detail pages
│   ├── favorites/         # Saved listings (auth required for content)
│   ├── login/             # Login page + server action
│   └── register/          # Register page + server action
├── components/
│   ├── admin/             # Admin-only UI (forms, tables, dialogs)
│   ├── auth/              # Login + register forms
│   ├── favorites/         # Favorite button + actions
│   ├── inquiries/         # Inquiry form + actions
│   ├── listings/          # Listing cards, gallery, map, filters
│   ├── site/              # Navbar, footer, mobile menu
│   └── ui/                # shadcn/ui primitives
├── lib/
│   ├── prisma.ts          # Prisma client singleton
│   ├── auth/              # Session helpers
│   ├── listings.ts        # Listing queries
│   ├── favorites.ts       # Favorite queries
│   ├── schemas/           # Zod schemas
│   └── format.ts          # Price / size formatters
├── auth.config.ts         # Edge-safe NextAuth config (middleware)
├── auth.ts                # Full NextAuth config (Node-only)
└── middleware.ts          # Protects /admin routes
prisma/
├── schema.prisma          # Database schema
├── migrations/            # Migration history
└── seed.ts                # Seed data
```

## NPM scripts

```
npm run dev          # Start the dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint
npm run db:migrate   # Run pending Prisma migrations
npm run db:seed      # Reset + seed sample data
npm run db:studio    # Open Prisma Studio
```

## Deploying to Vercel

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com/new), import the repo.
3. In **Environment Variables**, add the same values from `.env`:
   - `DATABASE_URL` (use a Neon **pooled** connection string)
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
4. Deploy. Vercel will build and run the app automatically.

For migrations on deploy, add `prisma migrate deploy` to a `vercel-build` script if you'd like Vercel to apply pending migrations at build time:

```json
{
  "scripts": {
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

## Milestones (from [plan.md](./plan.md))

- ✅ M1 — Project setup
- ✅ M2 — Database schema + seed
- ✅ M3 — Public listing experience
- ✅ M4 — Authentication
- ✅ M5 — Admin dashboard + CRUD
- ✅ M6 — Favorites + inquiries
- ✅ M7 — Polish + deployment readiness