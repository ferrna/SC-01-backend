import express from 'express'
import Product from './product.interface'
import BaseController from '../controllers/baseController'
import { Products } from '../db'
import validateData from './validators'

class ProductsController extends BaseController {
  /* private products: Product[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ]; */

  constructor(public router: express.Router = express.Router(), public path: string = '/products') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllProducts)
    this.router.post(this.path, this.createAProduct)
  }
  public getAllProducts = async (request: express.Request, response: express.Response) => {
    try {
      const allProducts = await Products.findAll()
      response.send(allProducts)
    } catch (error) {
      console.log(error)
    }
  }

  public createAProduct = (request: express.Request, response: express.Response) => {
    /* const products: Product = request.body;
    this.products.push(products);
    response.send(products); */
  }
}

export default ProductsController
