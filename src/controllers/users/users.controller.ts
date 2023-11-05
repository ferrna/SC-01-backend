import express from 'express'
import BaseController from '../baseController'
import { Users } from '../../db'
import { genPassword } from '../../lib/passwordUtils'
import { isAuth, isAdmin } from '../middlewares/authMiddlewares'

export class UsersController extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/users') {
    super()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getUser)
    this.router.get(this.path + '/:key', isAdmin, this.getUserById)
    this.router.get(this.path + '/admin', isAdmin, this.getUserIsAdmin)
    this.router.put(this.path + '/admin/:key', isAdmin, this.putUserAdmin)
    this.router.post(this.path, this.createUser)
  }

  public getUser = async (request: express.Request, response: express.Response) => {
    try {
      response.send((request.user as any)?.dataValues.username)
    } catch (error) {
      response.status(401).send({ msg: 'No user authenticated' })
    }
  }

  public getUserIsAdmin = async (request: express.Request, response: express.Response) => {
    response.send({ isAdmin: true })
  }

  public getUserById = async (request: express.Request, response: express.Response) => {
    try {
      const user = await Users.findOne({ where: { id: request.params.key } })
      if (user === null) throw new Error()
      response.send([user.id, user.username, user.isAdmin, user.createdAt, user.updatedAt])
    } catch (error) {
      response.status(404).send({ msg: 'User not found' })
    }
  }

  public putUserAdmin = async (request: express.Request, response: express.Response) => {
    try {
      const user = await Users.findOne({ where: { id: request.params.key } })
      if (user === null) throw new Error()
      user.isAdmin = true
      await user.save()
      response.send({ message: 'User updated to Admin' })
    } catch (error) {
      response.status(404).send({ msg: 'Could not save user' })
    }
  }

  public createUser = async (request: express.Request, response: express.Response) => {
    console.log(request.body)
    const saltHash = genPassword(request.body.password)
    const salt = saltHash.salt
    const hash = saltHash.hash
    try {
      const emailUser = await Users.findOne({ where: { username: request.body.username } })
      if (emailUser !== null) throw new Error()

      const newUser = await Users.create({
        username: request.body.username,
        isAdmin: false,
        hash: hash,
        salt: salt,
      })
      await newUser.save()
      response.send({ msg: 'User registered successfully' })
    } catch (err: any) {
      response.status(400).json({ error: err.message })
    }
  }
}
