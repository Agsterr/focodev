# AGENTS.md

## Cursor Cloud specific instructions

Single Next.js 14 app (`focodev-site`): public institutional site + admin panel (`/admin`), backed by PostgreSQL via Prisma and NextAuth (credentials). Standard commands live in `package.json` scripts and `README.md`; only the non-obvious caveats below matter for running it here.

### Services / setup needed before running
- **Local PostgreSQL** is required (there is no hosted DB in this environment). Start the cluster with `sudo pg_ctlcluster 16 main start` (it is not started automatically on a fresh VM). A `focodev` role (password `focodev`) and `focodev_site` database are used.
- **`.env.local`** (gitignored, so it is not in the repo) must exist for `npm run dev`. It needs at least `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and the seed vars `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`. Use `.env.example` as the template. For local Postgres:
  `DATABASE_URL="postgresql://focodev:focodev@127.0.0.1:5432/focodev_site?schema=public"`
- Cloudinary and Resend (email) vars are optional; the app runs without them (uploads and email notifications are simply skipped/no-ops).

### Non-obvious gotchas
- **Prisma CLI reads `.env`, NOT `.env.local`.** `npm run db:migrate`, `prisma migrate deploy`, and `npm run db:seed` will not see the `DATABASE_URL` from `.env.local`. Either export `DATABASE_URL` inline for those commands or put it in a `.env` file. `next dev` itself reads `.env.local` normally.
- **DB adapter selection** (`src/lib/db.ts`): the Neon serverless adapter is only used when `DATABASE_URL` contains `neon.tech`; any other host (e.g. local Postgres) uses a plain `PrismaClient`, so local Postgres works out of the box.
- **Contact API** (`POST /api/contact`) expects `application/x-www-form-urlencoded` / `multipart/form-data`, NOT JSON — a JSON body returns HTTP 500.
- After migrating, run `npm run db:seed` to create the admin user (default `admin@focodev.com` / `admin123` from the seed env vars) plus initial services/projects. Admin login is at `/admin/login`.

### Commands
- Run: `npm run dev` (http://localhost:3000; admin at `/admin/login`).
- Lint: `npm run lint`. Types: `npm run typecheck`.
- DB: `npm run db:migrate` (dev) / `prisma migrate deploy`, then `npm run db:seed` (remember the Prisma `.env` caveat above).
