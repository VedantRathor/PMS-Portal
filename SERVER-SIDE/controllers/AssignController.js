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


// this method: Assigning the members in a project
const assignMembers = async (req, res) => {
    try {
        const userdata = res.locals.user
        const {company_id} = userdata;
        const assigner = userdata.user_id

        if (userdata != null && (userdata.role == 1 || userdata.role == 2)) {
            const result = await assignment.createAssignment(req.body, assigner,company_id);
            service.successRetrievalResponse(res, 'assigned succesfully', result)
        } else {
            service.failRetrievalResponse(res, 'cannot be assigned')
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

module.exports = {
    assignMembers
}