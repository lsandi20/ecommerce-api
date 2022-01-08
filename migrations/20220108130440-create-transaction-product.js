'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TransactionProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Transactions',
            schema: 'public'
          },
          key: 'id',
          as: 'transaction_id'
        },
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Products',
            schema: 'public'
          },
          key: 'id',
          as: 'product_id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TransactionProducts');
  }
};