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
            "Nuestros productos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Titulo-productos-homepage-mobile",
          content:
            "Nuestros productos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Subtitulo-banner-brand",
          content:
            "Tu lorem ipsum sit anmet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Descripcion-preparaciones-homepage",
          content:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.Nullam id dolor id nibh ultricies vehicula ut id elit.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sobre-nosotros-descripcion",
          content:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.Nullam id dolor id nibh ultricies vehicula ut id elit.",
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
      ],
    });
  },
};
