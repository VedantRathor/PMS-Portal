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
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
  
  return task;
};