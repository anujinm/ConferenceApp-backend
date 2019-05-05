'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    eventTopic: DataTypes.STRING,
    eventOrganizer: DataTypes.STRING,
    eventStartDate: DataTypes.DATE,
    eventEndDate: DataTypes.DATE,
    eventDescription: DataTypes.STRING,
    eventAgenda: DataTypes.STRING,
    eventMap: DataTypes.STRING,
    eventPicture: DataTypes.STRING,
    eventLocation: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Speaker);
    // associations can be defined here
  };
  return Event;
};
