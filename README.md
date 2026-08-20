# SavvyTrade

A trading journal web app for tracking trades, accounts, and performance analytics.

## Tech Stack

**Frontend:** React 19, Vite 8, Tailwind CSS v4, React Router 7

**Backend:** Express 5, TypeScript, Sequelize 6, MySQL, JWT auth, Cloudinary (screenshots)

## Project Structure

```
savvyTrades/
├── frontend/          # React SPA (Vite)
│   └── src/
│       ├── components/    # UI components (GlassCard, AtmCard, etc.)
│       ├── context/       # AuthContext
│       ├── hooks/         # useAuth, useData (accounts, trades, stats)
│       ├── lib/           # API client (fetch wrapper)
│       ├── pages/         # Route pages
│       └── utils.js       # Formatters & helpers
├── backend/           # Express API (TypeScript)
│   └── src/
│       ├── controllers/
│       ├── middleware/     # Auth, validation, rate limiting, uploads
│       ├── models/        # Sequelize models (User, TradingAccount, Trade, TradeScreenshot)
│       ├── routes/
│       ├── services/      # Dashboard aggregation logic
│       ├── validators/    # Joi schemas
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
cp .env.example .env       # Fill in your DB, JWT, and Cloudinary credentials
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

## API Endpoints

All protected routes require a `Bearer <token>` header.

### Auth (`/api/v1/auth`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Create account (name, email, password) |
| POST | `/login` | Returns JWT token |
| GET | `/me` | Current user profile |
| PUT | `/update-profile` | Update name/email |
| PUT | `/change-password` | Change password |

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
| GET | `/` | List trades (query: `tradingAccountId`, `page`, `limit`, `symbol`, `direction`, `outcome`) |
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

- **Users** — id (UUID), name, email, password (bcrypt)
- **TradingAccounts** — id (UUID), userId (FK), accountName, market, accountType, startingBalance, currency
- **Trades** — id (UUID), tradingAccountId (FK), symbol, direction (BUY/SELL), outcome (WIN/LOSS/BREAK_EVEN/OPEN), pnl, confluence, notes, openedAt, closedAt
- **TradeScreenshots** — id (UUID), tradeId (FK), screenshotType (BEFORE/AFTER), url, publicId, caption
