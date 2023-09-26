import * as sequelize from 'sequelize'
import { ProductsFactory } from './models/products'
import { ArticlesFactory } from './models/articles'
import { GeneralDatasFactory } from './models/generalData'

/* Require environment variables */
require('dotenv').config()

export const dbConfig = new sequelize.Sequelize(
  /* (process.env.DB_NAME = "db-name"),
    (process.env.DB_USER = "db-user"),
    (process.env.DB_PASSWORD = "db-password"), */
  (process.env.DB_NAME = 'sc'),
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

// RELATIONS

Products.belongsToMany(Articles, {
  through: 'products_articles',
  as: 'articles',
  foreignKey: 'product_id',
})

Articles.belongsToMany(Products, {
  through: 'products_articles',
  as: 'products',
  foreignKey: 'article_id',
})
