'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */   static FindUser(email) {
      const result = userinfo.findOne({ where: { email: email } })
      return result
       }
    static associate(models) {
      // define association here
    }
  }
  userinfo.init({
    user_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },

    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true, // Ensure uniqueness
    },
    role: DataTypes.INTEGER,
    deleted_at: {

      type: DataTypes.DATE
    },
    created_by: DataTypes.INTEGER,
    token: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userinfo',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return userinfo;
};




