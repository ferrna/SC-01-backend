import express from 'express'
import Article from './article.interface'
import BaseController from '../controllers/baseController'
import { Articles, Products } from '../db'
import validateData from './validators'

import fs from 'fs'
import multer from 'multer'
import S3Controller from '../s3/s3.service'
const upload = multer({ dest: 'uploads/' })
interface MulterRequest extends express.Request {
  file: any
}

class ArticlesController extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/articles') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllArticles)
    this.router.post(this.path, upload.single('image'), this.createAnArticle)
    this.router.put(this.path, this.editArticle)
  }

  public validateData = validateData

  public getAllArticles = async (request: express.Request, response: express.Response) => {
    try {
      const allArticles = await Articles.findAll()
      response.send(allArticles)
    } catch (error) {
      console.log(error)
    }
  }

  public createAnArticle = async (request: express.Request, response: express.Response) => {
    if (this.validateData('createAnArticle', request.body)) {
      const article: Article = request.body
      const articleCreated = await Articles.create(article)
      console.log(articleCreated)

      // upload file image
      const file = (request as MulterRequest).file
      console.log(file)
      if (file) {
        const s3Instance = new S3Controller()
        const { response = null } = { response: await s3Instance.uploadImageToBucket2(file) }
        console.log(response?.location)
        if (response?.location) {
          articleCreated.image = response.location
          await articleCreated.save()
        }
        // error: ENOENT: no such file or directory, unlink 'public/uploads/1f2b7f0b7f0b7f0b7f0b7f0b7f0b7f0b'
        // path still exists and file gets deleted
        fs.unlink('public' + file.path, function (err) {
          if (err) console.log(err)

          console.log('File deleted!')
        })
      }

      if (article.products) {
        article.products.forEach(async (productId: number) => {
          const product = await Products.findByPk(productId)
          // @ts-ignore
          product && articleCreated.addProduct(product)
        })
      }

      response.send({ message: 'Article created', articleId: articleCreated.id })
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
