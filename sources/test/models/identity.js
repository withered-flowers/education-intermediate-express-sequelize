'use strict';
module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define('Identity', {
    name: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Identity.associate = function(models) {
    // associations can be defined here
  };
  return Identity;
};