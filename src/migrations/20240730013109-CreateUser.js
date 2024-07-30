"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      "User",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING(25),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "updated_at",
        },
      },
      { freezeTableName: true }
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropDatabase("User");
  },
};
