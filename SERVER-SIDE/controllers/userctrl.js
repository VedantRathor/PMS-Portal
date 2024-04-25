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
const authIslogin = require('../middlewares/authIslogin')



const adduser = async (req, res) => {
    try {
        const { email , password , ucpassword} = req.body
       
        // FindUser - finds the user if having email already
        const emailExists = await userinfo.FindUser(email)
        if (emailExists == null) {
            if (password === ucpassword) {
                const token =  service.generateToken(email)
                // create user 
                const result = await userinfo.createUser(req.body,token)
                // send full response to the client exluding email password 
                service.successRetrievalResponse(res, 'user registered', result)
            } else {
                service.failRetrievalResponse(res, 'user cannot be registered')
            }
        } else {
            service.failRetrievalResponse(res, 'user already exists')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

const addProject = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const result = await project.create(data)
        res.status(201).json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

const getProjectBymanager_id = async (req, res) => {
    try {
        // assuming manager_id to be 3 
        const userdata = res.locals.user
        const { user_id, name, role } = userdata
        let query = {
            include: [{ model: userinfo, attributes: ['name'] }],
        }
        if (role == 1 || role == 2) {

            if (role == 2) {
                // where condition - manager_id = user_id
                query.where = { manager_id: user_id }
            }
            const result = await project.findAll(query)
            res.json({
                status: 'success',
                msg: 'data retrieved',
                result: result
            })
        } else if (role == 3) {
            // user hasMany assignments, ass belongs to a project
            const result = await project.findAll({
                required: true,
                include: [
                    {
                        model: userinfo,
                        attributes: ['name']
                    },
                    {
                        model: assignment,
                        where: {
                            user_id: user_id
                        },
                        attributes: ['created_at', 'updated_at']
                    }

                ],

            })
            console.log(result)
            res.json({
                status: 'success',
                msg: 'data retrieved succesfully',
                result: result
            })
        } else {
            res.json({
                status: 'unsuccess',
                msg: "You do not have access to this!"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const assignMembers = async (req, res) => {
    try {
        const userdata = res.locals.user
        const assigner = userdata.user_id

        if (userdata != null && (userdata.role == 1 || userdata.role == 2)) {
            const result = await assignment.createAssignment(req.body, assigner)
            service.successRetrievalResponse(res, 'assigned succesfully', result)
        } else {
            service.failRetrievalResponse(res, 'cannot be assigned')
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

const getProjectDetailsBymanager_id = async (req, res) => {
    try {
        const projectdetails = await service.getProjectDetails()
        res.json(projectdetails)
    } catch (error) {
        console.log(error)
    }
}

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

const getTaskByProject = async (req, res) => {
    try {
        // assuming the manager id is 1, that is manager_id = 1
        const result = await project.findAll({
            include: [{
                model: task,
                required: true,
                include: [{
                    model: userinfo
                }]
            }],
            where: {
                manager_id: 1
            }
        })
        res.status(201).json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

const addLog = async (req, res) => {
    try {
        const data = req.body;
        const result = await log.create(data)
        res.status(201).json({
            status: 'success',
            msg: 'log added succesfully',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

const projectDetailByproject_id = async (req, res) => {
    try {
        // assuming I know my id, name user_id = 1 
        const project_id = req.params.project_id
        // const manager_id = 1

        const result = await project.findAll({
            include: [{
                model: userinfo,
            }],
            where: {
                project_id: project_id,
                // manager_id: manager_id
            }

        })
        res.status(200).json({
            msg: 'success',
            result: result
        })

    } catch (error) {
        console.log(error)
    }
}

const taskByproject_id = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata
        const project_id = req.params.project_id
        const val = req.query.val


        const query = {
            include: [{
                model: task,

                include: [{
                    model: userinfo,

                }],

            }],
            where: {
                project_id: project_id
            }
        };

        if (val == 'pending' || val == 'completed') {
            query.include[0].where = {
                status: val
            }
        }


        const result = await project.findAll(query)
        res.status(200).json({
            msg: 'success',
            result: result

        })
    } catch (error) {
        console.log(error)
    }
}

const taskBySearchQuery = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id, role } = userdata
        const task_name = req.query.query
        const project_id = req.params.project_id
        const result = await project.findAll({
            include: [{
                model: task,
                where: {
                    task_name: {
                        [Op.like]: `%${task_name}%`
                    }
                },
                include: [{
                    model: userinfo
                }]
            }],
            where: {
                project_id: project_id
            }
        })

        res.json({
            status: 'success',
            msg: 'data retrieved succesfully',
            result: result
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: 'server-error'
        })
    }
}

const memberByproject_id = async (req, res) => {
    try {
        // const manager_id = 1; // assumingthe manager_id is to be 1 
        const project_id = req.params.project_id
        const result = await project.findAll({
            include: [{
                model: assignment,
                required: true,
                include: [{
                    model: userinfo
                }]
            }],
            where: {
                project_id: project_id,
                // manager_id: manager_id
            }
        })
        console.log(result)
        res.status(200).json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

const logByproject_id = async (req, res) => {
    try {

        const project_id = req.params.project_id;
        const result = await project.findAll({
            include: [{
                model: task,
                include: [{
                    model: log,
                    order: [['created_at', 'DESC']], // Order by created_at field of log model
                    limit: 2,
                    include: [{
                        model: userinfo
                    }],


                }]
            }],
            where: {
                project_id: project_id,

            },

        });

        res.status(200).json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

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
        } else if (role == 3) {

            // let query2 = {
            //     include : [{
            //         model : assignment,
            //         where : {
            //             user_id : user_id
            //         },
            //         include : [
            //             {
            //                 model : task,
            //                 include : [{
            //                     model : userinfo
            //                 }]
            //             }
            //         ]
            //     }]
            // }
        }

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

        res.status(200).json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

const loginUserByEmailPass = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailExists = await userinfo.FindUser(email)

        if (emailExists != null) {
            // check for password ! 
            if (password == emailExists.password) {
                // generate token 
                const token = service.generateToken(email)
                // update it 
                await userinfo.updateUser(token, emailExists.email)
                let result = emailExists
                service.successRetrievalResponse(res, 'login succesful', result)

            } else {
                service.failRetrievalResponse(res, 'passwords not matched')
            }
        } else {
            service.failRetrievalResponse(res, 'email doesnot exists')
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

const getMemberByproject_idNotInvolved = async (req, res) => {
    try {
        const project_id = req.params.project_id
        const result = await db.sequelize.query('select t.* from (select u.user_id , u.name , count(a.user_id) as ct from userinfos u left join assignments a on u.user_id = a.user_id WHERE u.role = 3 group by (u.user_id) order by a.user_id) t where t.user_id not in (select user_id from assignments where project_id = ?)', {
            replacements: [project_id],
            type: QueryTypes.SELECT,
        })
        console.log(result)
        res.json({
            status: 'success',
            msg: 'data retrieved succesfully',
            result: result
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: 'cannot get data'
        })
    }
}

const getProjectByStatus = async (req, res) => {
    const status = req.query.sortby;
    try {
        // assuming manager_id to be 3 
        const userdata = res.locals.user
        const { user_id, name, role } = userdata
        let result;
        if (role == 1) {
            result = await project.findAll({
                include: [{ model: userinfo, attributes: ['name'] }],
                where: {
                    // manager_id: user_id,
                    status: status
                }
            })
        } else if (role == 2) {
            result = await project.findAll({
                include: [{ model: userinfo, attributes: ['name'] }],
                where: {
                    manager_id: user_id,
                    status: status
                }
            })
        } else {
            result = await project.findAll({
                required: true,
                include: [
                    {
                        model: userinfo,
                        attributes: ['name']
                    },
                    {
                        model: assignment,
                        where: {
                            user_id: user_id
                        },
                        attributes: ['created_at', 'updated_at']
                    }

                ],
                where: {
                    status: status
                }
            })
        }

        res.json({
            status: 'success',
            msg: 'data retrieved',
            result: result
        })


    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: "Server-Error!"
        })

    }
}

//completed for all
const getProjectByOrder = async (req, res) => {
    const orderby = req.query.orderby
    console.log(orderby)

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


        res.json({
            status: 'success',
            msg: 'data retrieved',
            result: result
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: 'some error occured try again later',
        })
    }
}

const getProjectByproject_name = async (req, res) => {

    try {
        const { user_id, role } = res.locals.user
        const project_name = req.query.val

        let query = {
            include: [{ model: userinfo, attributes: ['name'] }],
            where: {
                // manager_id: user_id,
                project_name: {
                    [Op.like]: `%${project_name}%`
                }
            }
        }
        if (role == 2) {
            query.where.manager_id = user_id
        } else if (role == 3) {
            query.include[1] = {
                model: assignment,
                where: {
                    user_id: user_id
                },
                attributes: ['created_at', 'updated_at']
            }
        }


        const result = await project.findAll(query)

        res.json({
            status: 'success',
            msg: 'data retrieved succesfully',
            result: result
        })

    } catch (error) {
        console.log(error)
    }
}

const updateLogStatus = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata
        const { log_id, logstatus } = req.body

        // update logstatus = logstatus and logmanager_id = user_id where log_id = log_id 
        const result = await log.update({ logstatus: logstatus, approved_by: user_id }, { where: { log_id: log_id } })
        if (result != null) {
            res.json({
                status: 'success',
                msg: 'updated succesfully',
                result: result
            })
        } else {
            res.json({
                status: 'unsuccess',
                msg: 'Some Error Occured, Try again later'
            })
        }

    } catch (error) {
        console.log('updateLogStatus-error', error)
        res.json({
            status: 'unsuccess',
            msg: 'Some Error Occured, Try again later'
        })
    }
}

const updateTaskStatus = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id } = userdata;
        // now we do not have field in task database to record , who has updated this, whether a manager or super admin
        const result = await task.updateTaskStatus(req.body,user_id)
        if (result != null) {
           service.successRetrievalResponse(res,'task updated succesfully')
        } else {
            service.failRetrievalResponse(res,'task cannot be updated')
        }
    } catch (error) {
        console.log('updateLogStatus-error', error)
            service.serverSideError(res)
    }
}

const addLogInproject_idAndtask_id = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { user_id, role } = userdata

        const result = await log.createLog(req.params, req.body, user_id)
        if (result != null) {
            service.successRetrievalResponse(res, 'log posted')
        } else {
            service.failRetrievalResponse(res, 'log cannot be posted')
        }
    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}

const updateProjectStatus = async (req, res) => {
    try {

        const result = await project.updateProjectStatus(req.params, req.body)
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

const getManagers = async (req, res) => {
    try {
        const result = await userinfo.findAll({ where: { role: 2 }, attributes: ['user_id', 'name'] })
        if (result != null) {
            res.json({
                status: 'success',
                msg: 'manager Data retrieved',
                result: result
            })
        } else {
            res.json({
                status: 'unsuccess',
                msg: 'failed Data retrieved',
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: 'server-error',
        })
    }
}

const addNewProject = async (req, res) => {
    const userdata = res.locals.user
    console.log(userdata)
    const { user_id } = userdata
    try {

        const result = await project.createProject(req.body, user_id)
        if (result != null) {
            service.successRetrievalResponse(res, 'project created succesfully')
        } else {
            service.failRetrievalResponse(res, 'project cannot be created')
        }

    } catch (error) {
        console.log(error)
        service.serverSideError(res)
    }
}







async function UpdateDetails(req, res) {

    const { name, email, password, confirmpassword, id } = req.body;
    const profile = req.file ? req.file.path : "No File";
    console.log(profile);
    const response = await userinfo.update({ name: name, email: email, password: password, updated_at: new Date(), profile: profile }, { where: { user_id: id } });

    if (response) {
        res.status(200).json({ status: "success", message: "Profile Updated", response })
    }
    else {
        console.log("Error in Updating User Data");
    }
}

module.exports = {
    adduser,
    addProject,
    getProjectBymanager_id,
    assignMembers,
    getProjectDetailsBymanager_id,
    createTask,
    getTaskByProject,
    addLog,
    projectDetailByproject_id,
    taskByproject_id,
    memberByproject_id,
    logByproject_id,
    logByproject_idAndtask_id,
    loginUserByEmailPass,
    getMemberByproject_idNotInvolved,
    getProjectByStatus,
    getProjectByOrder,
    getProjectByproject_name,
    updateLogStatus,
    updateTaskStatus,
    taskBySearchQuery,
    addLogInproject_idAndtask_id,
    updateProjectStatus,
    getManagers,
    addNewProject,
    UpdateDetails
}