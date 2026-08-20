import Joi from 'joi';

// Param schema for upload route (tradeId)


const deleteScreenshotParamSchema = Joi.object({
  tradeId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid trade ID format',
    'any.required': 'Trade ID is required',
  }),
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid screenshot ID format',
    'any.required': 'Screenshot ID is required',
  }),
});

// Body schema for upload (caption + screenshotType)
const uploadScreenshotSchema = Joi.object({
  caption: Joi.string().max(255).optional().allow('', null).messages({
    'string.max': 'Caption cannot exceed 255 characters',
  }),
  screenshotType: Joi.string().valid('BEFORE', 'AFTER').optional().default('BEFORE').messages({
    'any.only': 'Screenshot type must be either BEFORE or AFTER',
  }),
});

// Param schema for upload route (trade id)
const screenshotTradeIdParamSchema = Joi.object({
  tradeId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid trade ID format',
    'any.required': 'Trade ID is required',
  }),
});

export { deleteScreenshotParamSchema, uploadScreenshotSchema, screenshotTradeIdParamSchema };