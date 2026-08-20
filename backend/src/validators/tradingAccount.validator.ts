import Joi from 'joi';

const createTradingAccountSchema = Joi.object({
  accountName: Joi.string().min(2).max(50).required().messages({
    'any.required': 'Account name is required',
    'string.empty': 'Account name cannot be empty',
    'string.min': 'Account name must be at least 2 characters long',
    'string.max': 'Account name cannot exceed 50 characters',
  }),
  market: Joi.string().required().messages({
    'any.required': 'Market type is required (e.g., Forex, Crypto, Stocks, Futures)',
  }),
  accountType: Joi.string().required().messages({
    'any.required': 'Account type is required (e.g., Live, Demo, Funded)',
  }),
  startingBalance: Joi.number().min(0).default(0.0).messages({
    'number.min': 'Starting balance cannot be negative',
  }),
  currency: Joi.string().max(10).default('USD'),
});

// Schema for URL parameters containing IDs
const accountIdParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid account ID format',
    'any.required': 'Account ID is required',
  }),
});

// Update Account Schema (all fields optional, but at least one must be supplied)
const updateTradingAccountSchema = Joi.object({
  accountName: Joi.string().min(2).max(50).messages({
    'string.empty': 'Account name cannot be empty',
    'string.min': 'Account name must be at least 2 characters long',
    'string.max': 'Account name cannot exceed 50 characters',
  }),
  market: Joi.string(),
  accountType: Joi.string(),
  startingBalance: Joi.number().min(0).messages({
    'number.min': 'Starting balance cannot be negative',
  }),
  currency: Joi.string().max(10),
}).min(1).messages({
  'object.min': 'Please provide at least one field to update',
});

export { createTradingAccountSchema, accountIdParamSchema, updateTradingAccountSchema };