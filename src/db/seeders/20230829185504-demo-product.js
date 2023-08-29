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
          name: "Producto demo",
          components:
            "Demo Lorem ipsum dolor",
          /* categoryId: 1, */
          price: 200,
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
        { name: "Producto demo" },
      ],
    });
  },
};
