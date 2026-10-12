import { fn, col, literal, Op } from 'sequelize';
import Trade from '../models/Trades.js';
import TradingAccount from '../models/TradingAccount.js';
import Notification from '../models/Notification.js';
import { createNotification } from '../services/notification.service.js';

// Weekly performance digest. Aggregates every trade CLOSED in the last
// windowDays (default 7) across all of a user's accounts into ONE
// notification: combined headline + per-account breakdown in the body,
// structured numbers stashed in `data`. Scheduled in jobs/index.ts.
export async function sendWeeklyPerformanceSummaries(windowDays = 7) {
  try {
    const windowEnd = new Date();
    const windowStart = new Date(windowEnd.getTime() - windowDays * 24 * 60 * 60 * 1000);

    // 1. One aggregation query: per trading account, compute closed count,
    //    W/L/BE counts and net P&L directly in SQL (GROUP BY + SUM/COUNT).
    //    The window uses closedAt, NOT createdAt — a trade opened Monday but
    //    closed Sunday belongs to THIS week's summary.
//    MySQL: `SUM(table.outcome = 'WIN')` works because a true comparison
//    is 1 and false is 0, so SUM counts the matches. Note: Sequelize aliases
//    the main table by MODEL name (`FROM trades AS Trade`), so every col()
//    / literal() / group reference must use `Trade.`, not `Trades.`.
    const rows = await Trade.findAll({
      attributes: [
        'tradingAccountId',
        [fn('COUNT', col('Trade.id')), 'closed'],
        [fn('SUM', literal("Trade.outcome = 'WIN'")), 'wins'],
        [fn('SUM', literal("Trade.outcome = 'LOSS'")), 'losses'],
        [fn('SUM', literal("Trade.outcome = 'BREAK_EVEN'")), 'breakEven'],
        [fn('SUM', col('Trade.pnl')), 'netPnl'],
      ],
      where: {
        closedAt: { [Op.gte]: windowStart, [Op.lte]: windowEnd },
        outcome: { [Op.in]: ['WIN', 'LOSS', 'BREAK_EVEN'] },
      },
      include: [{
        model: TradingAccount,
        as: 'tradingAccount',
        attributes: ['id', 'userId', 'accountName', 'currency'],
      }],
      // Group by both the base table's FK and the joined PK so MySQL's
      // ONLY_FULL_GROUP_BY mode accepts the non-aggregated account columns.
      group: ['Trade.tradingAccountId', 'tradingAccount.id'],
    });

    if (rows.length === 0) {
      console.log('[jobs] No trades closed in the last week — no summaries.');
      return;
    }

    // 2. Roll the per-account rows up per user (SQL grouped by account;
    //    the notification is per user).
    type AccountStat = {
      accountId: string;
      accountName: string;
      currency: string;
      closed: number;
      wins: number;
      losses: number;
      breakEven: number;
      winRate: number | null;
      netPnl: number;
    };
    const perUser = new Map<string, AccountStat[]>();

    for (const row of rows) {
      // The include isn't a declared class property, so TypeScript doesn't
      // see `row.tradingAccount` — use the typed `get()` accessor instead.
      const account = row.get('tradingAccount') as TradingAccount | null;
      if (!account) continue;

      // COUNT/SUM come back as numbers or decimal strings — coerce to Number
      // (Sequelize returns DECIMAL columns as strings on purpose).
      const closed = Number(row.get('closed'));
      const wins = Number(row.get('wins'));
      const losses = Number(row.get('losses'));
      const breakEven = Number(row.get('breakEven'));
      const netPnl = Number(row.get('netPnl'));

      const stats: AccountStat = {
        accountId: account.id,
        accountName: account.accountName,
        currency: account.currency,
        closed,
        wins,
        losses,
        breakEven,
        // wins / (wins + losses) — BREAK_EVEN trades sit out the rate
        winRate: wins + losses > 0 ? wins / (wins + losses) : null,
        netPnl,
      };

      const list = perUser.get(account.userId) || [];
      list.push(stats);
      perUser.set(account.userId, list);
    }

    // 3. One notification per user (Option C): combined totals in the
    //    headline, up to 3 account lines in the body, full data in `data`.
    const dateFmt = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const fmtPnl = (n: number) =>
      `${n >= 0 ? '+' : '-'}$${Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

    let sent = 0;
    for (const [userId, accounts] of perUser) {
      // Weekly idempotency: one PERFORMANCE_SUMMARY per user per window —
      // safe against double runs and server restarts mid-job.
      const alreadySentThisWeek = await Notification.count({
        where: {
          userId,
          type: 'PERFORMANCE_SUMMARY',
          createdAt: { [Op.gte]: windowStart },
        },
      });
      if (alreadySentThisWeek > 0) continue;

      const totals = accounts.reduce(
        (acc, a) => ({
          closed: acc.closed + a.closed,
          wins: acc.wins + a.wins,
          losses: acc.losses + a.losses,
          breakEven: acc.breakEven + a.breakEven,
          netPnl: acc.netPnl + a.netPnl,
        }),
        { closed: 0, wins: 0, losses: 0, breakEven: 0, netPnl: 0 }
      );
      const totalWinRate =
        totals.wins + totals.losses > 0 ? totals.wins / (totals.wins + totals.losses) : null;

      // Most-active accounts first; cap the list so the body stays short.
      const sorted = [...accounts].sort((a, b) => b.closed - a.closed);
      const shown = sorted.slice(0, 3);
      const extra = sorted.length - shown.length;

      const pct = (r: number | null) => (r === null ? '—' : `${(r * 100).toFixed(1)}%`);
      const accountLines = shown
        .map((a) => `${a.accountName}: ${fmtPnl(a.netPnl)} (${pct(a.winRate)} WR)`)
        .join(' · ') + (extra > 0 ? ` · +${extra} more` : '');

      const body =
        `${dateFmt(windowStart)} – ${dateFmt(windowEnd)}: ` +
        `${totals.closed} trade${totals.closed === 1 ? '' : 's'} closed ` +
        `(${totals.wins}W · ${totals.losses}L · ${totals.breakEven}BE), ` +
        `win rate ${pct(totalWinRate)}, net ${fmtPnl(totals.netPnl)}.\n` +
        accountLines;

      await createNotification(
        userId,
        'PERFORMANCE_SUMMARY',
        'Weekly performance summary',
        body,
        {
          windowStart: windowStart.toISOString(),
          windowEnd: windowEnd.toISOString(),
          totals: { ...totals, winRate: totalWinRate },
          accounts: sorted,
        }
      );
      sent += 1;
    }

    console.log(`[jobs] Weekly performance summaries sent to ${sent} user(s).`);
  } catch (error) {
    // A scheduled job must never crash the server; log and move on.
    console.error('[jobs] Weekly performance summary job failed:', error);
  }
}
