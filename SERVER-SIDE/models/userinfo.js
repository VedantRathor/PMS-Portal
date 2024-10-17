'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userinfo extends Model {

    static  FindUser(email, company_id = -1 ) {
      let result ;
      if( company_id != -1 ) {
        result =   userinfo.findOne({ where: { email: email, company_id} });
      }else{
        result =   userinfo.findOne({ where: { email: email } });
      }
      
      return result;
    }

    static createUser({ name, password, email, role, created_by}, token ,company_id) {
      return userinfo.create({
        name: name,
        password: password,
        email: email,
        role: Number(role),
        created_by: created_by,
        token: token,
        company_id:company_id
      })
    }

    static createAdmin({admin_name, admin_email, password}, token ) {
      return userinfo.create({
        name : admin_name,
        password : password,
        email : admin_email,
        role : 1 ,
        created_by : 0,
        token : token,
        company_id : 0
      })
    }

    static updateUser(token,email){
      return userinfo.update({ token: token }, { where: { email: email } })
    }

    static getManagers(company_id){
      return userinfo.findAll({ where: { role: 2 , company_id : company_id}, attributes: ['user_id', 'name'] })
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
    profile: DataTypes.STRING,
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // or allowNull: true if it is optional
    },
  }, {
    sequelize,
    modelName: 'userinfo',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return userinfo;
};




