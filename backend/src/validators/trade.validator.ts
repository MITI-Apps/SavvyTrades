import Joi from 'joi';

export const createTradeSchema = Joi.object({
  tradingAccountId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid trading account ID format',
    'any.required': 'Trading account ID is required',
  }),
  symbol: Joi.string().trim().uppercase().required().messages({
    'string.empty': 'Symbol cannot be empty',
    'any.required': 'Trading symbol (e.g., EURUSD, BTCUSDT) is required',
  }),
  direction: Joi.string().valid('BUY', 'SELL').required().messages({
    'any.only': 'Direction must be either BUY or SELL',
    'any.required': 'Trade direction is required',
  }),
  confluence: Joi.string().max(2000).optional().allow('', null),
  outcome: Joi.string().valid('WIN', 'LOSS', 'BREAK_EVEN', 'OPEN').default('OPEN'),
  pnl: Joi.number().default(0.0),
  openedAt: Joi.date().iso().optional().default(() => new Date()),
  closedAt: Joi.date().iso().optional().allow(null),
  notes: Joi.string().max(1000).optional().allow('', null),
});

// Query Parameters Schema for Filtering & Pagination
export const getTradesQuerySchema = Joi.object({
  // 🔒 tradingAccountId is now strictly REQUIRED
  tradingAccountId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid trading account ID format',
    'any.required': 'You must specify a tradingAccountId to fetch trades',
  }),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  symbol: Joi.string().trim().uppercase().optional(),
  direction: Joi.string().valid('BUY', 'SELL').optional(),
  outcome: Joi.string().valid('WIN', 'LOSS', 'BREAK_EVEN', 'OPEN').optional(),
});

// Parameter Schema
export const tradeIdParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid trade ID format',
    'any.required': 'Trade ID is required',
  }),
});

export const updateTradeSchema = Joi.object({
  symbol: Joi.string().trim().uppercase().optional(),
  direction: Joi.string().valid('BUY', 'SELL').optional(),
  confluence: Joi.string().max(2000).optional().allow('', null),
  outcome: Joi.string().valid('WIN', 'LOSS', 'BREAK_EVEN', 'OPEN').optional(),
  pnl: Joi.number().optional(),
  openedAt: Joi.date().iso().optional(),
  closedAt: Joi.date().iso().optional().allow(null),
  notes: Joi.string().max(1000).optional().allow('', null),
}).min(1).messages({
  'object.min': 'You must provide at least one field to update',
});