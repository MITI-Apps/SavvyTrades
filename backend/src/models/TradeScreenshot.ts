import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../database/connection.js';

type ScreenshotType = 'BEFORE' | 'AFTER';

class TradeScreenshots extends Model {
    declare id: string;
    declare tradeId: string;
    declare screenshotType: ScreenshotType;
    declare caption: string | null;
    declare url: string;
    declare publicId: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

TradeScreenshots.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tradeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        screenshotType: {
            type: DataTypes.ENUM('BEFORE', 'AFTER'),
            allowNull: false,
            defaultValue: 'BEFORE',
        },
        caption: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        publicId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'trade_screenshots',
        modelName: 'TradeScreenshots',
        timestamps: true,
    }
);

export default TradeScreenshots;