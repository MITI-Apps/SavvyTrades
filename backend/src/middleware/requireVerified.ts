import type { Response, Request, NextFunction } from "express";
import User from "../models/User.js";

const requireVerified = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findByPk(userId, { attributes: ['id', 'verified'] });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.verified) {
      return res.status(403).json({ error: 'Please verify your email to access this resource' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify user status' });
  }
};

export default requireVerified;
