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
    log_id: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false 
    },
    project_id:{
      type:DataTypes.INTEGER,
      allowNull: false 
    },
    task_id: {
      type:DataTypes.INTEGER,
      allowNull: false ,
    },
    logdata: DataTypes.TEXT,
    start_time:{
      allowNull: false,
      type: DataTypes.TIME
    },
    end_time : {
      allowNull: false,
      type: DataTypes.TIME
    },
    logstatus: DataTypes.STRING,
    approved_by: {
      type:DataTypes.INTEGER,
    
    }
  }, {
    sequelize,
    modelName: 'log',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
 
  return log;
};