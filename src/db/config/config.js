require('dotenv').config({ path: `${__dirname}/../../../.env` })

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql"
    }
}


/* This will be preloaded by sequelize-cli */