const mysql = require('mysql2')
require('dotenv/config')

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
})

let sqlConnection = (sql) => {
    return new Promise((resolve, reject) => {

        pool.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

module.exports = { sqlConnection }