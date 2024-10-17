const { Model, QueryTypes, where } = require('sequelize')
const express = require('express');
const db = require('../models/index')
const { Op } = require('sequelize')
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.task
const log = db.log
const notification = db.notification
const attendance_management = db.attendance_management;
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');
const { Socket } = require('socket.io');



const markAttendance = async(req,res) =>{
    try {
        const { which_date , check_in , check_out , total_hours, attendance_type , user_id } = req.body;
        // find that on this date, for this user, already data present or not 
        let isPresent = await attendance_management.checkDataEntry(req.body);
        if( isPresent == null || isPresent == undefined ){
            const result = await attendance_management.markattendance(req.body);
            if (result != null && result != undefined) service.successRetrievalResponse(res, 'attendance marked succesfully');
            else service.failRetrievalResponse(res, 'attendance cannot be marked');
        }else{
            // update it 
            const result = await attendance_management.updateAttendance(req.body);
            if (result != null && result != undefined) service.successRetrievalResponse(res, 'attendance marked updated succesfully');
            else service.failRetrievalResponse(res, 'attendance cannot be updated');
        }
        
    } catch (error) {
        console.log(error);
        service.serverSideError(res);
    }
   
}

const getAttendance = async(req,res) =>{
    try {
       const userdata = res.locals.user;
        const { user_id, name, role } = userdata; 
       
        let result = await attendance_management.get_all_attendance(user_id);
        res.json({
            result : result ,
            status : 'success' 
        })
    } catch (error) {
        console.log(error);
        service.serverSideError(res);
    }
}

module.exports = {
    markAttendance,
    getAttendance
};