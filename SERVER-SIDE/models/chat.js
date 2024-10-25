'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }
  chat.init({
    company_id:{type: DataTypes.INTEGER,  allowNull : false },
    project_id: {type: DataTypes.INTEGER,allowNull : false },
    user_id:{type: DataTypes.INTEGER, allowNull:false},
    message: {type:DataTypes.TEXT,allowNull:false},
    type: DataTypes.INTEGER,
    deleted_at: {type:DataTypes.DATE,allowNull:true},
    created_at : {type : DataTypes.DATE,allowNull:false},
    updated_at: {type : DataTypes.DATE,allowNull:false}
  }, {
    createdAt: 'created_at',  // Override Sequelize default field names
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'chat',
  });
  return chat;
};