'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // MySQL: ALTER TABLE notifications MODIFY type ENUM(...) to include TRADE_CLOSED
    await queryInterface.changeColumn('notifications', 'type', {
      type: Sequelize.ENUM(
        'ACCOUNT_CREATED',
        'TRADE_REMINDER',
        'PERFORMANCE_SUMMARY',
        'SECURITY_ALERT',
        'TRADE_CLOSED'
      ),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert back to the previous enum set
    await queryInterface.changeColumn('notifications', 'type', {
      type: Sequelize.ENUM(
        'ACCOUNT_CREATED',
        'TRADE_REMINDER',
        'PERFORMANCE_SUMMARY',
        'SECURITY_ALERT'
      ),
      allowNull: false,
    });
  },
};