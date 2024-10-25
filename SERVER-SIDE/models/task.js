'use strict';
const { Op } = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    
    static createTask({ project_id, task_name, task_details,estimate_time },user_id,company_id){
      return task.create({
        project_id: project_id,
        created_by: user_id,
        task_name: task_name,
        task_details: task_details,
        status: 'pending',
        estimate_time:estimate_time,
        company_id: company_id
    })
    }
    
    static updateTaskStatus(body,user_id,company_id){
      const { task_id, status } = body;
      return task.update({ status: status,updated_by:user_id }, { where: { task_id: task_id , company_id : company_id} });
    }

    static getTaskByProject(project,task,userinfo,project_id,val,company_id){
      const query = {
        include: [{
            model: task,

            include: [{
                model: userinfo,

            }],

        }],
        where: {
            project_id: project_id,
            company_id:company_id
        }
   
      };

      if (val == 'pending' || val == 'completed') {
          query.include[0].where = {
              status: val
          }
      }
      return project.findAll(query)
    }

    static searchTaskInProject(project,userinfo,project_id,company_id,taskName,taskStatus,taskOrder){
         // Build the where conditions dynamically
            const taskWhereClause = {};
            const projectWhereClause = {
                project_id: project_id,
                company_id: company_id
            };

            // If taskName is provided, filter tasks based on taskName
            if (taskName) {
                taskWhereClause.task_name = {
                    [Op.like]: `%${taskName}%`
                };
            }

            // If taskStatus is provided, filter tasks based on taskStatus
            if (taskStatus) {
                taskWhereClause.status = taskStatus;
            }

            // Build the order array based on taskOrder
            let orderClause = [];
            if (taskOrder == 1) {
                // Order by task.updated_at descending
                orderClause = [['updated_at', 'DESC']];
            } else if (taskOrder == 2) {
                // Order by task.updated_at ascending
                orderClause = [['updated_at', 'ASC']];
            }

            // Execute the query
            return project.findAll({
                include: [{
                    model: task,
                    required: false, // Apply tasks as LEFT JOIN to ensure all projects are fetched
                    include: [{
                        model: userinfo,
                        required: false // Apply LEFT JOIN to userinfo to include related data
                    }],
                    // Task filters will be applied after all joins
                    where: taskWhereClause
                }],
                where: projectWhereClause,
                // Apply ordering based on task.updated_at
                order: orderClause.length ? [[{ model: task }, 'updated_at', taskOrder == 1 ? 'DESC' : 'ASC']] : []
            });
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
    status: DataTypes.STRING,
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // or allowNull: true if it is optional
    },
  }, {
    sequelize,
    modelName: 'task',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
  
  return task;
};