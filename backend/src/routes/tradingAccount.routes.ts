import { Router } from 'express';
import { createTradingAccount, getAllTradingAccounts, getTradingAccountById, updateTradingAccount, deleteTradingAccount } from '../controllers/tradingAccount.controller.js';
import { createTradingAccountSchema, accountIdParamSchema, updateTradingAccountSchema } from '../validators/tradingAccount.validator.js';
import { validate, validateParams } from "../middleware/validate.js";
import  authJwt  from '../middleware/auth.middleware.js';
import requireVerified from '../middleware/requireVerified.js';

const router = Router();

// All trading account routes require authentication and email verification
router.use(authJwt, requireVerified);

// Create Account
router.post('/', validate(createTradingAccountSchema), createTradingAccount);

// Fetch All Accounts
router.get('/', getAllTradingAccounts)

// Fetch Single Account
router.get('/:id', validateParams(accountIdParamSchema), getTradingAccountById);

// Update an account
router.put('/:id', validateParams(accountIdParamSchema), validate(updateTradingAccountSchema), updateTradingAccount)

// Delete trading Account
router.delete('/:id', validateParams(accountIdParamSchema), deleteTradingAccount)

export default router;