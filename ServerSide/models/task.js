'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    tid: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    pid: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    tname: DataTypes.STRING,
    tdesc: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task',
  });
  
  return task;
};