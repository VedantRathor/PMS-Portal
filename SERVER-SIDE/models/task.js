'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    
    static createTask({ project_id, task_name, task_details,estimate_time },user_id){
      return task.create({
        project_id: project_id,
        created_by: user_id,
        task_name: task_name,
        task_details: task_details,
        status: 'pending',
        estimate_time:estimate_time
    })
    }
    
    static updateTaskStatus(body,user_id){
      const { task_id, status } = body
      return task.update({ status: status,updated_by:user_id }, { where: { task_id: task_id } })
    }

    static associate(models) {
      // define association here
    }
  }
  task.init({
    task_id: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    project_id: {
      type:DataTypes.INTEGER,
      allowNull : false             
    },
    created_by:{ 
      type: DataTypes.INTEGER,
      allowNull : false 
    },
    task_name: DataTypes.STRING,
    task_details: DataTypes.TEXT,
    updated_by : {
      type : DataTypes.DATE
    },
    estimate_time : {
      type : DataTypes.TIME,
      allowNull : false 
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
  
  return task;
};