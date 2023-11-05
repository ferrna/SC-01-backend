import * as sequelize from 'sequelize'
import { ProductsFactory } from './models/products'
import { ArticlesFactory } from './models/articles'
import { GeneralDatasFactory } from './models/generalData'
import { CategoriesFactory } from './models/categories'
import { UserFactory } from './models/user'

/* Require environment variables */
require('dotenv').config()

export const dbConfig = new sequelize.Sequelize(
  /* (process.env.MYSQL_DB = "db-name"),
    (process.env.DB_USER = "db-user"),
    (process.env.DB_PASSWORD = "db-password"), */
  (process.env.MYSQL_DB = 'sc'),
  (process.env.DB_USER = 'root'),
  (process.env.DB_PASSWORD = '1234'),
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
)

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`

export const Products = ProductsFactory(dbConfig)
export const Articles = ArticlesFactory(dbConfig)
export const GeneralDatas = GeneralDatasFactory(dbConfig)
export const Categories = CategoriesFactory(dbConfig)
export const Users = UserFactory(dbConfig)

// RELATIONS

Products.belongsToMany(Articles, {
  through: 'products_articles',
  as: 'article',
  foreignKey: 'productId',
  otherKey: 'articleId',
})

Articles.belongsToMany(Products, {
  through: 'products_articles',
  as: 'product',
  foreignKey: 'articleId',
  otherKey: 'productId',
})

Products.belongsToMany(Categories, {
  through: 'products_categories',
  as: 'category',
  foreignKey: 'productId',
  otherKey: 'categoryId',
})

Categories.belongsToMany(Products, {
  through: 'products_categories',
  as: 'product',
  foreignKey: 'categoryId',
  otherKey: 'productId',
})
