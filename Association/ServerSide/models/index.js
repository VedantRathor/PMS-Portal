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

//user
db.userinfo.hasMany(db.log,{
  foreignKey : 'uid'
})
db.log.belongsTo(db.userinfo,{
  foreignKey : 'uid'
})

db.userinfo.hasMany(db.project,{
  foreignKey : 'mid'
})
db.project.belongsTo(db.userinfo,{
  foreignKey:'mid'
})


db.userinfo.hasMany(db.assignment,{
  foreignKey:'uid'
})
db.assignment.belongsTo(db.userinfo,{
  foreignKey : 'uid'
})

db.userinfo.hasMany(db.task,{
  foreignKey:'created_by'
})
db.task.belongsTo(db.userinfo,{
  foreignKey:'created_by'
})

// project! 
db.project.hasMany(db.log,{
  foreignKey:'pid'
})
db.log.belongsTo(db.project,{
  foreignKey:'pid'
})

db.project.hasMany(db.assignment,{
  foreignKey:'pid'
})

db.assignment.belongsTo(db.project,{
  foreignKey:'pid'
})

db.project.hasMany(db.task,{
  foreignKey : 'pid'
})

db.task.belongsTo(db.project,{
  foreignKey:'pid'
})
// task 
db.task.hasMany(db.log,{
  foreignKey:'tid'
})
db.log.belongsTo(db.task,{
  foreignKey : 'tid'
})

module.exports = db;
