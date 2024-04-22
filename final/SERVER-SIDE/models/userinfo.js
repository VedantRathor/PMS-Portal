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
     */
    static associate(models) {
      // define association here
    }
  }
  userinfo.init({
    uid: {
      primaryKey:true,
      autoIncrement:true,
      type :DataTypes.INTEGER
    },
    uname: DataTypes.STRING,
    upassword: DataTypes.STRING,
    uemail: DataTypes.STRING,
    urole: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userinfo',
  });

  return userinfo;
};