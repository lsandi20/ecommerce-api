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
        as: 'user_address',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Bookmark, {
        as: 'bookmark_user',
        foreignKey: 'user_id',
      })
      User.hasMany(models.Cart, {
        as: 'cart_user',
        foreignKey: 'user_id',
      })
      User.hasMany(models.Likes, {
        as: 'likes_user',
        foreignKey: 'user_id',
      })
      User.hasMany(models.Transaction, {
        as: 'transaction_user',
        foreignKey: 'user_id',
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });
  return User;
};