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
    this.router.get(this.path, this.getUserUsername)
    this.router.get(this.path + '/:key', isAdmin, this.getUserById)
    this.router.put(this.path + '/admin/:key', isAdmin, this.putNewAdminUser)
    this.router.post(this.path, this.createUser)
  }

  public getUserUsername = async (request: express.Request, response: express.Response) => {
    try {
      response.send((request.user as any)?.dataValues.username)
    } catch (error) {
      response.status(401).send({ msg: 'No user authenticated' })
    }
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

  public putNewAdminUser = async (request: express.Request, response: express.Response) => {
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
    const { username, password } = request.body
    try {
      const saltHash = genPassword(password)
      const salt = saltHash.salt
      const hash = saltHash.hash
      const dbUsername = await Users.findOne({ where: { username: username } })
      if (dbUsername !== null) throw new Error("User already exists")

      const newUser = await Users.create({
        username: username,
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
