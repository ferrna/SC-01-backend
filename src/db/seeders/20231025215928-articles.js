'use strict';

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Articles",
      [
        {
          title: "Articulo sobre las vitaminas",
          drophead:
            "Demo Lorem ipsum dolor",
          /* categoryId: 1, */
          body: "Demo Lorem ipsum dolor",
          introduction: "Demo Lorem ipsum dolor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Articulo sobre los tipos de colageno",
          drophead:
            "Demo Lorem ipsum dolor",
          /* categoryId: 1, */
          body: "Demo Lorem ipsum dolor",
          introduction: "Demo Lorem ipsum dolor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Articulo sobre maqui berry fruta",
          drophead:
            "Demo Lorem ipsum dolor",
          /* categoryId: 1, */
          body: "Demo Lorem ipsum dolor",
          introduction: "Demo Lorem ipsum dolor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Articles", {
      [Op.or]: [
        { title: "Articulo sobre las vitaminas" },
        { title: "Articulo sobre los tipos de colageno" },
        { title: "Articulo sobre maqui berry fruta" },
      ],
    });
  },
};
