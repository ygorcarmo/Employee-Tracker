// Import and require mysql2
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASS,
      database: 'employees'
    },
    console.log(`Connected to the movies_db database.`)
  );

  module.exports = db;