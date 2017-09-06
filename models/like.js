'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    post: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Entry', key: 'id'}},
    user: {type: DataTypes.STRING, allowNull: false, references: {model: 'Userlogin', key: 'username'}}
  });
  Like.associate = (models) => {
    Like.belongsTo(models.Entry, {foreignKey: 'post'});
    Like.belongsTo(models.Userlogin, {foreignKey: 'userId'});
  };
  return Like;
};
