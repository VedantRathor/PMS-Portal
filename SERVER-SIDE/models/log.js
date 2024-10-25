'use strict';
const { Op } = require('sequelize')
const {
  Model,
  where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {

    static createLog(params, body, user_id,company_id) {
      const { project_id, task_id } = params
      const { logdata, start_time, end_time } = body
      return log.create({
        user_id: user_id,
        project_id: project_id,
        task_id: task_id,
        logdata: logdata,
        logstatus: 'pending',
        start_time: start_time,
        end_time: end_time,
        company_id:company_id
      })
    }

    static updateLogStatus(body, user_id,company_id) {
      const { log_id, logstatus } = body
      return log.update({ logstatus: logstatus, approved_by: user_id }, { where: { log_id: log_id,company_id:company_id } })
    }

    static getLogsByProjectIdWithLimit(project,task,log,userinfo,project_id,limit,company_id) {
      return project.findAll({
        include: [{
          model: task,
          include: [{
            model: log,
            order: [['created_at', 'DESC']], // Order by created_at field of log model
            // limit: limit,
            include: [{
              model: userinfo
            }],


          }]
        }],
        where: {
          project_id: project_id,
          company_id : company_id
        },

      });
    }
    // static async getAllLogs(project,task,log,userinfo,project_id,status,sortby,searchBy,company_id,user_id,role,assignment){
  
    //   let query = {
    //     include: [{
    //       model: task,
    //       include: [{
    //         model: log,

    //         // order: [['created_at', 'ASC']], // Order by created_at field of log model

    //         include: [{
    //           model: userinfo
    //         }],


    //       }]
    //     }],
    //     where : {
    //       company_id : company_id
    //     }


    //   }
      
    //   if( project_id != 0 && project_id != undefined ){
    //     query.where.project_id = project_id;
    //   }else{
    //     // get the list of projects i am assigned in
    //     if( role == 3 ){
    //       console.log('ASSIGNED TO:','uhk');
    //       const assigned_in = await project.employeeFindAll(userinfo, assignment, user_id,company_id);
    //       if( assigned_in && assigned_in.length != 0){
    //         const projectIds = assigned_in.map(project => project.project_id);
      
    //           // Apply the condition: WHERE project_id IN (p1, p2, p3)
    //           query.where.project_id = {
    //             [Op.in]: projectIds
    //           };
    //       }
    //     }

    //     if( role == 2 ) {
    //         // manager!
    //         let query_manager = {
    //           include: [{ model: userinfo, attributes: ['name'] }],
    //         };
            
    //         query_manager.where = { manager_id: user_id , company_id:company_id};
    //           const result = await project.findAll(query_manager);
    //           if( result && result.length != 0 ) {
    //             const projectIds = result.map(project => project.project_id);
    //               query.where.project_id = {
    //                 [Op.in]: projectIds
    //               };
    //           }
    //     }
        
        
    //   }
    //   if( status != 'n'){
    //         // query.include[0].include[0].order[0][1] = 'ASC'
         
    //         query.include[0].include[0].where={
    //           logstatus : status
    //         }
    //   }
      
    //   if( sortby != 0 ){
    //     let sorting = 'ASC'
    //     if( sortby == 1 ) sorting = 'DESC'
    //     query.include[0].include[0].separate=true,
    //     query.include[0].include[0].order[0] = ['created_at',sorting]
    //   }

    // //   task_name: {
    // //     [Op.like]: `%${task_name}%`
    // // }
    //   if( searchBy != '' && searchBy!= 'undefined'){
    //     query.include[0].include[0].include[0].where = {
    //       name : {
    //         [Op.like] : `%${searchBy}%`
    //       }
    //     }
    //   }

    //   return project.findAll(query);
    // }

    // static async getAllLogs(project, task, log, userinfo, project_id, status, sortby, searchBy, company_id, user_id, role, assignment) {
  
    //   let query = {
    //     include: [{
    //       model: task,
    //       include: [{
    //         model: log,
    //         include: [{
    //           model: userinfo
    //         }]
    //       }]
    //     }],
    //     where: {
    //       company_id: company_id
    //     }
    //   };
    
    //   // Handle project-based filtering logic
    //   if (project_id != 0 && project_id != undefined) {
    //     query.where.project_id = project_id;
    //   } else {
    //     if (role == 3) {
    //       const assigned_in = await project.employeeFindAll(userinfo, assignment, user_id, company_id);
    //       if (assigned_in && assigned_in.length != 0) {
    //         const projectIds = assigned_in.map(project => project.project_id);
    //         query.where.project_id = { [Op.in]: projectIds };
    //       }
    //     }
    
    //     if (role == 2) {
    //       let query_manager = {
    //         include: [{ model: userinfo, attributes: ['name'] }]
    //       };
    //       query_manager.where = { manager_id: user_id, company_id: company_id };
    //       const result = await project.findAll(query_manager);
    //       if (result && result.length != 0) {
    //         const projectIds = result.map(project => project.project_id);
    //         query.where.project_id = { [Op.in]: projectIds };
    //       }
    //     }
    //   }
    
    //   // Apply status filter
    //   if (status != 'n') {
    //     query.include[0].include[0].where = { logstatus: status };
    //   }
    
    //   // Apply search filter on log's `name` field
    //   if (searchBy && searchBy != '' && searchBy != 'undefined') {
    //     query.include[0].include[0].include[0].where = {
    //       name: { [Op.like]: `%${searchBy}%` }
    //     };
    //   }
    
    //   // Apply ordering at the very end based on `updated_at` of the log model
    //   if (sortby != 0) {
    //     let sorting = sortby == 1 ? 'DESC' : 'ASC';
        
    //     // Corrected order to directly sort by `log.updated_at`
    //     query.order = [
    //       ['log', 'updated_at', sorting]
    //     ];
    //   }
    
    //   return project.findAll(query);
    // }

    static async getAllLogs(project, task, log, userinfo, project_id, status, sortby, searchBy, company_id, user_id, role, assignment) {
  
      let query = {
        include: [{
          model: task,
          include: [{
            model: log,
            include: [{
              model: userinfo
            }]
          }]
        }],
        where: {
          company_id: company_id
        }
      };
    
      // Handle project-based filtering logic
      if (project_id != 0 && project_id != undefined) {
        query.where.project_id = project_id;
      } else {
        if (role == 3) {
          const assigned_in = await project.employeeFindAll(userinfo, assignment, user_id, company_id);
          if (assigned_in && assigned_in.length != 0) {
            const projectIds = assigned_in.map(project => project.project_id);
            query.where.project_id = { [Op.in]: projectIds };
          }
        }
    
        if (role == 2) {
          let query_manager = {
            include: [{ model: userinfo, attributes: ['name'] }]
          };
          query_manager.where = { manager_id: user_id, company_id: company_id };
          const result = await project.findAll(query_manager);
          if (result && result.length != 0) {
            const projectIds = result.map(project => project.project_id);
            query.where.project_id = { [Op.in]: projectIds };
          }
        }
      }
    
      // Apply status filter
      if (status != 'n') {
        query.include[0].include[0].where = { logstatus: status };
      }
    
      // Apply search filter on log's `name` field
      if (searchBy && searchBy != '' && searchBy != 'undefined') {
        query.include[0].include[0].include[0].where = {
          name: { [Op.like]: `%${searchBy}%` }
        };
      }
    
      // Apply ordering at the very end based on `updated_at` of the log model
      if (sortby != 0) {
        let sorting = sortby == 1 ? 'DESC' : 'ASC';
        
        // Here we use a top-level order clause with the log's updated_at field
        query.order = [
          // Dot notation to specify `log.updated_at`
          [{ model: task }, { model: log }, 'updated_at', sorting]
        ];
      }
    
      return project.findAll(query);
    }
    

    
    static associate(models) {
      // define association here
    }
  }
  log.init({
    log_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    logdata: DataTypes.TEXT,
    start_time: {
      allowNull: false,
      type: DataTypes.TIME
    },
    end_time: {
      allowNull: false,
      type: DataTypes.TIME
    },
    logstatus: DataTypes.STRING,
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // or allowNull: true if it is optional
    },
    approved_by: {
      type: DataTypes.INTEGER,

    }
  }, {
    sequelize,
    modelName: 'log',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return log;
};
