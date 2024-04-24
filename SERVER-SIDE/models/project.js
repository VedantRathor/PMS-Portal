'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    project_id: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
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
      type : DataTypes.INTEGER,
      allowNull:false,
    },
    created_by:{
      type : DataTypes.INTEGER,
      allowNull : false
    } ,
    updated_by:{
      type : DataTypes.INTEGER
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
  
  return project;
};