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
    assignment_id: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    project_id: {
      type:DataTypes.INTEGER,
      allowNull : false,
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    manager_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'assignment',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
  
  return assignment;
};

