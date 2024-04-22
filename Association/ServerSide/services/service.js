const { Model } = require('sequelize')
const db = require('../models/index')
const userinfo = db.userinfo 
const project = db.project 
const assignment = db.assignment 
const task = db.task 
const log = db.log 

const getProjectDetails = async()=>{
    console.log('hey')
    const result = await project.findAll({
        include:[{
            model : assignment,
            
            include:[{
                model : userinfo
            }]
        }],
        where : {
            mid : 1 
        }
    })
    function groupInfoByProject(data) {
        return data.reduce((acc, obj) => {
            const { pid, pname, pdesc, mid, created_by, status,createdAt,updatedAt, assignments, ...user } = obj; // Extract project info, user info, assignments
            if (!acc[pid]) {
                acc[pid] = { project: { pid, pname, pdesc, mid, created_by, status,createdAt,updatedAt }, names: [], tasks: [], allusers: [] };
            }
            assignments.forEach(assignment => {
                const { userinfo } = assignment;
                acc[pid].names.push({ uid: userinfo.uid, uname: userinfo.uname });
            });
            return acc;
        }, {});
    }
    
    // Group project info, user names, tasks, and all users by project
    const infoByProject = groupInfoByProject(result);
    
    const taskResult =  await project.findAll({
        include:[{
            model : task,
            required: true,
            include:[{
                model : userinfo
            }]
        }],
        where : {
            mid : 1 
        }
    })

   function taskMerging(infoByProject,taskData ){
             taskData.forEach( data => {
                if( infoByProject[data.pid]){
                    data.tasks.forEach( eachTask =>{
                        const { tid , pid ,created_by, tname,tdesc,status,createdAt,updatedAt, userinfo} = eachTask
                        infoByProject[data.pid].tasks.push({
                            tid,pid,created_by, tname,tdesc,status,createdAt,updatedAt,uname:userinfo.uname
                        })
                    })
                }
             })
   }
   taskMerging(infoByProject,taskResult)
   console.log(infoByProject)
   return infoByProject
}

const successRetrievalResponse = (result) =>{
    return {
        status : 'success',
        msg : 'data retrieved',
        result : result 
    }
}

const serverSideError = () =>{
    return {
        status : 'unsuccess',
        msg : 'Server-side Error. Try again later.'
    }
}

module.exports = {
    getProjectDetails,
    successRetrievalResponse,
    serverSideError
}