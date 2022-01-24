'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Likes.belongsTo(models.User, {
        as: 'likes_user',
        foreignKey: 'user_id'
      })
      Likes.belongsTo(models.Product, {
        as: 'likes_product',
        foreignKey: 'product_id'
      })
    }
  };
  Likes.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Likes',
  });
  return Likes;
};