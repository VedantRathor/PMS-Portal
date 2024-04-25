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


// This Method: Used to create a task by Super-Admin, Manager, Employee
const createTask = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata
        const result = await task.createTask(req.body, user_id)
        service.successRetrievalResponse(res, 'task created', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// This Method: Used to update task-status by Super-Admin or the Manager
const updateTaskStatus = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata;
        // now we do not have field in task database to record , who has updated this, whether a manager or super admin
        const result = await task.updateTaskStatus(req.body, user_id)
        if (result != null) {
            service.successRetrievalResponse(res, 'task updated succesfully')
        } else {
            service.failRetrievalResponse(res, 'task cannot be updated')
        }
    } catch (error) {
        console.log('updateLogStatus-error', error)
        service.serverSideError(res)
    }
}

// This Method: Retrieves all the tasks in a project
const taskByproject_id = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata
        const project_id = req.params.project_id
        const val = req.query.val

        const result = await task.getTaskByProject(project, task, userinfo, project_id, val)
        service.successRetrievalResponse(res, 'tasks retrieved', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// This Method: Retrieves all task with a search-value
const taskBySearchQuery = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id, role } = userdata
        const task_name = req.query.query
        const project_id = req.params.project_id
        const result = await task.searchTaskInProject(project, task_name, userinfo, project_id)
        service.successRetrievalResponse(res, 'task retrieved succesfully', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}


module.exports = {
    createTask,
    updateTaskStatus,
    taskByproject_id,
    taskBySearchQuery
}