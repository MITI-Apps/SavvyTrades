# SavvyTrade

A premium trading journal built like a private bank app — dark, glass-surfaced, and understated.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router (individual pages, mobile-first)

## Pages

- `/login`, `/register` — authentication
- `/new-account` — create a trading account
- `/dashboard` — balance card, wallet picker, performance stats
- `/accounts` — 3D account card stack
- `/add-trade` — log a trade with screenshots
- `/journal` — searchable trade list
- `/trade/:id` — trade detail with position context and notes
- `/settings` — account settings & logout

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. To view from a phone on the same Wi-Fi, run `npm run dev -- --host` and open the printed network URL.