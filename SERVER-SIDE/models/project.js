'use strict';
const { Op } = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {

    // This Method: used to create a project by Super-Admin
    static createProject({ project_name, project_details, manager_id }, user_id,company_id) {
      return project.create({
        project_name: project_name,
        project_details: project_details,
        manager_id: manager_id,
        created_by: user_id,
        status: 'pending',
        updated_by: user_id,
        company_id : company_id
      })
    }

    // This Method: used to retrieve project-detail
    static getProjectDetails(userinfo, project_id, company_id) {
      return project.findAll({
        include: [{
          model: userinfo,
        }],
        where: {
          project_id: project_id,
          company_id : company_id
          // manager_id: manager_id
        }

      })
    }

    // This Method: used to get all the members involved in a project
    static getProjectMembers(assignment,userinfo,project_id,company_id) {
      return project.findAll({
        include: [{
          model: assignment,
          required: true,
          include: [{
            model: userinfo
          }]
        }],
        where: {
          project_id: project_id,
          company_id : company_id
          // manager_id: manager_id
        }
      })
    }

    // This Method: used to update the project-status
    static updateProjectStatus(params, body,) {
      const { project_id } = params
      const { status } = body
      return project.update({
        status: status
      }, {
        where: {
          project_id: project_id
        }
      })
    }

    // This Method: this is a additional method for employee to find all the projects
    static employeeFindAll(userinfo, assignment, user_id) {
      return project.findAll({
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
    }

    // This Method: this is a additional method for employee to find all the projects based on Status.
    static employeeProjectByStatus(userinfo, user_id, status) {
      let query = {
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
      }
      return project.findAll(query)
    }

    // This Method: used to get the project based on search-value
    static getProjectByProjectName(userinfo, project_name, user_id, assignment, role) {
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
      return project.findAll(query)
    }

    static associate(models) {
      // define association here
    }
  }
  project.init({
    project_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // or allowNull: true if it is optional
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return project;
};