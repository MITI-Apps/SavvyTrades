import { Router } from 'express';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../controllers/notification.controller.js';
import { notificationIdParamSchema } from '../validators/notification.validator.js';
import { validateParams } from '../middleware/validate.js';
import authJwt from '../middleware/auth.middleware.js';
import requireVerified from '../middleware/requireVerified.js';

const router = Router();

// All notification routes require authentication and email verification
router.use(authJwt, requireVerified);

// Fetch All Notifications (+ unread count)
router.get('/', getNotifications);

// Mark All Notifications as Read
// NOTE: declared before /:id routes so 'read-all' isn't swallowed by a param match
router.patch('/read-all', markAllNotificationsRead);

// Mark a Single Notification as Read
router.patch('/:id/read', validateParams(notificationIdParamSchema), markNotificationRead);

export default router;