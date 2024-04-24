'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userinfos', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        unique : true ,
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
     deleted_at : {
    
      type: Sequelize.DATE
     }, 
      profile:{
        allowNull:true,
        type:Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userinfos');
  }
};