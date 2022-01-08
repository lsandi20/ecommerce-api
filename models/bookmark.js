'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        as: 'bookmark_user',
        foreignKey: 'user_id'
      })
      Bookmark.belongsTo(models.Product, {
        as: 'bookmark_product',
        foreignKey: 'product_id'
      })
    }
  };
  Bookmark.init({
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
    modelName: 'Bookmark',
  });
  return Bookmark;
};