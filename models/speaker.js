'use strict';
module.exports = (sequelize, DataTypes) => {
  const Speaker = sequelize.define('Speaker', {
    speakerName: DataTypes.STRING,
    speakerTopic: DataTypes.STRING,
    speakerPicture: DataTypes.STRING,
    speakerBio: DataTypes.STRING,
    speakerSlides: DataTypes.STRING
  }, {});
  Speaker.associate = function(models) {
    // associations can be defined here
  };
  return Speaker;
};