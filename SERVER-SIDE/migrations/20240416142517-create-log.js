'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logs', {
      log_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      task_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      logdata: {
        type: Sequelize.TEXT
      },
      start_time:{
        allowNull: false,
        type: Sequelize.TIME
      },
      end_time : {
        allowNull: false,
        type: Sequelize.TIME
      },
      logstatus: {
        type: Sequelize.STRING
      },
      approved_by: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      company_id : {
        allowNull : false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logs');
  }
};