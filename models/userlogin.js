'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userlogin = sequelize.define('Userlogin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return Userlogin;
};
