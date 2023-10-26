'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Metabolic CLA",
          components:
            "Acido linoleico conjugado",
          /* categoryId: 1, */
          price: 11200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shampoo de arbol de panama",
          components:
            "Arbol de panama",
          /* categoryId: 1, */
          price: 3200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Aceite de Tea tree",
          components:
            "Extracto liposoluble del Arbol del te",
          /* categoryId: 1, */
          price: 2200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", {
      [Op.or]: [
        { name: "Metabolic CLA" },
        { name: "Shampoo de arbol de panama" },
        { name: "Aceite de Tea tree" },
      ],
    });
  },
};
