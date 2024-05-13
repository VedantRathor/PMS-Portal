'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userinfo extends Model {

    static FindUser(email) {
      const result = userinfo.findOne({ where: { email: email } })
      return result
    }

    static createUser({ name, password, email, role, created_by}, token ) {
      return userinfo.create({
        name: name,
        password: password,
        email: email,
        role: role,
        created_by: created_by,
        token: token
      })
    }

    static updateUser(token,email){
      return userinfo.update({ token: token }, { where: { email: email } })
    }

    static getManagers(){
      return userinfo.findAll({ where: { role: 2 }, attributes: ['user_id', 'name'] })
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




