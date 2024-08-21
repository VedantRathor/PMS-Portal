'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance_management extends Model {

    static markattendance({ which_date , check_in , check_out , total_hours, attendance_type , user_id }){
      return attendance_management.create({
        user_id : user_id,
        which_date : which_date,
        check_in : check_in,
        check_out : check_out,
        total_hours : total_hours,
        attendance_type : attendance_type,
        status : 'pending',
      });
    }

  }
  attendance_management.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    which_date: DataTypes.DATE,
    check_in: DataTypes.TIME,
    check_out: DataTypes.TIME,
    total_hours: DataTypes.FLOAT,
    attendance_type :DataTypes.STRING,
    status: DataTypes.STRING,
    approved_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attendance_management',
     createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return attendance_management;
};