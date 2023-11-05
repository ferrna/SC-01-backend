import express from 'express'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import BaseController from './controllers/baseController'
import { dbConfig } from './db'

const session = require('express-session')
var passport = require('passport')
const mysqlStore = require('express-mysql-session')(session)

const IS_PROD = process.env.NODE_ENV === 'production'
const ONE_DAY = 1000 * 60 * 60 * 24

/* 
If needed pool for users authentification, but not needed for now, only for admin
MySQL Pool for express-mysql-session:
const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}) */
const sessionStore = new mysqlStore({
  connectionLimit: 10,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
})
export class App {
  public app: express.Application
  public port: number | string

  constructor(controllers: BaseController[], port: number | string) {
    this.app = express()
    this.port = port

    this.connectToTheDatabase()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeEndwares()
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }))
    this.app.use(cookieParser())
    this.app.use(morgan('dev'))
    this.app.use(cors())

    /* -------------- SESSION ---------------- */
    this.app.use(
      session({
        name: process.env.SESS_NAME,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        secret: process.env.SESS_SECRET,
        cookie: {
          httponly: true,
          maxAge: ONE_DAY,
          sameSite: true,
          secure: IS_PROD,
        },
      })
    )
    /* -------------- PASSPORT AUTHENTICATION ---------------- */
    require('./config/passport')
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    /* //selectively applying passport to only secure urls
    this.app.use(function (request: express.Request, response: express.Response, next: express.NextFunction) {
      if (req.url.match('/xxxx/secure')) passport.session()(request, response, next)
      else next() // do not invoke passport
    }) */

    this.app.get('/', (req, res) => {
      res.send(`
    <h1>Welcome to SC-APIrest</h1>
    <div><p>This is an example</p></div>
    <a href='/routes'>Routes</a>
    `)
    })
  }

  private initializeEndwares() {
    /* -------------- ERROR HANDLING ---------------- */
    this.app.use(
      (error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
        const status = error.status || 500
        const message = error.message || error
        console.error(error)
        response.status(status).send(message)
      }
    )
  }

  private initializeControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      controller.initializeRoutes()
      this.app.use('/', controller.router)
    })
  }

  private connectToTheDatabase() {
    dbConfig
      .sync()
      .then(() => console.log('connected to db'))
      .catch((error: any) => {
        console.log(error)
      })
  }
}
