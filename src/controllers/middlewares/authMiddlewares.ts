import { Request, Response, NextFunction } from 'express'

export const isAuth = (request: Request, response: Response, next: NextFunction) => {
  if (request.isAuthenticated()) {
    next()
  } else {
    return response.status(401).json({ msg: 'You are not authorized to view this resource' })
  }
}

export const isAdmin = (request: any, response: Response, next: NextFunction) => {
  /* Where is user object */
  if (request.isAuthenticated() && request.user?.isAdmin) {
    next()
  } else {
    return response.status(401).json({ msg: 'Admin only resource.' })
  }
}
