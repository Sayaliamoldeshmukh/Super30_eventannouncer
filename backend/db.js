const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // default for XAMPP
  database: 'campus_events',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(() => console.log('MySQL connected ✅'))
  .catch((err) => console.error('MySQL connection failed ❌', err));

module.exports = pool;
