'use strict';
module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('Entry', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Entry;
};