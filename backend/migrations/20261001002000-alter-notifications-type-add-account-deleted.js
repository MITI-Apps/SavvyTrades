'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // MySQL: ENUM values live in the table definition, so a new value
    // requires an explicit ALTER — append ACCOUNT_DELETED to the list.
    await queryInterface.changeColumn('notifications', 'type', {
      type: Sequelize.ENUM(
        'ACCOUNT_CREATED',
        'TRADE_REMINDER',
        'PERFORMANCE_SUMMARY',
        'SECURITY_ALERT',
        'TRADE_CLOSED',
        'ACCOUNT_DELETED'
      ),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverse only the value this migration added. Safe as long as no
    // ACCOUNT_DELETED rows exist yet (values being removed must have no rows).
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
};