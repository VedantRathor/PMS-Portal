'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {

    static createProject({ project_name, project_details, manager_id }, user_id) {
      return project.create({
        project_name: project_name,
        project_details: project_details,
        manager_id: manager_id,
        created_by: user_id,
        status: 'pending',
        updated_by: user_id
      })
    }

    static updateProjectStatus(params, body,) {
      const { project_id } = params
      const { status } = body
      return project.update({
        status: status
      }, {
        where: {
          project_id: project_id
        }
      })
    }

    static associate(models) {
      // define association here
    }
  }
  project.init({
    project_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return project;
};