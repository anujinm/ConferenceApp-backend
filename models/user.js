'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    eventId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    hash: DataTypes.STRING,
    level: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    personalEmail: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    schoolDistrict: DataTypes.STRING,
    roleAtDistrict: DataTypes.STRING,
    social1: DataTypes.STRING,
    social2: DataTypes.STRING,
    social3: DataTypes.STRING,
    bio: DataTypes.TEXT,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
