'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init({
    notification_id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    notification: DataTypes.TEXT,
    read: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Notification;
};