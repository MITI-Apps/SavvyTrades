import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../database/connection.js';

type TradeDirection = 'BUY' | 'SELL';
type TradeOutcome = 'WIN' | 'LOSS' | 'BREAK_EVEN' | 'OPEN';

class Trade extends Model {
    declare id: string;
    declare tradingAccountId: string;
    declare symbol: string;
    declare direction: TradeDirection;
    declare confluence: string | null;
    declare outcome: TradeOutcome;
    declare pnl: number;
    declare openedAt: Date;
    declare closedAt: Date | null;
    declare notes: string | null;
    
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}


Trade.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tradingAccountId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    confluence: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    outcome: {
      type: DataTypes.ENUM('WIN', 'LOSS', 'BREAK_EVEN', 'OPEN'),
      allowNull: false,
      defaultValue: 'OPEN',
    },
    pnl: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    openedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'trades',
    modelName: 'Trade',
    timestamps: true,
  }
);

export default Trade;