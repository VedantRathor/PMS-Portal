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
    pid: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    pname: DataTypes.STRING,
    pdesc: DataTypes.TEXT,
    mid: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
  });
  
  return project;
};