'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Speakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
          key: 'id'
        }
      },
      speakerName: {
        type: Sequelize.STRING
      },
      speakerTopic: {
        type: Sequelize.STRING
      },
      speakerPicture: {
        type: Sequelize.STRING
      },
      speakerBio: {
        type: Sequelize.TEXT
      },
      speakerSlides: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Speakers');
  }
};
