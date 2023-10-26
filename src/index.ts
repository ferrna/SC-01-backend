const App = require('./app.ts').default

/* Require router-controllers */
const ProductsController = require('./controllers/products/products.controller').default
const ArticlesController = require('./controllers/articles/articles.controller').default
const CategoriesController = require('./controllers/categories/categories.controller').default
const GeneralDatasController = require('./controllers/generalData/generalData.controller').default

/* Require environment variables */
require('dotenv').config()

const app = new App(
  [
    new ProductsController(),
    new ArticlesController(),
    new CategoriesController(),
    new GeneralDatasController(),
  ],
  process.env.PORT || 5000
)

app.listen()
