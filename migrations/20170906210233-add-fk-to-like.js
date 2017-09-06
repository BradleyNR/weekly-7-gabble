'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'Likes',
        'post',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Entries',
            key: 'id'
          }
        }
      ),
      queryInterface.changeColumn(
        'Likes',
        'user',
        {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: 'Userlogins',
            key: 'username'
          }
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
  }
};
