'use strict';

const { v4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      id: v4(),
      email: 'admin@virtoko.com',
      name: 'Admin',
      password: '$2b$10$71lmyRXTi0ICGLLJAO.CK.ZIsx5pjyX66O9hF1KSbBtFbi2IElnC2',
      phone: '0123',
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
