'use strict';
const { Op } = require('sequelize')
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

    static getTaskByProject(project,task,userinfo,project_id,val){
      const query = {
        include: [{
            model: task,

            include: [{
                model: userinfo,

            }],

        }],
        where: {
            project_id: project_id
        }
   
      };

      if (val == 'pending' || val == 'completed') {
          query.include[0].where = {
              status: val
          }
      }
      return project.findAll(query)
    }

    static searchTaskInProject(project,task_name,userinfo,project_id){
      return project.findAll({
        include: [{
            model: task,
            where: {
                task_name: {
                    [Op.like]: `%${task_name}%`
                }
            },
            include: [{
                model: userinfo
            }]
        }],
        where: {
            project_id: project_id
        }
    })
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
      type : DataTypes.INTEGER
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