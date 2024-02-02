const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "alejms11",
  database: "alimentos",
});

module.exports = pool;
