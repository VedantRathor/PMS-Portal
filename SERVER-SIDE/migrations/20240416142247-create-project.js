'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      project_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      project_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      project_details: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by:{
        type : Sequelize.INTEGER
      },
      company_id : {
        allowNull : false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};