const { Model, QueryTypes, where } = require('sequelize')
const express = require('express');
const db = require('../models/index')
const { Op } = require('sequelize')
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.task
const log = db.log
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');
const { read } = require('pdfkit');
const notification = db.notification

// This Method: Used to ADD a Log in a particular task of a project by the Employee only.
const addLogInproject_idAndtask_id = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id, role,name } = userdata

        const result = await log.createLog(req.params, req.body, user_id)
        if (result != null) {
            service.successRetrievalResponse(res, 'log posted')
            const taskdetails = await project.findAll({
                include: [{
                    model: task,
                    where: {
                        task_id: req.params.task_id
                    }
                }
                ]
            })
            // get all the users who are assigned in this project
            // get all the admins 
            // get the manager 
            const allUsers = await userinfo.findAll({
                require : true,
                include:[{
                    model:assignment,
                    attributes : [],
                    where:{
                        project_id : req.params.project_id 
                    }
                }],
                attributes:['user_id']
            }) ;
            const allAdmins = await userinfo.findAll({where:{role:1},attributes:['user_id']}) ;
            const manager = await project.findAll({
                include : [{
                    model : userinfo,
                    attributes:['user_id']
                }],
                where:{
                    project_id : req.params.project_id
                }
            })

            allUsers.map(async(eachUser)=>{
             if( eachUser.user_id == user_id ){
                await notification.create({
                    user_id : eachUser.user_id,
                    notification : `You added a new log in Project: ${taskdetails[0].project_name} under Task: ${taskdetails[0].tasks[0].task_name}`,
                    read:0
                })
             } else{
                await notification.create({
                    user_id : eachUser.user_id,
                    notification : `${name} added a new log in Project: ${taskdetails[0].project_name} under Task: ${taskdetails[0].tasks[0].task_name}`,
                    read:0
                })
               
             }
            })

            allAdmins.map(async(eachAdmin)=>{
                await notification.create({
                    user_id : eachAdmin.user_id,
                    notification : `${name} added a new log in Project: ${taskdetails[0].project_name} under Task: ${taskdetails[0].tasks[0].task_name}`,
                    read : 0 
                })
            })

            await notification.create({
                user_id : manager[0].userinfo.user_id,
                notification : `${name} added a new log in Project: ${taskdetails[0].project_name} under Task: ${taskdetails[0].tasks[0].task_name}`,
                read : 0 
            })

        } else {
            service.failRetrievalResponse(res, 'log cannot be posted')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// This Method: Used to UPDATE a Log's status by Super-Admin or Manager
const updateLogStatus = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata
        // update logstatus = logstatus and logmanager_id = user_id where log_id = log_id 
        const result = await log.updateLogStatus(req.body, user_id)
        if (result != null) {
            service.successRetrievalResponse(res, 'log updated succesfully')
        } else {
            service.failRetrievalResponse(res, 'log cannot be updated')
        }

    } catch (error) {
        console.log('updateLogStatus-error', error)
        service.serverSideError(res)
    }
}

// This Method: Retrieves all the Logs in a particular project
const logByproject_id = async (req, res) => {
    try {

        const project_id = req.params.project_id;
        const limit = 2
        const result = await log.getLogsByProjectIdWithLimit(project, task, log, userinfo, project_id, limit)
        service.successRetrievalResponse(res, 'logs for a project retrieved', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

const allLogs = async (req, res) => {
    try {

        const project_id = req.params.project_id;
        const status = req.params.status
        const sortby = req.params.sortby
        const searchBy = req.query.searchBy
        const result = await log.getAllLogs(project, task, log, userinfo, project_id, status, sortby, searchBy)
        //    console.log(result)
        service.successRetrievalResponse(res, 'logs for a project retrieved', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// This Method: Retrieves all the logs in a particular task of a project
const logByproject_idAndtask_id = async (req, res) => {

    try {
        const userdata = res.locals.user
        const { user_id, role } = userdata
        const project_id = req.params.project_id
        const task_id = req.params.task_id
        let query = {
            include: [{
                model: task,
                include: [
                    {
                        model: log,
                        include: [{
                            model: userinfo
                        }],

                    }
                ]
            }],
            where: {
                // manager_id: user_id,
                project_id: project_id
            }
        };

        if (role == 2) {
            //manager
            query.where.manager_id = user_id
        }
        // TODO : else role == 3 pending

        // Conditionally add the where clause for task based on the value of task_id
        if (task_id != 0) {
            query.include[0].where = {
                task_id: task_id
            };
        }


        if (req.query.selectedVal == 'pending' || req.query.selectedVal == 'approved' || req.query.selectedVal == 'rejected') {
            console.log('iam undefine and inside')
            if (!query.include[0].include[0].where) {
                query.include[0].include[0].where = {};
            }
            query.include[0].include[0].where.logstatus = req.query.selectedVal;
        } else if (req.query.selectedVal == 'your') {
            // filter the log where user_id = user_id
            query.include[0].include[0].where = {
                user_id: user_id
            }
        }

        const result = await project.findAll(query);
        service.successRetrievalResponse(res, 'retrieved logs in a task', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

module.exports = {
    addLogInproject_idAndtask_id,
    updateLogStatus,
    logByproject_id,
    logByproject_idAndtask_id,
    allLogs
}