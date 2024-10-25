'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        allowNull : false ,
        type: Sequelize.INTEGER
      },
      project_id: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull : false ,
        type: Sequelize.INTEGER
      },
      message: {
        allowNull : false ,
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.INTEGER
      },
      deleted_at: {
        allowNull : true ,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};