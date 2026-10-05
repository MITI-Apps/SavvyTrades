import cron from 'node-cron';
import { sendTradeReminders } from './tradeReminder.job.js';

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
// '0 8 * * *'  → 08:00 server time, every day
// '* * * * *'  → every minute (change to this to test the job)
const TRADE_REMINDER_CRON = process.env.TRADE_REMINDER_CRON || '* * * * *';

export function startJobs() {
  cron.schedule(TRADE_REMINDER_CRON, () => {
    sendTradeReminders();
  });

  console.log(`[jobs] Scheduled jobs started (trade reminders every ${TRADE_REMINDER_CRON}).`);
}