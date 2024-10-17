'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_registration_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_unique_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      admin_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      admin_id : {
        type : Sequelize.INTEGER,
        allowNull : false 
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  }
};