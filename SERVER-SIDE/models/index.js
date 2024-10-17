'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize , DataTypes} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.userinfo = require('../models/userinfo')(sequelize,DataTypes)
db.project =  require('../models/project')(sequelize,DataTypes)
db.assignment =  require('../models/assignment')(sequelize,DataTypes)
db.task =  require('../models/task')(sequelize,DataTypes)
db.log =  require('../models/log')(sequelize,DataTypes)
db.notification = require('../models/notification')(sequelize,DataTypes)
db.attendance_management = require('../models/attendance_management copy')(sequelize,DataTypes) ;
db.company = require('../models/company')(sequelize,DataTypes);


// company
db.company.hasMany(db.userinfo,{
  foreignKey:'company_id'
})

db.userinfo.belongsTo(db.company,{
  foreignKey: 'company_id'
})


db.company.hasMany(db.task,{
  foreignKey:'company_id'
})

db.task.belongsTo(db.company,{
  foreignKey: 'company_id'
})


db.company.hasMany(db.log,{
  foreignKey:'company_id'
})

db.log.belongsTo(db.company,{
  foreignKey: 'company_id'
})


db.company.hasMany(db.assignment,{
  foreignKey:'company_id'
})

db.assignment.belongsTo(db.company,{
  foreignKey: 'company_id'
})



db.company.hasMany(db.notification,{
  foreignKey:'company_id'
})

db.notification.belongsTo(db.company,{
  foreignKey: 'company_id'
})





// user - logs
db.userinfo.hasMany(db.log,{
  foreignKey : 'user_id'
})
db.log.belongsTo(db.userinfo,{
  foreignKey : 'user_id'
})

//userinfo - attendance_management 
db.userinfo.hasMany( db.attendance_management , {
  foreignKey : 'user_id'
});

db.attendance_management.belongsTo( db.userinfo , {
  foreignKey : 'user_id' 
}); 

// user - projects
db.userinfo.hasMany(db.project,{
  foreignKey : 'manager_id'
})
db.project.belongsTo(db.userinfo,{
  foreignKey:'manager_id'
})

// user - assign
db.userinfo.hasMany(db.assignment,{
  foreignKey:'user_id'
})
db.assignment.belongsTo(db.userinfo,{
  foreignKey : 'user_id'
})

// user - tasks
db.userinfo.hasMany(db.task,{
  foreignKey:'created_by'
})
db.task.belongsTo(db.userinfo,{
  foreignKey:'created_by'
})

// project - logs
db.project.hasMany(db.log,{
  foreignKey:'project_id'
})
db.log.belongsTo(db.project,{
  foreignKey:'project_id'
})

// project - assign
db.project.hasMany(db.assignment,{
  foreignKey:'project_id'
})

db.assignment.belongsTo(db.project,{
  foreignKey:'project_id'
})

// project - task
db.project.hasMany(db.task,{
  foreignKey : 'project_id'
})

db.task.belongsTo(db.project,{
  foreignKey:'project_id'
})

// task - logs
db.task.hasMany(db.log,{
  foreignKey:'task_id'
})
db.log.belongsTo(db.task,{
  foreignKey : 'task_id'
})

module.exports = db;
