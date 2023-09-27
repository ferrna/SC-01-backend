'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Piel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nutricional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Probiotico",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vitaminas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Aminoacidos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", {
      [Op.or]: [
        { name: "Piel" },
        { name: "Nutricional" },
        { name: "Probiotico" },
        { name: "Vitaminas" },
        { name: "Aminoacidos" },
      ],
    });
  },
};
