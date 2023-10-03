const App = require('./app.ts').default

const ProductsController = require('./products/products.controller').default
const ArticlesController = require('./articles/articles.controller').default
const CategoriesController = require('./categories/categories.controller').default
const GeneralDatasController = require('./generalData/generalData.controller').default
const S3Controller = require('./s3/s3.controller').default

/* Require environment variables */
require('dotenv').config()

const app = new App(
  [
    new ProductsController(),
    new ArticlesController(),
    new CategoriesController(),
    new GeneralDatasController(),
    new S3Controller(),
    //{router: (request: express.Request, response: express.Response, next: express.NextFunction) => ('It Works!')}
  ],
  process.env.PORT || 5000
)

app.listen()
