import { Router } from 'express';
import {
  getDashboard,
  getAccountStats,
  getEquityCurve,
  getUserAccounts,
} from '../controllers/dashboard.controller.js';
import  authJwt  from '../middleware/auth.middleware.js';
import requireVerified from '../middleware/requireVerified.js';

const router = Router();

router.use(authJwt, requireVerified);

// Accounts list (Account Switcher)
router.get('/accounts', getUserAccounts);

// Composed Dashboard route
router.get('/accounts/:accountId/dashboard', getDashboard);

// Standalone routes
router.get('/accounts/:accountId/stats', getAccountStats);
router.get('/accounts/:accountId/equity-curve', getEquityCurve);

export default router;