'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Product, {
        as: 'category_product',
        through: models.CategoryProduct
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};