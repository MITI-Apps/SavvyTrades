import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes.js"
import tradingAccountRoutes from "./routes/tradingAccount.routes.js"
import tradeRoutes from './routes/trade.routes.js';
import screenshotRoutes from './routes/screenshot.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimit.middleware.js';
import "./models/index.js"

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = process.env.NODE_ENV === 'production'
  ? { origin: allowedOrigins.length > 0 ? allowedOrigins : false, credentials: true }
  : { origin: '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(generalLimiter);


app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Trading Journal API v1 is running.',
    timestamp: new Date().toISOString(),
  });
});

//Authentication Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trading-accounts', tradingAccountRoutes);
app.use('/api/v1/trades', tradeRoutes);
app.use('/api/v1', screenshotRoutes);

app.use('/api/v1', dashboardRoutes);

app.use(errorHandler);

export default app;