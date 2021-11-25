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
        as: 'address',
        foreignKey: 'userid',
        onDelete: 'CASCADE'
      })
    }
  };
  Address.init({
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: DataTypes.STRING,
    long: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};