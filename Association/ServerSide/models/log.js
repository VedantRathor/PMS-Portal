'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  log.init({
    lid: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    uid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER,
    tid: DataTypes.INTEGER,
    logdata: DataTypes.TEXT,
    logstatus: DataTypes.STRING,
    logmid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'log',
  });
 
  return log;
};