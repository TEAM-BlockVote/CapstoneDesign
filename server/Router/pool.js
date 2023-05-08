const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 50,
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: 'BlockVote'
});

module.exports = pool;