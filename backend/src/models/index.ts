import  User  from './User.js';
import TradingAccounts from './TradingAccount.js'
import Trade from './Trades.js';
import TradeScreenshots from './TradeScreenshot.js'

// User -> TradingAccount (1:N)
User.hasMany(TradingAccounts, {
    foreignKey: 'userId',
    as: 'tradingAccounts',
    onDelete: 'CASCADE',
});

TradingAccounts.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

// TradingAccount -> Trade (1:N)
TradingAccounts.hasMany(Trade, {
    foreignKey: 'tradingAccountId',
    as: 'trades',
    onDelete: 'CASCADE',
});

Trade.belongsTo(TradingAccounts, {
    foreignKey: 'tradingAccountId',
    as: 'tradingAccount',
});

// Trade -> TradeScreenshots (1:N)
Trade.hasMany(TradeScreenshots, {
    foreignKey: 'tradeId',
    as: 'screenshots',
    onDelete: 'CASCADE'
});

TradeScreenshots.belongsTo(Trade, {
    foreignKey: 'tradeId',
    as: 'trade',
});

export { User, TradingAccounts, Trade, TradeScreenshots };