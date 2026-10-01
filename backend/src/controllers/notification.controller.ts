import type { Request, Response, NextFunction } from 'express';
import Notification from '../models/Notification.js';

// Fetch all notifications belonging to the authenticated user (newest first)
export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;

    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 50,
    });

    const unreadCount = await Notification.count({
      where: { userId, readAt: null },
    });

    res.status(200).json({
      count: notifications.length,
      unreadCount,
      notifications,
    });
  } catch (error) {
    next(error);
  }
};

// Mark a single notification as read (ensuring ownership)
export const markNotificationRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;
    const { id } = req.params;

    const notification = await Notification.findOne({
      where: { id, userId }, // Must match both ID and current user
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    if (!notification.readAt) {
      notification.readAt = new Date();
      await notification.save();
    }

    res.status(200).json({
      message: 'Notification marked as read',
      notification,
    });
  } catch (error) {
    next(error);
  }
};

// Mark every unread notification for the user as read
export const markAllNotificationsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;

    const updated = await Notification.update(
      { readAt: new Date() },
      { where: { userId, readAt: null } }
    );

    res.status(200).json({
      message: 'All notifications marked as read',
      updated: updated[0], // number of rows changed
    });
  } catch (error) {
    next(error);
  }
};