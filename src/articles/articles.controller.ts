import express from 'express';
import Article from './article.interface';
import BaseController from '../controllers/baseController';
import { Articles } from '../db';
 
class ArticlesController extends BaseController {
 
  constructor(public router: express.Router=express.Router(), public path: string='/articles') {
      super();
  }
 
  
  public initializeRoutes(): void {
    this.router.get(this.path , this.getAllArticles);
    this.router.post(this.path, this.createAnArticle);
  }
  public getAllArticles = async (request: express.Request, response: express.Response) => {
  
      try {
        const allArticles = await Articles.findAll();
        response.send(allArticles);
      } catch (error) {
        console.log(error);
      }
  }
 
  public createAnArticle = (request: express.Request, response: express.Response) => {
    /* const products: Product = request.body;
    this.products.push(products);
    response.send(products); */
  }
}
 
export default ArticlesController;