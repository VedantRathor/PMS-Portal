const { Model, QueryTypes, where } = require('sequelize')
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
        const { uname, upassword, ucpassword, uemail, urole, created_by } = req.body
        // check uemail already exisits or not! 
        const emailExists = await userinfo.findOne({ where: { uemail: uemail } })
        if (emailExists == null) {
            if (upassword === ucpassword) {
                const token = jwt.sign({ uemail: uemail }, 'mynameisvedantrathore', {
                    expiresIn: '2h'
                })
                // create user 
                const result = await userinfo.create({
                    uname: uname,
                    upassword: upassword,
                    uemail: uemail,
                    urole: urole,
                    created_by: created_by,
                    token: token
                })
                // send full response to the client exluding email password 
                res.status(201).json({
                    status: 'success',
                    msg: 'succesfully registered',
                    result: {
                        uid: result.uid,
                        uname: result.uname,
                        urole: result.urole,
                        created_by: 'Admin',
                        token: result.token,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt
                    }
                })
            } else {
                res.json({
                    status: 'unsuccess',
                    msg: 'password not matching'
                })
            }
        } else {
            res.json({
                status: 'unsuccess',
                msg: 'user already exists'
            })
        }
    } catch (error) {
        console.log(error)
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

const getProjectByMid = async (req, res) => {
    try {
        // assuming mid to be 3 
        const userdata = res.locals.user
        const { uid, uname, urole } = userdata
        let query = {
            include: [{ model: userinfo, attributes: ['uname'] }],
        }
        if (urole == 1 || urole == 2) {

            if (urole == 2) {
                // where condition - mid = uid
                query.where = { mid: uid }
            }
            const result = await project.findAll(query)
            res.json({
                status: 'success',
                msg: 'data retrieved',
                result: result
            })
        } else if (urole == 3) {
            // user hasMany assignments, ass belongs to a project
            const result = await project.findAll({
                required: true,
                include: [
                    {
                        model: userinfo,
                        attributes: ['uname']
                    },
                    {
                        model: assignment,
                        where: {
                            uid: uid
                        },
                        attributes: ['createdAt', 'updatedAt']
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
        // get the mid from middle ware! 
        const userdata = res.locals.user

        if (userdata != null && (userdata.urole == 0 || userdata.urole == 2)) {
            const mid = userdata.uid
            const { pid, uid } = req.body
            const result = await assignment.create({
                pid: pid,
                uid: uid,
                mid: mid
            })
            res.status(201).json({
                status: 'success',
                msg: 'Members Assigned Successfully',
                result: result
            })
        } else {

            res.json({
                status: 'unsuccess',
                msg: 'token not found or access denied'
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            status: 'unsuccess',
            msg: 'token not found or access denied'
        })
    }
}

const getProjectDetailsByMid = async (req, res) => {
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
        const { uid } = userdata

        const { pid, tname, tdesc } = req.body
        const result = await task.create({
            pid: pid,
            created_by: uid,
            tname: tname,
            tdesc: tdesc,
            status: 'pending'
        })
        console.log('task added', result)
        res.status(201).json({
            msg: 'success',
            result: result
        })
    } catch (error) {
        console.log(error)
    }
}

const getTaskByProject = async (req, res) => {
    try {
        // assuming the manager id is 1, that is mid = 1
        const result = await project.findAll({
            include: [{
                model: task,
                required: true,
                include: [{
                    model: userinfo
                }]
            }],
            where: {
                mid: 1
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

const projectDetailByPid = async (req, res) => {
    try {
        // assuming I know my id, uname uid = 1 
        const pid = req.params.pid
        // const mid = 1

        const result = await project.findAll({
            include: [{
                model: userinfo,
            }],
            where: {
                pid: pid,
                // mid: mid
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

const taskByPid = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { uid } = userdata
        const pid = req.params.pid
        const val = req.query.val


        const query = {
            include: [{
                model: task,

                include: [{
                    model: userinfo,

                }],

            }],
            where: {
                pid: pid
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
        const { uid, urole } = userdata
        const tname = req.query.query
        const pid = req.params.pid
        const result = await project.findAll({
            include: [{
                model: task,
                where: {
                    tname: {
                        [Op.like]: `%${tname}%`
                    }
                },
                include: [{
                    model: userinfo
                }]
            }],
            where: {
                pid: pid
            }
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
            msg: 'server-error'
        })
    }
}

const memberByPid = async (req, res) => {
    try {
        // const mid = 1; // assumingthe mid is to be 1 
        const pid = req.params.pid
        const result = await project.findAll({
            include: [{
                model: assignment,
                required: true,
                include: [{
                    model: userinfo
                }]
            }],
            where: {
                pid: pid,
                // mid: mid
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

const logByPid = async (req, res) => {
    try {

        const pid = req.params.pid;
        const result = await project.findAll({
            include: [{
                model: task,
                include: [{
                    model: log,
                    order: [['createdAt', 'DESC']], // Order by createdAt field of log model
                    limit: 2,
                    include: [{
                        model: userinfo
                    }],


                }]
            }],
            where: {
                pid: pid,

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

const logByPidAndTid = async (req, res) => {

    try {
        const userdata = res.locals.user
        const { uid, urole } = userdata
        const pid = req.params.pid
        const tid = req.params.tid
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
                // mid: uid,
                pid: pid
            }
        };

        if (urole == 2) {
            //manager
            query.where.mid = uid
        } else if (urole == 3) {

            // let query2 = {
            //     include : [{
            //         model : assignment,
            //         where : {
            //             uid : uid
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

        // Conditionally add the where clause for task based on the value of tid
        if (tid != 0) {
            query.include[0].where = {
                tid: tid
            };
        }


        if (req.query.selectedVal == 'pending' || req.query.selectedVal == 'approved' || req.query.selectedVal == 'rejected') {
            console.log('iam undefine and inside')
            if (!query.include[0].include[0].where) {
                query.include[0].include[0].where = {};
            }
            query.include[0].include[0].where.logstatus = req.query.selectedVal;
        } else if (req.query.selectedVal == 'your') {
            // filter the log where uid = uid
            query.include[0].include[0].where = {
                uid: uid
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
        const { uemail, upassword } = req.body
        const emailExists = await userinfo.findOne({ where: { uemail: uemail } })

        if (emailExists != null) {
            // check for password ! 
            if (upassword === emailExists.upassword) {
                // generate token 
                const token = jwt.sign({ uemail: uemail }, 'mynameisvedantrathore', {
                    expiresIn: '2h'
                })
                // update it 
                await userinfo.update({ token: token }, { where: { uemail: emailExists.uemail } })
                let result = emailExists
                res.status(201).json({
                    status: 'success',
                    msg: 'succesfully registered',
                    result: {
                        uid: result.uid,
                        uname: result.uname,
                        urole: result.urole,
                        created_by: 'Admin',
                        token: result.token,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt
                    }
                })

            } else {
                res.json({
                    status: 'unsuccess',
                    msg: 'password not matched'
                })
            }
        } else {
            res.json({
                status: 'unsuccess',
                msg: 'email not found'
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getMemberByPidNotInvolved = async (req, res) => {
    try {
        const pid = req.params.pid
        const result = await db.sequelize.query('select t.* from (select u.uid , u.uname , count(a.uid) as ct from userinfos u left join assignments a on u.uid = a.uid WHERE u.urole = 3 group by (u.uid) order by a.uid) t where t.uid not in (select uid from assignments where pid = ?)', {
            replacements: [pid],
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
        // assuming mid to be 3 
        const userdata = res.locals.user
        const { uid, uname, urole } = userdata
        let result;
        if (urole == 1) {
            result = await project.findAll({
                include: [{ model: userinfo, attributes: ['uname'] }],
                where: {
                    // mid: uid,
                    status: status
                }
            })
        } else if (urole == 2) {
            result = await project.findAll({
                include: [{ model: userinfo, attributes: ['uname'] }],
                where: {
                    mid: uid,
                    status: status
                }
            })
        } else {
            result = await project.findAll({
                required: true,
                include: [
                    {
                        model: userinfo,
                        attributes: ['uname']
                    },
                    {
                        model: assignment,
                        where: {
                            uid: uid
                        },
                        attributes: ['createdAt', 'updatedAt']
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
        const { uid, urole } = userdata
        let query = {
            include: [{ model: userinfo, attributes: ['uname'] }],
            order: []
        }
        if (urole == 1 || urole == 2) {
            if (urole == 2) {
                query.where = {
                    mid: uid
                }
            }
        } else {
            query.include[1] = {
                model: assignment,
                where: {
                    uid: uid
                },
                attributes: ['createdAt', 'updatedAt']
            }
        }

        if (orderby != '') {
            if (orderby == 'casc') { query.order[0] = ['createdAt', 'ASC'] }
            else if (orderby == 'cdesc') { query.order[0] = ['createdAt', 'DESC'] }
            else if (orderby == 'uasc') { query.order[0] = ['updatedAt', 'ASC'] }
            else if (orderby == 'udesc') { query.order[0] = ['updatedAt', 'DESC'] }
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

const getProjectByPname = async (req, res) => {

    try {
        const { uid, urole } = res.locals.user
        const pname = req.query.val
        
        let query = {
            include: [{ model: userinfo, attributes: ['uname'] }],
            where: {
                // mid: uid,
                pname: {
                    [Op.like]: `%${pname}%`
                }
            }
        }
        if (urole == 2) {
            query.where.mid = uid
        } else if (urole == 3) {
            query.include[1] = {
                model: assignment,
                where: {
                    uid: uid
                },
                attributes: ['createdAt', 'updatedAt']
            }
        }

       
         const result = await project.findAll(query)
            console.log('data', result)
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
        const { uid } = userdata
        const { lid, logstatus } = req.body
        
        // update logstatus = logstatus and logmid = uid where lid = lid 
        const result = await log.update({ logstatus: logstatus, logmid: uid }, { where: { lid: lid } })
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
        const { uid } = userdata;
        // now we do not have field in task database to record , who has updated this, whether a manager or super admin
        const { tid, status } = req.body
        const result = await task.update({ status: status }, { where: { tid: tid } })
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

const addLogInPidAndTid = async (req, res) => {
    try {
        const userdata = res.locals.user
        const { uid, urole } = userdata
        const { pid, tid } = req.params
        const { logdata, estimatedTime } = req.body
        const result = await log.create({
            uid: uid,
            pid: pid,
            tid: tid,
            logdata: logdata,
            logstatus: 'pending',
            logmid: 0
        })
        if (result != null) {
            res.json({
                status: 'success',
                msg: 'log posted'
            })
        } else {
            res.json({
                status: 'unsuccess',
                msg: 'log cannot be posted'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateProjectStatus = async(req,res) =>{
    try {
        const {pid} = req.params 
        const {status} = req.body 
        const result = await project.update({
          status : status
        },{where:{
            pid : pid 
        }})
        if( result != null ){
            res.json({
                status : 'success',
                msg :'project updated succesfully'
            })
        }else{
            res.json({
                status : 'unsuccess',
                msg : 'some error occured'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status : 'unsuccess',
            msg : 'Server-side error'
        })
    }
}

module.exports = {
    adduser,
    addProject,
    getProjectByMid,
    assignMembers,
    getProjectDetailsByMid,
    createTask,
    getTaskByProject,
    addLog,
    projectDetailByPid,
    taskByPid,
    memberByPid,
    logByPid,
    logByPidAndTid,
    loginUserByEmailPass,
    getMemberByPidNotInvolved,
    getProjectByStatus,
    getProjectByOrder,
    getProjectByPname,
    updateLogStatus,
    updateTaskStatus,
    taskBySearchQuery,
    addLogInPidAndTid,
    updateProjectStatus
}