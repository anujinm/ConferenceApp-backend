'use strict';
module.exports = (sequelize, DataTypes) => {
  const Speaker = sequelize.define('Speaker', {
    eventId: DataTypes.INTEGER,
    speakerName: DataTypes.STRING,
    speakerTopic: DataTypes.STRING,
    speakerPicture: DataTypes.STRING,
    speakerBio: DataTypes.TEXT,
    speakerSlides: DataTypes.STRING
  }, {});
  Speaker.associate = function(models) {
    // associations can be defined here
    Speaker.belongsTo(models.Event);
  };
  return Speaker;
};
