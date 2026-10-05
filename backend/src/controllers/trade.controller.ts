import type { Response, Request, NextFunction } from 'express';
import Trade from '../models/Trades.js';
import  TradingAccount  from '../models/TradingAccount.js';
import { createNotification } from '../services/notification.service.js';

export const createTrade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;
    const {
      tradingAccountId,
      symbol,
      direction,
      confluence,
      outcome,
      pnl,
      openedAt,
      closedAt,
      notes,
    } = req.body;

    // 🔒 Multi-Account Isolation:
    // Verify trading account exists AND belongs to the authenticated user
    const account = await TradingAccount.findOne({
      where: { id: tradingAccountId, userId },
    });

    if (!account) {
      return res.status(404).json({
        error: 'Trading account not found or does not belong to you',
      });
    }

    // Create trade linked to the verified trading account
    const trade = await Trade.create({
      tradingAccountId,
      symbol,
      direction,
      confluence: confluence || null,
      outcome: outcome || 'OPEN',
      pnl: pnl || 0.0,
      openedAt: openedAt || new Date(),
      closedAt: closedAt || null,
      notes: notes || null,
    });

    res.status(201).json({
      message: 'Trade created successfully',
      trade,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;
    const { tradingAccountId, symbol, direction, outcome } = req.query;

    // 1. Verify the requested trading account exists AND belongs to the authenticated user
    const account = await TradingAccount.findOne({
      where: { id: tradingAccountId, userId },
    });

    if (!account) {
      return res.status(404).json({
        error: 'Trading account not found or access denied',
      });
    }

    // 2. Fetch trades belonging strictly to THIS validated account
    const whereClause: Record<string, any> = {
      tradingAccountId: tradingAccountId,
    };

    if (symbol) whereClause.symbol = symbol;
    if (direction) whereClause.direction = direction;
    if (outcome) whereClause.outcome = outcome;

    const trades = await Trade.findAll({
      where: whereClause,
      order: [['openedAt', 'DESC']],
    });

    res.status(200).json({ trades });
  } catch (error) {
    next(error);
  }
};

// Get Single Trade by ID (Ensuring Ownership)
export const getTradeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;
    const { id } = req.params;

    const trade = await Trade.findOne({
      where: { id },
      include: [
        {
          model: TradingAccount,
          as: 'tradingAccount',
          where: { userId },
          attributes: ['id', 'accountName', 'market', 'currency'],
        },
      ],
    });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.status(200).json({ trade });
  } catch (error) {
    next(error);
  }
};

// Update & Close Trade
export const updateTrade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;
    const { id } = req.params;
    const updates = req.body;

    // 1. Ownership & Existence Guard (via associated TradingAccount)
    const trade = await Trade.findOne({
      where: { id },
      include: [
        {
          model: TradingAccount,
          as: 'tradingAccount',
          where: { userId },
        },
      ],
    });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found or access denied' });
    }

    // 2. Capture the pre-update state (trade.update() below mutates the instance)
    const wasOpen = trade.outcome === 'OPEN';

    // 3. Business Logic: Handle Outcome & Timestamp State Transitions
    if (updates.outcome) {
      if (updates.outcome === 'OPEN') {
        // Re-opening trade: reset closedAt and PnL
        updates.closedAt = null;
        updates.pnl = 0.0;
      } else if (trade.outcome === 'OPEN' && !updates.closedAt) {
        // Closing an OPEN trade without explicit closedAt timestamp: default to now
        updates.closedAt = new Date();
      }
    }

    // 4. Apply updates and save
    await trade.update(updates);

    // Fire notification if a trade just closed (was OPEN and outcome becomes non-OPEN)
    try {
      const isNowClosed = updates.outcome && updates.outcome !== 'OPEN';
      if (wasOpen && isNowClosed) {
        await createNotification(
          userId!,
          'TRADE_CLOSED',
          'Trade closed',
          `Your ${trade.symbol} trade was closed as ${updates.outcome}.`,
          { tradeId: trade.id, outcome: updates.outcome, pnl: updates.pnl ?? trade.pnl }
        );
      }
    } catch (notifError) {
      console.error('Failed to create trade closed notification:', notifError);
    }

    res.status(200).json({
      message: 'Trade updated successfully',
      trade,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Trade
export const deleteTrade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.auth?.userId;
    const { id } = req.params;

    const trade = await Trade.findOne({
      where: { id },
      include: [
        {
          model: TradingAccount,
          as: 'tradingAccount',
          where: { userId },
        },
      ],
    });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found or access denied' });
    }

    await trade.destroy();

    res.status(200).json({ message: 'Trade deleted successfully' });
  } catch (error) {
    next(error);
  }
};