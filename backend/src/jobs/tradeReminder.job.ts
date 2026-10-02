import { Op } from 'sequelize';
import Trade from '../models/Trades.js';
import TradingAccount from '../models/TradingAccount.js';
import Notification from '../models/Notification.js';
import { createNotification } from '../services/notification.service.js';

// Runs on a schedule (see jobs/index.ts). Finds every user with at least one
// OPEN trade and notifies them once per day.
export async function sendTradeReminders() {
  try {
    // 1. Every open trade in the database (we only need the owning account id)
    const openTrades = await Trade.findAll({
      where: { outcome: 'OPEN' },
      attributes: ['tradingAccountId'],
    });

    if (openTrades.length === 0) {
      console.log('[jobs] No open trades — skipping trade reminders.');
      return;
    }

    // 2. Resolve accountId -> owner userId (one query, using Op.in)
    const accountIds = [...new Set(openTrades.map((t) => t.tradingAccountId))];
    const accounts = await TradingAccount.findAll({
      where: { id: { [Op.in]: accountIds } },
      attributes: ['id', 'userId'],
    });
    const accountIdToUserId = new Map(accounts.map((a) => [a.id, a.userId]));

    // 3. Group open trades by owner: userId -> how many open trades
    const userIdToCount = new Map<string, number>();
    for (const trade of openTrades) {
      const ownerId = accountIdToUserId.get(trade.tradingAccountId);
      if (!ownerId) continue;
      userIdToCount.set(ownerId, (userIdToCount.get(ownerId) || 0) + 1);
    }

    // 4. Idempotency guard: skip users already reminded today, so the job
    //    can never spam — even if it runs twice or the server restarts.
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    for (const [userId, openCount] of userIdToCount) {
      const alreadySentToday = await Notification.count({
        where: {
          userId,
          type: 'TRADE_REMINDER',
          createdAt: { [Op.gte]: startOfToday },
        },
      });

      if (alreadySentToday > 0) continue;

      await createNotification(
        userId,
        'TRADE_REMINDER',
        'Open trades reminder',
        `You have ${openCount} open trade${openCount === 1 ? '' : 's'}. Close or update them before the day ends.`,
        { openTradeCount: openCount }
      );
    }

    console.log(`[jobs] Trade reminders sent to ${userIdToCount.size} user(s).`);
  } catch (error) {
    // A scheduled job must never crash the server; log and move on.
    console.error('[jobs] Trade reminder job failed:', error);
  }
}