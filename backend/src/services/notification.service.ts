import Notification from '../models/Notification.js';

type NotificationType = 'ACCOUNT_CREATED' | 'TRADE_REMINDER' | 'PERFORMANCE_SUMMARY' | 'SECURITY_ALERT';

// Central "producer" helper: any calling code (controllers, cron jobs, mailer)
// creates a notification through this function instead of touching the model directly.
const createNotification = async (
  userId: string,
  type: NotificationType,
  title: string,
  body: string,
  data?: object
) => {
  return Notification.create({
    userId,
    type,
    title,
    body,
    data: data || null,
  });
};

export { createNotification };