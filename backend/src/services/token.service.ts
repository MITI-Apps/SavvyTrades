import crypto from 'crypto';
import VerificationToken from '../models/VerificationToken.js';
import User from '../models/User.js';

const generateToken = async (userId: string, type: 'email_verify' | 'password_reset'): Promise<string> => {
  // Delete any existing tokens of the same type for this user
  await VerificationToken.destroy({
    where: { userId, type },
  });

  const token = crypto.randomBytes(32).toString('hex');

  const expiryMinutes = type === 'password_reset' ? 15 : 1440; // 15 min for reset, 24h for verify

  await VerificationToken.create({
    userId,
    token,
    type,
    expiresAt: new Date(Date.now() + expiryMinutes * 60 * 1000),
  });

  return token;
};

const verifyToken = async (token: string, type: 'email_verify' | 'password_reset'): Promise<string | null> => {
  const verificationToken = await VerificationToken.findOne({
    where: { token, type },
  });

  if (!verificationToken) {
    return null;
  }

  if (new Date() > verificationToken.expiresAt) {
    await verificationToken.destroy();
    return null;
  }

  const userId = verificationToken.userId;
  await verificationToken.destroy();

  return userId;
};

export { generateToken, verifyToken };
