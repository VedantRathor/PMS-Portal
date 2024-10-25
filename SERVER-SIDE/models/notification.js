'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notification.init({
    notification_id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    notification: DataTypes.TEXT,
    read: DataTypes.INTEGER,
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // or allowNull: true if it is optional
    },
  }, {
    sequelize,
    modelName: 'notification',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return notification;
};