import express from 'express'
import Product from './product.interface'
import BaseController from '../controllers/baseController'
import { Articles, Products } from '../db'
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

  public validateData = validateData
  /*  */

  public createAProduct = async (request: express.Request, response: express.Response) => {
    if (this.validateData('createAProduct', request.body)) {
      const product: Product = request.body

      // TODO: relate new product with categories
      let categories: string[] = []
      if (product.categories) {
        categories = [...product.categories]
        delete product['categories']
      }

      // @ts-ignore
      // sequelize already handles refactor of string[] components for string type storage
      const productCreated = await Products.create(product)
      console.log(productCreated)

      if (product.articles) {
        product.articles.forEach(async (articleId: number) => {
          const article = await Articles.findByPk(articleId)
          // @ts-ignore
          article && productCreated.addArticle(article)
        })
      }

      // + id
      response.send('Product created')
    } else {
      response.send('Data not valid')
    }
  }
}

export default ProductsController
