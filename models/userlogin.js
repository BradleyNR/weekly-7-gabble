'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userlogin = sequelize.define('Userlogin', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });
  Userlogin.associate = (models) => {
    Userlogin.hasMany(models.Entry, {foreignKey: 'userId'});
  };

  return Userlogin;
};
