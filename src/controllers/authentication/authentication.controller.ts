import express from 'express'
import BaseController from '../baseController'
import passport from 'passport'
import { isAuth, isAdmin } from '../middlewares/authMiddlewares'

export class AuthenticationController extends BaseController {
  constructor(public router: express.Router = express.Router(), public path: string = '/auth') {
    super()
  }

  public initializeRoutes(): void {
    this.router.post(this.path + '/login', this.login)
    this.router.get(this.path + '/logout', this.logout)
  }

  public login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (error: any, user: any) => {
      if (error) throw new Error(error.message)
      if (!user) {
        response.status(401).send({ msg: 'User not finded' })
      } else {
        request.logIn(user, (err) => {
          // Passport exposes a login() function on request (also aliased as logIn()) that can be used
          // to establish a login session.
          // request.login() is generating a session for an user.
          /* (src/config/passport.js) */
          if (err) throw new Error(err.message)
          response.send({ msg: 'Successfully authenticated' })
        })
      }
    })(request, response, next)
  }

  public logout = async (request: express.Request, response: express.Response) => {
    try {
      request.logout((r) => console.log(r))
      response.send({ message: 'User logged out' })
    } catch (error) {
      console.log(error)
    }
  }
}
