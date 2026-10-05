import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

type NotificationType = 'ACCOUNT_CREATED' | 'TRADE_REMINDER' | 'PERFORMANCE_SUMMARY' | 'SECURITY_ALERT' | 'TRADE_CLOSED';

class Notification extends Model {
    declare id: string;
    declare userId: string;
    declare type: NotificationType;
    declare title: string;
    declare body: string;
    declare readAt: Date | null;
    declare data: object | null;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Notification.init(
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
    type: {
      type: DataTypes.ENUM('ACCOUNT_CREATED', 'TRADE_REMINDER', 'PERFORMANCE_SUMMARY', 'SECURITY_ALERT', 'TRADE_CLOSED'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    modelName: 'Notification',
    timestamps: true,
  }
);

export default Notification;