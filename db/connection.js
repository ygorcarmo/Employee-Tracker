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
  );

  module.exports = connection;