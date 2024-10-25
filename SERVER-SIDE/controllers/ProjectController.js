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
const service = require('../services/service')
const jwt = require('jsonwebtoken')
const authIslogin = require('../middlewares/authIslogin');
const { SERIALIZABLE } = require('sequelize/lib/table-hints');
// const { Socket } = require('socket.io');

// this method: Adds a new project by Super Admin


const addNewProject = async (req, res) => {
   
    
    try {
        const userdata = res.locals.user;
        const { user_id,company_id } = userdata;
        console.log('companyid: ',company_id);
        const result = await project.createProject(req.body, user_id,company_id);
        console.log('result: ',result);
        if (result != null) {
            // here i want to emit the event ! 
            
            const manager_id = req.body.manager_id ;
            // const socket = req.users.get(manager_id)
            console.log(manager_id)
            // console.log('socket socket',socket)
            console.log(req.users)
            // if( socket ){
                
            //     socket.emit('alert',`Project: ${req.body.project_name} assigned to you!!`)
            // }
            // insert this in notification table ! 
            await notification.create({
                user_id : manager_id ,
                notification : `Project: ${req.body.project_name} assigned to you by admin`,
                read : 0 ,
                company_id:company_id
            })
            await notification.create({
                user_id : user_id,
                notification : `You added a new project: ${req.body.project_name}`,
                read : 0 ,
                company_id:company_id
            })

            service.successRetrievalResponse(res, 'project created succesfully')
        } else {
            service.failRetrievalResponse(res, 'project cannot be created')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Retrieves a particular project's details
const projectDetailByproject_id = async (req, res) => {
    try {
        // assuming I know my id, name user_id = 1 
        const userdata = res.locals.user;
        const {company_id} = userdata;

        const {project_id} = req.params;
        // const manager_id = 1
        const result = await project.getProjectDetails(userinfo, project_id,company_id)
        service.successRetrievalResponse(res, 'project details retrieved', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Retrieves the number of members(Employees) in a project
const memberByproject_id = async (req, res) => {
    try {
        const userdata = res.locals.user;
        const {company_id} = userdata;
        
        const project_id = req.params.project_id
        const result = await project.getProjectMembers(assignment, userinfo, project_id,company_id);
        // console.log('project members',result);
       const mp = {};
         for( let project_member in result[0].assignments ){
            const user_id = result[0]?.assignments[project_member].user_id;
            const query = `
            SELECT user_id, project_id,
                    SUM(CASE WHEN logstatus = 'approved' THEN 1 ELSE 0 END) AS approved_count,
                    SUM(CASE WHEN logstatus = 'pending' THEN 1 ELSE 0 END) AS pending_count,
                    SUM(CASE WHEN logstatus = 'rejected' THEN 1 ELSE 0 END) AS rejected_count
            FROM logs
            WHERE user_id = :userId AND project_id = :projectId
            GROUP BY user_id, project_id;
            `;

            const results = await db.sequelize.query(query, {
                replacements: { userId: user_id, projectId: project_id },
                type: QueryTypes.SELECT
            });
            // console.log(`user_id>>>>>>>>>>>`,results);
            if( results?.length != 0){
                mp[results[0].user_id] = results[0];
            }
         }
        // formatting the data !
        for( let assignment in result[0].assignments){
            if( result[0]?.assignments[assignment]?.userinfo?.dataValues){
                // console.log('>`>>>>>>>>>>>>', result[0]?.assignments[assignment]?.userinfo?.dataValues);
                result[0].assignments[assignment].userinfo.dataValues.logtrack = mp[result[0].assignments[assignment].userinfo.dataValues.user_id];
            }
           
        }

        service.successRetrievalResponse(res, 'project members retrieved', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Updates the Project-Status
const updateProjectStatus = async (req, res) => {
    try {
         const userdata = res.locals.user;
         const {company_id}=userdata;
        const result = await project.updateProjectStatus(req.params, req.body,company_id)
        if (result != null) {
            service.successRetrievalResponse(res, 'project updated')
        } else {
            service.failRetrievalResponse(res, 'project status not updated')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Retrieves all the projects in which a person with user_id is involved
const getProjectBymanager_id = async (req, res) => {
    try {
        const userdata = res.locals.user;
        const { user_id, name, role ,company_id} = userdata
        let query = {
            include: [{ model: userinfo, attributes: ['name'] }],
        }
        if (role == 1 || role == 2) {
            if( role == 1){
                query.where = { company_id};
            }
            if (role == 2) {
                // where condition - manager_id = user_id
                query.where = { manager_id: user_id , company_id:company_id};
            }
            const result = await project.findAll(query);
            console.log('result',result);
            service.successRetrievalResponse(res, 'projects retrieved', result)
        } else if (role == 3) {
            // user hasMany assignments, ass belongs to a project
            const result = await project.employeeFindAll(userinfo, assignment, user_id,company_id)
            service.successRetrievalResponse(res, 'project data retrieved', result)
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Retrieves the project-details based on status i.e pending, completed
const getProjectByStatus = async (req, res) => {
    const status = req.query.sortby;
    try {
        const userdata = res.locals.user
        const { user_id, name, role } = userdata
        let result;
        let query = {
            include: [{ model: userinfo, attributes: ['name'] }],
            where: {
                // manager_id: user_id,
                status: status
            }
        }
        if (role == 1 || role == 2) {
            if (role == 2) {
                query.where.manager_id = user_id
            }
            result = await project.findAll(query)
        } else {
            result = await project.employeeProjectByStatus(userinfo, user_id, status)
        }
        service.successRetrievalResponse(res, 'projects retrieved', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Retrieves the project-details based on ordering
const getProjectByOrder = async (req, res) => {
    const orderby = req.query.orderby
    try {
        let result;
        const userdata = res.locals.user
        const { user_id, role } = userdata
        let query = {
            include: [{ model: userinfo, attributes: ['name'] }],
            order: []
        }
        if (role == 1 || role == 2) {
            if (role == 2) {
                query.where = {
                    manager_id: user_id
                }
            }
        } else {
            query.include[1] = {
                model: assignment,
                where: {
                    user_id: user_id
                },
                attributes: ['created_at', 'updated_at']
            }
        }
        if (orderby != '') {
            if (orderby == 'casc') { query.order[0] = ['created_at', 'ASC'] }
            else if (orderby == 'cdesc') { query.order[0] = ['created_at', 'DESC'] }
            else if (orderby == 'uasc') { query.order[0] = ['updated_at', 'ASC'] }
            else if (orderby == 'udesc') { query.order[0] = ['updated_at', 'DESC'] }
            result = await project.findAll(query)
        }
        service.successRetrievalResponse(res, 'Projects in order retrieved', result)

    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: 'some error occured try again later',
        })
    }
}

// this method: Retrieves the specific project, based on search-value
const getProjectByproject_name = async (req, res) => {

    try {
        const { user_id, role } = res.locals.user
        const project_name = req.query.val
        const result = await project.getProjectByProjectName(userinfo, project_name, user_id, assignment, role)
        service.successRetrievalResponse(res, 'data retrieved succesfully', result)
    } catch (error) {
        console.log(error)
    }
}

// this method: Retrieves all the managers only 
const getManagers = async (req, res) => {
    try {
        const userdata = res.locals.user ;
        const {company_id} = userdata;
        const result = await userinfo.getManagers(company_id);
        if (result != null) {
            service.successRetrievalResponse(res, 'manager retrieved', result)
        } else {
            service.failRetrievalResponse(res, 'cannot retrieve data')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

// this method: Retrieves all the Employees who are not assigned in a particular project
const getMemberByproject_idNotInvolved = async (req, res) => {
    try {
        const userdata = res.locals.user;
        const {company_id} = userdata;
        const project_id = req.params.project_id
        const result = await db.sequelize.query(`
            SELECT t.* 
            FROM (
                SELECT u.user_id, u.name, COUNT(a.user_id) AS ct 
                FROM userinfos u 
                LEFT JOIN assignments a 
                ON u.user_id = a.user_id 
                WHERE u.role = 3 
                AND u.company_id = ? 
                GROUP BY u.user_id 
                ORDER BY a.user_id
            ) t 
            WHERE t.user_id NOT IN (
                SELECT user_id 
                FROM assignments 
                WHERE project_id = ? 
                AND company_id = ?
            )
        `, {
            replacements: [company_id, project_id, company_id],
            type: QueryTypes.SELECT,
        });
        service.successRetrievalResponse(res, 'retrieved members not involved in a project', result)
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}



module.exports = {
    addNewProject,
    projectDetailByproject_id,
    memberByproject_id,
    updateProjectStatus,
    getProjectBymanager_id,
    getProjectByStatus,
    getProjectByOrder,
    getProjectByproject_name,
    getManagers,
    getMemberByproject_idNotInvolved
}