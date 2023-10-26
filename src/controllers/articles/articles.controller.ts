import express from 'express'
import { Article, ArticleRequestBody } from './articles.interfaces'
import BaseController from '../baseController'
import { Articles, Products } from '../../db'
import validateData from './validators'

import fs from 'fs'
import multer from 'multer'
import S3Controller from '../services/s3/s3.service'
/* Handle files uploads in body */
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
    this.router.put(this.path + '/:key', upload.single('image'), this.editArticle)
    this.router.get(this.path + '/:key', this.getArticle)
    this.router.delete(this.path + '/:key', this.deleteArticle)
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
    console.log(request.body)
    if (this.validateData('editArticle', request.body)) {
      let articleId = request.params.key

      let article = await Articles.findByPk(articleId)

      let articleRequestBody: ArticleRequestBody = request.body
      if (article !== null) {
        console.log('here!')
        /* Object.keys(articleRequestBody).forEach((key) => {
          // Check if 'key' exists in 'article' before updating it
          //@ts-ignore
          if(article.hasOwnProperty(key)){
            //@ts-ignore
            article[key as keyof typeof articleRequestBody] = request.body[key]
          }
        }) */

        // upload file image
        const file = (request as MulterRequest).file
        console.log(file)
        if (file) {
          const s3Instance = new S3Controller()
          const { response = null } = { response: await s3Instance.uploadImageToBucket2(file) }
          console.log(response?.location)
          if (response?.location) {
            await article.update({ image: response.location })
            // article.image = response.location
            // //await article.save()
          }
          // error: ENOENT: no such file or directory, unlink 'public/uploads/1f2b7f0b7f0b7f0b7f0b7f0b7f0b7f0b'
          // path still exists and file gets deleted
          fs.unlink('public' + file.path, function (err) {
            if (err) console.log(err)

            console.log('File deleted!')
          })
        }

        article.set({
          title: articleRequestBody.title,
          drophead: articleRequestBody.drophead,
          introduction: articleRequestBody.introduction,
          body: articleRequestBody.body,
        })
        await article.save()

        response.send('Article updated')
      } else {
        response.send('Article not found')
      }
    } else {
      response.send('Data not valid')
    }
  }
  public getArticle = async (request: express.Request, response: express.Response) => {
    let articleId = request.params.key

    let article = await Articles.findByPk(articleId)
    if (article !== null) {
      response.send({ article })
    } else {
      response.send('Article not found')
    }
  }
  public deleteArticle = async (request: express.Request, response: express.Response) => {
    let articleId = request.params.key

    let article = await Articles.findByPk(articleId)
    if (article !== null) {
      let deleted = await article.destroy()
      response.send({ message: 'Article deleted', deleted })
    } else {
      response.send('Article not found')
    }
  }
}
export default ArticlesController
