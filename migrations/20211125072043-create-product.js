'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.JSON
      },
      detail: {
        type: Sequelize.TEXT
      },
      brand: {
        type: Sequelize.STRING(50)
      },
      variant: {
        type: Sequelize.JSON
      },
      likescount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ratescount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Products');
  }
};