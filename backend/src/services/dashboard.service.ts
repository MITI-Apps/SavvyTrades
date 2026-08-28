import { Op } from 'sequelize';
import Trade from '../models/Trades.js';
import  TradingAccount  from '../models/TradingAccount.js';

// Helper rounding function
export const round2 = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export interface DashboardData {
  account: {
    id: string;
    name: string;
    currency: string;
    startingBalance: number;
    currentBalance: number;
    totalPnL: number;
    percentChange: number;
  };
  stats: {
    totalTrades: number;
    wins: number;
    losses: number;
    breakEven: number;
    winRate: number;
    profitFactor: number | null;
    avgWin: number;
    avgLoss: number;
    avgPnL: number;
    totalPnL: number;
  };
  equityCurve: Array<{ date: string; balance: number }>;
}

export const calculateDashboardData = async (
  accountId: string,
  userId: string,
  range?: string
): Promise<DashboardData> => {
  // 1. Verify Account Existence & Ownership
  const account = await TradingAccount.findOne({
    where: { id: accountId, userId },
  });

  if (!account) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }

  // 2. Build Date Range Clause if provided (for standalone equity-curve filtering)
  const whereClause: Record<string, any> = { tradingAccountId: accountId };

  if (range && range !== 'all') {
    const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };
    const days = daysMap[range] || 30;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    whereClause.openedAt = { [Op.gte]: startDate };
  }

  // Fetch only closed trades for performance analytics and equity curve
  const trades = await Trade.findAll({
  where: {
    ...whereClause,
    outcome: { [Op.ne]: 'OPEN' }, // Exclude open trades
  },
  order: [['closedAt', 'ASC']],
  });

  const totalTrades = trades.length;
  const wins = trades.filter((t) => t.outcome === 'WIN');
  const losses = trades.filter((t) => t.outcome === 'LOSS');
  const breakEven = trades.filter((t) => t.outcome === 'BREAK_EVEN');

  // Aggregates
  let totalPnL = 0;
  let grossProfit = 0;
  let grossLoss = 0;

  trades.forEach((trade) => {
    const pnl = Number(trade.pnl) || 0;
    totalPnL += pnl;
    if (pnl > 0) grossProfit += pnl;
    if (pnl < 0) grossLoss += Math.abs(pnl);
  });

  const startingBalance = Number(account.startingBalance) || 0;
  const currentBalance = startingBalance + totalPnL;
  const percentChange = startingBalance > 0 ? (totalPnL / startingBalance) * 100 : 0;

  // Metric Formulas per Spec
  const winRate = totalTrades > 0 ? (wins.length / totalTrades) * 100 : 0;
  
  const profitFactor =
    grossLoss > 0
      ? grossProfit / grossLoss
      : grossProfit > 0
      ? Infinity
      : 0;

  const avgWin = wins.length > 0 ? grossProfit / wins.length : 0;
  const avgLoss = losses.length > 0 ? -1 * (grossLoss / losses.length) : 0; // Kept negative for display
  const avgPnL = totalTrades > 0 ? totalPnL / totalTrades : 0;

  // Running balance calculation for Sparkline
  let runningBalance = startingBalance;
  const equityCurve = trades.map((trade) => {
    runningBalance += Number(trade.pnl) || 0;
    
    const rawDate = trade.closedAt || trade.openedAt || new Date();
    const dateString = new Date(rawDate).toISOString().split('T')[0] ?? '';

    return {
      date: dateString,
      balance: round2(runningBalance),
    };
  });

  return {
    account: {
      id: account.id,
      name: account.accountName,
      currency: account.currency,
      startingBalance: round2(startingBalance),
      currentBalance: round2(currentBalance),
      totalPnL: round2(totalPnL),
      percentChange: round2(percentChange),
    },
    stats: {
      totalTrades,
      wins: wins.length,
      losses: losses.length,
      breakEven: breakEven.length,
      winRate: round2(winRate),
      profitFactor: round2(profitFactor),
      avgWin: round2(avgWin),
      avgLoss: round2(avgLoss),
      avgPnL: round2(avgPnL),
      totalPnL: round2(totalPnL),
    },
    equityCurve,
  };
};