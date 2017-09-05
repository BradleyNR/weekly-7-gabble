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
    //setting the table and column the dog belongs to
    Entry.belongsTo(models.Userlogin, {foreignKey: 'userId'});
  };
  return Entry;
};
