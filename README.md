# Spotify Clone

Basic Spotify-like music app. Play songs, manage favorites, auth.

## Stack

- **Frontend:** React + Vite
- **Backend:** Node + Express (serves songs API + audio files)
- **Auth + Favorites:** Supabase

## Structure

```
client/       React + Vite frontend
server/       Express backend (songs API + audio)
supabase/     SQL schema (favorites table + RLS policies)
tests/e2e/    Playwright end-to-end tests
```

## Setup

```bash
# backend
cd server && npm install && npm run gen-audio && npm start

# frontend (new terminal)
cd client && npm install && npm run dev
```

Copy `client/.env.example` to `client/.env` and `server/.env.example` to `server/.env`,
then fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (from your Supabase project
settings). Run `supabase/schema.sql` in the Supabase SQL editor to create the `favorites` table.

Frontend: http://localhost:5173 · Backend: http://localhost:3001

## Testing

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Playwright starts both dev servers automatically.
