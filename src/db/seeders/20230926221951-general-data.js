'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "GeneralDatas",
      [
        {
          name: "Titulo-productos-homepage-bigscreen",
          content:
            "Explorá nuestros productos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Titulo-productos-homepage-mobile",
          content:
            "Explorá nuestros productos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Descripcion-preparaciones-homepage",
          content:
            "lorem ipsum dolor sit amet.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sobre-nosotros-descripcion",
          content:
            "lorem ipsum dolor sit amet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GeneralDatas", {
      [Op.or]: [
        { name: "Titulo-productos-homepage-bigscreen" },
        { name: "Titulo-productos-homepage-mobile" },
        { name: "Descripcion-preparaciones-homepage" },
        { name: "Sobre-nosotros-descripcion" },
      ],
    });
  },
};
