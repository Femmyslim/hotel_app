require('dotenv').config()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.DATABASE_NAME
  });

  connection.connect()

  module.exports = { connection }