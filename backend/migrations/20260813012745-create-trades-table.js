'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trades', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tradingAccountId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'trading_accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      symbol: {
        type: Sequelize.STRING(30),
        allowNull: false, // e.g., EURUSD, BTCUSDT, AAPL
      },
      direction: {
        type: Sequelize.ENUM('BUY', 'SELL'),
        allowNull: false,
      },
      confluence: {
        type: Sequelize.TEXT,
        allowNull: true, // Reasons/strategies for taking the trade
      },
      outcome: {
        type: Sequelize.ENUM('WIN', 'LOSS', 'BREAK_EVEN', 'OPEN'),
        allowNull: false,
        defaultValue: 'OPEN',
      },
      pnl: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      openedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      closedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('trades');
  }
};
