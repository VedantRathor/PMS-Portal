'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendance_managements', {
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      which_date: {
        type: Sequelize.DATE
      },
      check_in: {
        type: Sequelize.TIME
      },
      check_out: {
        type: Sequelize.TIME
      },
      total_hours: {
        type: Sequelize.FLOAT
      },
      attendance_type : {
        type : Sequelize.STRING
      },
      status: {
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
        type: Sequelize.DATE,
        
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendance_managements');
  }
};