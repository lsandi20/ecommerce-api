'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourierService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourierService.belongsTo(models.Courier, {
        as: 'courier_courier_service',
        foreignKey: 'courier_id'
      })
      CourierService.hasMany(models.Transaction, {
        as: 'transaction_courier_service',
        foreignKey: 'courier_service_id'
      })
    }
  };
  CourierService.init({
    courier_id: DataTypes.UUID,
    price: DataTypes.DOUBLE,
    estimation: DataTypes.DOUBLE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CourierService',
  });
  return CourierService;
};