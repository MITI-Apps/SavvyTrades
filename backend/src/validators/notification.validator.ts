import Joi from 'joi';

// Schema for URL parameters containing a notification ID
const notificationIdParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid notification ID format',
    'any.required': 'Notification ID is required',
  }),
});

export { notificationIdParamSchema };