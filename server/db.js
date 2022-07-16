const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'welbex',
  password: 12345,
  port: 5432,
})

// pool.connect();

module.exports = pool;