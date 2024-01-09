'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../utils/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is required',
          },
          notEmpty: {
            msg: 'Name is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email is required',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeBulkCreate: (user, option) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
