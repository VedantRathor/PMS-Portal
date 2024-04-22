'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logs', {
      lid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      uid: {
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.INTEGER
      },
      tid: {
        type: Sequelize.INTEGER
      },
      logdata: {
        type: Sequelize.TEXT
      },
      logstatus: {
        type: Sequelize.STRING
      },
      logmid: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logs');
  }
};