'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public'
          },
          key: 'id',
          as: 'user_id'
        },
      },
      address_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Addresses',
            schema: 'public'
          },
          key: 'id',
          as: 'address_id'
        },
      },
      courier_service_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'CourierServices',
            schema: 'public'
          },
          key: 'id',
          as: 'courier_service_id'
        },
      },
      date: {
        type: Sequelize.DATE
      },
      total_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      file_evidence: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transactions');
  }
};