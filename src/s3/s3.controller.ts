import util from 'util'
import fs from 'fs'
import multer from 'multer'

import { uploadFile, getFileStream } from './s3.helper.js'
import express from 'express'
import BaseController from '../controllers/baseController'

const unlinkFile = util.promisify(fs.unlink)
const upload = multer({ dest: 'uploads/' })

interface MulterRequest extends express.Request {
  file: any
}

class S3Controller extends BaseController {
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
    //  post '/images'
    const file = (request as MulterRequest).file
    console.log(file)

    // apply filter
    // resize

    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)

    response.send({ imagePath: `/images/${result.Key}` })
  }
}

export default S3Controller
