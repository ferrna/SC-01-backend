import express from 'express';
import Product from './product.interface';
import BaseController from '../controllers/baseController';
 
class ProductsController extends BaseController {
 
  /* private products: Product[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ]; */
 
  constructor(public router: express.Router=express.Router(), public path: string='/products') {
      super();
  }
 
  
  public initializeRoutes(): void {
    this.router.get('/products', this.getAllProducts);
    this.router.post('/products', this.createAProducts);
  }
  public getAllProducts = (request: express.Request, response: express.Response) => {
    /* response.send(this.products); */
    response.send("It Works!");
  }
 
  public createAProducts = (request: express.Request, response: express.Response) => {
    /* const products: Product = request.body;
    this.products.push(products);
    response.send(products); */
  }
}
 
export default ProductsController;