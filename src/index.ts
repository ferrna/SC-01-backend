import { App } from './app.ts'

/* Import routerControllers */
import { ProductsController } from './controllers/products/products.controller'
import { ArticlesController } from './controllers/articles/articles.controller'
import { CategoriesController } from './controllers/categories/categories.controller'
import { GeneralDatasController } from './controllers/generalData/generalData.controller'
import { AuthenticationController } from './controllers/authentication/authentication.controller'
import { UsersController } from './controllers/users/users.controller'

/* Require environment variables */
require('dotenv').config()

const app = new App(
  [
    new ProductsController(),
    new ArticlesController(),
    new CategoriesController(),
    new GeneralDatasController(),
    new AuthenticationController(),
    new UsersController(),
  ],
  process.env.PORT || 5000
)

app.listen()
