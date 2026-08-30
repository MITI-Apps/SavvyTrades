# SavvyTrades

A premium trading journal web app — dark, glass-surfaced, and built like a private bank app.

## Tech Stack

**Frontend:** React 19, Vite 8, Tailwind CSS v4, React Router 7

**Backend:** Express 5, TypeScript, Sequelize 6, MySQL, JWT auth, Cloudinary (screenshots)

## Project Structure

```
savvyTrades/
├── frontend/              # React SPA (Vite)
│   └── src/
│       ├── components/
│       │   ├── layout/    # AppShell, BottomNav, AuthLayout
│       │   └── ui/        # GlassCard, AtmCard, StatCard, TradeCard, etc.
│       ├── context/       # AuthContext
│       ├── hooks/         # useAuth, useData (accounts, trades, stats, equity)
│       ├── lib/           # API client (fetch wrapper with JWT)
│       ├── pages/         # Route pages
│       └── utils.js       # Formatters & helpers
├── backend/               # Express API (TypeScript)
│   └── src/
│       ├── config/        # DB config, Cloudinary init
│       ├── controllers/   # Auth, trading accounts, trades, screenshots, dashboard
│       ├── database/      # Sequelize connection
│       ├── middleware/     # Auth, validation, rate limiting, uploads
│       ├── models/        # User, TradingAccount, Trade, TradeScreenshot, VerificationToken
│       ├── routes/        # Route definitions
│       ├── services/      # Token, email, dashboard analytics
│       ├── validators/    # Joi schemas
│       ├── types/         # Express type augmentation
│       └── migrations/    # DB migrations
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database
- Cloudinary account (for trade screenshots)

### 1. Backend

```bash
cd backend
cp .env.example .env       # Fill in your DB, JWT, Cloudinary, and email credentials
npm install
npx sequelize db:migrate
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies `/api` requests to the backend.

## Features

- **Multi-account support** — Manage multiple trading accounts (Live, Demo, Funded)
- **Trade journaling** — Log trades with symbol, direction, outcome, P&L, and notes
- **Screenshot uploads** — Attach before/after screenshots via Cloudinary
- **Performance analytics** — Win rate, profit factor, avg win/loss, equity curve
- **Responsive design** — Mobile-first with desktop sidebar layout
- **Email verification** — Secure account verification and password reset flows

## API Endpoints

All protected routes require a `Bearer <token>` header.

### Auth (`/api/v1/auth`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Create account (name, email, password) |
| POST | `/login` | Returns JWT token (7-day expiry) |
| GET | `/me` | Current user profile |
| PUT | `/update-profile` | Update name/email |
| PUT | `/change-password` | Change password |
| GET | `/verify-email` | Verify email via token |
| POST | `/resend-verification` | Resend verification email |
| POST | `/forgot-password` | Request password reset |
| POST | `/reset-password` | Reset password via token |

### Trading Accounts (`/api/v1/trading-accounts`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | Create account |
| GET | `/` | List all user accounts |
| GET | `/:id` | Get account by ID |
| PUT | `/:id` | Update account |
| DELETE | `/:id` | Delete account |

### Trades (`/api/v1/trades`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/` | Create trade |
| GET | `/` | List all trades for an account (query: `tradingAccountId`, `symbol`, `direction`, `outcome`) |
| GET | `/:id` | Get trade by ID |
| PUT | `/:id` | Update trade |
| DELETE | `/:id` | Delete trade |

### Screenshots (`/api/v1/trades/:tradeId/screenshots`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Get screenshots for a trade |
| POST | `/` | Upload screenshot (multipart, field: `image`) |
| DELETE | `/:id` | Delete screenshot |

### Dashboard (`/api/v1`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/accounts` | User accounts with balance summary |
| GET | `/accounts/:accountId/dashboard` | Full dashboard data |
| GET | `/accounts/:accountId/stats` | Win rate, profit factor, averages |
| GET | `/accounts/:accountId/equity-curve` | Equity curve data points |

## Database Schema

- **Users** — id (UUID), name, email, password (bcrypt), verified (boolean), createdAt, updatedAt
- **TradingAccounts** — id (UUID), userId (FK), accountName, market, accountType, startingBalance, currency
- **Trades** — id (UUID), tradingAccountId (FK), symbol, direction (BUY/SELL), outcome (WIN/LOSS/BREAK_EVEN/OPEN), pnl, confluence, notes, openedAt, closedAt
- **TradeScreenshots** — id (UUID), tradeId (FK), screenshotType (BEFORE/AFTER), url, publicId, caption
- **VerificationTokens** — id (UUID), userId (FK), token, type (email_verify/password_reset), expiresAt

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | development / production |
| `DB_NAME` | MySQL database name |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `JWT_SECRET` | Secret for signing JWTs |
| `CLIENT_URL` | Frontend URL (for email links) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `MAILTRAP_API_TOKEN` | Mailtrap token (dev email) |
| `BREVO_API_KEY` | Brevo API key (prod email) |
| `BREVO_SENDER_EMAIL` | Brevo sender email |

### Frontend (`.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API base URL (empty in dev, proxied by Vite) |
