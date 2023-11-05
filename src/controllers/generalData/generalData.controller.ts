import express from 'express'
import GeneralData from './generalData.interface'
import BaseController from '../baseController'
import { GeneralDatas } from '../../db'

export class GeneralDatasController extends BaseController {
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

  public createAGeneralData = (request: express.Request, response: express.Response) => {}
}
