'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {

    static createLog(params, body, user_id) {
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

    static updateLogStatus(body, user_id) {
      const { log_id, logstatus } = body
      return log.update({ logstatus: logstatus, approved_by: user_id }, { where: { log_id: log_id } })
    }

    static getLogsByProjectIdWithLimit(project,task,log,userinfo,project_id,limit) {
      return project.findAll({
        include: [{
          model: task,
          include: [{
            model: log,
            order: [['created_at', 'DESC']], // Order by created_at field of log model
            limit: limit,
            include: [{
              model: userinfo
            }],


          }]
        }],
        where: {
          project_id: project_id,

        },

      });
    }

    static associate(models) {
      // define association here
    }
  }
  log.init({
    log_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    logdata: DataTypes.TEXT,
    start_time: {
      allowNull: false,
      type: DataTypes.TIME
    },
    end_time: {
      allowNull: false,
      type: DataTypes.TIME
    },
    logstatus: DataTypes.STRING,
    approved_by: {
      type: DataTypes.INTEGER,

    }
  }, {
    sequelize,
    modelName: 'log',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return log;
};
