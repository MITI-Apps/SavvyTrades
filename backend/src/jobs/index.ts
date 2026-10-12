import cron from 'node-cron';
import { sendTradeReminders } from './tradeReminder.job.js';
import { sendWeeklyPerformanceSummaries } from './weeklyPerformanceSummary.job.js';

// Central place to register every scheduled job.
//
// node-cron syntax reference:
//   *    *    *    *    *
//   |    |    |    |    └─ day of week (0-7, where 0 and 7 = Sunday)
//   |    |    |    └────── month (1-12)
//   |    |    └─────────── day of month (1-31)
//   |    └──────────────── hour (0-23)
//   └───────────────────── minute (0-59)
//
// '0 8 * * *'     → 08:00 server time, every day
// '0 18 * * 0'    → 18:00 every Sunday
// '* * * * *'     → every minute (set via env to test a job)
const TRADE_REMINDER_CRON = process.env.TRADE_REMINDER_CRON || '0 8 * * *';
const WEEKLY_SUMMARY_CRON = process.env.WEEKLY_SUMMARY_CRON || '0 18 * * 0';
// How many days back the summary looks for closed trades (production: 7).
// Widen via env to test against older data without waiting for new closes.
const WEEKLY_SUMMARY_WINDOW_DAYS = Number(process.env.WEEKLY_SUMMARY_WINDOW_DAYS) || 7;

export function startJobs() {
  cron.schedule(TRADE_REMINDER_CRON, () => {
    sendTradeReminders();
  });

  cron.schedule(WEEKLY_SUMMARY_CRON, () => {
    sendWeeklyPerformanceSummaries(WEEKLY_SUMMARY_WINDOW_DAYS);
  });

  console.log(
    `[jobs] Scheduled jobs started (trade reminders every ${TRADE_REMINDER_CRON}, weekly summaries ${WEEKLY_SUMMARY_CRON}, summary window ${WEEKLY_SUMMARY_WINDOW_DAYS}d).`
  );
}