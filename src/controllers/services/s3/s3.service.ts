import util from 'util'
import fs from 'fs'
import multer from 'multer'

import { uploadFile, getFileStream } from './s3.helper.js'
import express from 'express'
import BaseController from '../../baseController'

const unlinkFile = util.promisify(fs.unlink)
const upload = multer({ dest: 'uploads/' })

interface MulterRequest extends express.Request {
  file: any
}

export class S3Controller extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/images') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path + '/:key', this.getImageByKey)
    this.router.post(this.path, upload.single('image'), this.uploadImageToBucket)
  }
  public getImageByKey = async (request: express.Request, response: express.Response) => {
    try {
      // '/images/:key'
      const key = request.params.key
      const readStream = getFileStream(key)

      readStream.pipe(response)
    } catch (error) {
      console.log(error)
    }
  }

  public uploadImageToBucket = async (request: express.Request, response: express.Response) => {
    try {
      //  post '/images'
      const file = (request as MulterRequest).file
      console.log(file)

      // apply filter
      // resize

      const result = await uploadFile(file)
      await unlinkFile(file.path)
      console.log(result)

      response.send({ location: `${result.Location}` })
      //response.send({ imagePath: `/images/${result.Key}` })
    } catch (error: any) {
      console.log(error)
      response.send({ message: error.message })
    }
  }

  public uploadImageToBucket2 = async (file: any) => {
    try {
      const result = await uploadFile(file)
      await unlinkFile(file.path)
      console.log(result)

      return { location: `${result.Location}` }
    } catch (error: any) {
      console.log(error)
    }
  }
}
