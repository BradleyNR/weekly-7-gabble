'use strict';
module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('Entry', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    author: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Userlogins',
        key: 'id'
    }
  }
  });
  Entry.associate = (models) => {
    Entry.belongsTo(models.Userlogin, {foreignKey: 'userId'});
    Entry.hasMany(models.Like, {foreignKey: 'post'});
  };

  return Entry;
};
