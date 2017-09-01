'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userlogin = sequelize.define('Userlogin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Userlogin;
};