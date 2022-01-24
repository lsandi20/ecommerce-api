'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User, {
        as: 'user_address',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
      Address.hasMany(models.Transaction, {
        as: 'transaction_address',
        foreignKey: 'address_id',
      })
    }
  };
  Address.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: DataTypes.STRING(50),
    long: DataTypes.STRING(50)
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Address',
  });
  return Address;
};