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
            manager_id : 1 
        }
    })
    function groupInfoByProject(data) {
        return data.reduce((acc, obj) => {
            const { project_id, project_name, project_details, manager_id, created_by, status,createdAt,updatedAt, assignments, ...user } = obj; // Extract project info, user info, assignments
            if (!acc[project_id]) {
                acc[project_id] = { project: { project_id, project_name, project_details, manager_id, created_by, status,createdAt,updatedAt }, names: [], tasks: [], allusers: [] };
            }
            assignments.forEach(assignment => {
                const { userinfo } = assignment;
                acc[project_id].names.push({ user_id: userinfo.user_id, user_name: userinfo.user_name });
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
            manager_id : 1 
        }
    })

   function taskMerging(infoByProject,taskData ){
             taskData.forEach( data => {
                if( infoByProject[data.project_id]){
                    data.tasks.forEach( eachTask =>{
                        const { task_id , project_id ,created_by, task_name,task_details,status,createdAt,updatedAt, userinfo} = eachTask
                        infoByProject[data.project_id].tasks.push({
                            task_id,project_id,created_by, task_name,task_details,status,createdAt,updatedAt,user_name:userinfo.user_name
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