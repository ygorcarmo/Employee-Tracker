// Import and require mysql2
const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the movies_db database.`)
  );

  module.exports = connection;