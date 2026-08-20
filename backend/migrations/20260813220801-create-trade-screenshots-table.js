'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trade_screenshots', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tradeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'trades',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      screenshotType: {
        type: Sequelize.ENUM('BEFORE', 'AFTER'),
        allowNull: false,
        defaultValue: 'BEFORE',
      },
      caption: {
        type: Sequelize.STRING(255),
        allowNull: true, // e.g., "H4 Setup", "M15 Entry", "Exit Chart"
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      publicId: {
        type: Sequelize.STRING(255),
        allowNull: false, // Cloudinary asset ID for easy deletion
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
    await queryInterface.dropTable('trade_screenshots'); 
  }
};
