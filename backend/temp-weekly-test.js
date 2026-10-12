// Importing the models index registers the associations (Trade.belongsTo
// TradingAccounts, etc.) — the server does this at boot; a standalone
// script must do it explicitly before any include: can run.
import './src/models/index.js';
import { sendWeeklyPerformanceSummaries } from './src/jobs/weeklyPerformanceSummary.job.js';
console.log('[test] running weekly summary job with 30-day window...');
await sendWeeklyPerformanceSummaries(30);
process.exit(0);
//# sourceMappingURL=temp-weekly-test.js.map