'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Entries',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Userlogins',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Entries', 'userId')
  }
};
