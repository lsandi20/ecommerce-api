'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        as: 'cart_user',
        foreignKey: 'user_id'
      })
      Cart.belongsTo(models.Product, {
        as: 'cart_product',
        foreignKey: 'product_id'
      })
    }
  };
  Cart.init({
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
    modelName: 'Cart',
  });
  return Cart;
};