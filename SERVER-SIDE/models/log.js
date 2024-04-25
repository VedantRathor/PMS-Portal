'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    
    static createLog(params,body,user_id){
      const { project_id, task_id } = params
      const { logdata, start_time, end_time } = body
      return log.create({
        user_id: user_id,
        project_id: project_id,
        task_id: task_id,
        logdata: logdata,
        logstatus: 'pending',
        start_time: start_time,
        end_time: end_time
    })
    }
    
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