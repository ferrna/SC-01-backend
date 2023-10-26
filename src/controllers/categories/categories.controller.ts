import express from 'express'
import Category from './category.interface'
import BaseController from '../baseController'
import { Categories } from '../../db'

class CategoriesController extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/categories') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllCategories)
    this.router.post(this.path, this.createACategory)
    this.router.put(this.path, this.editCategory)
  }

  public getAllCategories = async (request: express.Request, response: express.Response) => {
    try {
      const allCategories = await Categories.findAll()
      response.send(allCategories)
    } catch (error) {
      console.log(error)
    }
  }

  public createACategory = async (request: express.Request, response: express.Response) => {
    if (typeof request.body.name === 'string') {
      const Category: Category = request.body
      const CategoryCreated = await Categories.create(Category)
      console.log(CategoryCreated)
      // + id
      response.send('Category created')
    } else {
      response.send('Data not valid')
    }
  }

  public editCategory = async (request: express.Request, response: express.Response) => {
    if (typeof request.body.name === 'string' && typeof request.body.id === 'number') {
      let category: object | null = await Categories.findByPk(request.body.id)
      if (category) {
        await Categories.upsert(request.body)
        response.send('Category updated')
      }
    } else {
      response.send('Data not valid')
    }
  }
}
export default CategoriesController
