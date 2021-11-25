'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Address, {
        as: 'address',
        foreignKey: 'userid',
        onDelete: 'CASCADE'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};