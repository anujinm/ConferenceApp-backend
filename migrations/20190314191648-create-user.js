'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(191)
      },
      hash: {
        type: Sequelize.STRING(191)
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING(20)
      },
      personalEmail: {
        type: Sequelize.STRING(20)
      },
      bio: {
        type: Sequelize.TEXT,
      },
      profilePic: {
        type: Sequelize.STRING(191),
      },
      schoolDistrict: {
        type: Sequelize.STRING(191),
      },
      roleAtDistrict: {
        type: Sequelize.STRING(191),
      },
      social1: {
        type: Sequelize.STRING(191)
      },
      social2: {
        type: Sequelize.STRING(191)
      },
      social3: {
        type: Sequelize.STRING(191)
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
    return queryInterface.dropTable('Users');
  }
};
