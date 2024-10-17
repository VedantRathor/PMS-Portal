const db = require('../models/index')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignment extends Model {

    static createAssignment({ project_id, user_id }, assigner) {
      return assignment.create({
          project_id: project_id,
          user_id: user_id,
          manager_id: assigner
      })
    }

    static associate(models) {
      // define association here
    }
  }
  assignment.init({
    assignment_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // or allowNull: true if it is optional
    },
  }, {
    sequelize,
    modelName: 'assignment',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return assignment;
};

