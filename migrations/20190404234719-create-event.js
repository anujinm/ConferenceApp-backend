'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      eventTopic: {
        type: Sequelize.STRING
      },
      eventOrganizer: {
        type: Sequelize.STRING
      },
      eventStartDate: {
        type: Sequelize.DATE
      },
      eventEndDate: {
        type: Sequelize.DATE
      },
      eventDescription: {
        type: Sequelize.STRING
      },
      eventAgenda: {
        type: Sequelize.STRING
      },
      eventMap: {
        type: Sequelize.STRING
      },
      eventPicture: {
        type: Sequelize.STRING
      },
      eventLocation: {
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
    return queryInterface.dropTable('Events');
  }
};
