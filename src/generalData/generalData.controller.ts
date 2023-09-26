import express from 'express'
import GeneralData from './generalData.interface'
import BaseController from '../controllers/baseController'
import { GeneralDatas } from '../db'

class GeneralDatasController extends BaseController {
  /* private products: Product[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ]; */

  constructor(public router: express.Router = express.Router(), public path: string = '/general-data') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllGeneralDatas)
    this.router.post(this.path, this.createAGeneralData)
  }
  public getAllGeneralDatas = async (request: express.Request, response: express.Response) => {
    try {
      const allGeneralDatas = await GeneralDatas.findAll()
      response.send(allGeneralDatas)
    } catch (error) {
      console.log(error)
    }
  }

  public createAGeneralData = (request: express.Request, response: express.Response) => {
    /* const products: Product = request.body;
    this.products.push(products);
    response.send(products); */
  }
}

export default GeneralDatasController
