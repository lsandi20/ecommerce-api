'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourierServices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      courier_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Couriers',
            schema: 'public'
          },
          key: 'id',
          as: 'courier_id'
        },
      },
      price: {
        type: Sequelize.DOUBLE
      },
      estimation: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('CourierServices');
  }
};