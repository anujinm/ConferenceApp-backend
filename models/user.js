'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    hash: DataTypes.STRING,
    level: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bio: DataTypes.TEXT,
    profilePic: DataTypes.STRING,
    schoolDistrict: DataTypes.STRING,
    roleAtDistrict: DataTypes.STRING,
    social1: DataTypes.STRING,
    social2: DataTypes.STRING,
    social3: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
