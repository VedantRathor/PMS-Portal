'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
   
  }

  Company.init({
    company_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_registration_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    company_unique_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    admin_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    deleted_at: {
      type: DataTypes.DATE
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admin_id : {
      type: DataTypes.INTEGER,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'company',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Company;
};
