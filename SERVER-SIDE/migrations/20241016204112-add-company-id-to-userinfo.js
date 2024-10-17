  'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'userinfos', // name of the table you want to add the column to
      'company_id', // name of the new column
      {
        type: Sequelize.INTEGER, // data type of the column
        allowNull: false, // modify based on your requirement (true/false)
        
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userinfos', 'company_id');
  }
};
