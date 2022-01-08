'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TransactionProduct.init({
    transaction_id: DataTypes.UUID,
    product_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'TransactionProduct',
  });
  return TransactionProduct;
};