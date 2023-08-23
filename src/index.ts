const App = require('./app.ts').default;
const ProductsController = require('./products/products.controller').default;
 
const app = new App(
  [
    new ProductsController(),
    //{router: (request: express.Request, response: express.Response, next: express.NextFunction) => ('It Works!')}
  ],
  5000,
);
 
app.listen();