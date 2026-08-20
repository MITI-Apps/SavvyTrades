import { Router } from 'express';
import { createTrade, getTrades, getTradeById, updateTrade, deleteTrade } from '../controllers/trade.controller.js';
import { createTradeSchema, getTradesQuerySchema, tradeIdParamSchema, updateTradeSchema } from '../validators/trade.validator.js';
import { validate, validateQuery, validateParams } from '../middleware/validate.js';
import  authJwt  from '../middleware/auth.middleware.js';

const router = Router();

router.use(authJwt);

router.post('/', validate(createTradeSchema), createTrade);

router.get('/', validateQuery(getTradesQuerySchema), getTrades);

router.get('/:id', validateParams(tradeIdParamSchema), getTradeById);

router.put('/:id', validateParams(tradeIdParamSchema), validate(updateTradeSchema) ,updateTrade);

router.delete('/:id', validateParams(tradeIdParamSchema), deleteTrade);

export default router;