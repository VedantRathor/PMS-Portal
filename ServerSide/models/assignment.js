'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignment.init({
    aid: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    pid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    mid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assignment',
  });
  
  return assignment;
};