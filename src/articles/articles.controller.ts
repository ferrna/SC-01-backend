import express from 'express'
import Article from './article.interface'
import BaseController from '../controllers/baseController'
import { Articles } from '../db'
import validateData from './validators'

class ArticlesController extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/articles') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllArticles)
    this.router.post(this.path, this.createAnArticle)
    this.router.put(this.path, this.editArticle)
  }
  public getAllArticles = async (request: express.Request, response: express.Response) => {
    try {
      const allArticles = await Articles.findAll()
      response.send(allArticles)
    } catch (error) {
      console.log(error)
    }
  }

  public validateData = validateData
  /*  */

  public createAnArticle = async (request: express.Request, response: express.Response) => {
    if (this.validateData('createAnArticle', request.body)) {
      const article: Article = request.body
      const articleCreated = await Articles.create(article)
      console.log(articleCreated)
      // + id
      response.send('Article created')
    } else {
      response.send('Data not valid')
    }
  }
  public editArticle = async (request: express.Request, response: express.Response) => {
    if (this.validateData('editArticle', request.body)) {
      let article: object | null = await Articles.findByPk(request.body.id)
      if (article) {
        /* article.set({
          firstName: "Sarah",
          lastName: "Jackson",
        });

        article = await article.save(); */
        await Articles.upsert(request.body)
        response.send('Article updated')
      }
    } else {
      response.send('Data not valid')
    }
  }
}
export default ArticlesController
