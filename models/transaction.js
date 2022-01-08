'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.CourierService, {
        as: 'transaction_courier_service',
        foreignKey: 'courier_service_id'
      })
      Transaction.belongsTo(models.User, {
        as: 'transaction_user',
        foreignKey: 'user_id'
      })
      Transaction.belongsTo(models.Address, {
        as: 'transaction_address',
        foreignKey: 'address_id'
      })
      Transaction.belongsToMany(models.Product, {
        as: 'transaction_product',
        through: models.TransactionProduct
      })
    }
  };
  Transaction.init({
    user_id: DataTypes.UUID,
    address_id: DataTypes.UUID,
    courier_service_id: DataTypes.UUID,
    date: DataTypes.DATE,
    total_price: DataTypes.DOUBLE,
    file_evidence: DataTypes.TEXT,
    status: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};


