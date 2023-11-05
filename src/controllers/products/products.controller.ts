import express from 'express'
import { Product, ProductRequestBody } from './products.interfaces'
import BaseController from '../baseController'
import { Articles, Products, Categories } from '../../db'
import validateData from './validators'

import fs from 'fs'
import multer from 'multer'
import { S3Controller } from '../services/s3/s3.service'
/* Handle files uploads in body */
const upload = multer({ dest: 'uploads/' })
interface MulterRequest extends express.Request {
  file: any
}

export class ProductsController extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/products') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllProducts)
    this.router.post(this.path, upload.single('image'), this.createAProduct)
    this.router.put(this.path + '/:key', upload.single('image'), this.editProduct)
    this.router.get(this.path + '/:key', this.getProduct)
  }

  public validateData = validateData

  public getAllProducts = async (request: express.Request, response: express.Response) => {
    try {
      const allProducts = await Products.findAll()
      response.send(allProducts)
    } catch (error) {
      console.log(error)
    }
  }

  public createAProduct = async (request: express.Request, response: express.Response) => {
    if (this.validateData('createAProduct', request.body)) {
      const product: Product = request.body
      // @ts-ignore
      // sequelize already handles refactor of string[] 'components' field for string type storage
      const productCreated = await Products.create(product)

      // upload file image
      const file = (request as MulterRequest).file

      if (file) {
        const s3Instance = new S3Controller()
        const { response = null } = { response: await s3Instance.uploadImageToBucket2(file) }

        if (response?.location) {
          productCreated.image = response.location
          await productCreated.save()
        }
        // error: ENOENT: no such file or directory, unlink 'public/uploads/1f2b7f0b7f0b7f0b7f0b7f0b7f0b7f0b'
        // path still exists and file gets deleted
        fs.unlink('public' + file.path, function (err) {
          if (err) console.log(err)

          console.log('File deleted!')
        })
      }
      if (product.categories) {
        product.categories.forEach(async (category) => {
          const categoryById = await Categories.findByPk(category.id)
          // @ts-ignore
          categoryById && productCreated.addCategory(categoryById)
        })
      }
      if (product.articles) {
        product.articles.forEach(async (articleId: number) => {
          const article = await Articles.findByPk(articleId)
          // @ts-ignore
          article && productCreated.addArticle(article)
        })
      }

      response.send({ message: 'Product created', productId: productCreated.id })
    } else {
      response.send('Data not valid')
    }
  }

  public editProduct = async (request: express.Request, response: express.Response) => {
    console.log(request.body)
    if (this.validateData('editProduct', request.body)) {
      let productId = request.params.key

      let product = await Products.findByPk(productId)

      let productRequestBody: ProductRequestBody = {
        ...request.body,
      }
      if (product !== null) {
        console.log('here!')
        /* Object.keys(articleRequestBody).forEach((key) => {
          // article = { ...article, [key]: request.body[key] }
          // Check if 'key' exists in 'article' before updating it
          //@ts-ignore
          if(article.hasOwnProperty(key)){
            //@ts-ignore
            article[key as keyof typeof articleRequestBody] = request.body[key]
          }
        }) */
        const file = (request as MulterRequest).file
        console.log(file)
        if (file) {
          const s3Instance = new S3Controller()
          const { response = null } = { response: await s3Instance.uploadImageToBucket2(file) }
          console.log(response?.location)
          if (response?.location) {
            await product.update({ image: response.location })
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

        product.set({
          name: productRequestBody.name,
          description: productRequestBody.description,
          components: productRequestBody.components || null,
          price: productRequestBody.price || null,
        })
        await product.save()

        response.send('Product updated')
      } else {
        response.send('Product not found')
      }
    } else {
      response.send('Data not valid')
    }
  }
  public getProduct = async (request: express.Request, response: express.Response) => {
    let productId = request.params.key

    let product = await Products.findByPk(productId)
    if (product !== null) {
      response.send({ product })
    } else {
      response.send('Product not found')
    }
  }
}
