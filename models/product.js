'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Bookmark, {
        as: 'bookmark_product',
        foreignKey: 'product_id'
      })
      Product.hasMany(models.Cart, {
        as: 'cart_product',
        foreignKey: 'product_id'
      })
      Product.belongsToMany(models.Category, {
        as: 'category_product',
        through: models.CategoryProduct
      })
      Product.belongsToMany(models.Transaction, {
        as: 'transaction_product',
        through: models.TransactionProduct
      })
    }
  };
  Product.init({
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING },
    images: { type: DataTypes.JSON },
    detail: { type: DataTypes.TEXT },
    brand: { type: DataTypes.STRING(50) },
    variant: { type: DataTypes.JSON },
    likescount: { type: DataTypes.INTEGER },
    ratescount: { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};