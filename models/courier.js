'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Courier.hasMany(models.CourierService, {
        as: 'courier_courier_service',
        foreignKey: 'courier_id'
      })
    }
  };
  Courier.init({
    name: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Courier',
  });
  return Courier;
};