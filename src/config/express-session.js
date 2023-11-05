const session = require('express-session')
const mysqlStore = require('express-mysql-session')(session)

const IS_PROD = process.env.NODE_ENV === 'production'
const ONE_DAY = 1000 * 60 * 60 * 24

/* Pool for users authentification, not needed for now
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
export const sessionOptions = {
  name: process.env.SESS_NAME,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: process.env.SESS_SECRET || 'secret',
  cookie: {
    httpOnly: true,
    maxAge: ONE_DAY,
    sameSite: true,
    secure: IS_PROD,
  },
}