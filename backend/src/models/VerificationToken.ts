import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';

class VerificationToken extends Model {
    declare id: string;
    declare userId: string;
    declare token: string;
    declare type: 'email_verify' | 'password_reset';
    declare expiresAt: Date;
    declare readonly createdAt: Date;
}

VerificationToken.init(
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
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.ENUM('email_verify', 'password_reset'),
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'verification_tokens',
    modelName: 'VerificationToken',
    timestamps: false,
  }
);

export default VerificationToken;
