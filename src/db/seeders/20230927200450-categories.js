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
          name: "Cuidado de la piel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Suplementación Nutricional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Probioticos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Extractos naturales con propiedades medicinales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vitaminas y aminoacidos esencialess",
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
        { name: "Cuidado de la piel" },
        { name: "Suplementación Nutricional" },
        { name: "Probioticos" },
        { name: "Extractos naturales con propiedades medicinales" },
        { name: "Vitaminas y aminoacidos esenciales" },
      ],
    });
  },
};
