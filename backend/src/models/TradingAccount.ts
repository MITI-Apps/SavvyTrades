import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';

class TradingAccounts extends Model {
    declare id: string;
    declare userId: string;
    declare accountName: string;
    declare market: string;
    declare accountType: string;
    declare startingBalance: number;
    declare currency: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
};

TradingAccounts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    market: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingBalance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
  },
  {
    sequelize,
    tableName: 'trading_accounts',
    modelName: 'TradingAccounts',
    timestamps: true,
  }
    
)
export default TradingAccounts;