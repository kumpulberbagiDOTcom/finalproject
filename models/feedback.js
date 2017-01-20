'use strict';
module.exports = function(sequelize, DataTypes) {
  var Feedback = sequelize.define('Feedback', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Feedback;
};