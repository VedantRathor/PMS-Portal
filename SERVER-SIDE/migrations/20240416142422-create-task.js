'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      task_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      project_id: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      created_by: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      task_name: {
        type: Sequelize.STRING
      },
      task_details: {
        type: Sequelize.TEXT
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
      updated_by : {
        type : Sequelize.DATE
      },
      estimate_time : {
        type : Sequelize.TIME,
        allowNull : false 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};